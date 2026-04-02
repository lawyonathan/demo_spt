"use client";

import { StatCard } from "@/components/ui/stat-card";
import { AreaChart } from "@/components/ui/area-chart";
import { DonutChart } from "@/components/ui/donut-chart";
import { WalletCard } from "@/components/ui/wallet-card";
import { SavingGoal } from "@/components/ui/saving-goal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/reui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Wallet,
  TrendingUp,
  CreditCard,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const monthlyExpensesData = [
  { label: "Jan", revenue: 18000, visits: 0 },
  { label: "Feb", revenue: 22000, visits: 0 },
  { label: "Mar", revenue: 19500, visits: 0 },
  { label: "Apr", revenue: 24000, visits: 0 },
  { label: "May", revenue: 21000, visits: 0 },
  { label: "Jun", revenue: 25200, visits: 0 },
];

const expenseSummaryData = [
  { label: "Food & Drink", value: 48, color: "#3b82f6" },
  { label: "Grocery", value: 32, color: "#10b981" },
  { label: "Shopping", value: 13, color: "#f59e0b" },
  { label: "Transport", value: 7, color: "#8b5cf6" },
];

const incomeSources = [
  { label: "Rental", amount: "$35,000", percent: 37, color: "bg-blue-500" },
  {
    label: "Investments",
    amount: "$28,000",
    percent: 30,
    color: "bg-purple-500",
  },
  { label: "Business", amount: "$18,000", percent: 19, color: "bg-amber-500" },
  {
    label: "Freelance",
    amount: "$11,000",
    percent: 12,
    color: "bg-emerald-500",
  },
];

const transactions = [
  {
    name: "Samantha William",
    initials: "SW",
    date: "Jan 12, 2026",
    type: "Income",
    amount: "+$1,640.26",
    isIncome: true,
  },
  {
    name: "Grocery Store",
    initials: "GS",
    date: "Jan 11, 2026",
    type: "Expense",
    amount: "-$72.64",
    isIncome: false,
  },
  {
    name: "Coffee Shop",
    initials: "CS",
    date: "Jan 10, 2026",
    type: "Expense",
    amount: "-$8.65",
    isIncome: false,
  },
  {
    name: "Freelance Project",
    initials: "FP",
    date: "Jan 9, 2026",
    type: "Income",
    amount: "+$980.75",
    isIncome: true,
  },
  {
    name: "Monthly Rent",
    initials: "MR",
    date: "Jan 8, 2026",
    type: "Expense",
    amount: "-$1,200.00",
    isIncome: false,
  },
];

const walletCards = [
  {
    type: "credit" as const,
    cardNumber: "5375 •••• •••• 2368",
    balance: "$5,325.57",
    label: "Credit Card",
  },
  {
    type: "digital" as const,
    cardNumber: "5375 •••• •••• 1847",
    balance: "$10,892.43",
    label: "Digital Card",
  },
  {
    type: "premium" as const,
    cardNumber: "4532 •••• •••• 9876",
    balance: "$2,156.89",
    label: "Premium Card",
  },
  {
    type: "business" as const,
    cardNumber: "3782 •••• •••• 5432",
    balance: "$15,743.21",
    label: "Business Card",
  },
];

export default function FinanceDashboardPage() {
  return (
    <div className="bg-muted/40 min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Finance Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            06 Mar 2026 - 02 Apr 2026
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Top Row — Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* My Balance */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">My Balance</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">$125,430</p>
                  <span className="text-xs font-medium text-emerald-600">
                    +12.5%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Transfer
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Net Profit */}
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
          iconClassName="bg-emerald-500/10"
          label="Net Profit"
          value="$38,700"
          change={8.5}
        />

        {/* Expenses */}
        <StatCard
          icon={<CreditCard className="h-5 w-5 text-destructive" />}
          iconClassName="bg-destructive/10"
          label="Expenses"
          value="$26,450"
          change={-5.5}
        />

        {/* Pending Invoices */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-amber-500/10 p-2.5">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Pending Invoices
                </p>
                <p className="text-2xl font-bold">$3,200</p>
                <p className="text-xs text-muted-foreground">
                  3 overdue invoices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Income Sources */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Income Sources</CardTitle>
                <CardDescription className="mt-1">
                  Total Income:{" "}
                  <span className="font-semibold text-foreground">
                    $94,000
                  </span>
                </CardDescription>
              </div>
              <Badge variant="secondary" shape="pill" size="sm">
                <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-600" />
                <span className="text-emerald-600">+15.5%</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomeSources.map((source) => (
              <div key={source.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{source.label}</span>
                  <span className="text-muted-foreground">
                    {source.amount} ({source.percent}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", source.color)}
                    style={{ width: `${source.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Expenses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>
                  Expense overview for the last 6 months
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AreaChart data={monthlyExpensesData} />
            <div className="mt-4 flex items-center justify-center">
              <Badge variant="secondary" shape="pill" size="sm">
                <TrendingUp className="mr-1 h-3 w-3 text-emerald-600" />
                Trending up by 5.2% this month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Expense Summary */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <DonutChart
              data={expenseSummaryData}
              size={200}
              strokeWidth={40}
              showLegend
              centerLabel="Total"
              centerValue="100%"
            />
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                          {tx.initials}
                        </div>
                        <span className="font-medium">{tx.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {tx.date}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.isIncome ? "secondary" : "outline"}
                        shape="pill"
                        size="sm"
                      >
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-medium",
                        tx.isIncome ? "text-emerald-600" : "text-red-500"
                      )}
                    >
                      {tx.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Final Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Saving Goal */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Saving Goal</CardTitle>
            <CardDescription>Track your savings progress</CardDescription>
          </CardHeader>
          <CardContent>
            <SavingGoal
              current={1052.98}
              target={1200}
              label="Vacation Fund"
            />
          </CardContent>
        </Card>

        {/* My Wallet */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>My Wallet</CardTitle>
            <CardDescription>Manage your cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {walletCards.map((card) => (
                <WalletCard
                  key={card.cardNumber}
                  type={card.type}
                  cardNumber={card.cardNumber}
                  balance={card.balance}
                  label={card.label}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
