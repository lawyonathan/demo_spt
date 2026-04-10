/** Curated color palette for spending buckets */
export const BUCKET_COLORS = [
  { name: "Blue", hex: "#3b82f6" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Orange", hex: "#f97316" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Lime", hex: "#84cc16" },
  { name: "Indigo", hex: "#6366f1" },
] as const;

/** Lucide icon names available for buckets */
export const BUCKET_ICONS = [
  "tag",
  "shopping-cart",
  "utensils",
  "home",
  "car",
  "heart",
  "zap",
  "film",
  "book",
  "plane",
  "coffee",
  "gift",
  "briefcase",
  "music",
  "dumbbell",
] as const;

/** Format a number as USD currency string */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Get YYYY-MM string for a date */
export function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/** Get a display label for a YYYY-MM month key */
export function formatMonth(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
