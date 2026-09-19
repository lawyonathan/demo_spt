"use client"

import * as React from "react"
import { useReducedMotion } from "./use-reduced-motion"

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** 0→1 over `duration` ms after mount (instantly 1 under reduced motion, or when inactive). */
export function useMountProgress(active: boolean, duration = 1400): number {
  const reduced = useReducedMotion()
  const [p, setP] = React.useState(0)

  React.useEffect(() => {
    if (!active) return
    if (reduced) {
      setP(1)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration)
      setP(easeOutCubic(t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, duration, reduced])

  return active ? p : 1
}
