"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SparklineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[]
  variant?: "line" | "bar"
  color?: string
  fillColor?: string
  width?: number
  height?: number
  strokeWidth?: number
  barGap?: number
}

function smoothSparklinePath(points: { x: number; y: number }[]): string {
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

const SparklineChart = React.forwardRef<HTMLDivElement, SparklineChartProps>(
  (
    {
      data,
      variant = "line",
      color = "#10b981",
      fillColor,
      width = 80,
      height = 32,
      strokeWidth = 1.5,
      barGap = 1,
      className,
      ...props
    },
    ref
  ) => {
    if (!data || data.length === 0) return null

    const padding = 2
    const chartW = width - padding * 2
    const chartH = height - padding * 2
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    if (variant === "bar") {
      const barCount = data.length
      const totalGaps = (barCount - 1) * barGap
      const barWidth = Math.max(1, (chartW - totalGaps) / barCount)

      return (
        <div ref={ref} className={cn("inline-flex", className)} {...props}>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {data.map((val, i) => {
              const barHeight = Math.max(1, ((val - min) / range) * chartH)
              const x = padding + i * (barWidth + barGap)
              const y = padding + chartH - barHeight
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={1}
                  fill={color}
                  opacity={0.7 + (val - min) / range * 0.3}
                />
              )
            })}
          </svg>
        </div>
      )
    }

    // Line variant
    const points = data.map((val, i) => ({
      x: padding + (i / (data.length - 1)) * chartW,
      y: padding + chartH - ((val - min) / range) * chartH,
    }))

    const linePath = smoothSparklinePath(points)
    const fill = fillColor || color
    const areaPath = `${linePath} L ${points[points.length - 1].x},${padding + chartH} L ${points[0].x},${padding + chartH} Z`

    return (
      <div ref={ref} className={cn("inline-flex", className)} {...props}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={`sparkline-grad-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity="0.3" />
              <stop offset="100%" stopColor={fill} stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill={`url(#sparkline-grad-${color.replace(/[^a-z0-9]/gi, "")})`}
          />
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
)

SparklineChart.displayName = "SparklineChart"

export { SparklineChart }
export type { SparklineChartProps }
