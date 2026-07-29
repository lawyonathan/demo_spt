import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const frameVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "shadow-sm",
      elevated: "shadow-md",
      outline: "shadow-none",
      ghost: "border-transparent bg-transparent shadow-none",
      filled: "bg-muted border-transparent",
      bordered: "border-2",
      dashed: "border-dashed",
      inset: "shadow-inner bg-muted/50",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      default: "p-4",
      md: "p-5",
      lg: "p-6",
      xl: "p-8",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

export interface FrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof frameVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

function Frame({
  className,
  variant,
  padding,
  header,
  footer,
  collapsible = false,
  defaultCollapsed = false,
  children,
  ...props
}: FrameProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <div
      className={cn(frameVariants({ variant, padding: "none" }), className)}
      {...props}
    >
      {header && (
        <div
          className={cn(
            "flex items-center justify-between border-b px-4 py-3",
            collapsible && "cursor-pointer select-none"
          )}
          onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
        >
          <div className="font-medium">{header}</div>
          {collapsible && (
            <svg
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "-rotate-90"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </div>
      )}
      {!collapsed && (
        <div className={cn(frameVariants({ padding }), "border-0 shadow-none rounded-none bg-transparent")}>
          {children}
        </div>
      )}
      {footer && !collapsed && (
        <div className="border-t px-4 py-3">{footer}</div>
      )}
    </div>
  );
}

export { Frame, frameVariants };
