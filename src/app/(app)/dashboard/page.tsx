"use client";

import { useState, useEffect, useCallback } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { DonutChart } from "@/components/ui/donut-chart";
import { BarChart } from "@/components/ui/bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/reui/badge";
import { Progress } from "@/components/ui/progress";
import { MonthlySelector } from "@/components/finance/monthly-selector";
import { AnimatedNumber } from "@/components/cult/animated-number";
import { formatCurrency, toMonthKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Wallet,
  TrendingDown,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface BucketOverview {
  bucket_id: string;
  bucket_name: string;
  bucket_color: string;
  spent: number;
  budget: number;
  remaining: number;
}

interface DailySpending {
  date: string;
  total: number;
}

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  bucket_name: string | null;
  bucket_color: string | null;
}

interface OverviewData {
  month: string;
  totalSpent: number;
  totalBudget: number;
  totalRemaining: number;
  uncategorizedSpent: number;
  buckets: BucketOverview[];
  dailySpending: DailySpending[];
  recentTransactions: Transaction[];
}

export default function DashboardPage() {
  const [month, setMonth] = useState(toMonthKey(new Date()));
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const res = await fetch(`/api/overview?month=${month}`);
    if (res.ok) setData(await res.json());
  }, [month]);

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [fetchData]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const donutData = data.buckets
    .filter((b) => b.spent > 0)
    .map((b) => ({
      label: b.bucket_name,
      value: b.spent,
      color: b.bucket_color,
    }));

  if (data.uncategorizedSpent > 0) {
    donutData.push({
      label: "Uncategorized",
      value: data.uncategorizedSpent,
      color: "#94a3b8",
    });
  }

  const barData = data.dailySpending.map((d) => ({
    label: new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
      day: "numeric",
    }),
    value: d.total,
  }));

  const spentPercent =
    data.totalBudget > 0
      ? Math.round((data.totalSpent / data.totalBudget) * 100)
      : 0;

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MonthlySelector month={month} onChange={setMonth} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Wallet className="h-5 w-5" />}
          label="Total Budget"
          value={formatCurrency(data.totalBudget)}
          change={0}
          iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />
        <StatCard
          icon={<TrendingDown className="h-5 w-5" />}
          label="Total Spent"
          value={formatCurrency(data.totalSpent)}
          change={-spentPercent}
          iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
        />
        <StatCard
          icon={<PiggyBank className="h-5 w-5" />}
          label="Remaining"
          value={formatCurrency(Math.max(data.totalRemaining, 0))}
          change={data.totalRemaining >= 0 ? 100 - spentPercent : -(spentPercent - 100)}
          iconClassName={cn(
            data.totalRemaining >= 0
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
              : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
          )}
        />
      </div>

      {/* Bucket grid + Donut chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bucket progress cards */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold">Buckets</h2>
          {data.buckets.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-8 text-center text-muted-foreground">
                No buckets created yet. Go to Buckets to create your first one.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.buckets.map((bucket) => {
                const percent =
                  bucket.budget > 0
                    ? Math.min((bucket.spent / bucket.budget) * 100, 100)
                    : 0;
                const isOver = bucket.spent > bucket.budget && bucket.budget > 0;

                return (
                  <Card
                    key={bucket.bucket_id}
                    className="border-l-4 overflow-hidden"
                    style={{ borderLeftColor: bucket.bucket_color }}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {bucket.bucket_name}
                        </span>
                        {isOver && (
                          <Badge
                            variant="destructive"
                            className="text-[10px] px-1.5 py-0"
                          >
                            Over
                          </Badge>
                        )}
                      </div>
                      <Progress
                        value={percent}
                        className={cn(
                          "h-2",
                          isOver && "[&>div]:bg-destructive"
                        )}
                      />
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold">
                          <AnimatedNumber
                            value={bucket.spent}
                            prefix="$"
                            formatOptions={{
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }}
                          />
                          <span className="text-muted-foreground font-normal">
                            {" "}
                            / {formatCurrency(bucket.budget)}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "font-semibold",
                            isOver ? "text-destructive" : "text-emerald-600"
                          )}
                        >
                          {formatCurrency(Math.abs(bucket.remaining))} left
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Donut chart */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Spending Breakdown</h2>
          <Card>
            <CardContent className="p-4 flex justify-center">
              {donutData.length > 0 ? (
                <DonutChart
                  data={donutData}
                  size={200}
                  strokeWidth={28}
                  centerLabel="Total"
                  centerValue={formatCurrency(data.totalSpent)}
                />
              ) : (
                <p className="text-sm text-muted-foreground py-8">
                  No spending data yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Daily spending bar chart */}
      {barData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Daily Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={barData} className="h-[240px]" />
          </CardContent>
        </Card>
      )}

      {/* Recent transactions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        {data.recentTransactions.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center text-muted-foreground">
              No transactions this month
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {data.recentTransactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
                        txn.amount > 0
                          ? "bg-red-50 dark:bg-red-950"
                          : "bg-emerald-50 dark:bg-emerald-950"
                      )}
                    >
                      {txn.amount > 0 ? (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{txn.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(txn.date + "T00:00:00").toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                        {txn.bucket_name && (
                          <>
                            {" "}
                            &middot;{" "}
                            <span
                              style={{ color: txn.bucket_color || undefined }}
                            >
                              {txn.bucket_name}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-sm font-semibold tabular-nums",
                        txn.amount > 0 ? "text-foreground" : "text-emerald-600"
                      )}
                    >
                      {txn.amount > 0 ? "-" : "+"}
                      {formatCurrency(Math.abs(txn.amount))}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
