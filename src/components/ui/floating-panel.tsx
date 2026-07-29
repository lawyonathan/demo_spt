"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, Minimize2, Maximize2 } from "lucide-react";

export interface FloatingPanelProps {
  title?: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  resizable?: boolean;
  draggable?: boolean;
  closable?: boolean;
  minimizable?: boolean;
  onClose?: () => void;
  className?: string;
  variant?: "default" | "glass" | "elevated" | "bordered";
}

function FloatingPanel({
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 320, height: 400 },
  resizable = true,
  draggable = true,
  closable = true,
  minimizable = true,
  onClose,
  className,
  variant = "default",
}: FloatingPanelProps) {
  const [position, setPosition] = React.useState(defaultPosition);
  const [size, setSize] = React.useState(defaultSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const dragStart = React.useRef({ x: 0, y: 0 });
  const panelRef = React.useRef<HTMLDivElement>(null);

  const variantStyles = {
    default: "bg-background border shadow-lg",
    glass: "bg-background/80 backdrop-blur-xl border shadow-xl",
    elevated: "bg-background border-0 shadow-2xl",
    bordered: "bg-background border-2 shadow-md",
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!isVisible) return null;

  return (
    <div
      ref={panelRef}
      className={cn(
        "fixed z-50 rounded-xl overflow-hidden flex flex-col",
        variantStyles[variant],
        isDragging && "select-none",
        className
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: isMinimized ? "auto" : size.height,
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 border-b",
          draggable && "cursor-move"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {closable && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose?.();
                }}
                className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              />
            )}
            {minimizable && (
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-3 w-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
              />
            )}
            <button
              onClick={() =>
                setSize((prev) => ({
                  width: prev.width === defaultSize.width ? 500 : defaultSize.width,
                  height: prev.height === defaultSize.height ? 600 : defaultSize.height,
                }))
              }
              className="h-3 w-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            />
          </div>
          {title && (
            <span className="text-sm font-medium ml-2">{title}</span>
          )}
        </div>
      </div>
      {!isMinimized && (
        <div className="flex-1 overflow-auto p-4">{children}</div>
      )}
      {resizable && !isMinimized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startW = size.width;
            const startH = size.height;

            const onMove = (ev: MouseEvent) => {
              setSize({
                width: Math.max(200, startW + (ev.clientX - startX)),
                height: Math.max(150, startH + (ev.clientY - startY)),
              });
            };
            const onUp = () => {
              document.removeEventListener("mousemove", onMove);
              document.removeEventListener("mouseup", onUp);
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
          }}
        >
          <svg className="h-4 w-4 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="18" cy="18" r="2" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="18" cy="12" r="2" />
          </svg>
        </div>
      )}
    </div>
  );
}

export { FloatingPanel };
