"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SparklineChart } from "./sparkline-chart"

interface CryptoStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  unit?: string
  change: number
  subtitle?: string
  sparklineData: number[]
  sparklineVariant?: "line" | "bar"
  sparklineColor?: string
}

const CryptoStatCard = React.forwardRef<HTMLDivElement, CryptoStatCardProps>(
  (
    {
      label,
      value,
      unit = "USD",
      change,
      subtitle,
      sparklineData,
      sparklineVariant = "line",
      sparklineColor,
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = change >= 0
    const defaultColor = isPositive ? "#10b981" : "#ef4444"
    const chartColor = sparklineColor || defaultColor

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card p-5 flex flex-col justify-between min-h-[140px]",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight">{value}</span>
              <span className="text-xs text-muted-foreground font-medium">{unit}</span>
            </div>
            {subtitle && (
              <p className="text-[10px] text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
        <div className="mt-2">
          <SparklineChart
            data={sparklineData}
            variant={sparklineVariant}
            color={chartColor}
            width={120}
            height={36}
          />
        </div>
      </div>
    )
  }
)

CryptoStatCard.displayName = "CryptoStatCard"

export { CryptoStatCard }
export type { CryptoStatCardProps }
