"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/reui/badge";
import { PlaidLinkButton } from "@/components/finance/plaid-link-button";
import {
  Landmark,
  Trash2,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface Account {
  id: string;
  institution_name: string;
  plaid_institution_id: string | null;
  created_at: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchAccounts = useCallback(async () => {
    const res = await fetch("/api/accounts");
    if (res.ok) setAccounts(await res.json());
  }, []);

  useEffect(() => {
    fetchAccounts().finally(() => setLoading(false));
  }, [fetchAccounts]);

  async function handleSync() {
    setSyncing(true);
    try {
      await fetch("/api/plaid/sync", { method: "POST" });
    } finally {
      setSyncing(false);
    }
  }

  async function handleDelete(accountId: string) {
    if (!confirm("Remove this account? All its transactions will be deleted.")) return;
    await fetch("/api/accounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountId }),
    });
    await fetchAccounts();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your linked bank accounts
          </p>
        </div>
        <div className="flex gap-2">
          {accounts.length > 0 && (
            <Button
              variant="outline"
              onClick={handleSync}
              disabled={syncing}
              className="h-11"
            >
              {syncing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Sync All
            </Button>
          )}
          <PlaidLinkButton onSuccess={fetchAccounts} />
        </div>
      </div>

      {/* Account list */}
      {accounts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Landmark className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold">No accounts linked</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Connect your bank accounts to start tracking spending
            </p>
            <PlaidLinkButton onSuccess={fetchAccounts} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <Landmark className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">
                    {account.institution_name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Connected{" "}
                    {new Date(account.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="default" className="shrink-0">
                  Connected
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-destructive hover:text-destructive shrink-0"
                  onClick={() => handleDelete(account.id)}
                  title="Remove account"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
