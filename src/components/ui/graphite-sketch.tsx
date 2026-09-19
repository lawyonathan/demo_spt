"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { clamp, hatchLines, mulberry32, stageWindow, useMountProgress, useScrollProgress, type Point, type Rect } from "@/lib/graphite"

export interface SketchShape {
  /** SVG path data in viewBox units */
  d: string
  /** degrees (default -35) */
  hatchAngle?: number
  /** viewBox units between hatch lines (default 4) */
  hatchSpacing?: number
  /** 0..1 darkness of the final flat tone; 0 keeps it a contour (default 0.4) */
  tone?: number
  /** lay a second, crossing hatch as the tone arrives (default: when tone >= 0.5) */
  crossHatch?: boolean
  strokeWidth?: number
}

export interface SketchStage {
  contour: number
  hatch: number
  tone: number
}

export interface GraphiteSketchProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children"> {
  shapes: SketchShape[]
  viewBox?: string
  /** "scroll" scrubs the drawing with scroll position; "mount" draws once; "none" uses `progress` */
  reveal?: "scroll" | "mount" | "none"
  progress?: number
  duration?: number
  seed?: number
  /** boiling line instead of a still wobble */
  boil?: boolean
  onStage?: (stage: SketchStage) => void
}

/** A classic tonal study: sphere, core shadow, cast shadow, ground line. */
export const SPHERE_STUDY: SketchShape[] = [
  { d: "M 24 168 C 90 165 220 171 296 167", tone: 0, strokeWidth: 1.1 },
  { d: "M 94 170 a 78 14 0 1 0 156 0 a 78 14 0 1 0 -156 0 Z", hatchAngle: 8, hatchSpacing: 3.2, tone: 0.5, strokeWidth: 1 },
  { d: "M 98 100 a 62 62 0 1 0 124 0 a 62 62 0 1 0 -124 0 Z", hatchAngle: -40, hatchSpacing: 4.6, tone: 0.28 },
  { d: "M 218 79 A 62 62 0 0 1 149 161 C 170 150 205 118 218 79 Z", hatchAngle: -40, hatchSpacing: 2.6, tone: 0.75, crossHatch: true, strokeWidth: 0.9 },
]

type Segment = [Point, Point]

/**
 * Tone is deposited, not drawn: each shape arrives as a light contour, then a
 * hatch laid line by line, then the flat side of the lead. Every pass is a
 * real SVG stroke with a displacement filter, so the lines wobble like a hand.
 */
export function GraphiteSketch({
  shapes,
  viewBox = "0 0 320 220",
  reveal = "scroll",
  progress,
  duration = 2400,
  seed = 11,
  boil = false,
  onStage,
  className,
  style,
  ...props
}: GraphiteSketchProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const svgRef = React.useRef<SVGSVGElement>(null)
  const pathRefs = React.useRef<Array<SVGPathElement | null>>([])
  const [boxes, setBoxes] = React.useState<Array<Rect | null>>([])
  const { progress: scrollP } = useScrollProgress(svgRef, { mode: "enter", span: 0.75, offset: 0.1, once: true })
  const mountP = useMountProgress(reveal === "mount", duration)

  React.useLayoutEffect(() => {
    setBoxes(
      shapes.map((_, i) => {
        const el = pathRefs.current[i]
        if (!el || typeof el.getBBox !== "function") return null
        const b = el.getBBox()
        return { x: b.x, y: b.y, w: b.width, h: b.height }
      })
    )
  }, [shapes])

  const hatch = React.useMemo(() => {
    const rng = mulberry32(seed)
    return shapes.map((s, i): { lines: Segment[]; cross: Segment[] } => {
      const box = boxes[i]
      const tone = s.tone ?? 0.4
      if (!box || tone <= 0 || box.w === 0 || box.h === 0) return { lines: [], cross: [] }
      const angle = s.hatchAngle ?? -35
      const diag = Math.hypot(box.w, box.h)
      const spacing = Math.max(s.hatchSpacing ?? 4, diag / 90)
      const lines = hatchLines(box, angle, spacing, rng, spacing * 0.25)
      const cross = (s.crossHatch ?? tone >= 0.5) ? hatchLines(box, angle + 62, spacing * 1.35, rng, spacing * 0.25) : []
      return { lines, cross }
    })
  }, [shapes, boxes, seed])

  const p = reveal === "scroll" ? scrollP : reveal === "mount" ? mountP : (progress ?? 1)
  const contour = stageWindow(p, 0, 0.4)
  const hatchP = stageWindow(p, 0.32, 0.75)
  const tone = stageWindow(p, 0.6, 1)

  React.useEffect(() => {
    onStage?.({ contour, hatch: hatchP, tone })
  }, [contour, hatchP, tone, onStage])

  const filterClass = boil ? "graphite-boil" : "graphite-rough"

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      className={cn("graphite-sketch", className)}
      style={{ color: "var(--graphite-ink)", overflow: "visible", ...style }}
      {...props}
    >
      {shapes.map((s, i) => {
        const sw = s.strokeWidth ?? 1.4
        const toneMax = s.tone ?? 0.4
        const { lines, cross } = hatch[i] ?? { lines: [], cross: [] }
        const clipId = `${uid}-clip-${i}`
        return (
          <g key={i}>
            <clipPath id={clipId}>
              <path d={s.d} />
            </clipPath>
            {toneMax > 0 && tone > 0 && <path d={s.d} fill="currentColor" opacity={toneMax * tone} className="graphite-rub" />}
            {lines.length > 0 && (
              <g clipPath={`url(#${clipId})`} fill="none" stroke="currentColor" strokeWidth={sw * 0.7} strokeLinecap="round" className={filterClass}>
                {lines.map((l, j) => {
                  const local = clamp(hatchP * (lines.length + 2) - j, 0, 1)
                  if (local <= 0) return null
                  return <line key={`h${j}`} x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - local} opacity={0.75} />
                })}
                {cross.map((l, j) => {
                  const local = clamp(tone * (cross.length + 2) - j, 0, 1)
                  if (local <= 0) return null
                  return <line key={`x${j}`} x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - local} opacity={0.55} />
                })}
              </g>
            )}
            {/* construction pass: a lighter first attempt, slightly off */}
            <path
              d={s.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={sw * 0.55}
              opacity={0.4}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - clamp(contour * 1.2, 0, 1)}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(1.4 -1)"
              className={filterClass}
            />
            {/* committed line */}
            <path
              ref={(el) => {
                pathRefs.current[i] = el
              }}
              d={s.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={sw}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - contour}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={filterClass}
            />
          </g>
        )
      })}
    </svg>
  )
}
