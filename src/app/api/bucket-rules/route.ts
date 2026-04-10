import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

const CreateRuleSchema = z.object({
  bucketId: z.string().uuid(),
  keyword: z.string().min(1).max(100),
});

const DeleteRuleSchema = z.object({
  ruleId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = CreateRuleSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { bucketId, keyword } = result.data;
  const id = uuid();

  try {
    db.prepare(
      "INSERT INTO bucket_rules (id, bucket_id, keyword) VALUES (?, ?, ?)"
    ).run(id, bucketId, keyword.toLowerCase());

    // Retroactively apply this rule to unassigned transactions
    db.prepare(
      `UPDATE transactions
       SET bucket_id = ?
       WHERE bucket_id IS NULL
       AND bucket_override = 0
       AND LOWER(name) LIKE ?`
    ).run(bucketId, `%${keyword.toLowerCase()}%`);

    const rule = db
      .prepare("SELECT * FROM bucket_rules WHERE id = ?")
      .get(id);
    return Response.json(rule, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return Response.json(
        { error: "This keyword rule already exists for this bucket" },
        { status: 409 }
      );
    }
    throw e;
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = DeleteRuleSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { ruleId } = result.data;
  const deleteResult = db
    .prepare("DELETE FROM bucket_rules WHERE id = ?")
    .run(ruleId);

  if (deleteResult.changes === 0) {
    return Response.json({ error: "Rule not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
