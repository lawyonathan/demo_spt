"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DatePreset {
  label: string;
  getValue: () => DateRange;
}

const DEFAULT_PRESETS: DatePreset[] = [
  { label: "Today", getValue: () => ({ from: new Date(), to: new Date() }) },
  { label: "Yesterday", getValue: () => ({ from: subDays(new Date(), 1), to: subDays(new Date(), 1) }) },
  { label: "Last 7 days", getValue: () => ({ from: subDays(new Date(), 6), to: new Date() }) },
  { label: "Last 30 days", getValue: () => ({ from: subDays(new Date(), 29), to: new Date() }) },
  { label: "This week", getValue: () => ({ from: startOfWeek(new Date()), to: endOfWeek(new Date()) }) },
  { label: "This month", getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
];

export interface DateSelectorProps {
  value?: Date | DateRange;
  onChange?: (value: Date | DateRange) => void;
  mode?: "single" | "range";
  presets?: DatePreset[];
  showPresets?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  formatStr?: string;
}

function DateSelector({
  value,
  onChange,
  mode = "single",
  presets = DEFAULT_PRESETS,
  showPresets = false,
  placeholder = "Pick a date",
  disabled = false,
  className,
  minDate,
  maxDate,
  formatStr = "MMM dd, yyyy",
}: DateSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(new Date());
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);
  const [rangeStart, setRangeStart] = React.useState<Date | undefined>(
    mode === "range" && value && "from" in (value as DateRange) ? (value as DateRange).from : undefined
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), i));
  }

  const isDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSelected = (date: Date) => {
    if (mode === "single" && value instanceof Date) {
      return isSameDay(date, value);
    }
    if (mode === "range" && value && "from" in (value as DateRange)) {
      const range = value as DateRange;
      if (range.from && isSameDay(date, range.from)) return true;
      if (range.to && isSameDay(date, range.to)) return true;
    }
    return false;
  };

  const isInRange = (date: Date) => {
    if (mode !== "range") return false;
    const range = value as DateRange;
    if (range?.from && range?.to) {
      return date > range.from && date < range.to;
    }
    if (rangeStart && hoverDate) {
      const start = rangeStart < hoverDate ? rangeStart : hoverDate;
      const end = rangeStart < hoverDate ? hoverDate : rangeStart;
      return date > start && date < end;
    }
    return false;
  };

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return;
    if (mode === "single") {
      onChange?.(date);
      setOpen(false);
    } else {
      if (!rangeStart) {
        setRangeStart(date);
      } else {
        const from = rangeStart < date ? rangeStart : date;
        const to = rangeStart < date ? date : rangeStart;
        onChange?.({ from, to });
        setRangeStart(undefined);
        setOpen(false);
      }
    }
  };

  const displayText = () => {
    if (mode === "single" && value instanceof Date) {
      return format(value, formatStr);
    }
    if (mode === "range" && value && "from" in (value as DateRange)) {
      const range = value as DateRange;
      if (range.from && range.to) {
        return `${format(range.from, formatStr)} - ${format(range.to, formatStr)}`;
      }
      if (range.from) return format(range.from, formatStr);
    }
    return placeholder;
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed",
          !value && "text-muted-foreground"
        )}
        onClick={() => setOpen(!open)}
      >
        <Calendar className="h-4 w-4" />
        {displayText()}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-md border bg-popover p-0 shadow-md">
          <div className="flex">
            {showPresets && (
              <div className="w-36 border-r p-2 space-y-0.5">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
                    onClick={() => {
                      const val = preset.getValue();
                      if (mode === "single") {
                        onChange?.(val.from!);
                      } else {
                        onChange?.(val);
                      }
                      setOpen(false);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setViewDate(subMonths(viewDate, 1))}
                  className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-accent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium">
                  {format(viewDate, "MMMM yyyy")}
                </span>
                <button
                  type="button"
                  onClick={() => setViewDate(addMonths(viewDate, 1))}
                  className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-accent"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-0 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <div key={d} className="h-8 w-8 flex items-center justify-center text-xs text-muted-foreground font-medium">
                    {d}
                  </div>
                ))}
                {days.map((day, i) => (
                  <div key={i} className="h-8 w-8">
                    {day && (
                      <button
                        type="button"
                        disabled={isDisabled(day)}
                        className={cn(
                          "h-8 w-8 rounded-md text-sm transition-colors",
                          isToday(day) && "border border-primary",
                          isSelected(day) && "bg-primary text-primary-foreground",
                          isInRange(day) && "bg-primary/10",
                          !isSelected(day) && !isInRange(day) && "hover:bg-accent",
                          !isSameMonth(day, viewDate) && "text-muted-foreground/50",
                          isDisabled(day) && "opacity-30 cursor-not-allowed"
                        )}
                        onClick={() => handleDayClick(day)}
                        onMouseEnter={() => mode === "range" && setHoverDate(day)}
                      >
                        {day.getDate()}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { DateSelector, DEFAULT_PRESETS };
