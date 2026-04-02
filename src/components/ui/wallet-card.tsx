import * as React from "react"
import { cn } from "@/lib/utils"

const gradientMap = {
  credit: "bg-gradient-to-br from-slate-800 to-slate-900",
  digital: "bg-gradient-to-br from-blue-600 to-blue-800",
  premium: "bg-gradient-to-br from-purple-600 to-purple-800",
  business: "bg-gradient-to-br from-emerald-600 to-emerald-800",
} as const

interface WalletCardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "credit" | "digital" | "premium" | "business"
  cardNumber: string
  balance: string
  label: string
}

const WalletCard = React.forwardRef<HTMLDivElement, WalletCardProps>(
  ({ type, cardNumber, balance, label, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl p-6 text-white",
          "aspect-[1.6/1] flex flex-col justify-between",
          gradientMap[type],
          className
        )}
        {...props}
      >
        {/* Decorative circles for visual depth */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-12 bottom-16 h-24 w-24 rounded-full bg-white/5" />

        {/* Card content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top: card type label */}
          <p className="text-xs font-medium uppercase tracking-wider text-white/80">
            {label}
          </p>

          {/* Middle: masked card number */}
          <p className="font-mono text-base tracking-[0.2em] text-white/90">
            {cardNumber}
          </p>

          {/* Bottom: balance */}
          <p className="text-2xl font-bold text-white">
            {balance}
          </p>
        </div>
      </div>
    )
  }
)

WalletCard.displayName = "WalletCard"

export { WalletCard }
export type { WalletCardProps }
