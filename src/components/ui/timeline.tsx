import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const timelineVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      alternating: "",
      compact: "",
    },
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-start",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

function Timeline({
  className,
  variant,
  orientation,
  ...props
}: TimelineProps) {
  return (
    <div
      className={cn(timelineVariants({ variant, orientation }), className)}
      {...props}
    />
  );
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  iconClassName?: string;
  lineClassName?: string;
  status?: "completed" | "current" | "upcoming" | "error";
  isLast?: boolean;
  timestamp?: string;
  title?: string;
  description?: string;
}

function TimelineItem({
  className,
  icon,
  iconClassName,
  lineClassName,
  status = "upcoming",
  isLast = false,
  timestamp,
  title,
  description,
  children,
  ...props
}: TimelineItemProps) {
  const statusColors = {
    completed: "bg-success text-white border-success",
    current: "bg-primary text-primary-foreground border-primary",
    upcoming: "bg-muted text-muted-foreground border-border",
    error: "bg-destructive text-white border-destructive",
  };

  const lineColors = {
    completed: "bg-success",
    current: "bg-primary",
    upcoming: "bg-border",
    error: "bg-destructive",
  };

  return (
    <div className={cn("flex gap-4 pb-8 last:pb-0", className)} {...props}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
            statusColors[status],
            iconClassName
          )}
        >
          {icon || (
            <span className="h-2 w-2 rounded-full bg-current" />
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "mt-1 w-0.5 flex-1 min-h-[24px]",
              lineColors[status],
              lineClassName
            )}
          />
        )}
      </div>
      <div className="flex-1 pt-1">
        {timestamp && (
          <time className="text-xs text-muted-foreground">{timestamp}</time>
        )}
        {title && (
          <h4 className="text-sm font-semibold leading-none mt-1">{title}</h4>
        )}
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

export interface TimelineConnectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

function TimelineConnector({
  className,
  active = false,
  ...props
}: TimelineConnectorProps) {
  return (
    <div
      className={cn(
        "w-0.5 flex-1",
        active ? "bg-primary" : "bg-border",
        className
      )}
      {...props}
    />
  );
}

export { Timeline, TimelineItem, TimelineConnector };
