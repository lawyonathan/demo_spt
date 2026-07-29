"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  { code: "US", dial: "+1", name: "United States", flag: "🇺🇸" },
  { code: "GB", dial: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", dial: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "AU", dial: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "DE", dial: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "FR", dial: "+33", name: "France", flag: "🇫🇷" },
  { code: "JP", dial: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "IN", dial: "+91", name: "India", flag: "🇮🇳" },
  { code: "BR", dial: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", dial: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "KR", dial: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "IT", dial: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "ES", dial: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "NL", dial: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "SE", dial: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", dial: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "SG", dial: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "NZ", dial: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "IE", dial: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "PT", dial: "+351", name: "Portugal", flag: "🇵🇹" },
];

export interface PhoneInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (country: (typeof COUNTRIES)[0]) => void;
  defaultCountry?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "inline" | "split";
}

const sizeClasses = {
  sm: "h-8 text-xs",
  default: "h-9 text-sm",
  lg: "h-10 text-base",
};

function PhoneInput({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onCountryChange,
  defaultCountry = "US",
  disabled = false,
  placeholder = "Phone number",
  className,
  size = "default",
  variant = "default",
}: PhoneInputProps) {
  const [country, setCountry] = React.useState(
    COUNTRIES.find((c) => c.code === defaultCountry) || COUNTRIES[0]
  );
  const [phone, setPhone] = React.useState(defaultValue);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const displayValue = controlledValue ?? phone;

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d\s\-()]/g, "");
    setPhone(raw);
    onChange?.(`${country.dial}${raw}`);
  };

  const handleCountrySelect = (c: (typeof COUNTRIES)[0]) => {
    setCountry(c);
    onCountryChange?.(c);
    setDropdownOpen(false);
    setSearch("");
    onChange?.(`${c.dial}${displayValue}`);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <div
        className={cn(
          "flex items-center rounded-md border border-input bg-background",
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex items-center gap-1 border-r px-2 hover:bg-accent rounded-l-md",
            sizeClasses[size]
          )}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="text-base leading-none">{country.flag}</span>
          <span className="text-xs text-muted-foreground">{country.dial}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
        <input
          type="tel"
          value={displayValue}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 bg-transparent px-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-[120px]",
            sizeClasses[size]
          )}
        />
      </div>

      {dropdownOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-64 rounded-md border bg-popover shadow-md">
          <div className="p-2">
            <input
              type="text"
              className="w-full rounded-sm border border-input bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-auto p-1">
            {filteredCountries.map((c) => (
              <button
                key={c.code}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
                  c.code === country.code && "bg-accent"
                )}
                onClick={() => handleCountrySelect(c)}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1 text-left">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { PhoneInput, COUNTRIES };
