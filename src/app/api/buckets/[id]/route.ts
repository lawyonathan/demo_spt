import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

const UpdateBucketSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  icon: z.string().min(1).max(30).optional(),
  sort_order: z.number().int().min(0).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();
  const result = UpdateBucketSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const existing = db.prepare("SELECT id FROM buckets WHERE id = ?").get(id);
  if (!existing) {
    return Response.json({ error: "Bucket not found" }, { status: 404 });
  }

  const fields = result.data;
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (updates.length > 0) {
    values.push(id);
    db.prepare(`UPDATE buckets SET ${updates.join(", ")} WHERE id = ?`).run(
      ...values
    );
  }

  const bucket = db.prepare("SELECT * FROM buckets WHERE id = ?").get(id);
  return Response.json(bucket);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const { id } = await params;

  // Unset bucket_id on associated transactions
  db.prepare("UPDATE transactions SET bucket_id = NULL WHERE bucket_id = ?").run(id);
  // Delete cascades to bucket_rules and monthly_budgets
  const result = db.prepare("DELETE FROM buckets WHERE id = ?").run(id);

  if (result.changes === 0) {
    return Response.json({ error: "Bucket not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
