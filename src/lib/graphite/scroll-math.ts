import { clamp } from "./math"

/**
 * 0 when the element's top is `offset` viewport-heights above the bottom edge,
 * 1 once it has travelled a further `span` viewport-heights upward.
 */
export function enterProgress(top: number, viewportHeight: number, span = 0.55, offset = 0.05): number {
  if (viewportHeight <= 0) return 1
  const start = viewportHeight * (1 - offset)
  return clamp((start - top) / (viewportHeight * span), 0, 1)
}

/**
 * For a tall section with a sticky viewport-height child: 0 when the section
 * top reaches the viewport top, 1 when its bottom reaches the viewport bottom.
 */
export function throughProgress(top: number, height: number, viewportHeight: number): number {
  const travel = height - viewportHeight
  if (travel <= 0) return top <= 0 ? 1 : 0
  return clamp(-top / travel, 0, 1)
}
