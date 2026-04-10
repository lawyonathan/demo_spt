import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

const PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const searchParams = request.nextUrl.searchParams;
  const month = searchParams.get("month");
  const bucketId = searchParams.get("bucketId");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (month) {
    conditions.push("t.date LIKE ?");
    params.push(`${month}%`);
  }

  if (bucketId) {
    if (bucketId === "uncategorized") {
      conditions.push("t.bucket_id IS NULL");
    } else {
      conditions.push("t.bucket_id = ?");
      params.push(bucketId);
    }
  }

  if (search) {
    conditions.push("LOWER(t.name) LIKE ?");
    params.push(`%${search.toLowerCase()}%`);
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM transactions t ${where}`)
    .get(...params) as { total: number };

  const offset = (page - 1) * PAGE_SIZE;
  params.push(PAGE_SIZE, offset);

  const transactions = db
    .prepare(
      `SELECT t.*, b.name as bucket_name, b.color as bucket_color
       FROM transactions t
       LEFT JOIN buckets b ON b.id = t.bucket_id
       ${where}
       ORDER BY t.date DESC, t.created_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(...params);

  return Response.json({
    transactions,
    total: countRow.total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(countRow.total / PAGE_SIZE),
  });
}

const PatchSchema = z.object({
  transactionId: z.string(),
  bucketId: z.string().nullable(),
});

export async function PATCH(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = PatchSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const { transactionId, bucketId } = result.data;

  db.prepare(
    "UPDATE transactions SET bucket_id = ?, bucket_override = 1 WHERE id = ?"
  ).run(bucketId, transactionId);

  return Response.json({ success: true });
}
