import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { db } from "./db";
import type { NextRequest } from "next/server";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "fin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function createSession(): string {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  // Clean up expired sessions
  db.prepare("DELETE FROM sessions WHERE expires_at < datetime('now')").run();

  db.prepare("INSERT INTO sessions (id, expires_at) VALUES (?, ?)").run(
    token,
    expiresAt
  );

  return token;
}

export function validateSession(token: string): boolean {
  if (!token) return false;
  const row = db
    .prepare(
      "SELECT id FROM sessions WHERE id = ? AND expires_at > datetime('now')"
    )
    .get(token) as { id: string } | undefined;
  return !!row;
}

export function deleteSession(token: string): void {
  db.prepare("DELETE FROM sessions WHERE id = ?").run(token);
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Use in API route handlers to require auth. Returns 401 Response if not authenticated. */
export function requireAuthFromRequest(request: NextRequest): Response | null {
  const cookieName = process.env.SESSION_COOKIE_NAME || "fin_session";
  const token = request.cookies.get(cookieName)?.value;
  if (!token || !validateSession(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
