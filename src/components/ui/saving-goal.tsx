"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SavingGoalProps extends React.HTMLAttributes<HTMLDivElement> {
  current: number
  target: number
  label: string
}

const SavingGoal = React.forwardRef<HTMLDivElement, SavingGoalProps>(
  ({ current, target, label, className, ...props }, ref) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100)
    const size = 120
    const strokeWidth = 10
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const filledLength = (percentage / 100) * circumference
    const unfilledLength = circumference - filledLength

    const gradientId = React.useId()

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        <div className="relative">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
              </linearGradient>
            </defs>

            {/* Unfilled track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={strokeWidth}
            />

            {/* Filled arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${filledLength} ${unfilledLength}`}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>

          {/* Center percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            ${current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} of $
            {target.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>

        <button
          type="button"
          className="mt-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          View Report
        </button>
      </div>
    )
  }
)
SavingGoal.displayName = "SavingGoal"

export { SavingGoal }
export type { SavingGoalProps }
