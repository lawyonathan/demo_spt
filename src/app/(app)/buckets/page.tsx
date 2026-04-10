"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/reui/badge";
import { BucketForm } from "@/components/finance/bucket-form";
import { BucketRuleForm } from "@/components/finance/bucket-rule-form";
import { BudgetForm } from "@/components/finance/budget-form";
import { MonthlySelector } from "@/components/finance/monthly-selector";
import { formatCurrency, toMonthKey } from "@/lib/constants";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  DollarSign,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BucketRule {
  id: string;
  keyword: string;
}

interface Bucket {
  id: string;
  name: string;
  color: string;
  icon: string;
  sort_order: number;
  rules: BucketRule[];
}

interface MonthlyBudget {
  bucket_id: string;
  budget_amount: number;
}

export default function BucketsPage() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [budgets, setBudgets] = useState<MonthlyBudget[]>([]);
  const [month, setMonth] = useState(toMonthKey(new Date()));
  const [showCreate, setShowCreate] = useState(false);
  const [editBucket, setEditBucket] = useState<Bucket | null>(null);
  const [budgetBucket, setBudgetBucket] = useState<Bucket | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBuckets = useCallback(async () => {
    const res = await fetch("/api/buckets");
    if (res.ok) setBuckets(await res.json());
  }, []);

  const fetchBudgets = useCallback(async () => {
    const res = await fetch(`/api/monthly-budgets?month=${month}`);
    if (res.ok) setBudgets(await res.json());
  }, [month]);

  useEffect(() => {
    Promise.all([fetchBuckets(), fetchBudgets()]).finally(() =>
      setLoading(false)
    );
  }, [fetchBuckets, fetchBudgets]);

  function getBudget(bucketId: string): number {
    return budgets.find((b) => b.bucket_id === bucketId)?.budget_amount ?? 0;
  }

  async function handleCreate(data: { name: string; color: string }) {
    const res = await fetch("/api/buckets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    await fetchBuckets();
  }

  async function handleEdit(data: { name: string; color: string }) {
    if (!editBucket) return;
    const res = await fetch(`/api/buckets/${editBucket.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error);
    }
    setEditBucket(null);
    await fetchBuckets();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/buckets/${id}`, { method: "DELETE" });
    await fetchBuckets();
  }

  async function handleAddRule(bucketId: string, keyword: string) {
    await fetch("/api/bucket-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bucketId, keyword }),
    });
    await fetchBuckets();
  }

  async function handleDeleteRule(ruleId: string) {
    await fetch("/api/bucket-rules", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ruleId }),
    });
    await fetchBuckets();
  }

  async function handleSetBudget(amount: number) {
    if (!budgetBucket) return;
    await fetch("/api/monthly-budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bucketId: budgetBucket.id,
        month,
        budgetAmount: amount,
      }),
    });
    setBudgetBucket(null);
    await fetchBudgets();
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
          <h1 className="text-2xl font-bold">Buckets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your spending into categories
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="h-10">
          <Plus className="h-4 w-4 mr-2" />
          Add Bucket
        </Button>
      </div>

      {/* Month selector */}
      <div className="flex justify-center">
        <MonthlySelector month={month} onChange={setMonth} />
      </div>

      {/* Bucket list */}
      {buckets.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold">No buckets yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Create your first spending bucket to start organizing transactions
            </p>
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Bucket
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {buckets.map((bucket) => {
            const budget = getBudget(bucket.id);
            const isExpanded = expandedId === bucket.id;

            return (
              <Card
                key={bucket.id}
                className="overflow-hidden border-l-4 transition-shadow"
                style={{ borderLeftColor: bucket.color }}
              >
                <CardContent className="p-0">
                  {/* Main row */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : bucket.id)
                    }
                    className="flex w-full items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div
                      className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: bucket.color + "20" }}
                    >
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: bucket.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{bucket.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {bucket.rules.length} rule
                        {bucket.rules.length !== 1 ? "s" : ""} &middot; Budget:{" "}
                        {budget > 0 ? formatCurrency(budget) : "Not set"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBudgetBucket(bucket);
                        }}
                        title="Set budget"
                      >
                        <DollarSign className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditBucket(bucket);
                        }}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(bucket.id);
                        }}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </button>

                  {/* Expanded section: rules */}
                  {isExpanded && (
                    <div className="border-t px-4 py-4 bg-muted/20 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Auto-categorize rules
                      </p>
                      {bucket.rules.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {bucket.rules.map((rule) => (
                            <Badge
                              key={rule.id}
                              variant="secondary"
                              className="gap-1 pr-1"
                            >
                              {rule.keyword}
                              <button
                                onClick={() => handleDeleteRule(rule.id)}
                                className="ml-1 rounded-full p-0.5 hover:bg-background/50 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                      <BucketRuleForm
                        bucketId={bucket.id}
                        onAdd={(keyword) =>
                          handleAddRule(bucket.id, keyword)
                        }
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Transactions matching these keywords will auto-assign to
                        this bucket
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create dialog */}
      <BucketForm
        open={showCreate}
        onOpenChange={setShowCreate}
        onSubmit={handleCreate}
        mode="create"
      />

      {/* Edit dialog */}
      {editBucket && (
        <BucketForm
          open={!!editBucket}
          onOpenChange={(open) => !open && setEditBucket(null)}
          onSubmit={handleEdit}
          initialData={{ name: editBucket.name, color: editBucket.color }}
          mode="edit"
        />
      )}

      {/* Budget dialog */}
      {budgetBucket && (
        <BudgetForm
          open={!!budgetBucket}
          onOpenChange={(open) => !open && setBudgetBucket(null)}
          onSubmit={handleSetBudget}
          bucketName={budgetBucket.name}
          month={month}
          currentAmount={getBudget(budgetBucket.id)}
        />
      )}
    </div>
  );
}
