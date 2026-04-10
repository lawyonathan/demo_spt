import { getSessionToken, validateSession } from "@/lib/auth";

export async function GET() {
  const token = await getSessionToken();
  const authenticated = token ? validateSession(token) : false;
  return Response.json({ authenticated });
}
