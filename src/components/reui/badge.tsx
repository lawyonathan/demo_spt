import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white shadow",
        success: "border-transparent bg-success text-white shadow",
        warning: "border-transparent bg-warning text-white shadow",
        info: "border-transparent bg-info text-white shadow",
        outline: "text-foreground",
        "outline-destructive": "border-destructive text-destructive",
        "outline-success": "border-success text-success",
        "outline-warning": "border-warning text-warning",
        "outline-info": "border-info text-info",
        soft: "border-transparent bg-primary/10 text-primary",
        "soft-destructive": "border-transparent bg-destructive/10 text-destructive",
        "soft-success": "border-transparent bg-success/10 text-success",
        "soft-warning": "border-transparent bg-warning/10 text-warning",
        "soft-info": "border-transparent bg-info/10 text-info",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
  icon?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  shape,
  removable,
  onRemove,
  dot,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size, shape }), "gap-1", className)}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {icon}
      {children}
      {removable && (
        <button
          className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:opacity-75"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
