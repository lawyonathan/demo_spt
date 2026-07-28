import { promises as fs } from "fs"
import path from "path"

/** pageKey -> array of serialized notes */
export type StoreShape = Record<string, unknown[]>

export async function readStore(filePath: string): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(filePath, "utf8")
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === "object" ? (parsed as StoreShape) : {}
  } catch {
    return {}
  }
}

export async function writeStore(filePath: string, store: StoreShape): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf8")
}
