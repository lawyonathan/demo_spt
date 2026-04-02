"use client";

import {
  Users,
  Briefcase,
  Wallet,
  Target,
  Download,
  Check,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { DonutChart } from "@/components/ui/donut-chart";
import { PipelineBar } from "@/components/ui/pipeline-bar";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const leadsSourceData = [
  { label: "Social", value: 275, color: "#3b82f6" },
  { label: "Email", value: 200, color: "#8b5cf6" },
  { label: "Call", value: 287, color: "#f59e0b" },
  { label: "Others", value: 173, color: "#10b981" },
];

const pipelineStages = [
  { name: "Lead", deals: 235, amount: "$420,500", percent: 38, color: "#3b82f6" },
  { name: "Qualified", deals: 146, amount: "$267,800", percent: 24, color: "#8b5cf6" },
  { name: "Proposal", deals: 84, amount: "$192,400", percent: 18, color: "#f59e0b" },
  { name: "Negotiation", deals: 52, amount: "$129,600", percent: 12, color: "#10b981" },
  { name: "Closed Won", deals: 36, amount: "$87,200", percent: 8, color: "#ef4444" },
];

const tasks = [
  {
    id: 1,
    text: "Follow up with Acme Inc.",
    priority: "High",
    priorityVariant: "soft-destructive" as const,
    due: "Due Today",
  },
  {
    id: 2,
    text: "Prepare quarterly report",
    priority: "Medium",
    priorityVariant: "soft-warning" as const,
    due: "Due Tomorrow",
  },
  {
    id: 3,
    text: "Update customer profiles",
    priority: "Low",
    priorityVariant: "soft" as const,
    due: "Due Oct 15",
  },
];

const recentLeads = [
  {
    name: "Olivia Martin",
    email: "olivia@email.com",
    initials: "OM",
    amount: "$1,999",
    status: "Won",
    statusVariant: "soft-success" as const,
  },
  {
    name: "Jackson Lee",
    email: "jackson@email.com",
    initials: "JL",
    amount: "$39",
    status: "Processing",
    statusVariant: "soft-warning" as const,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella@email.com",
    initials: "IN",
    amount: "$299",
    status: "Won",
    statusVariant: "soft-success" as const,
  },
  {
    name: "William Kim",
    email: "william@email.com",
    initials: "WK",
    amount: "$99",
    status: "Failed",
    statusVariant: "soft-destructive" as const,
  },
  {
    name: "Sofia Davis",
    email: "sofia@email.com",
    initials: "SD",
    amount: "$39",
    status: "Processing",
    statusVariant: "soft-warning" as const,
  },
];

export default function CRMDashboardPage() {
  const targetPercent = 48;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (targetPercent / 100) * circumference;

  return (
    <div className="bg-muted/40 min-h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRM Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            06 Mar 2026 - 02 Apr 2026
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="h-5 w-5 text-primary" />}
          iconClassName="bg-primary/10"
          label="Total Customers"
          value="1,890"
          change={10.4}
        />
        <StatCard
          icon={<Briefcase className="h-5 w-5 text-warning" />}
          iconClassName="bg-warning/10"
          label="Total Deals"
          value="1,300"
          change={-0.8}
        />
        <StatCard
          icon={<Wallet className="h-5 w-5 text-success" />}
          iconClassName="bg-success/10"
          label="Total Revenue"
          value="$435,578"
          change={20.1}
        />

        {/* Target Progress with circular ring */}
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="relative flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 100 100" className="-rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-info"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="h-5 w-5 text-info" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Target Progress</span>
              <span className="text-2xl font-bold">{targetPercent}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leads by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Breakdown of lead acquisition channels</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={leadsSourceData}
              size={220}
              strokeWidth={32}
              showLegend
              centerValue="935"
              centerLabel="Total Leads"
            />
          </CardContent>
        </Card>

        {/* Sales Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Current deal progression across stages</CardDescription>
          </CardHeader>
          <CardContent>
            <PipelineBar stages={pipelineStages} />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tasks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Upcoming tasks and follow-ups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 border-b last:border-b-0 py-3 first:pt-0 last:pb-0"
              >
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.text}</p>
                  <p className="text-xs text-muted-foreground">{task.due}</p>
                </div>
                <Badge variant={task.priorityVariant} shape="pill" size="sm">
                  {task.priority}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest incoming leads and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLeads.map((lead) => (
                  <TableRow key={lead.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {lead.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{lead.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.email}
                    </TableCell>
                    <TableCell className="font-medium">{lead.amount}</TableCell>
                    <TableCell>
                      <Badge variant={lead.statusVariant} shape="pill" size="sm">
                        {lead.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
