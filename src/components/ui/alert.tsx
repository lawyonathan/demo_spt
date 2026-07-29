"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>div]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5",
        success:
          "border-success/50 text-success dark:border-success [&>svg]:text-success bg-success/5",
        warning:
          "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning bg-warning/5",
        info: "border-info/50 text-info dark:border-info [&>svg]:text-info bg-info/5",
        outline: "border-border bg-transparent",
        filled:
          "border-transparent bg-primary text-primary-foreground [&>svg]:text-primary-foreground",
        "filled-destructive":
          "border-transparent bg-destructive text-white [&>svg]:text-white",
        "filled-success":
          "border-transparent bg-success text-white [&>svg]:text-white",
        "filled-warning":
          "border-transparent bg-warning text-white [&>svg]:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  outline: Info,
  filled: Info,
  "filled-destructive": AlertCircle,
  "filled-success": CheckCircle2,
  "filled-warning": AlertTriangle,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      icon,
      dismissible = false,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false);

    if (dismissed) return null;

    const IconComponent = iconMap[variant || "default"];
    const iconElement = icon ?? <IconComponent className="h-4 w-4" />;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {iconElement}
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
