import * as React from "react"
import { cn } from "@/lib/utils"

export type MarginaliaKind = "star" | "arrow" | "loop" | "underline" | "asterisk"

export interface GraphiteMarginaliaProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: MarginaliaKind
  /** handwritten note next to the doodle */
  note?: string
  /** degrees */
  rotate?: number
  /** doodle size in px (default 34) */
  size?: number
  /** hold the line still (default: boils) */
  still?: boolean
}

const DOODLES: Record<MarginaliaKind, React.ReactNode> = {
  star: (
    <>
      <path d="M20 4 L24 16 L37 16 L27 24 L31 37 L20 29 L9 37 L13 24 L3 16 L16 16 Z" />
      <path d="M20 6 L23.5 16.5 L35 16.5 L26 24 L29.5 35 L20 28 L10.5 35 L14 24 L5 16.5 L16.5 16.5 Z" opacity="0.45" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 30 C 10 10, 26 8, 34 18" />
      <path d="M28 12 L34 18 L27 22" />
    </>
  ),
  loop: <path d="M20 6 C 34 4, 38 18, 32 28 C 26 38, 8 36, 5 24 C 2 12, 12 6, 22 8 C 30 10, 36 20, 30 30" />,
  underline: (
    <>
      <path d="M2 22 C 12 18, 24 26, 38 20" />
      <path d="M4 26 C 14 23, 26 29, 36 25" opacity="0.5" />
    </>
  ),
  asterisk: (
    <>
      <path d="M20 5 L20 35" />
      <path d="M7 12 L33 28" />
      <path d="M33 12 L7 28" />
    </>
  ),
}

/**
 * Spontaneous margin notes: tiny stars, curly arrows, cheeky remarks. Position
 * it with className (absolute offsets); it never captures the pointer.
 */
export function GraphiteMarginalia({ kind = "star", note, rotate = 0, size = 34, still = false, className, style, ...props }: GraphiteMarginaliaProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("graphite-marginalia", still ? "graphite-rough" : "graphite-boil", className)}
      style={{ ...style, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      {...props}
    >
      <svg width={size} height={size} viewBox="0 0 40 40">
        {DOODLES[kind]}
      </svg>
      {note && <span>{note}</span>}
    </div>
  )
}
