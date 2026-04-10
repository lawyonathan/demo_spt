"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/reui/badge";
import { formatCurrency } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BucketCardProps {
  name: string;
  color: string;
  budget: number;
  spent: number;
  onClick?: () => void;
}

export function BucketCard({
  name,
  color,
  budget,
  spent,
  onClick,
}: BucketCardProps) {
  const remaining = budget - spent;
  const percent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const isOverBudget = spent > budget;

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-shadow hover:shadow-md",
        "border-l-4"
      )}
      style={{ borderLeftColor: color }}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">{name}</h3>
          {isOverBudget && (
            <Badge variant="destructive" className="text-[10px] px-1.5 py-0.5">
              Over
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <Progress
            value={percent}
            className={cn("h-2", isOverBudget && "[&>div]:bg-destructive")}
          />

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(spent)}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                / {formatCurrency(budget)}
              </span>
            </div>
            <span
              className={cn(
                "text-sm font-semibold",
                isOverBudget ? "text-destructive" : "text-emerald-600"
              )}
            >
              {isOverBudget ? "-" : ""}
              {formatCurrency(Math.abs(remaining))}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                left
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
