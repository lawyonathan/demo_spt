"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308",
  "#84cc16", "#22c55e", "#10b981", "#14b8a6",
  "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#78716c", "#000000", "#ffffff",
];

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presetColors?: string[];
  showInput?: boolean;
  showPresets?: boolean;
  showAlpha?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "inline" | "compact";
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function ColorPicker({
  value: controlledValue,
  defaultValue = "#3b82f6",
  onChange,
  presetColors = PRESET_COLORS,
  showInput = true,
  showPresets = true,
  className,
  size = "default",
  variant = "default",
}: ColorPickerProps) {
  const [color, setColor] = React.useState(defaultValue);
  const [copied, setCopied] = React.useState(false);

  const currentColor = controlledValue ?? color;

  const handleChange = (newColor: string) => {
    if (controlledValue === undefined) setColor(newColor);
    onChange?.(newColor);
  };

  const copyColor = async () => {
    await navigator.clipboard.writeText(currentColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const hsl = hexToHsl(currentColor);

  const sizeClasses = {
    sm: "w-6 h-6",
    default: "w-8 h-8",
    lg: "w-10 h-10",
  };

  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <div className="relative">
          <div
            className={cn("rounded-md border cursor-pointer", sizeClasses[size])}
            style={{ backgroundColor: currentColor }}
          />
          <input
            type="color"
            value={currentColor}
            onChange={(e) => handleChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        {showInput && (
          <input
            type="text"
            value={currentColor}
            onChange={(e) => handleChange(e.target.value)}
            className="h-8 w-24 rounded-md border border-input bg-transparent px-2 text-xs font-mono"
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("w-64 rounded-lg border bg-popover p-3 shadow-md space-y-3", className)}>
      <div className="relative">
        <div
          className="h-32 rounded-md border cursor-crosshair"
          style={{
            background: `linear-gradient(to bottom, transparent, black), linear-gradient(to right, white, hsl(${hsl.h}, 100%, 50%))`,
          }}
        >
          <input
            type="color"
            value={currentColor}
            onChange={(e) => handleChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-crosshair w-full h-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="h-8 w-8 rounded-md border shrink-0"
          style={{ backgroundColor: currentColor }}
        />
        <input
          type="range"
          min="0"
          max="360"
          value={hsl.h}
          onChange={(e) => {
            const h = parseInt(e.target.value);
            handleChange(`hsl(${h}, ${hsl.s}%, ${hsl.l}%)`);
          }}
          className="flex-1 h-2 appearance-none rounded-full cursor-pointer"
          style={{
            background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        />
      </div>

      {showInput && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={currentColor}
            onChange={(e) => handleChange(e.target.value)}
            className="flex-1 h-8 rounded-md border border-input bg-transparent px-2 text-sm font-mono"
          />
          <button
            type="button"
            onClick={copyColor}
            className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-accent"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </button>
        </div>
      )}

      {showPresets && (
        <div className="grid grid-cols-10 gap-1">
          {presetColors.map((c) => (
            <button
              key={c}
              type="button"
              className={cn(
                "h-5 w-5 rounded-sm border transition-transform hover:scale-110",
                currentColor === c && "ring-2 ring-primary ring-offset-1"
              )}
              style={{ backgroundColor: c }}
              onClick={() => handleChange(c)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { ColorPicker };
