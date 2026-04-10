import { NextRequest } from "next/server";
import { createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { passcode } = body;

  const expected = process.env.PASSCODE;
  if (!expected) {
    return Response.json(
      { error: "PASSCODE not configured" },
      { status: 500 }
    );
  }

  if (passcode !== expected) {
    return Response.json({ error: "Invalid passcode" }, { status: 401 });
  }

  const token = createSession();
  await setSessionCookie(token);

  return Response.json({ success: true });
}
