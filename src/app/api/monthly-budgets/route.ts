import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

const UpsertBudgetSchema = z.object({
  bucketId: z.string().uuid(),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  budgetAmount: z.number().min(0),
});

export async function GET(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const month = request.nextUrl.searchParams.get("month");
  if (!month) {
    return Response.json({ error: "month parameter required" }, { status: 400 });
  }

  const budgets = db
    .prepare(
      "SELECT mb.*, b.name as bucket_name, b.color as bucket_color FROM monthly_budgets mb JOIN buckets b ON b.id = mb.bucket_id WHERE mb.month = ?"
    )
    .all(month);

  return Response.json(budgets);
}

export async function POST(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = UpsertBudgetSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { bucketId, month, budgetAmount } = result.data;
  const id = uuid();

  // Upsert: insert or update on conflict
  db.prepare(
    `INSERT INTO monthly_budgets (id, bucket_id, month, budget_amount)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(bucket_id, month) DO UPDATE SET budget_amount = excluded.budget_amount`
  ).run(id, bucketId, month, budgetAmount);

  const budget = db
    .prepare(
      "SELECT * FROM monthly_budgets WHERE bucket_id = ? AND month = ?"
    )
    .get(bucketId, month);

  return Response.json(budget);
}
