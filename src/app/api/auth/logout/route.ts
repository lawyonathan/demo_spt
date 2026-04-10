import {
  getSessionToken,
  deleteSession,
  clearSessionCookie,
} from "@/lib/auth";

export async function POST() {
  const token = await getSessionToken();
  if (token) {
    deleteSession(token);
  }
  await clearSessionCookie();
  return Response.json({ success: true });
}
