"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Download, LogOut, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState("");

  async function handleSync() {
    setSyncing(true);
    setSyncResult("");
    try {
      const res = await fetch("/api/plaid/sync", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setSyncResult(
          `Synced: ${data.added} added, ${data.modified} modified, ${data.removed} removed`
        );
      } else {
        setSyncResult("Sync failed. Check your Plaid configuration.");
      }
    } catch {
      setSyncResult("Network error during sync.");
    } finally {
      setSyncing(false);
    }
  }

  async function handleExport() {
    const res = await fetch(`/api/transactions?page=1`);
    if (!res.ok) return;
    const data = await res.json();

    const headers = ["Date", "Name", "Amount", "Category", "Bucket"];
    const rows = data.transactions.map(
      (t: { date: string; name: string; amount: number; category: string; bucket_name: string }) => [
        t.date,
        `"${t.name.replace(/"/g, '""')}"`,
        t.amount,
        t.category || "",
        t.bucket_name || "",
      ]
    );

    const csv = [headers.join(","), ...rows.map((r: string[]) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your app preferences
        </p>
      </div>

      {/* Sync */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sync Transactions</CardTitle>
          <CardDescription>
            Pull the latest transactions from all linked bank accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button onClick={handleSync} disabled={syncing} className="w-full sm:w-auto">
            {syncing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            {syncing ? "Syncing..." : "Sync Now"}
          </Button>
          {syncResult && (
            <p className="text-sm text-muted-foreground">{syncResult}</p>
          )}
        </CardContent>
      </Card>

      {/* Export */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export Data</CardTitle>
          <CardDescription>
            Download your transactions as a CSV file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Logout */}
      <Card>
        <CardContent className="pt-6">
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
