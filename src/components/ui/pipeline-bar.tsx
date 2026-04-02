import * as React from "react"
import { cn } from "@/lib/utils"

export interface PipelineStage {
  name: string
  deals: number
  amount: string
  percent: number
  color: string
}

export interface PipelineBarProps extends React.HTMLAttributes<HTMLDivElement> {
  stages: PipelineStage[]
}

const PipelineBar = React.forwardRef<HTMLDivElement, PipelineBarProps>(
  ({ stages, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {stages.map((stage, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm font-medium text-card-foreground truncate">
              {stage.name}
            </span>
            <div className="relative flex-1 h-7 rounded-full bg-card">
              <div
                className="h-full rounded-full transition-all duration-500 ease-in-out flex items-center"
                style={{
                  width: `${Math.max(stage.percent, 2)}%`,
                  backgroundColor: stage.color,
                }}
              >
                {stage.percent >= 12 && (
                  <span className="px-2 text-xs font-semibold text-white truncate">
                    {stage.percent}%
                  </span>
                )}
              </div>
              {stage.percent < 12 && (
                <span
                  className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground"
                  style={{ left: `calc(${Math.max(stage.percent, 2)}% + 6px)` }}
                >
                  {stage.percent}%
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 text-right">
              <span className="text-sm font-medium text-card-foreground">
                {stage.deals} {stage.deals === 1 ? "deal" : "deals"}
              </span>
              <span className="text-sm text-muted-foreground">
                {stage.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }
)

PipelineBar.displayName = "PipelineBar"

export { PipelineBar }
