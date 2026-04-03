"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PortfolioChartDataPoint {
  label: string
  value: number
}

interface PortfolioChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PortfolioChartDataPoint[]
  lineColor?: string
  fillColor?: string
}

const PADDING = { top: 20, right: 15, bottom: 30, left: 50 }
const VIEWBOX_WIDTH = 560
const VIEWBOX_HEIGHT = 220

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`

  let d = `M ${points[0].x},${points[0].y}`

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpX = (prev.x + curr.x) / 2
    d += ` Q ${prev.x},${prev.y} ${cpX},${(prev.y + curr.y) / 2}`
  }

  const last = points[points.length - 1]
  d += ` T ${last.x},${last.y}`
  return d
}

const GRID_COLOR = "oklch(0.556 0.022 277.117 / 0.15)"
const LABEL_COLOR = "oklch(0.556 0.022 277.117)"

const PortfolioChart = React.forwardRef<HTMLDivElement, PortfolioChartProps>(
  (
    {
      data,
      lineColor = "#10b981",
      fillColor,
      className,
      ...props
    },
    ref
  ) => {
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

    const maxVal = Math.max(...data.map((d) => d.value))
    const minVal = Math.min(...data.map((d) => d.value))
    const range = maxVal - minVal || 1
    const paddedMin = minVal - range * 0.1
    const paddedMax = maxVal + range * 0.1
    const paddedRange = paddedMax - paddedMin

    const points = data.map((d, i) => ({
      x: PADDING.left + (i / (data.length - 1)) * chartW,
      y: PADDING.top + chartH - ((d.value - paddedMin) / paddedRange) * chartH,
    }))

    const baseY = PADDING.top + chartH
    const linePath = smoothPath(points)
    const first = points[0]
    const last = points[points.length - 1]
    const areaPathStr = `${linePath} L ${last.x},${baseY} L ${first.x},${baseY} Z`

    // Y-axis ticks
    const yTickCount = 4
    const niceMin = Math.floor(paddedMin / 100) * 100
    const niceMax2 = Math.ceil(paddedMax / 100) * 100
    const niceRange = niceMax2 - niceMin
    const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
      niceMin + (niceRange / yTickCount) * i
    )

    function formatVal(v: number): string {
      if (v >= 1000) return `${(v / 1000).toFixed(1)}k`
      return v.toFixed(0)
    }

    const gradientId = "portfolio-gradient"

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Portfolio value chart"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillColor || lineColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={fillColor || lineColor} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((val, i) => {
            const y = PADDING.top + chartH - ((val - paddedMin) / paddedRange) * chartH
            if (y < PADDING.top || y > baseY) return null
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
          {yTicks.map((val, i) => {
            const y = PADDING.top + chartH - ((val - paddedMin) / paddedRange) * chartH
            if (y < PADDING.top - 5 || y > baseY + 5) return null
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
                {formatVal(val)}
              </text>
            )
          })}

          {/* X-axis labels */}
          {data.map((d, i) => {
            const x = PADDING.left + (i / (data.length - 1)) * chartW
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

          {/* Area fill */}
          <path d={areaPathStr} fill={`url(#${gradientId})`} />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* End dot */}
          <circle
            cx={last.x}
            cy={last.y}
            r={3}
            fill="white"
            stroke={lineColor}
            strokeWidth={2}
          />
        </svg>
      </div>
    )
  }
)

PortfolioChart.displayName = "PortfolioChart"

export { PortfolioChart }
export type { PortfolioChartDataPoint, PortfolioChartProps }
