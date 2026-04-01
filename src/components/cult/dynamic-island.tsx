"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type DynamicIslandSize = "compact" | "minimal" | "small" | "default" | "large" | "long" | "ultra";

export interface DynamicIslandProps {
  size?: DynamicIslandSize;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  state?: "idle" | "expanded" | "compact";
}

const sizeStyles: Record<DynamicIslandSize, string> = {
  compact: "h-9 w-[120px]",
  minimal: "h-8 w-[90px]",
  small: "h-10 w-[150px]",
  default: "h-12 w-[200px]",
  large: "h-[180px] w-[350px]",
  long: "h-10 w-[300px]",
  ultra: "h-[220px] w-[380px]",
};

function DynamicIsland({
  size = "default",
  children,
  className,
  onClick,
}: DynamicIslandProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex items-center justify-center rounded-[22px] bg-black text-white shadow-lg transition-all duration-500 ease-in-out cursor-pointer overflow-hidden",
        sizeStyles[size],
        className
      )}
      onClick={onClick}
    >
      <div className="relative z-10 flex items-center justify-center px-4 w-full h-full">
        {children}
      </div>
    </div>
  );
}

export interface DynamicIslandContentProps {
  children: React.ReactNode;
  className?: string;
}

function DynamicIslandContent({ children, className }: DynamicIslandContentProps) {
  return (
    <div className={cn("flex items-center gap-3 text-sm", className)}>
      {children}
    </div>
  );
}

export interface UseDynamicIslandOptions {
  sizes?: DynamicIslandSize[];
  defaultSize?: DynamicIslandSize;
  autoRotate?: boolean;
  interval?: number;
}

function useDynamicIsland({
  sizes = ["compact", "default", "large"],
  defaultSize = "compact",
  autoRotate = false,
  interval = 3000,
}: UseDynamicIslandOptions = {}) {
  const [currentIndex, setCurrentIndex] = React.useState(
    sizes.indexOf(defaultSize)
  );
  const [isExpanded, setIsExpanded] = React.useState(false);

  const currentSize = sizes[currentIndex] || defaultSize;

  const nextSize = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sizes.length);
  }, [sizes.length]);

  const prevSize = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sizes.length) % sizes.length);
  }, [sizes.length]);

  const setSize = React.useCallback(
    (size: DynamicIslandSize) => {
      const idx = sizes.indexOf(size);
      if (idx >= 0) setCurrentIndex(idx);
    },
    [sizes]
  );

  const toggle = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
    nextSize();
  }, [nextSize]);

  React.useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(nextSize, interval);
    return () => clearInterval(timer);
  }, [autoRotate, interval, nextSize]);

  return {
    currentSize,
    isExpanded,
    toggle,
    nextSize,
    prevSize,
    setSize,
  };
}

export { DynamicIsland, DynamicIslandContent, useDynamicIsland };
