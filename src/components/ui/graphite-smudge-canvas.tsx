"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  createKinematics,
  drawDust,
  mulberry32,
  smearGraphite,
  spawnDust,
  stampGraphite,
  stepDust,
  strokeGraphite,
  type DustParticle,
  type Point,
  type Rng,
} from "@/lib/graphite"

export interface SmudgeFieldStyle {
  ink: string
  /** resolved display font-family */
  display: string
  label?: string
}

export type SmudgeFieldPainter = (ctx: CanvasRenderingContext2D, width: number, height: number, rng: Rng, style: SmudgeFieldStyle) => void

export interface GraphiteSmudgeCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  seed?: number
  /** what gets laid down before the visitor arrives. Memoise it: a new function re-lays the field. */
  draw?: SmudgeFieldPainter
  /** px (default 26) */
  stumpRadius?: number
  /** 0..1 lead carried per move while hovering (default 0.22) */
  hoverStrength?: number
  /** 0..1 lead carried per move while pressing (default 0.55) */
  pressStrength?: number
  /** kick up dust on fast moves (default true) */
  dust?: boolean
  /** big display word rubbed into the field by the default painter */
  label?: string
  resetLabel?: string
}

function readVar(el: HTMLElement, name: string, fallback: string) {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback
}

/** Default lay-down: a tonal band, a hatch cluster, a scribbled sun and (optionally) a rubbed display word. */
export const defaultSmudgeField: SmudgeFieldPainter = (ctx, w, h, rng, { ink, display, label }) => {
  // 1. tonal band: the flat side of the lead dragged left→right, pressure easing off
  for (let y = h * 0.22; y < h * 0.78; y += 3.5) {
    const jitter = (rng() - 0.5) * 3
    const chunks = 14
    for (let c = 0; c < chunks; c++) {
      const t0 = c / chunks
      const t1 = (c + 1) / chunks
      const fade = (1 - t0) ** 2
      strokeGraphite(
        ctx,
        { x: w * (0.08 + 0.84 * t0), y: y + jitter },
        { x: w * (0.08 + 0.84 * t1), y: y + jitter + (rng() - 0.5) * 2 },
        { radius: 5, density: 0.5, opacity: 0.1 + 0.5 * fade, color: ink, rng }
      )
    }
  }
  // 2. a cluster of quick hatch strokes, top right
  for (let i = 0; i < 16; i++) {
    const x = w * 0.66 + i * (w * 0.017)
    strokeGraphite(ctx, { x, y: h * 0.07 }, { x: x - w * 0.06, y: h * 0.16 + (rng() - 0.5) * 6 }, { radius: 1.8, density: 0.9, opacity: 0.6, color: ink, rng })
  }
  // 3. a scribbled sun, bottom left
  const cx = w * 0.15
  const cy = h * 0.86
  const r = Math.min(w, h) * 0.07
  let prev: Point = { x: cx + r * 0.55, y: cy }
  for (let a = 0.25; a <= Math.PI * 6; a += 0.25) {
    const rr = r * (0.55 + 0.45 * (a / (Math.PI * 6))) + (rng() - 0.5) * 3
    const p = { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr }
    strokeGraphite(ctx, prev, p, { radius: 1.6, density: 0.8, opacity: 0.5, color: ink, rng })
    prev = p
  }
  // 4. the display word, rubbed in twice then eaten by the paper tooth
  if (label) {
    const size = Math.round(Math.min(h * 0.34, (w * 1.6) / Math.max(4, label.length)))
    ctx.save()
    ctx.font = `${size}px ${display}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = ink
    ctx.globalAlpha = 0.35
    ctx.fillText(label, w / 2 + 2, h / 2 + 1.5)
    ctx.globalAlpha = 0.85
    ctx.fillText(label, w / 2, h / 2)
    const m = ctx.measureText(label)
    ctx.globalCompositeOperation = "destination-out"
    ctx.globalAlpha = 1
    const bx = w / 2 - m.width / 2
    const by = h / 2 - size / 2
    for (let i = 0; i < m.width * size * 0.012; i++) {
      stampGraphite(ctx, bx + rng() * m.width, by + rng() * size, { radius: 1.2 + rng() * 2.2, density: 0.5, opacity: 0.55, color: "#000", rng })
    }
    ctx.restore()
  }
}

/**
 * The cursor is a blending stump. Hover to feather the lead, press to drag
 * it hard; powder lifts off and exposes the paper; move fast and dust kicks
 * up. Everything lives on a section-scoped canvas so the rest of the page
 * stays cheap.
 */
export function GraphiteSmudgeCanvas({
  seed = 7,
  draw = defaultSmudgeField,
  stumpRadius = 26,
  hoverStrength = 0.22,
  pressStrength = 0.55,
  dust = true,
  label,
  resetLabel = "Re-lay graphite",
  className,
  style,
  ...props
}: GraphiteSmudgeCanvasProps) {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const leadRef = React.useRef<HTMLCanvasElement>(null)
  const dustRef = React.useRef<HTMLCanvasElement>(null)
  const stumpRef = React.useRef<HTMLDivElement>(null)
  const [generation, setGeneration] = React.useState(0)

  React.useEffect(() => {
    const host = hostRef.current
    const lead = leadRef.current
    const dustCanvas = dustRef.current
    const stump = stumpRef.current
    if (!host || !lead || !dustCanvas) return
    const ctx = lead.getContext("2d")
    const dctx = dustCanvas.getContext("2d")
    if (!ctx || !dctx) return

    const scratch = document.createElement("canvas")
    const rng = mulberry32(seed * 7919 + generation)
    const kin = createKinematics({ smoothing: 0.4, idleMs: 120 })
    const particles: DustParticle[] = []
    let dpr = 1
    let w = 0
    let h = 0
    let prev: Point | null = null
    let pressed = false
    let inside = false
    let touched = false
    let cancelled = false
    let raf = 0
    let lastT = 0
    let ink = readVar(host, "--graphite-ink", "#1f1e1c")

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      const rect = host.getBoundingClientRect()
      const nw = Math.max(1, Math.round(rect.width))
      const nh = Math.max(1, Math.round(rect.height))
      if (nw === w && nh === h) return false
      w = nw
      h = nh
      for (const c of [lead, dustCanvas]) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return true
    }
    const lay = () => {
      ink = readVar(host, "--graphite-ink", "#1f1e1c")
      ctx.save()
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      draw(ctx, w, h, mulberry32(seed), { ink, display: readVar(host, "--graphite-display", "sans-serif"), label })
      ctx.restore()
    }

    size()
    lay()
    // once web fonts land, re-lay (only if the visitor hasn't started smudging)
    document.fonts?.ready.then(() => {
      if (!cancelled && !touched) lay()
    })
    const ro = new ResizeObserver(() => {
      if (size()) lay()
    })
    ro.observe(host)

    const local = (e: PointerEvent): Point => {
      const r = host.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const moveStump = (p: Point) => {
      if (stump) stump.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`
    }
    const loop = (now: number) => {
      raf = 0
      const dt = Math.min(48, now - lastT)
      lastT = now
      kin.settle(now)
      dctx.clearRect(0, 0, w, h)
      if (particles.length) {
        stepDust(particles, dt)
        drawDust(dctx, particles, ink)
      }
      if (particles.length || inside) raf = requestAnimationFrame(loop)
    }
    const ensureLoop = () => {
      if (!raf) {
        lastT = performance.now()
        raf = requestAnimationFrame(loop)
      }
    }

    const onEnter = (e: PointerEvent) => {
      inside = true
      prev = local(e)
      moveStump(prev)
      ensureLoop()
    }
    const onLeave = () => {
      inside = false
      prev = null
    }
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      pressed = true
      touched = true
      prev = local(e)
      host.setPointerCapture?.(e.pointerId)
    }
    const onUp = () => {
      pressed = false
    }
    const onMove = (e: PointerEvent) => {
      touched = true
      const events = typeof e.getCoalescedEvents === "function" ? e.getCoalescedEvents() : []
      const list = events.length ? events : [e]
      for (const ev of list) {
        const p = local(ev)
        const state = kin.push({ x: ev.clientX, y: ev.clientY, t: ev.timeStamp || performance.now() })
        if (prev) {
          smearGraphite(ctx, prev, p, {
            radius: stumpRadius * (pressed ? 1 : 0.85),
            strength: pressed ? pressStrength : hoverStrength,
            dpr,
            scratch,
            rng,
          })
          if (dust && state.speed > 1.1) {
            particles.push(...spawnDust(p.x, p.y, state.vx, state.vy, Math.min(8, Math.round(state.speed * 3)), rng))
          }
        }
        prev = p
      }
      if (prev) moveStump(prev)
      ensureLoop()
    }

    host.addEventListener("pointerenter", onEnter)
    host.addEventListener("pointerleave", onLeave)
    host.addEventListener("pointerdown", onDown)
    host.addEventListener("pointerup", onUp)
    host.addEventListener("pointercancel", onUp)
    host.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      cancelled = true
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      host.removeEventListener("pointerenter", onEnter)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onDown)
      host.removeEventListener("pointerup", onUp)
      host.removeEventListener("pointercancel", onUp)
      host.removeEventListener("pointermove", onMove)
    }
  }, [seed, draw, stumpRadius, hoverStrength, pressStrength, dust, label, generation])

  return (
    <div
      ref={hostRef}
      className={cn("graphite-canvas-host", className)}
      style={{ ...style, "--graphite-stump-size": `${stumpRadius * 2}px` } as React.CSSProperties}
      {...props}
    >
      <canvas ref={leadRef} role="img" aria-label={label ? `${label}: a field of graphite you can smudge` : "a field of graphite you can smudge"} />
      <canvas ref={dustRef} aria-hidden="true" />
      <div ref={stumpRef} className="graphite-stump" aria-hidden="true" />
      <button type="button" className="graphite-button absolute bottom-3 right-3" onClick={() => setGeneration((g) => g + 1)}>
        {resetLabel}
      </button>
    </div>
  )
}
