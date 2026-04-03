"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SparklineChart } from "./sparkline-chart"

interface StakingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tokenName: string
  tokenAmount: string
  apr: number
  dailyEarnings: string
  dailyEarningsUnit?: string
  sparklineData: number[]
  iconColor?: string
  icon?: React.ReactNode
}

const StakingCard = React.forwardRef<HTMLDivElement, StakingCardProps>(
  (
    {
      tokenName,
      tokenAmount,
      apr,
      dailyEarnings,
      dailyEarningsUnit = "USDT",
      sparklineData,
      iconColor = "#10b981",
      icon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card p-4 min-w-[200px] flex flex-col gap-3",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: `${iconColor}20` }}
          >
            {icon || (
              <div
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: iconColor }}
              />
            )}
          </div>
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold border"
            style={{ borderColor: `${iconColor}40`, color: iconColor }}
          >
            APR {apr}%
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold">{tokenName}</p>
          <p className="text-xs text-muted-foreground">{tokenAmount}</p>
        </div>
        <div className="mt-auto">
          <SparklineChart
            data={sparklineData}
            variant="line"
            color={iconColor}
            width={170}
            height={28}
          />
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-[10px] text-muted-foreground">Daily Earnings</span>
          <span className="text-xs font-semibold">
            {dailyEarnings}{" "}
            <span className="text-muted-foreground font-normal">{dailyEarningsUnit}</span>
          </span>
        </div>
      </div>
    )
  }
)

StakingCard.displayName = "StakingCard"

export { StakingCard }
export type { StakingCardProps }
