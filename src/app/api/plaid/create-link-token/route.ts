import { NextRequest } from "next/server";
import { CountryCode, Products } from "plaid";
import { getPlaid } from "@/lib/plaid";
import { requireAuthFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const authError = requireAuthFromRequest(request);
  if (authError) return authError;

  try {
    const plaid = getPlaid();
    const response = await plaid.linkTokenCreate({
      user: { client_user_id: "single-user" },
      client_name: "BudgetFlow",
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    return Response.json({ link_token: response.data.link_token });
  } catch (error: unknown) {
    console.error("Plaid linkTokenCreate error:", error);
    return Response.json(
      { error: "Failed to create link token" },
      { status: 500 }
    );
  }
}
