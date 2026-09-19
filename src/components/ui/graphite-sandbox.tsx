"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { createKinematics, eraseGraphite, mulberry32, smearGraphite, strokeGraphite, type Point } from "@/lib/graphite"

export interface GraphiteSandboxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** px (default 440) */
  height?: number
  /** handwritten hint shown until the first mark */
  hint?: string
  seed?: number
}

interface LeadTool {
  id: string
  label: string
  radius: number
  density: number
  opacity: number
}

const LEADS: LeadTool[] = [
  { id: "2H", label: "2H", radius: 1.4, density: 0.4, opacity: 0.22 },
  { id: "HB", label: "HB", radius: 2, density: 0.6, opacity: 0.38 },
  { id: "4B", label: "4B", radius: 2.8, density: 0.85, opacity: 0.55 },
  { id: "8B", label: "8B", radius: 3.6, density: 1, opacity: 0.75 },
  { id: "charcoal", label: "Charcoal", radius: 9, density: 0.9, opacity: 0.45 },
]
type ToolId = LeadTool["id"] | "stump" | "eraser"

function readVar(el: HTMLElement, name: string, fallback: string) {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback
}

/**
 * A sheet to draw on with calibrated leads. Velocity is pressure: a slow
 * hand lays a wide, dark line; a flick barely marks. Lateral speed rolls the
 * lead over and widens the stroke. The stump and eraser reuse the smudge
 * physics from the kit.
 */
export function GraphiteSandbox({ height = 440, hint = "draw here", seed = 5, className, style, ...props }: GraphiteSandboxProps) {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = React.useState<ToolId>("4B")
  const [touched, setTouched] = React.useState(false)
  const [clearCount, setClearCount] = React.useState(0)
  const toolRef = React.useRef<ToolId>(tool)

  React.useEffect(() => {
    toolRef.current = tool
  }, [tool])

  React.useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scratch = document.createElement("canvas")
    const rng = mulberry32(seed + clearCount)
    const kin = createKinematics({ smoothing: 0.45, idleMs: 100 })
    let dpr = 1
    let w = 0
    let h = 0
    let prev: Point | null = null
    let pressed = false
    let ink = readVar(host, "--graphite-ink", "#1f1e1c")

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = host.getBoundingClientRect()
      const nw = Math.max(1, Math.round(r.width))
      const nh = Math.max(1, Math.round(r.height))
      if (nw === w && nh === h) return
      // keep the drawing across resizes
      const keep = document.createElement("canvas")
      keep.width = canvas.width
      keep.height = canvas.height
      keep.getContext("2d")?.drawImage(canvas, 0, 0)
      w = nw
      h = nh
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (keep.width && keep.height) ctx.drawImage(keep, 0, 0, keep.width / dpr, keep.height / dpr)
    }
    size()
    ctx.clearRect(0, 0, w, h)
    const ro = new ResizeObserver(size)
    ro.observe(host)

    const local = (e: PointerEvent): Point => {
      const r = host.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const apply = (from: Point, to: Point) => {
      const state = kin.state
      const id = toolRef.current
      if (id === "stump") {
        smearGraphite(ctx, from, to, { radius: 18, strength: 0.5, dpr, scratch, rng })
        return
      }
      if (id === "eraser") {
        eraseGraphite(ctx, to.x, to.y, 16, 0.55)
        return
      }
      const lead = LEADS.find((l) => l.id === id) ?? LEADS[2]
      const press = 0.75 + state.friction * 0.55
      const tiltWiden = 1 + (Math.abs(state.tilt) / 26) * 0.6
      strokeGraphite(ctx, from, to, {
        radius: lead.radius * press * tiltWiden,
        density: lead.density,
        opacity: lead.opacity * (0.55 + state.friction * 0.6),
        color: ink,
        rng,
      })
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      pressed = true
      ink = readVar(host, "--graphite-ink", "#1f1e1c")
      kin.reset()
      kin.push({ x: e.clientX, y: e.clientY, t: e.timeStamp || performance.now() })
      prev = local(e)
      apply(prev, prev)
      host.setPointerCapture?.(e.pointerId)
      setTouched(true)
    }
    const onMove = (e: PointerEvent) => {
      if (!pressed || !prev) return
      const events = typeof e.getCoalescedEvents === "function" ? e.getCoalescedEvents() : []
      const list = events.length ? events : [e]
      for (const ev of list) {
        kin.push({ x: ev.clientX, y: ev.clientY, t: ev.timeStamp || performance.now() })
        const p = local(ev)
        apply(prev, p)
        prev = p
      }
    }
    const onUp = () => {
      pressed = false
      prev = null
    }

    host.addEventListener("pointerdown", onDown)
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerup", onUp)
    host.addEventListener("pointercancel", onUp)
    return () => {
      ro.disconnect()
      host.removeEventListener("pointerdown", onDown)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerup", onUp)
      host.removeEventListener("pointercancel", onUp)
    }
  }, [seed, clearCount])

  const clear = () => {
    setClearCount((c) => c + 1)
    setTouched(false)
  }

  const save = () => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const out = document.createElement("canvas")
    out.width = canvas.width
    out.height = canvas.height
    const octx = out.getContext("2d")
    if (!octx) return
    octx.fillStyle = readVar(host, "--graphite-paper", "#f5f2eb")
    octx.fillRect(0, 0, out.width, out.height)
    octx.drawImage(canvas, 0, 0)
    const a = document.createElement("a")
    a.href = out.toDataURL("image/png")
    a.download = "graphite-study.png"
    a.click()
  }

  return (
    <div className={cn("space-y-3", className)} style={style} {...props}>
      <div className="flex flex-wrap items-center gap-2">
        {LEADS.map((l) => (
          <button key={l.id} type="button" className="graphite-button" aria-pressed={tool === l.id} onClick={() => setTool(l.id as ToolId)}>
            {l.label}
          </button>
        ))}
        <button type="button" className="graphite-button" aria-pressed={tool === "stump"} onClick={() => setTool("stump")}>
          Stump
        </button>
        <button type="button" className="graphite-button" aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")}>
          Eraser
        </button>
        <span className="flex-1" />
        <button type="button" className="graphite-button" onClick={clear}>
          Clear
        </button>
        <button type="button" className="graphite-button" onClick={save}>
          Save PNG
        </button>
      </div>
      <div
        ref={hostRef}
        className="graphite-canvas-host graphite-hairline"
        style={{ height, cursor: "crosshair", touchAction: "none" }}
      >
        <canvas ref={canvasRef} role="img" aria-label="drawing sheet" />
        {!touched && hint && (
          <span aria-hidden="true" className="graphite-script pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl opacity-50">
            {hint}
          </span>
        )}
      </div>
    </div>
  )
}
