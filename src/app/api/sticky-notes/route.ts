import path from "path"
import { readStore, writeStore } from "@/lib/sticky-notes/server/file-store"

const STORE_PATH = path.join(process.cwd(), ".data", "sticky-notes.json")

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = url.searchParams.get("page")
  if (!page) {
    return Response.json({ error: "page query parameter is required" }, { status: 400 })
  }
  const store = await readStore(STORE_PATH)
  return Response.json({ notes: store[page] ?? [] })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (
    !body ||
    typeof (body as { page?: unknown }).page !== "string" ||
    !Array.isArray((body as { notes?: unknown }).notes)
  ) {
    return Response.json(
      { error: "body must be { page: string, notes: [] }" },
      { status: 400 }
    )
  }
  const { page, notes } = body as { page: string; notes: unknown[] }
  const store = await readStore(STORE_PATH)
  store[page] = notes
  await writeStore(STORE_PATH, store)
  return Response.json({ ok: true })
}
