import { Anton, Caveat } from "next/font/google"
import { cn } from "@/lib/utils"

// Heavy condensed display for the flat-rubbed headings; a pressure-varied
// script for the marginalia and body copy. Both self-hosted by next/font and
// exposed as CSS variables that graphite.css falls back from.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-graphite-display", display: "swap" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-graphite-script", display: "swap" })

export default function GraphiteLayout({ children }: { children: React.ReactNode }) {
  return <div className={cn(anton.variable, caveat.variable)}>{children}</div>
}
