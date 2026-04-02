import * as React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  label: string
  value: string
  change: number
  iconClassName?: string
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ icon, label, value, change, iconClassName, className, ...props }, ref) => {
    const isPositive = change >= 0

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow-sm p-6",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground", iconClassName)}>
            {icon}
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              isPositive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
        </div>
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard }
export type { StatCardProps }
