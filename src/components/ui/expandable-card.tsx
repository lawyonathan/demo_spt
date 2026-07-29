"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";

export interface ExpandableCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  className?: string;
  variant?: "default" | "bordered" | "ghost" | "elevated";
  expandDirection?: "inline" | "overlay";
  defaultExpanded?: boolean;
}

function ExpandableCard({
  title,
  description,
  children,
  icon,
  image,
  className,
  variant = "default",
  expandDirection = "inline",
  defaultExpanded = false,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, children]);

  const variantStyles = {
    default: "border bg-card shadow-sm",
    bordered: "border-2 bg-card",
    ghost: "bg-transparent",
    elevated: "border bg-card shadow-lg",
  };

  if (expandDirection === "overlay" && expanded) {
    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
        <div
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-xl border bg-card shadow-2xl",
            "animate-scaleIn"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              {icon}
              <div>
                <h3 className="font-semibold">{title}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="rounded-md p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {image && (
            <div className="h-48 overflow-hidden">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-4">{children}</div>
          <style jsx>{`
            @keyframes scaleIn {
              from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
              to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
          `}</style>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      {image && !expanded && (
        <div className="h-40 overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className={cn(
          "flex items-center justify-between p-4 cursor-pointer",
          "hover:bg-accent/50 transition-colors"
        )}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="font-semibold text-sm">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </div>
      <div
        style={{
          height: expanded ? contentHeight : 0,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        <div ref={contentRef} className="p-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export { ExpandableCard };
