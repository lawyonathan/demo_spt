"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export interface NumberFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type" | "size"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "inline" | "stacked";
  formatOptions?: Intl.NumberFormatOptions;
  label?: string;
}

const sizeClasses = {
  sm: { input: "h-8 text-xs", button: "h-8 w-8" },
  default: { input: "h-9 text-sm", button: "h-9 w-9" },
  lg: { input: "h-10 text-base", button: "h-10 w-10" },
};

function NumberField({
  className,
  value: controlledValue,
  defaultValue = 0,
  min = -Infinity,
  max: maxVal = Infinity,
  step = 1,
  onChange,
  size = "default",
  variant = "default",
  disabled,
  label,
  ...props
}: NumberFieldProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const setValue = (newValue: number) => {
    const clamped = Math.min(Math.max(newValue, min), maxVal);
    if (controlledValue === undefined) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const increment = () => setValue(value + step);
  const decrement = () => setValue(value - step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) setValue(parsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") { e.preventDefault(); increment(); }
    if (e.key === "ArrowDown") { e.preventDefault(); decrement(); }
  };

  const canDecrement = value > min;
  const canIncrement = value < maxVal;

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-1", className)}>
        {label && <label className="text-sm font-medium">{label}</label>}
        <button
          type="button"
          disabled={disabled || !canIncrement}
          onClick={increment}
          className={cn(
            "flex items-center justify-center rounded-md border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size].button
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "w-16 text-center rounded-md border border-input bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            sizeClasses[size].input
          )}
          {...props}
        />
        <button
          type="button"
          disabled={disabled || !canDecrement}
          onClick={decrement}
          className={cn(
            "flex items-center justify-center rounded-md border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size].button
          )}
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center", className)}>
      {label && <label className="mr-2 text-sm font-medium">{label}</label>}
      <div className="inline-flex items-center rounded-md border border-input">
        <button
          type="button"
          disabled={disabled || !canDecrement}
          onClick={decrement}
          className={cn(
            "flex items-center justify-center border-r bg-background hover:bg-accent rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size].button
          )}
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "w-16 text-center bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            sizeClasses[size].input
          )}
          {...props}
        />
        <button
          type="button"
          disabled={disabled || !canIncrement}
          onClick={increment}
          className={cn(
            "flex items-center justify-center border-l bg-background hover:bg-accent rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed",
            sizeClasses[size].button
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export { NumberField };
