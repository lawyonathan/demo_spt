"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, Plus, Filter, ChevronDown } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: "select" | "multiselect" | "text" | "number" | "date" | "boolean";
  options?: FilterOption[];
  placeholder?: string;
}

export interface ActiveFilter {
  filterId: string;
  operator: string;
  value: string | string[] | number | boolean;
}

export interface FiltersProps {
  definitions: FilterDefinition[];
  activeFilters: ActiveFilter[];
  onFiltersChange: (filters: ActiveFilter[]) => void;
  className?: string;
  variant?: "default" | "inline" | "panel" | "compact";
  showCount?: boolean;
  maxVisible?: number;
}

const OPERATORS: Record<string, { label: string; value: string }[]> = {
  select: [
    { label: "is", value: "eq" },
    { label: "is not", value: "neq" },
  ],
  multiselect: [
    { label: "includes", value: "in" },
    { label: "excludes", value: "nin" },
  ],
  text: [
    { label: "contains", value: "contains" },
    { label: "equals", value: "eq" },
    { label: "starts with", value: "startsWith" },
    { label: "ends with", value: "endsWith" },
  ],
  number: [
    { label: "equals", value: "eq" },
    { label: "greater than", value: "gt" },
    { label: "less than", value: "lt" },
    { label: "between", value: "between" },
  ],
  date: [
    { label: "is", value: "eq" },
    { label: "before", value: "lt" },
    { label: "after", value: "gt" },
  ],
  boolean: [
    { label: "is", value: "eq" },
  ],
};

function Filters({
  definitions,
  activeFilters,
  onFiltersChange,
  className,
  variant = "default",
  showCount = true,
}: FiltersProps) {
  const [showAddFilter, setShowAddFilter] = React.useState(false);
  const addRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !addRef.current.contains(e.target as Node)) {
        setShowAddFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addFilter = (defId: string) => {
    const def = definitions.find((d) => d.id === defId);
    if (!def) return;
    const operators = OPERATORS[def.type];
    const newFilter: ActiveFilter = {
      filterId: defId,
      operator: operators[0].value,
      value: def.type === "boolean" ? true : def.type === "multiselect" ? [] : "",
    };
    onFiltersChange([...activeFilters, newFilter]);
    setShowAddFilter(false);
  };

  const updateFilter = (index: number, updates: Partial<ActiveFilter>) => {
    const updated = [...activeFilters];
    updated[index] = { ...updated[index], ...updates };
    onFiltersChange(updated);
  };

  const removeFilter = (index: number) => {
    onFiltersChange(activeFilters.filter((_, i) => i !== index));
  };

  const clearAll = () => onFiltersChange([]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        {activeFilters.map((filter, index) => {
          const def = definitions.find((d) => d.id === filter.filterId);
          if (!def) return null;
          const operators = OPERATORS[def.type];

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1 rounded-md border bg-background text-sm",
                variant === "compact" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1"
              )}
            >
              <span className="font-medium text-muted-foreground">{def.label}</span>
              <select
                value={filter.operator}
                onChange={(e) => updateFilter(index, { operator: e.target.value })}
                className="bg-transparent text-xs border-none outline-none"
              >
                {operators.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
              {def.type === "select" && def.options ? (
                <select
                  value={filter.value as string}
                  onChange={(e) => updateFilter(index, { value: e.target.value })}
                  className="bg-transparent text-xs border-none outline-none max-w-[120px]"
                >
                  <option value="">Select...</option>
                  {def.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : def.type === "boolean" ? (
                <select
                  value={String(filter.value)}
                  onChange={(e) => updateFilter(index, { value: e.target.value === "true" })}
                  className="bg-transparent text-xs border-none outline-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <input
                  type={def.type === "number" ? "number" : def.type === "date" ? "date" : "text"}
                  value={filter.value as string}
                  onChange={(e) => updateFilter(index, { value: def.type === "number" ? Number(e.target.value) : e.target.value })}
                  placeholder={def.placeholder || "Value..."}
                  className="bg-transparent text-xs border-none outline-none w-24"
                />
              )}
              <button
                type="button"
                onClick={() => removeFilter(index)}
                className="ml-1 rounded-sm hover:bg-accent p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}

        <div ref={addRef} className="relative">
          <button
            type="button"
            onClick={() => setShowAddFilter(!showAddFilter)}
            className={cn(
              "flex items-center gap-1 rounded-md border border-dashed px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
              variant === "compact" && "px-1.5 py-0.5 text-xs"
            )}
          >
            <Plus className="h-3.5 w-3.5" /> Add filter
          </button>
          {showAddFilter && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-md border bg-popover p-1 shadow-md">
              {definitions
                .filter((d) => !activeFilters.some((f) => f.filterId === d.id))
                .map((def) => (
                  <button
                    key={def.id}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                    onClick={() => addFilter(def.id)}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    {def.label}
                  </button>
                ))}
            </div>
          )}
        </div>

        {activeFilters.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        )}

        {showCount && activeFilters.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {activeFilters.length} active filter{activeFilters.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

export { Filters };
