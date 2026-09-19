import * as React from "react"
import { cn } from "@/lib/utils"
import { GraphiteFilters } from "./graphite-filters"

export type GraphiteTone = "paper" | "slate"

export interface GraphitePaperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "paper" is warm archival cotton; "slate" is obsidian with chalk ink. Cross-fades when changed. */
  tone?: GraphiteTone
  /** faint drafting grid */
  grid?: boolean
  /** darkened corners */
  vignette?: boolean
  /** hand-ruled inner margin */
  deckle?: boolean
  /** render the shared SVG filter defs here (once per page; default true) */
  filters?: boolean
  /** 0..1 override for paper-tooth intensity */
  grain?: number
}

/**
 * The sheet everything else is drawn on. Provides the tone CSS variables
 * (--graphite-paper / --graphite-ink / …) that every other graphite
 * component reads, plus the grain, fibre, grid and vignette layers.
 */
export function GraphitePaper({
  tone = "paper",
  grid = false,
  vignette = true,
  deckle = false,
  filters = true,
  grain,
  className,
  style,
  children,
  ...props
}: GraphitePaperProps) {
  const vars = grain === undefined ? style : ({ ...style, "--graphite-grain-opacity": grain } as React.CSSProperties)
  return (
    <div data-graphite-tone={tone} className={cn("graphite-paper", className)} style={vars} {...props}>
      {filters && <GraphiteFilters />}
      <div aria-hidden="true" className="graphite-paper__layer graphite-paper__fibers" />
      <div aria-hidden="true" className="graphite-paper__layer graphite-paper__grain" />
      {grid && <div aria-hidden="true" className="graphite-paper__layer graphite-paper__grid" />}
      {vignette && <div aria-hidden="true" className="graphite-paper__layer graphite-paper__vignette" />}
      {deckle && <div aria-hidden="true" className="graphite-paper__deckle" />}
      {children}
    </div>
  )
}
