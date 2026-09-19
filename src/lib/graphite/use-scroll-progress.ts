"use client"

import * as React from "react"
import { enterProgress, throughProgress } from "./scroll-math"

export type ScrollProgressMode = "enter" | "through"

export interface ScrollProgressOptions {
  /**
   * "enter": 0..1 as the element rises through the lower part of the viewport
   * (reveal-on-scroll). "through": 0..1 as a tall section scrolls past a
   * sticky, viewport-height child (scroll-scrubbed sequences).
   */
  mode?: ScrollProgressMode
  /** enter mode: viewport-heights of travel from 0 to 1 (default 0.55) */
  span?: number
  /** enter mode: viewport-heights above the bottom edge where progress starts (default 0.05) */
  offset?: number
  /** state updates are quantised to this step to limit re-renders (default 0.005) */
  quantize?: number
  /** stop tracking once progress reaches 1 (enter mode reveals) */
  once?: boolean
}

export interface ScrollProgress {
  progress: number
  /** always current, never triggers a render: read it inside rAF loops */
  progressRef: React.RefObject<number>
}

export function useScrollProgress<T extends Element>(
  ref: React.RefObject<T | null>,
  { mode = "enter", span = 0.55, offset = 0.05, quantize = 0.005, once = false }: ScrollProgressOptions = {}
): ScrollProgress {
  const [progress, setProgress] = React.useState(0)
  const progressRef = React.useRef(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let done = false

    const measure = () => {
      raf = 0
      if (done) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = mode === "through" ? throughProgress(rect.top, rect.height, vh) : enterProgress(rect.top, vh, span, offset)
      progressRef.current = p
      const q = Math.round(p / quantize) * quantize
      setProgress((prev) => (Math.abs(prev - q) < quantize / 2 ? prev : q))
      if (once && p >= 1) {
        done = true
        detach()
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    const detach = () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    measure()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      detach()
    }
  }, [ref, mode, span, offset, quantize, once])

  return { progress, progressRef }
}
