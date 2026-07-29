// @vitest-environment node
import { mkdtemp, readFile, rm, writeFile } from "fs/promises"
import { tmpdir } from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { readStore, writeStore } from "@/lib/sticky-notes/server/file-store"

let dir: string
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "sticky-notes-"))
})
afterEach(async () => {
  await rm(dir, { recursive: true, force: true })
})

describe("file store", () => {
  it("readStore returns {} for a missing file", async () => {
    expect(await readStore(path.join(dir, "nope.json"))).toEqual({})
  })

  it("write/read round-trips", async () => {
    const p = path.join(dir, "store.json")
    await writeStore(p, { "/crypto": [{ id: "n1" }] })
    expect(await readStore(p)).toEqual({ "/crypto": [{ id: "n1" }] })
  })

  it("readStore returns {} on corrupt content", async () => {
    const p = path.join(dir, "store.json")
    await writeFile(p, "{{{", "utf8")
    expect(await readStore(p)).toEqual({})
  })

  it("writeStore creates parent directories", async () => {
    const p = path.join(dir, "nested", "deep", "store.json")
    await writeStore(p, {})
    expect(JSON.parse(await readFile(p, "utf8"))).toEqual({})
  })
})
