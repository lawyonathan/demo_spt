"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: number;
}

export interface MacOSDockProps {
  items: DockItem[];
  className?: string;
  magnification?: number;
  baseSize?: number;
  maxSize?: number;
  distance?: number;
}

function MacOSDock({
  items,
  className,
  magnification = 1.5,
  baseSize = 48,
  maxSize = 72,
  distance = 150,
}: MacOSDockProps) {
  const [mouseX, setMouseX] = React.useState<number | null>(null);
  const dockRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const getScale = (itemId: string): number => {
    if (mouseX === null) return 1;
    const el = itemRefs.current.get(itemId);
    if (!el) return 1;

    const rect = el.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - itemCenterX);

    if (dist > distance) return 1;

    const scale = 1 + (magnification - 1) * (1 - dist / distance);
    return Math.min(scale, maxSize / baseSize);
  };

  return (
    <div
      ref={dockRef}
      className={cn(
        "inline-flex items-end gap-1 rounded-2xl border bg-background/80 backdrop-blur-xl px-2 pb-2 pt-2 shadow-lg",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item) => {
        const scale = getScale(item.id);
        const size = baseSize * scale;

        return (
          <div
            key={item.id}
            className="flex flex-col items-center group"
          >
            <div
              className={cn(
                "absolute -top-8 rounded-md bg-foreground/90 px-2 py-1 text-xs text-background opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
              )}
            >
              {item.label}
            </div>
            <div
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
              }}
              className="relative flex items-center justify-center rounded-xl bg-gradient-to-b from-accent to-muted cursor-pointer transition-all duration-150 ease-out hover:brightness-110"
              style={{
                width: size,
                height: size,
              }}
              onClick={item.onClick}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  transform: `scale(${scale * 0.5})`,
                  transition: "transform 150ms ease-out",
                }}
              >
                {item.icon}
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </div>
            <div className="mt-1 h-1 w-1 rounded-full bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
}

export { MacOSDock };
