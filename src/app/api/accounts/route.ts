import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const accounts = db
    .prepare(
      "SELECT id, institution_name, plaid_institution_id, created_at FROM accounts ORDER BY created_at DESC"
    )
    .all();

  return Response.json(accounts);
}

const DeleteSchema = z.object({
  accountId: z.string(),
});

export async function DELETE(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = DeleteSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const { accountId } = result.data;

  // Transactions cascade-deleted via FK
  const deleteResult = db
    .prepare("DELETE FROM accounts WHERE id = ?")
    .run(accountId);

  if (deleteResult.changes === 0) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
