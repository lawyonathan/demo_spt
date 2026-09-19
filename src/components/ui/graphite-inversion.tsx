"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { charcoalSweep, createToothPattern, knockOutTooth, mulberry32, slicePolyline, smoothstep, stageWindow, sweepPath, useScrollProgress, type Point } from "@/lib/graphite"

export interface GraphiteInversionProps extends Omit<React.HTMLAttributes<HTMLElement>, "onProgress"> {
  /** scroll travel of the sequence (default "260vh") */
  height?: string
  seed?: number
  /** number of charcoal sweeps (default 9) */
  sweeps?: number
  /** 0..1 as the sweep progresses; flip the page tone to "slate" near the end */
  onProgress?: (progress: number) => void
  /** content on the paper, fades out as the first sweeps land */
  before?: React.ReactNode
  /** content on the slate, fades in once the sheet is sealed */
  children?: React.ReactNode
}

interface Sweep {
  from: Point
  to: Point
  bow: number
  width: number
  wobble: number
  start: number
  end: number
}

function planSweeps(n: number, seed: number): Sweep[] {
  const rng = mulberry32(seed)
  const out: Sweep[] = []
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const fromLeft = i % 2 === 0
    const y = 0.06 + 0.88 * t + (rng() - 0.5) * 0.08
    const start = (i / n) * 0.68
    out.push({
      from: { x: fromLeft ? -0.2 : 1.2, y },
      to: { x: fromLeft ? 1.2 : -0.2, y: y + (rng() - 0.5) * 0.35 },
      bow: (rng() - 0.5) * 0.5,
      width: 0.2 + rng() * 0.14,
      wobble: 0.01 + rng() * 0.015,
      start,
      end: Math.min(1, start + 0.34),
    })
  }
  return out
}

interface Fleck {
  x: number
  y: number
  s: number
  a: number
}

function planFlecks(seed: number, count = 520): Fleck[] {
  const rng = mulberry32(seed + 1)
  const out: Fleck[] = []
  for (let i = 0; i < count; i++) out.push({ x: rng(), y: rng(), s: 0.8 + rng() * 1.6, a: 0.15 + rng() * 0.6 })
  return out
}

/**
 * Halfway through, the atmosphere inverts: broad side-of-the-stick charcoal
 * sweeps smudge the warm paper into obsidian slate as you scroll. The tall
 * section pins a viewport-height stage; scroll position scrubs the sweeps.
 */
export function GraphiteInversion({ height = "260vh", seed = 3, sweeps = 9, onProgress, before, children, className, style, ...props }: GraphiteInversionProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { progress, progressRef } = useScrollProgress(sectionRef, { mode: "through", quantize: 0.01 })
  const plan = React.useMemo(() => planSweeps(sweeps, seed), [sweeps, seed])
  const flecks = React.useMemo(() => planFlecks(seed), [seed])

  React.useEffect(() => {
    onProgress?.(progress)
  }, [progress, onProgress])

  React.useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!section || !stage || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let lastDrawn = -1
    let visible = false
    let tooth: CanvasPattern | null = null

    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      const r = stage.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width))
      h = Math.max(1, Math.round(r.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      tooth = createToothPattern(ctx, seed + 77, dpr)
      lastDrawn = -1
    }

    const draw = () => {
      const p = progressRef.current
      if (p === lastDrawn) return
      lastDrawn = p
      const m = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = "multiply"
      plan.forEach((s, i) => {
        const local = stageWindow(p, s.start, s.end)
        if (local <= 0) return
        const rng = mulberry32(seed * 131 + i)
        const path = sweepPath({ x: s.from.x * w, y: s.from.y * h }, { x: s.to.x * w, y: s.to.y * h }, s.bow * m, 28, rng, s.wobble * m)
        charcoalSweep(ctx, slicePolyline(path, local), { width: s.width * m, rng })
      })
      // dry stick on toothy paper: punch the grain back out of the charcoal
      if (tooth) knockOutTooth(ctx, tooth, w, h, 0.5)
      ctx.globalCompositeOperation = "source-over"
      const seal = smoothstep(0.78, 0.98, p)
      if (seal > 0) {
        ctx.globalAlpha = seal
        ctx.fillStyle = "#0d0d0e"
        ctx.fillRect(0, 0, w, h)
        ctx.globalAlpha = 1
      }
      const chalk = smoothstep(0.88, 1, p)
      if (chalk > 0) {
        ctx.fillStyle = "#e8e4da"
        for (const f of flecks) {
          ctx.globalAlpha = chalk * f.a
          ctx.fillRect(f.x * w, f.y * h, f.s, f.s)
        }
        ctx.globalAlpha = 1
      }
    }

    const loop = () => {
      raf = visible ? requestAnimationFrame(loop) : 0
      draw()
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(loop)
    })
    const ro = new ResizeObserver(() => {
      size()
      draw()
    })

    size()
    draw()
    io.observe(section)
    ro.observe(stage)
    return () => {
      visible = false
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
    }
  }, [plan, flecks, seed, progressRef])

  const beforeOpacity = 1 - smoothstep(0.05, 0.4, progress)
  const afterOpacity = smoothstep(0.82, 0.98, progress)

  return (
    <section ref={sectionRef} className={cn("relative", className)} style={{ height, ...style }} {...props}>
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
        {before && (
          <div className="absolute inset-0" style={{ opacity: beforeOpacity, pointerEvents: beforeOpacity < 0.2 ? "none" : undefined }}>
            {before}
          </div>
        )}
        <div data-graphite-tone="slate" className="absolute inset-0" style={{ opacity: afterOpacity, pointerEvents: afterOpacity < 0.2 ? "none" : undefined }}>
          {children}
        </div>
      </div>
    </section>
  )
}
