import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

const CreateBucketSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  icon: z.string().min(1).max(30).optional(),
});

export async function GET(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const buckets = db
    .prepare(
      `SELECT b.*,
        (SELECT json_group_array(json_object('id', br.id, 'keyword', br.keyword))
         FROM bucket_rules br WHERE br.bucket_id = b.id) as rules
       FROM buckets b ORDER BY b.sort_order, b.name`
    )
    .all() as Array<Record<string, unknown>>;

  const parsed = buckets.map((b) => ({
    ...b,
    rules: JSON.parse(b.rules as string).filter(
      (r: { id: string | null }) => r.id !== null
    ),
  }));

  return Response.json(parsed);
}

export async function POST(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = CreateBucketSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Invalid input", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { name, color, icon } = result.data;
  const id = uuid();

  try {
    const maxOrder = db
      .prepare("SELECT MAX(sort_order) as max FROM buckets")
      .get() as { max: number | null };

    db.prepare(
      "INSERT INTO buckets (id, name, color, icon, sort_order) VALUES (?, ?, ?, ?, ?)"
    ).run(id, name, color, icon || "tag", (maxOrder.max ?? -1) + 1);

    const bucket = db.prepare("SELECT * FROM buckets WHERE id = ?").get(id);
    return Response.json(bucket, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return Response.json(
        { error: "A bucket with that name already exists" },
        { status: 409 }
      );
    }
    throw e;
  }
}
