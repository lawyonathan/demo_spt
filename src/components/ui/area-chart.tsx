"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AreaChartDataPoint {
  label: string
  revenue: number
  visits: number
}

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: AreaChartDataPoint[]
}

const PADDING = { top: 40, right: 20, bottom: 30, left: 55 }
const VIEWBOX_WIDTH = 600
const VIEWBOX_HEIGHT = 300

const REVENUE_STROKE = "oklch(0.623 0.214 259.815)"
const REVENUE_FILL = "oklch(0.623 0.214 259.815 / 0.15)"
const VISITS_STROKE = "oklch(0.556 0.022 277.117)"
const VISITS_FILL = "oklch(0.556 0.022 277.117 / 0.1)"
const GRID_COLOR = "oklch(0.556 0.022 277.117 / 0.2)"
const LABEL_COLOR = "oklch(0.556 0.022 277.117)"

function niceMax(value: number): number {
  if (value <= 0) return 10
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)))
  const normalized = value / magnitude
  if (normalized <= 1) return magnitude
  if (normalized <= 2) return 2 * magnitude
  if (normalized <= 5) return 5 * magnitude
  return 10 * magnitude
}

function formatAxisValue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return value.toString()
}

/**
 * Convert data points to a smooth SVG path using quadratic bezier curves.
 * Returns the line path string (no fill closure).
 */
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`

  let d = `M ${points[0].x},${points[0].y}`

  if (points.length === 2) {
    d += ` L ${points[1].x},${points[1].y}`
    return d
  }

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpX = (prev.x + curr.x) / 2
    d += ` Q ${prev.x},${prev.y} ${cpX},${(prev.y + curr.y) / 2}`
  }

  // Final segment to last point
  const last = points[points.length - 1]
  d += ` T ${last.x},${last.y}`

  return d
}

function areaPath(
  points: { x: number; y: number }[],
  baseY: number
): string {
  if (points.length === 0) return ""
  const line = smoothPath(points)
  const first = points[0]
  const last = points[points.length - 1]
  return `${line} L ${last.x},${baseY} L ${first.x},${baseY} Z`
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  ({ data, className, ...props }, ref) => {
    if (!data || data.length === 0) {
      return (
        <div ref={ref} className={cn("w-full", className)} {...props}>
          <p className="text-muted-foreground text-sm text-center py-8">
            No data available
          </p>
        </div>
      )
    }

    const chartW = VIEWBOX_WIDTH - PADDING.left - PADDING.right
    const chartH = VIEWBOX_HEIGHT - PADDING.top - PADDING.bottom

    const maxRevenue = niceMax(Math.max(...data.map((d) => d.revenue)))
    const maxVisits = niceMax(Math.max(...data.map((d) => d.visits)))

    const revenuePoints = data.map((d, i) => ({
      x: PADDING.left + (i / (data.length - 1)) * chartW,
      y: PADDING.top + chartH - (d.revenue / maxRevenue) * chartH,
    }))

    const visitsPoints = data.map((d, i) => ({
      x: PADDING.left + (i / (data.length - 1)) * chartW,
      y: PADDING.top + chartH - (d.visits / maxVisits) * chartH,
    }))

    const baseY = PADDING.top + chartH

    // Y-axis ticks (5 ticks for revenue on left)
    const yTicks = 5
    const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) =>
      Math.round((maxRevenue / yTicks) * i)
    )

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Area chart showing Revenue and Visits over time"
        >
          {/* Legend */}
          <g transform={`translate(${PADDING.left}, 16)`}>
            <circle cx={0} cy={0} r={4} fill={REVENUE_STROKE} />
            <text
              x={10}
              y={4}
              fontSize={11}
              fill={LABEL_COLOR}
              fontFamily="system-ui, sans-serif"
            >
              Revenue
            </text>
            <circle cx={80} cy={0} r={4} fill={VISITS_STROKE} />
            <text
              x={90}
              y={4}
              fontSize={11}
              fill={LABEL_COLOR}
              fontFamily="system-ui, sans-serif"
            >
              Visits
            </text>
          </g>

          {/* Grid lines */}
          {yTickValues.map((val, i) => {
            const y = PADDING.top + chartH - (val / maxRevenue) * chartH
            return (
              <line
                key={`grid-${i}`}
                x1={PADDING.left}
                y1={y}
                x2={PADDING.left + chartW}
                y2={y}
                stroke={GRID_COLOR}
                strokeDasharray="4 4"
                strokeWidth={0.5}
              />
            )
          })}

          {/* Y-axis labels */}
          {yTickValues.map((val, i) => {
            const y = PADDING.top + chartH - (val / maxRevenue) * chartH
            return (
              <text
                key={`y-label-${i}`}
                x={PADDING.left - 8}
                y={y + 3}
                textAnchor="end"
                fontSize={9}
                fill={LABEL_COLOR}
                fontFamily="system-ui, sans-serif"
              >
                {formatAxisValue(val)}
              </text>
            )
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = PADDING.left + (i / (data.length - 1)) * chartW
            // Skip some labels if too many data points
            const skipInterval = data.length > 12 ? Math.ceil(data.length / 8) : 1
            if (i % skipInterval !== 0 && i !== data.length - 1) return null
            return (
              <text
                key={`x-label-${i}`}
                x={x}
                y={baseY + 16}
                textAnchor="middle"
                fontSize={9}
                fill={LABEL_COLOR}
                fontFamily="system-ui, sans-serif"
              >
                {d.label}
              </text>
            )
          })}

          {/* Visits area (behind revenue) */}
          <path d={areaPath(visitsPoints, baseY)} fill={VISITS_FILL} />
          <path
            d={smoothPath(visitsPoints)}
            fill="none"
            stroke={VISITS_STROKE}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Revenue area (in front) */}
          <path d={areaPath(revenuePoints, baseY)} fill={REVENUE_FILL} />
          <path
            d={smoothPath(revenuePoints)}
            fill="none"
            stroke={REVENUE_STROKE}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
)

AreaChart.displayName = "AreaChart"

export { AreaChart }
export type { AreaChartDataPoint, AreaChartProps }
