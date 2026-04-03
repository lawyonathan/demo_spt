"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Wallet,
  Search,
  TrendingUp,
  ArrowLeftRight,
  Landmark,
  Coins,
  Rocket,
  Newspaper,
  Vote,
  ChevronDown,
  CreditCard,
  Settings,
  HelpCircle,
  Globe,
  Command,
} from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface CryptoNavItem {
  label: string
  icon: React.ElementType
  href?: string
  badge?: string | number
  soon?: boolean
}

interface CryptoNavSection {
  title: string
  items: CryptoNavItem[]
}

const navSections: CryptoNavSection[] = [
  {
    title: "Essentials",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/crypto", badge: 2 },
      { label: "My Portfolio", icon: Wallet },
    ],
  },
  {
    title: "Trading",
    items: [
      { label: "Market", icon: TrendingUp },
      { label: "Swap", icon: ArrowLeftRight },
      { label: "Bridge", icon: Globe },
    ],
  },
  {
    title: "Earn",
    items: [
      { label: "Staking", icon: Coins },
      { label: "Launchpad", icon: Rocket, soon: true },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Newses", icon: Newspaper },
      { label: "Voting", icon: Vote, soon: true },
    ],
  },
]

export interface CryptoSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const CryptoSidebar = React.forwardRef<HTMLDivElement, CryptoSidebarProps>(
  ({ className, collapsed = false, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col bg-white border-r border-gray-100",
          collapsed ? "w-16" : "w-60",
          "transition-all duration-200",
          className
        )}
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
            <Landmark className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-gray-900">Cryptio</span>
              <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Beta</span>
            </div>
          )}
        </div>

        {/* Wallet address */}
        {!collapsed && (
          <div className="mx-4 mb-3">
            <button className="flex w-full items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50 transition-colors">
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-400 to-blue-400" />
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-700 text-[11px]">0xa19...92814</p>
                <p className="text-[9px] text-gray-400">Smart Chain (BSC)</p>
              </div>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
          </div>
        )}

        {/* Search */}
        {!collapsed && (
          <div className="mx-4 mb-4">
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-400">
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1">Search</span>
              <div className="flex items-center gap-0.5 text-[10px] text-gray-300">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4">
              <p
                className={cn(
                  "px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400",
                  collapsed && "text-center"
                )}
              >
                {!collapsed ? section.title : ""}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.href ? pathname === item.href : false
                  const Comp = item.href ? Link : "button"
                  return (
                    <Comp
                      key={item.label}
                      href={item.href ?? "#"}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                        collapsed && "justify-center px-2",
                        item.soon && "opacity-50"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left truncate">
                            {item.label}
                          </span>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                "inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-emerald-500 text-white"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.soon && (
                            <span className="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                              Soon
                            </span>
                          )}
                        </>
                      )}
                    </Comp>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {!collapsed && (
          <div className="mx-4 mb-3">
            <button className="flex w-full items-center gap-2.5 rounded-xl bg-gray-50 border border-gray-100 px-3 py-3 text-left hover:bg-gray-100 transition-colors">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs font-semibold text-gray-800">Invest In Crypto</p>
                <p className="text-[10px] text-gray-400">20+ Payment Methods</p>
              </div>
              <ChevronDown className="h-3 w-3 text-gray-400 ml-auto -rotate-90" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
          {!collapsed && (
            <>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-gray-900 text-white">
                  <Landmark className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
                  <HelpCircle className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
                  <Settings className="h-3.5 w-3.5" />
                </button>
                <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
                  <Globe className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-gray-300 font-medium">V2.25</span>
            </>
          )}
        </div>
      </div>
    )
  }
)

CryptoSidebar.displayName = "CryptoSidebar"

export { CryptoSidebar }
