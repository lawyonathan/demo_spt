"use client"

import { useState } from "react"
import { StatCard } from "@/components/ui/stat-card"
import { AreaChart } from "@/components/ui/area-chart"
import { MiniCalendar } from "@/components/ui/mini-calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/reui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Users,
  DollarSign,
  Building,
  CheckCircle,
  Download,
  Eye,
  MapPin,
  MoreHorizontal,
  TrendingUp,
  Clock,
  Phone,
  Mail,
} from "lucide-react"

// ── Mock Data ──

const chartData = [
  { label: "Jan", revenue: 30000, visits: 18000 },
  { label: "Feb", revenue: 42000, visits: 22000 },
  { label: "Mar", revenue: 35000, visits: 28000 },
  { label: "Apr", revenue: 50000, visits: 32000 },
  { label: "May", revenue: 48000, visits: 25000 },
  { label: "Jun", revenue: 62000, visits: 35000 },
  { label: "Jul", revenue: 55000, visits: 30000 },
  { label: "Aug", revenue: 72000, visits: 42000 },
  { label: "Sep", revenue: 68000, visits: 38000 },
  { label: "Oct", revenue: 80000, visits: 45000 },
  { label: "Nov", revenue: 75000, visits: 40000 },
  { label: "Dec", revenue: 90000, visits: 52000 },
]

const salesChannels = [
  { name: "Online Sale", amount: "$3,425", color: "bg-info", percent: 30 },
  { name: "Offline Sale", amount: "$3,120", color: "bg-chart-2", percent: 27 },
  { name: "Agent Sale", amount: "$2,472", color: "bg-warning", percent: 22 },
  {
    name: "Marketing Sale",
    amount: "$5,120",
    color: "bg-success",
    percent: 45,
  },
]

const reminders = [
  {
    date: "Oct 08",
    title: "Follow up with client",
    description: "Re: downtown apartment inquiry",
    avatars: ["JC", "MD"],
  },
  {
    date: "Oct 12",
    title: "Upload new photos",
    description: "The Somerset property shoot",
    avatars: ["KL"],
  },
  {
    date: "Oct 17",
    title: "Review sales contract",
    description: "Maison Sterling closing docs",
    avatars: ["JD", "EC"],
  },
]

const leadsContacts = [
  {
    name: "Jessica Chen",
    location: "New York, Albany",
    initials: "JC",
    avatar: "https://i.pravatar.cc/100?img=20",
    color: "bg-pink-500",
  },
  {
    name: "John Doe",
    location: "California, LA",
    initials: "JD",
    avatar: "https://i.pravatar.cc/100?img=11",
    color: "bg-blue-500",
  },
  {
    name: "Hailee S.",
    location: "New York, Troy",
    initials: "HS",
    avatar: "https://i.pravatar.cc/100?img=32",
    color: "bg-amber-500",
  },
  {
    name: "Evan Chris",
    location: "Ohio, Columbus",
    initials: "EC",
    avatar: "https://i.pravatar.cc/100?img=53",
    color: "bg-emerald-500",
  },
]

// Unsplash property images (free, no auth needed for demo)
const propertyImages: Record<string, string> = {
  "Summer House":
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=100&h=100&fit=crop",
  "Cheery Castle":
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop",
  "Lazy Shore Palace":
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=100&h=100&fit=crop",
  "Green Hangout Place":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop",
  "Relaxed House":
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=100&h=100&fit=crop",
  "Maison Sterling":
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=100&h=100&fit=crop",
  "The Orchid":
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=100&h=100&fit=crop",
  "Echelon West":
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=100&h=100&fit=crop",
  "La Residence":
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=100&h=100&fit=crop",
}

const properties = [
  {
    name: "Summer House",
    location: "Beverly Hills, CA",
    type: "Residential",
    cost: "$655K",
    leads: 9,
    views: 267,
    status: "Available",
  },
  {
    name: "Cheery Castle",
    location: "Malibu, CA",
    type: "Villa",
    cost: "$1.2M",
    leads: 15,
    views: 412,
    status: "Available",
  },
  {
    name: "Lazy Shore Palace",
    location: "Miami, FL",
    type: "Commercial",
    cost: "$3.8M",
    leads: 22,
    views: 580,
    status: "Under Contract",
  },
  {
    name: "Green Hangout Place",
    location: "Portland, OR",
    type: "Residential",
    cost: "$420K",
    leads: 7,
    views: 195,
    status: "Available",
  },
  {
    name: "Relaxed House",
    location: "Austin, TX",
    type: "Residential",
    cost: "$380K",
    leads: 12,
    views: 310,
    status: "Sold",
  },
  {
    name: "Maison Sterling",
    location: "New York, NY",
    type: "Penthouse",
    cost: "$1.5M",
    leads: 32,
    views: 125,
    status: "8/12 Occupied",
  },
  {
    name: "The Orchid",
    location: "San Francisco, CA",
    type: "Condo",
    cost: "$890K",
    leads: 18,
    views: 342,
    status: "Available",
  },
  {
    name: "Echelon West",
    location: "Seattle, WA",
    type: "Commercial",
    cost: "$2.1M",
    leads: 5,
    views: 88,
    status: "Under Contract",
  },
  {
    name: "La Residence",
    location: "Chicago, IL",
    type: "Residential",
    cost: "$720K",
    leads: 14,
    views: 256,
    status: "Available",
  },
]

const calendarEvents = [
  {
    date: new Date(2026, 3, 2, 10, 0),
    title: "Visit Client Michael Reynolds",
    color: "#3b82f6",
  },
  {
    date: new Date(2026, 3, 2, 14, 0),
    title: "Visit Client Sarah Thompson",
    color: "#8b5cf6",
  },
  {
    date: new Date(2026, 3, 2, 16, 30),
    title: "Follow Up Aaliyah Lovato",
    color: "#f59e0b",
  },
  {
    date: new Date(2026, 3, 7, 9, 0),
    title: "Property Inspection - The Orchid",
    color: "#10b981",
  },
  {
    date: new Date(2026, 3, 15, 11, 0),
    title: "Contract Signing - Maison Sterling",
    color: "#ef4444",
  },
  {
    date: new Date(2026, 3, 20, 13, 0),
    title: "Open House - Summer House",
    color: "#3b82f6",
  },
]

function statusBadgeVariant(status: string) {
  switch (status) {
    case "Available":
      return "soft-success" as const
    case "Sold":
      return "soft-destructive" as const
    case "Under Contract":
      return "soft-warning" as const
    default:
      return "soft-info" as const
  }
}

// ── Main Page Component ──
export default function RealEstateDashboard() {
  const [chartPeriod, setChartPeriod] = useState("M")

  return (
    <div className="bg-muted/40 min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Real Estate</h1>
          <p className="text-sm text-muted-foreground">
            06 Mar 2026 - 02 Apr 2026
          </p>
        </div>
        <Button variant="default" size="sm" className="gap-2 w-auto self-start">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>

      {/* ─── Metrics Row ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          iconClassName="bg-primary/10 text-primary"
          label="Active Leads"
          value="120"
          change={12}
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5" />}
          iconClassName="bg-warning/10 text-warning"
          label="Total Revenue"
          value="$96.7M"
          change={12}
        />
        <StatCard
          icon={<Building className="h-5 w-5" />}
          iconClassName="bg-success/10 text-success"
          label="Active Listing"
          value="23"
          change={-12}
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          iconClassName="bg-info/10 text-info"
          label="Total Closed"
          value="42"
          change={12}
        />
      </div>

      {/* ─── Featured Property + Chart ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Property */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">The Somerset</CardTitle>
                <CardDescription>Featured Property</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Stats row */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="font-semibold">175</span>
                <span className="text-muted-foreground">Sold</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-info" />
                <span className="font-semibold">125</span>
                <span className="text-muted-foreground">Rented</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="font-semibold">2K+</span>
                <span className="text-muted-foreground">Views</span>
              </div>
            </div>

            {/* Property image */}
            <div className="relative h-44 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=400&fit=crop"
                alt="The Somerset"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <Badge variant="soft" shape="pill" className="text-xs bg-white/20 text-white border-0 backdrop-blur-sm">
                  Recommended to 14 Leads
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="default" shape="pill" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  2,345 views
                </Badge>
              </div>
            </div>

            {/* Deal progress */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Closed Deals</span>
                  <span className="font-semibold">42</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">On Progress</span>
                  <span className="font-semibold">132</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue / Visit Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Performance</CardTitle>
              <div className="flex gap-1 rounded-lg bg-muted p-1">
                {["W", "M", "Y"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                      chartPeriod === p
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <AreaChart data={chartData} className="h-64" />
          </CardContent>
        </Card>
      </div>

      {/* ─── Sales Analytics + Reminders + Leads ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Analytics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesChannels.map((ch) => (
              <div key={ch.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${ch.color}`} />
                    <span className="text-muted-foreground">{ch.name}</span>
                  </div>
                  <span className="font-semibold">{ch.amount}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${ch.color} transition-all`}
                    style={{ width: `${ch.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reminders */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Reminders</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {reminders.map((r, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 px-2.5 py-1.5 text-center min-w-[48px]">
                  <span className="text-[10px] font-medium text-primary leading-tight">
                    {r.date.split(" ")[0]}
                  </span>
                  <span className="text-lg font-bold text-primary leading-tight">
                    {r.date.split(" ")[1]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {r.description}
                  </p>
                  <div className="mt-1.5 flex -space-x-1.5">
                    {r.avatars.map((a, j) => (
                      <div
                        key={j}
                        className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-card bg-muted text-[9px] font-semibold"
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leads Contact */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Leads Contact</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {leadsContacts.map((lead, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={lead.avatar} alt={lead.name} />
                  <AvatarFallback
                    className={`${lead.color} text-white text-xs font-semibold`}
                  >
                    {lead.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {lead.location}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ─── Property Overview + Calendar ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Property Overview - 2 cols */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-lg">Property Overview</CardTitle>
                <CardDescription>
                  Manage and track your property listings
                </CardDescription>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">1,323</span>
                  <span className="text-muted-foreground">Total</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="font-semibold">823</span>
                  <span className="text-muted-foreground">Listed (65%)</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-info" />
                  <span className="font-semibold">409</span>
                  <span className="text-muted-foreground">Sold (35%)</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16"></TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Type</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Leads
                  </TableHead>
                  <TableHead className="hidden lg:table-cell text-center">
                    Views
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((p) => (
                  <TableRow key={p.name}>
                    <TableCell>
                      <div className="h-10 w-14 rounded-md overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={propertyImages[p.name]}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {p.location}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {p.type}
                    </TableCell>
                    <TableCell className="font-semibold">{p.cost}</TableCell>
                    <TableCell className="hidden md:table-cell text-center">
                      <span className="flex items-center justify-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {p.leads}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-center">
                      <span className="flex items-center justify-center gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {p.views}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusBadgeVariant(p.status)}
                        shape="pill"
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Schedule</CardTitle>
              <Badge variant="soft" size="sm" shape="pill">
                <Clock className="h-3 w-3 mr-1" />3 Today
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <MiniCalendar events={calendarEvents} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
