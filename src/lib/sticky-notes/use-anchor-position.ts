"use client"

import * as React from "react"
import type { NoteAnchor } from "./types"
import { resolveAnchor } from "./selector"

export type AnchorPosition = {
  /** note top-left, viewport coordinates */
  x: number
  y: number
  /** true when the selector no longer resolves and fallback coords are used */
  detached: boolean
  /** anchor element center, viewport coordinates (0,0 when detached) */
  anchorX: number
  anchorY: number
}

export function computeAnchorPosition(
  anchor: NoteAnchor,
  doc: Document,
  win: Window
): AnchorPosition {
  const el = resolveAnchor(anchor, doc)
  if (!el) {
    return {
      x: anchor.fallbackX - win.scrollX,
      y: anchor.fallbackY - win.scrollY,
      detached: true,
      anchorX: 0,
      anchorY: 0,
    }
  }
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + anchor.offsetX,
    y: rect.top + anchor.offsetY,
    detached: false,
    anchorX: rect.left + rect.width / 2,
    anchorY: rect.top + rect.height / 2,
  }
}

export function useAnchorPosition(anchor: NoteAnchor): AnchorPosition {
  const [pos, setPos] = React.useState<AnchorPosition>(() => ({
    x: anchor.fallbackX,
    y: anchor.fallbackY,
    detached: false,
    anchorX: 0,
    anchorY: 0,
  }))

  React.useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setPos((prev) => {
        const next = computeAnchorPosition(anchor, document, window)
        return prev.x === next.x &&
          prev.y === next.y &&
          prev.detached === next.detached &&
          prev.anchorX === next.anchorX &&
          prev.anchorY === next.anchorY
          ? prev
          : next
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    // capture: true so scrolls inside nested scroll containers are seen too
    window.addEventListener("scroll", schedule, { capture: true, passive: true })
    window.addEventListener("resize", schedule)

    const el = resolveAnchor(anchor, document)
    let ro: ResizeObserver | null = null
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule)
      ro.observe(el)
    }
    // safety net for re-renders / layout changes not caught by the observers
    const interval = window.setInterval(schedule, 1000)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", schedule, true)
      window.removeEventListener("resize", schedule)
      ro?.disconnect()
      window.clearInterval(interval)
    }
  }, [anchor])

  return pos
}
