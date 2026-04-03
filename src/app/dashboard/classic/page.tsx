"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BarChart } from "@/components/ui/bar-chart"
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Download,
} from "lucide-react"

// ── Mock Data ──

const barChartData = [
  { label: "Jan", value: 4500 },
  { label: "Feb", value: 3200 },
  { label: "Mar", value: 2800 },
  { label: "Apr", value: 2100 },
  { label: "May", value: 3800 },
  { label: "Jun", value: 5200 },
  { label: "Jul", value: 2400 },
  { label: "Aug", value: 4100 },
  { label: "Sep", value: 3500 },
  { label: "Oct", value: 2000 },
  { label: "Nov", value: 4800 },
  { label: "Dec", value: 5800 },
]

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "https://i.pravatar.cc/40?img=47",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "https://i.pravatar.cc/40?img=68",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "https://i.pravatar.cc/40?img=45",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "https://i.pravatar.cc/40?img=52",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "https://i.pravatar.cc/40?img=44",
    initials: "SD",
  },
]

export default function ClassicDashboard() {
  return (
    <div className="bg-muted/40 min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Jan 20, 2023 - Feb 09, 2023
          </p>
        </div>
        <Button variant="default" size="sm" className="gap-2 w-auto self-start">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* ─── Metric Cards ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ─── Overview + Recent Sales ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            {/* Overview Chart */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart data={barChartData} className="h-72" />
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentSales.map((sale) => (
                    <div
                      key={sale.email}
                      className="flex items-center gap-4"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={sale.avatar} alt={sale.name} />
                        <AvatarFallback>{sale.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none">
                          {sale.name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {sale.email}
                        </p>
                      </div>
                      <div className="font-medium">{sale.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center text-muted-foreground">
              Analytics content coming soon
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generated reports will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center text-muted-foreground">
              Reports content coming soon
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Your notifications will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center text-muted-foreground">
              No new notifications
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
