"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CryptoStatCard } from "@/components/ui/crypto-stat-card"
import { PortfolioChart } from "@/components/ui/portfolio-chart"
import { SparklineChart } from "@/components/ui/sparkline-chart"
import { StakingCard } from "@/components/ui/staking-card"
import {
  ShieldCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ArrowDownUp,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

// ── Mock Data ──────────────────────────────────────────────

const statCards = [
  {
    label: "Earned Investments",
    value: "+1,150.50",
    change: 8.5,
    sparklineData: [30, 35, 28, 40, 38, 50, 55, 48, 60, 58, 65, 70],
    sparklineColor: "#10b981",
    sparklineVariant: "line" as const,
  },
  {
    label: "Earned Staking",
    value: "+300.42",
    change: 15.5,
    sparklineData: [20, 22, 25, 23, 30, 28, 35, 33, 40, 42, 38, 45],
    sparklineColor: "#6366f1",
    sparklineVariant: "line" as const,
  },
  {
    label: "No. Of Investements",
    value: "30",
    unit: "",
    change: 4.9,
    subtitle: "(24 Trades / 6 Stake)",
    sparklineData: [5, 8, 4, 7, 10, 6, 9, 12, 8, 11, 7, 10],
    sparklineColor: "#6366f1",
    sparklineVariant: "bar" as const,
  },
  {
    label: "Fees",
    value: "10,40",
    change: 20.2,
    sparklineData: [3, 5, 2, 6, 4, 8, 3, 7, 5, 9, 4, 6],
    sparklineColor: "#f43f5e",
    sparklineVariant: "bar" as const,
  },
]

const portfolioData = [
  { label: "01.04", value: 12450 },
  { label: "02.04", value: 12380 },
  { label: "03.04", value: 12600 },
  { label: "04.04", value: 12850 },
  { label: "05.04", value: 13050 },
  { label: "06.04", value: 12950 },
  { label: "07.04", value: 13200 },
]

const assets = [
  {
    name: "Ethereum",
    symbol: "ETH",
    amount: "2.301 ETH",
    price: "7656.34",
    change: 8.5,
    sparkline: [60, 62, 58, 65, 63, 70, 68, 72, 75, 73, 78, 80],
    color: "#6366f1",
    iconBg: "#6366f1",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    amount: "0.050 BTC",
    price: "3390.15",
    change: 3.3,
    sparkline: [40, 42, 38, 44, 41, 45, 43, 47, 46, 48, 44, 46],
    color: "#f97316",
    iconBg: "#f97316",
  },
  {
    name: "BNB",
    symbol: "BNB",
    amount: "2.74 BNB",
    price: "1583.28",
    change: -4.1,
    sparkline: [50, 48, 52, 46, 44, 47, 42, 40, 43, 38, 41, 36],
    color: "#eab308",
    iconBg: "#eab308",
  },
  {
    name: "Tether USDT",
    symbol: "USDT",
    amount: "924.46 USDT",
    price: "924.19",
    change: 0.0,
    sparkline: [30, 30, 30, 30, 31, 30, 30, 31, 30, 30, 30, 30],
    color: "#10b981",
    iconBg: "#10b981",
  },
]

const stakings = [
  {
    tokenName: "USDT",
    tokenAmount: "924.19 USDT",
    apr: 14.30,
    dailyEarnings: "10.03",
    iconColor: "#10b981",
    sparkline: [20, 22, 21, 23, 24, 22, 25, 24, 26, 25, 27, 28],
  },
  {
    tokenName: "BNB",
    tokenAmount: "2.15 BNB",
    apr: 24.27,
    dailyEarnings: "15.58",
    iconColor: "#eab308",
    sparkline: [15, 18, 16, 20, 22, 19, 24, 23, 26, 25, 28, 30],
  },
  {
    tokenName: "ETH",
    tokenAmount: "0.50 ETH",
    apr: 8.12,
    dailyEarnings: "5.22",
    iconColor: "#6366f1",
    sparkline: [10, 12, 11, 14, 13, 15, 14, 16, 15, 17, 16, 18],
  },
]

const stakingHistory = [
  {
    type: "Stake",
    date: "05.04.2024",
    detail: "Flexible Staking",
    amount: "350.50",
    token: "USDT",
    isPositive: true,
  },
  {
    type: "Claimed Reward",
    date: "04.04.2024",
    detail: "Success",
    amount: "10.25",
    token: "USDT",
    isPositive: true,
  },
  {
    type: "Unstaked",
    date: "02.04.2024",
    detail: "Success",
    amount: "1,120",
    token: "BNB",
    isPositive: false,
  },
  {
    type: "Stake",
    date: "01.04.2024",
    detail: "Locked 30 Days",
    amount: "500.00",
    token: "USDT",
    isPositive: true,
  },
]

// ── Time Period Tabs ────────────────────────────────────────

function PeriodTabs({
  active,
  onChange,
  className,
}: {
  active: string
  onChange: (v: string) => void
  className?: string
}) {
  const periods = ["1D", "7D", "14D", "31D"]
  return (
    <div className={cn("flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5", className)}>
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors",
            active === p
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {p}
        </button>
      ))}
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────

export default function CryptoDashboardPage() {
  const [period, setPeriod] = useState("7D")
  const [stakingPeriod, setStakingPeriod] = useState("7D")
  const [portfolioView, setPortfolioView] = useState<"assets" | "charts">("assets")

  return (
    <div className="p-6 space-y-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Overview</h1>
          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-500">
            <ShieldCheck className="h-3 w-3 text-blue-500" />
            Verified Trader
          </span>
        </div>
        <PeriodTabs active={period} onChange={setPeriod} />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <CryptoStatCard
            key={card.label}
            label={card.label}
            value={card.value}
            unit={card.unit !== undefined ? card.unit : "USD"}
            change={card.change}
            subtitle={card.subtitle}
            sparklineData={card.sparklineData}
            sparklineVariant={card.sparklineVariant}
            sparklineColor={card.sparklineColor}
          />
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Portfolio Chart */}
        <div className="lg:col-span-3 rounded-xl border bg-white p-5">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-500">My Portfolio</p>
                <span className="text-xs font-semibold text-emerald-500">+4.3%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                13,200.50{" "}
                <span className="text-sm font-normal text-gray-400">USD</span>
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5">
              <button
                onClick={() => setPortfolioView("assets")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors",
                  portfolioView === "assets"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <BarChart3 className="h-3 w-3" />
                Top Assets
              </button>
              <button
                onClick={() => setPortfolioView("charts")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors",
                  portfolioView === "charts"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <BarChart3 className="h-3 w-3" />
                Charts
              </button>
            </div>
          </div>
          <PortfolioChart
            data={portfolioData}
            lineColor="#10b981"
            className="mt-2"
          />
        </div>

        {/* Staked Tokens */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-500">Staked Tokens</p>
                <span className="text-xs font-semibold text-emerald-500">+2.5%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                2,279.02{" "}
                <span className="text-sm font-normal text-gray-400">USD</span>
              </p>
            </div>
            <PeriodTabs active={stakingPeriod} onChange={setStakingPeriod} className="text-[10px]" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-4">
            <button className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-600 transition-colors">
              Redeem 10.03 USDT
            </button>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Stake Tokens
            </button>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Unstake Tokens
            </button>
          </div>

          {/* My Stakings */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-900">
              My Stakings{" "}
              <span className="text-gray-400 font-normal">(3)</span>
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button className="p-1 rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Staking cards row */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {stakings.slice(0, 2).map((s) => (
              <StakingCard
                key={s.tokenName}
                tokenName={s.tokenName}
                tokenAmount={s.tokenAmount}
                apr={s.apr}
                dailyEarnings={s.dailyEarnings}
                sparklineData={s.sparkline}
                iconColor={s.iconColor}
                className="flex-1 min-w-[180px]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Assets Table */}
        <div className="lg:col-span-3 rounded-xl border bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">
              Assets{" "}
              <span className="text-gray-400 font-normal">(6)</span>
            </p>
            <button className="flex items-center gap-1 text-[11px] text-gray-500 font-medium border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">
              Sort By
              <ArrowDownUp className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-0">
            {assets.map((asset, idx) => (
              <div
                key={asset.symbol}
                className={cn(
                  "flex items-center gap-3 py-3",
                  idx < assets.length - 1 && "border-b border-gray-100"
                )}
              >
                {/* Icon */}
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                  style={{ backgroundColor: `${asset.iconBg}15` }}
                >
                  <div
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: asset.iconBg }}
                  />
                </div>

                {/* Name */}
                <div className="min-w-[100px]">
                  <p className="text-sm font-semibold text-gray-900">{asset.name}</p>
                  <p className="text-[11px] text-gray-400">{asset.amount}</p>
                </div>

                {/* Sparkline */}
                <div className="flex-1 flex justify-center">
                  <SparklineChart
                    data={asset.sparkline}
                    variant="line"
                    color={asset.color}
                    width={100}
                    height={28}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Change */}
                <div className="min-w-[50px] text-right">
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      asset.change > 0
                        ? "text-emerald-500"
                        : asset.change < 0
                        ? "text-red-500"
                        : "text-gray-400"
                    )}
                  >
                    {asset.change > 0 ? "+" : ""}
                    {asset.change}%
                  </span>
                </div>

                {/* Price */}
                <div className="min-w-[80px] text-right">
                  <span className="text-sm font-bold text-gray-900">
                    {asset.price}
                  </span>
                  <span className="text-[10px] text-gray-400 ml-0.5">USD</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staking History */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">
              Staking History{" "}
              <span className="text-gray-400 font-normal">(22)</span>
            </p>
            <button className="flex items-center gap-1 text-[11px] text-gray-500 font-medium border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50">
              Sort By
              <ArrowDownUp className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-0">
            {stakingHistory.map((item, idx) => (
              <div
                key={`${item.type}-${item.date}`}
                className={cn(
                  "flex items-center gap-3 py-3",
                  idx < stakingHistory.length - 1 && "border-b border-gray-100"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full shrink-0",
                    item.isPositive ? "bg-emerald-50" : "bg-red-50"
                  )}
                >
                  {item.isPositive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{item.type}</p>
                  <p className="text-[11px] text-gray-400">{item.date}</p>
                </div>

                {/* Badge */}
                <span
                  className={cn(
                    "text-[10px] font-medium px-2 py-0.5 rounded-full",
                    item.detail === "Success"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {item.detail}
                </span>

                {/* Amount */}
                <div className="text-right flex items-center gap-1">
                  <div
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      item.isPositive ? "bg-emerald-500" : "bg-red-500"
                    )}
                  />
                  <span className="text-xs font-bold text-gray-900">
                    {item.amount}
                  </span>
                  <span className="text-[10px] text-gray-400">{item.token}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
