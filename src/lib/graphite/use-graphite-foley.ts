"use client"

import * as React from "react"
import { createFoley, type GraphiteFoley } from "./foley"

export interface GraphiteFoleyState {
  /** false when the Web Audio API is unavailable */
  supported: boolean
  enabled: boolean
  toggle(): void
}

/**
 * Pencil-on-paper friction that follows both the pointer and the scroll
 * wheel. Audio only starts from a user gesture (the toggle), never on load.
 */
export function useGraphiteFoley(): GraphiteFoleyState {
  const foleyRef = React.useRef<GraphiteFoley | null>(null)
  const [enabled, setEnabled] = React.useState(false)
  const [supported, setSupported] = React.useState(true)

  React.useEffect(() => {
    setSupported(typeof window !== "undefined" && !!(window.AudioContext || (window as Window & { webkitAudioContext?: unknown }).webkitAudioContext))
  }, [])

  React.useEffect(() => {
    if (!enabled) return
    const foley = createFoley()
    if (!foley) {
      setSupported(false)
      setEnabled(false)
      return
    }
    foleyRef.current = foley
    void foley.start()

    let raf = 0
    let pointerV = 0
    let scrollV = 0
    let lastX = 0
    let lastY = 0
    let lastT = 0
    let lastScrollY = window.scrollY
    let lastScrollT = performance.now()

    const onMove = (e: PointerEvent) => {
      const t = e.timeStamp || performance.now()
      if (lastT) {
        const dt = Math.max(1, t - lastT)
        pointerV = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt
      }
      lastX = e.clientX
      lastY = e.clientY
      lastT = t
    }
    const onScroll = () => {
      const t = performance.now()
      const dt = Math.max(1, t - lastScrollT)
      scrollV = Math.abs(window.scrollY - lastScrollY) / dt
      lastScrollY = window.scrollY
      lastScrollT = t
    }
    const onDown = () => foley.tap()
    const loop = () => {
      raf = requestAnimationFrame(loop)
      // scrolling is a deliberate stroke; the wheel moves fewer px/ms than a hand
      foley.setVelocity(Math.max(pointerV, scrollV * 1.6))
      pointerV *= 0.86
      scrollV *= 0.86
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("scroll", onScroll)
      foley.stop()
      foleyRef.current = null
    }
  }, [enabled])

  const toggle = React.useCallback(() => setEnabled((v) => !v), [])
  return { supported, enabled, toggle }
}
