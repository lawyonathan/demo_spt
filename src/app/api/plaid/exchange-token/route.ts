import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { getPlaid } from "@/lib/plaid";
import { encrypt } from "@/lib/crypto";
import { db } from "@/lib/db";
import { requireAuthFromRequest } from "@/lib/auth";

const ExchangeSchema = z.object({
  public_token: z.string(),
  institution_id: z.string().optional(),
  institution_name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  const body = await request.json();
  const result = ExchangeSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const { public_token, institution_id, institution_name } = result.data;

  try {
    const plaid = getPlaid();
    const exchangeResponse = await plaid.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;
    const encryptedToken = encrypt(accessToken);
    const id = uuid();

    db.prepare(
      `INSERT INTO accounts (id, plaid_item_id, plaid_access_token, plaid_institution_id, institution_name)
       VALUES (?, ?, ?, ?, ?)`
    ).run(id, itemId, encryptedToken, institution_id || null, institution_name || "Unknown Bank");

    return Response.json({ id, institution_name: institution_name || "Unknown Bank" }, { status: 201 });
  } catch (error: unknown) {
    console.error("Plaid token exchange error:", error);
    return Response.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }
}
