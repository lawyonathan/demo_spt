"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  max?: number;
  size?: "sm" | "default" | "lg";
  readOnly?: boolean;
  disabled?: boolean;
  allowHalf?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  halfIcon?: React.ReactNode;
  onChange?: (value: number) => void;
  showValue?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  default: "h-5 w-5",
  lg: "h-7 w-7",
};

function Rating({
  className,
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  size = "default",
  readOnly = false,
  disabled = false,
  allowHalf = false,
  onChange,
  showValue = false,
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const value = controlledValue ?? internalValue;
  const displayValue = hoverValue ?? value;

  const handleClick = (newValue: number) => {
    if (readOnly || disabled) return;
    if (controlledValue === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseMove = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (readOnly || disabled) return;
    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect();
      const isHalf = event.clientX - rect.left < rect.width / 2;
      setHoverValue(isHalf ? index + 0.5 : index + 1);
    } else {
      setHoverValue(index + 1);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseLeave={() => setHoverValue(null)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const isFull = displayValue >= i + 1;
        const isHalf = allowHalf && displayValue >= i + 0.5 && displayValue < i + 1;

        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            className={cn(
              "relative inline-flex items-center justify-center transition-colors",
              !readOnly && !disabled && "cursor-pointer hover:scale-110"
            )}
            onMouseMove={(e) => handleMouseMove(i, e)}
            onClick={() => {
              if (allowHalf && hoverValue) {
                handleClick(hoverValue);
              } else {
                handleClick(i + 1);
              }
            }}
          >
            {isHalf ? (
              <div className="relative">
                <Star
                  className={cn(sizeClasses[size], "text-muted-foreground/30 fill-muted-foreground/10")}
                />
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className={cn(sizeClasses[size], "text-warning fill-warning")}
                  />
                </div>
              </div>
            ) : (
              <Star
                className={cn(
                  sizeClasses[size],
                  isFull
                    ? "text-warning fill-warning"
                    : "text-muted-foreground/30 fill-muted-foreground/10"
                )}
              />
            )}
          </button>
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm text-muted-foreground">
          {displayValue.toFixed(allowHalf ? 1 : 0)}
        </span>
      )}
    </div>
  );
}

export { Rating };
