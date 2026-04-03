"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BarChartDataPoint {
  label: string
  value: number
}

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarChartDataPoint[]
}

const BAR_COLOR = "oklch(0.205 0.042 265.755)"
const BAR_COLOR_HOVER = "oklch(0.205 0.042 265.755 / 0.8)"
const LABEL_COLOR = "oklch(0.556 0.022 277.117)"
const GRID_COLOR = "oklch(0.556 0.022 277.117 / 0.15)"

const PADDING = { top: 20, right: 10, bottom: 28, left: 45 }
const VIEWBOX_WIDTH = 600
const VIEWBOX_HEIGHT = 280

function formatAxisValue(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

function niceMax(value: number): number {
  if (value <= 0) return 1000
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)))
  const normalized = value / magnitude
  if (normalized <= 1) return magnitude
  if (normalized <= 2) return 2 * magnitude
  if (normalized <= 5) return 5 * magnitude
  return 10 * magnitude
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
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
    const maxVal = niceMax(Math.max(...data.map((d) => d.value)))

    const barWidth = (chartW / data.length) * 0.6
    const barGap = (chartW / data.length) * 0.4

    const yTicks = 6
    const yTickValues = Array.from({ length: yTicks }, (_, i) =>
      Math.round((maxVal / (yTicks - 1)) * i)
    )

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Bar chart showing monthly data"
        >
          {/* Grid lines */}
          {yTickValues.map((val, i) => {
            const y = PADDING.top + chartH - (val / maxVal) * chartH
            return (
              <line
                key={`grid-${i}`}
                x1={PADDING.left}
                y1={y}
                x2={PADDING.left + chartW}
                y2={y}
                stroke={GRID_COLOR}
                strokeWidth={0.5}
              />
            )
          })}

          {/* Y-axis labels */}
          {yTickValues.map((val, i) => {
            const y = PADDING.top + chartH - (val / maxVal) * chartH
            return (
              <text
                key={`y-${i}`}
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

          {/* Bars */}
          {data.map((d, i) => {
            const barH = (d.value / maxVal) * chartH
            const x =
              PADDING.left + i * (barWidth + barGap) + barGap / 2
            const y = PADDING.top + chartH - barH
            return (
              <g key={`bar-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx={3}
                  fill={BAR_COLOR}
                  className="transition-opacity hover:opacity-80"
                />
                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={PADDING.top + chartH + 16}
                  textAnchor="middle"
                  fontSize={9}
                  fill={LABEL_COLOR}
                  fontFamily="system-ui, sans-serif"
                >
                  {d.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }
)

BarChart.displayName = "BarChart"

export { BarChart }
export type { BarChartDataPoint, BarChartProps }
