"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { stageWindow, useMountProgress, useScrollProgress } from "@/lib/graphite"

export interface GraphiteHeadingProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  children: string
  /**
   * "scroll": tone is deposited as the heading rises into view.
   * "mount": deposited once, right after mount.
   * "none": driven by `progress`.
   */
  reveal?: "scroll" | "mount" | "none"
  /** 0..1 when reveal="none" */
  progress?: number
  /** ms for the mount reveal (default 1400) */
  duration?: number
  /** hatch angle in degrees (default -38) */
  hatchAngle?: number
}

/**
 * Display type that is drawn, not typeset: a wobbly contour first, then a
 * quick hatch, then the flat side of the lead rubbed across it (the
 * graphite-rub filter eats paper-tooth holes out of the fill).
 */
export function GraphiteHeading({
  as = "h2",
  children,
  reveal = "scroll",
  progress,
  duration = 1400,
  hatchAngle = -38,
  className,
  style,
  ...props
}: GraphiteHeadingProps) {
  const Tag = as as React.ElementType
  const ref = React.useRef<HTMLElement>(null)
  const { progress: scrollP } = useScrollProgress(ref, { mode: "enter", span: 0.5, once: true })
  const mountP = useMountProgress(reveal === "mount", duration)

  const p = reveal === "scroll" ? scrollP : reveal === "mount" ? mountP : (progress ?? 1)
  const vars = {
    ...style,
    "--graphite-contour": stageWindow(p, 0, 0.35),
    "--graphite-hatch": stageWindow(p, 0.28, 0.7),
    "--graphite-tone": stageWindow(p, 0.55, 1),
    "--graphite-hatch-angle": `${hatchAngle}deg`,
  } as React.CSSProperties

  return (
    <Tag ref={ref} className={cn("graphite-heading", className)} style={vars} {...props}>
      <span className="graphite-heading__tone">{children}</span>
      <span className="graphite-heading__hatch" aria-hidden="true">
        {children}
      </span>
      <span className="graphite-heading__contour" aria-hidden="true">
        {children}
      </span>
    </Tag>
  )
}
