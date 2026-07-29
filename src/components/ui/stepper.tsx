"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col",
    },
    variant: {
      default: "",
      circles: "",
      dots: "",
      progress: "",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    size: "default",
  },
});

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  activeStep: number;
  onStepClick?: (step: number) => void;
}

export interface StepProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const sizeMap = { sm: "h-6 w-6 text-xs", default: "h-8 w-8 text-sm", lg: "h-10 w-10 text-base" };

function Stepper({
  className,
  orientation,
  variant,
  size = "default",
  activeStep,
  onStepClick,
  children,
  ...props
}: StepperProps) {
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];

  return (
    <div
      className={cn(stepperVariants({ orientation, variant, size }), className)}
      {...props}
    >
      {steps.map((step, index) => {
        const { label, description, icon, optional, error, disabled } = step.props;
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;
        const isUpcoming = index > activeStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex items-center gap-2",
                orientation === "vertical" && "flex-row",
                disabled ? "opacity-50 cursor-not-allowed" : onStepClick ? "cursor-pointer" : ""
              )}
              onClick={() => !disabled && onStepClick?.(index)}
            >
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full border-2 font-medium transition-colors",
                  sizeMap[size || "default"],
                  error
                    ? "border-destructive bg-destructive text-white"
                    : isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {error ? (
                  <X className="h-4 w-4" />
                ) : isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : icon ? (
                  icon
                ) : (
                  index + 1
                )}
              </div>
              <div className={cn("flex flex-col", orientation === "horizontal" && "hidden sm:flex")}>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
                {description && (
                  <span className="text-xs text-muted-foreground">
                    {description}
                  </span>
                )}
                {optional && (
                  <span className="text-xs text-muted-foreground italic">
                    Optional
                  </span>
                )}
              </div>
            </div>
            {!isLast && orientation === "horizontal" && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 transition-colors",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
            {!isLast && orientation === "vertical" && (
              <div
                className={cn(
                  "ml-[15px] my-1 w-0.5 min-h-[24px]",
                  size === "sm" && "ml-[11px]",
                  size === "lg" && "ml-[19px]",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Step(_props: StepProps) {
  return null;
}

export { Stepper, Step };
