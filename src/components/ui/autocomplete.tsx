"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  className?: string;
  size?: "sm" | "default" | "lg";
  creatable?: boolean;
  onCreate?: (value: string) => void;
}

const sizeClasses = {
  sm: "h-8 text-xs",
  default: "h-9 text-sm",
  lg: "h-10 text-base",
};

function Autocomplete({
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  emptyMessage = "No results found.",
  loading = false,
  disabled = false,
  clearable = false,
  multiple = false,
  selectedValues = [],
  onSelectedValuesChange,
  className,
  size = "default",
  creatable = false,
  onCreate,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const value = controlledValue ?? internalValue;

  const filtered = React.useMemo(() => {
    if (onSearch) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase()) ||
        opt.value.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query, onSearch]);

  const groups = React.useMemo(() => {
    const map = new Map<string, AutocompleteOption[]>();
    filtered.forEach((opt) => {
      const group = opt.group || "";
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(opt);
    });
    return map;
  }, [filtered]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onSelectedValuesChange?.(newValues);
    } else {
      if (controlledValue === undefined) setInternalValue(optionValue);
      onChange?.(optionValue);
      setOpen(false);
      setQuery("");
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[highlightedIndex].value);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center rounded-md border border-input bg-background px-3",
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed",
          open && "ring-2 ring-ring"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          placeholder={selectedOption ? selectedOption.label : placeholder}
          value={open ? query : selectedOption?.label || ""}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
            if (!open) setOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        {clearable && value && !loading && (
          <button
            type="button"
            onClick={() => {
              if (controlledValue === undefined) setInternalValue("");
              onChange?.("");
              setQuery("");
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {!loading && !clearable && (
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div className="max-h-60 overflow-auto">
            {filtered.length === 0 && !loading && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
                {creatable && query && (
                  <button
                    type="button"
                    className="mt-2 block w-full text-center text-primary hover:underline"
                    onClick={() => {
                      onCreate?.(query);
                      setQuery("");
                    }}
                  >
                    Create &quot;{query}&quot;
                  </button>
                )}
              </div>
            )}
            {Array.from(groups.entries()).map(([group, opts]) => (
              <div key={group}>
                {group && (
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    {group}
                  </div>
                )}
                {opts.map((option, idx) => {
                  const globalIdx = filtered.indexOf(option);
                  const isSelected = multiple
                    ? selectedValues.includes(option.value)
                    : option.value === value;

                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                        option.disabled && "pointer-events-none opacity-50",
                        isSelected && "bg-accent",
                        globalIdx === highlightedIndex && "bg-accent"
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      onMouseEnter={() => setHighlightedIndex(globalIdx)}
                    >
                      {option.icon}
                      <div className="flex-1">
                        <div>{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {isSelected && <Check className="h-4 w-4" />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { Autocomplete };
