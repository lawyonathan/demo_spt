import type { RefObject } from "react"

function normalizeHit(hit: Element | null): Element {
  // documentElement means the point missed all page content; body is the
  // anchor of last resort and always resolves.
  return hit && hit !== document.documentElement ? hit : document.body
}

/**
 * The element the user actually pointed at, seen past the notes overlay.
 * The overlay covers the viewport, so it is hidden for the duration of the
 * hit test and then restored to whatever inline display value it had.
 */
export function elementUnderPoint(
  overlayRef: RefObject<HTMLDivElement | null>,
  clientX: number,
  clientY: number
): Element {
  const overlay = overlayRef.current
  if (!overlay) return normalizeHit(document.elementFromPoint(clientX, clientY))

  const priorDisplay = overlay.style.display
  overlay.style.display = "none"
  const hit = document.elementFromPoint(clientX, clientY)
  overlay.style.display = priorDisplay
  return normalizeHit(hit)
}
