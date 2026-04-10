"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/reui/badge";
import { Button } from "@/components/ui/button";
import { TransactionFilters } from "@/components/finance/transaction-filters";
import { formatCurrency, toMonthKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string | null;
  bucket_id: string | null;
  bucket_name: string | null;
  bucket_color: string | null;
  pending: number;
}

interface Bucket {
  id: string;
  name: string;
  color: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [month, setMonth] = useState(toMonthKey(new Date()));
  const [bucketId, setBucketId] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBuckets = useCallback(async () => {
    const res = await fetch("/api/buckets");
    if (res.ok) {
      const data = await res.json();
      setBuckets(data);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    const params = new URLSearchParams({ month, page: String(page) });
    if (bucketId && bucketId !== "all") params.set("bucketId", bucketId);
    if (search) params.set("search", search);

    const res = await fetch(`/api/transactions?${params}`);
    if (res.ok) {
      const data = await res.json();
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    }
  }, [month, bucketId, search, page]);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  useEffect(() => {
    setLoading(true);
    fetchTransactions().finally(() => setLoading(false));
  }, [fetchTransactions]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [month, bucketId, search]);

  async function handleAssignBucket(
    transactionId: string,
    newBucketId: string
  ) {
    await fetch("/api/transactions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transactionId,
        bucketId: newBucketId === "none" ? null : newBucketId,
      }),
    });
    await fetchTransactions();
  }

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {total} transaction{total !== 1 ? "s" : ""} found
        </p>
      </div>

      <TransactionFilters
        month={month}
        onMonthChange={setMonth}
        bucketId={bucketId}
        onBucketChange={setBucketId}
        search={search}
        onSearchChange={setSearch}
        buckets={buckets}
      />

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      ) : transactions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <ArrowLeftRight className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold">No transactions</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {search
                ? "No transactions match your search"
                : "Link a bank account to start seeing transactions"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-2">
            {transactions.map((txn) => (
              <Card key={txn.id} className="overflow-hidden">
                <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                  {/* Amount indicator */}
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shrink-0",
                      txn.amount > 0
                        ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                        : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                    )}
                  >
                    {txn.amount > 0 ? "-" : "+"}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {txn.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(txn.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}
                      {txn.pending ? (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-[10px] px-1 py-0"
                        >
                          Pending
                        </Badge>
                      ) : null}
                    </p>
                  </div>

                  {/* Bucket selector */}
                  <Select
                    value={txn.bucket_id || "none"}
                    onValueChange={(val) => handleAssignBucket(txn.id, val)}
                  >
                    <SelectTrigger className="w-[130px] h-8 text-xs shrink-0">
                      <SelectValue>
                        {txn.bucket_name ? (
                          <div className="flex items-center gap-1.5">
                            <div
                              className="h-2 w-2 rounded-full shrink-0"
                              style={{
                                backgroundColor: txn.bucket_color || "#999",
                              }}
                            />
                            <span className="truncate">{txn.bucket_name}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            Assign...
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {buckets.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: b.color }}
                            />
                            {b.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Amount */}
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums shrink-0",
                      txn.amount > 0 ? "text-foreground" : "text-emerald-600"
                    )}
                  >
                    {txn.amount > 0 ? "-" : "+"}
                    {formatCurrency(Math.abs(txn.amount))}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
