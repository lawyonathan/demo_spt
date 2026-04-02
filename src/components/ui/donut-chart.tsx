"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DonutChartDataItem {
  label: string
  value: number
  color: string
}

interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutChartDataItem[]
  size?: number
  strokeWidth?: number
  showLegend?: boolean
  centerLabel?: string
  centerValue?: string
}

const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      size = 200,
      strokeWidth = 30,
      showLegend = true,
      centerLabel,
      centerValue,
      className,
      ...props
    },
    ref
  ) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const center = size / 2
    const gapDegrees = 2
    const gapFraction = gapDegrees / 360
    const totalGap = gapFraction * data.length
    const availableFraction = Math.max(0, 1 - totalGap)

    let cumulativeOffset = 0

    const segments = data.map((item) => {
      const fraction = total > 0 ? (item.value / total) * availableFraction : 0
      const dashLength = fraction * circumference
      const dashGap = circumference - dashLength
      const rotation = cumulativeOffset * 360 - 90
      cumulativeOffset += fraction + gapFraction

      return {
        ...item,
        fraction,
        dashArray: `${dashLength} ${dashGap}`,
        rotation,
        percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : "0",
      }
    })

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-auto"
          style={{ maxWidth: size }}
        >
          {segments.map((segment, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={segment.dashArray}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform={`rotate(${segment.rotation} ${center} ${center})`}
            />
          ))}
          {(centerValue || centerLabel) && (
            <g>
              {centerValue && (
                <text
                  x={center}
                  y={centerLabel ? center - 6 : center}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground font-bold"
                  style={{ fontSize: size * 0.14 }}
                >
                  {centerValue}
                </text>
              )}
              {centerLabel && (
                <text
                  x={center}
                  y={centerValue ? center + size * 0.1 : center}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-muted-foreground"
                  style={{ fontSize: size * 0.07 }}
                >
                  {centerLabel}
                </text>
              )}
            </g>
          )}
        </svg>
        {showLegend && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            {segments.map((segment, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-muted-foreground">{segment.label}</span>
                <span className="font-medium text-foreground">
                  {segment.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

DonutChart.displayName = "DonutChart"

export { DonutChart }
export type { DonutChartProps, DonutChartDataItem }
