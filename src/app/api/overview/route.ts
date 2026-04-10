import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

interface BucketSpending {
  bucket_id: string;
  bucket_name: string;
  bucket_color: string;
  spent: number;
}

interface BudgetRow {
  bucket_id: string;
  budget_amount: number;
}

interface DailySpending {
  date: string;
  total: number;
}

export async function GET(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const month = request.nextUrl.searchParams.get("month");
  if (!month) {
    return Response.json({ error: "month parameter required" }, { status: 400 });
  }

  // Per-bucket spending for the month
  const bucketSpending = db
    .prepare(
      `SELECT
        b.id as bucket_id,
        b.name as bucket_name,
        b.color as bucket_color,
        COALESCE(SUM(CASE WHEN t.amount > 0 THEN t.amount ELSE 0 END), 0) as spent
       FROM buckets b
       LEFT JOIN transactions t ON t.bucket_id = b.id AND t.date LIKE ?
       GROUP BY b.id
       ORDER BY b.sort_order, b.name`
    )
    .all(`${month}%`) as BucketSpending[];

  // Monthly budgets
  const budgets = db
    .prepare("SELECT bucket_id, budget_amount FROM monthly_budgets WHERE month = ?")
    .all(month) as BudgetRow[];

  const budgetMap = new Map(budgets.map((b) => [b.bucket_id, b.budget_amount]));

  // Total spending (all transactions in month, positive amounts = expenses)
  const totalRow = db
    .prepare(
      `SELECT COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) as total_spent
       FROM transactions WHERE date LIKE ?`
    )
    .get(`${month}%`) as { total_spent: number };

  // Uncategorized spending
  const uncategorizedRow = db
    .prepare(
      `SELECT COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) as spent
       FROM transactions WHERE date LIKE ? AND bucket_id IS NULL`
    )
    .get(`${month}%`) as { spent: number };

  // Daily spending trend for the month
  const dailySpending = db
    .prepare(
      `SELECT date, SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as total
       FROM transactions
       WHERE date LIKE ?
       GROUP BY date
       ORDER BY date`
    )
    .all(`${month}%`) as DailySpending[];

  // Recent transactions (last 10)
  const recentTransactions = db
    .prepare(
      `SELECT t.*, b.name as bucket_name, b.color as bucket_color
       FROM transactions t
       LEFT JOIN buckets b ON b.id = t.bucket_id
       WHERE t.date LIKE ?
       ORDER BY t.date DESC, t.created_at DESC
       LIMIT 10`
    )
    .all(`${month}%`);

  // Combine bucket spending with budgets
  const bucketOverview = bucketSpending.map((bs) => ({
    ...bs,
    budget: budgetMap.get(bs.bucket_id) ?? 0,
    remaining: (budgetMap.get(bs.bucket_id) ?? 0) - bs.spent,
  }));

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget_amount, 0);

  return Response.json({
    month,
    totalSpent: totalRow.total_spent,
    totalBudget,
    totalRemaining: totalBudget - totalRow.total_spent,
    uncategorizedSpent: uncategorizedRow.spent,
    buckets: bucketOverview,
    dailySpending,
    recentTransactions,
  });
}
