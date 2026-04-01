"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LightBoardProps {
  rows?: number;
  columns?: number;
  gap?: number;
  lightSize?: number;
  color?: string;
  dimColor?: string;
  className?: string;
  pattern?: boolean[][];
  interactive?: boolean;
  trail?: boolean;
  trailLength?: number;
  autoPlay?: boolean;
  speed?: number;
}

function LightBoard({
  rows = 10,
  columns = 20,
  gap = 2,
  lightSize = 12,
  color = "#22c55e",
  dimColor = "#1a1a2e",
  className,
  pattern,
  interactive = true,
  trail = true,
  trailLength = 5,
  autoPlay = false,
  speed = 100,
}: LightBoardProps) {
  const [grid, setGrid] = React.useState<number[][]>(() =>
    Array.from({ length: rows }, () => Array(columns).fill(0))
  );
  const [mousePos, setMousePos] = React.useState<{ row: number; col: number } | null>(null);

  React.useEffect(() => {
    if (pattern) {
      setGrid(
        pattern.map((row) => row.map((cell) => (cell ? 1 : 0)))
      );
    }
  }, [pattern]);

  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = prev.map((row) => [...row]);
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * columns);
        newGrid[r][c] = newGrid[r][c] > 0 ? 0 : 1;
        return newGrid;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [autoPlay, speed, rows, columns]);

  const handleMouseEnter = (row: number, col: number) => {
    if (!interactive) return;
    setMousePos({ row, col });

    if (trail) {
      setGrid((prev) => {
        const newGrid = prev.map((r) => r.map((c) => Math.max(0, c - 0.1)));
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < columns) {
              const dist = Math.abs(dr) + Math.abs(dc);
              newGrid[nr][nc] = Math.min(1, 1 - dist * 0.3);
            }
          }
        }
        return newGrid;
      });
    }
  };

  const handleClick = (row: number, col: number) => {
    if (!interactive) return;
    setGrid((prev) => {
      const newGrid = prev.map((r) => [...r]);
      newGrid[row][col] = newGrid[row][col] > 0 ? 0 : 1;
      return newGrid;
    });
  };

  return (
    <div
      className={cn("inline-block rounded-lg bg-black p-3", className)}
      style={{
        display: "grid",
        gridTemplateRows: `repeat(${rows}, ${lightSize}px)`,
        gridTemplateColumns: `repeat(${columns}, ${lightSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {grid.map((row, ri) =>
        row.map((brightness, ci) => (
          <div
            key={`${ri}-${ci}`}
            className="rounded-full transition-all duration-200 cursor-pointer"
            style={{
              width: lightSize,
              height: lightSize,
              backgroundColor: brightness > 0
                ? color
                : dimColor,
              opacity: brightness > 0 ? 0.3 + brightness * 0.7 : 0.15,
              boxShadow: brightness > 0.5
                ? `0 0 ${lightSize}px ${color}40`
                : "none",
            }}
            onMouseEnter={() => handleMouseEnter(ri, ci)}
            onClick={() => handleClick(ri, ci)}
          />
        ))
      )}
    </div>
  );
}

export { LightBoard };
