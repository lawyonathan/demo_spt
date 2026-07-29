import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { localStorageAdapter } from "@/lib/sticky-notes/adapters/local-storage"
import { restAdapter } from "@/lib/sticky-notes/adapters/rest"
import { createNote } from "@/lib/sticky-notes/store"

const note = createNote({
  id: "n1",
  pageKey: "/crypto",
  color: "blue",
  anchor: { selector: "#x", tag: "div", offsetX: 1, offsetY: 2, fallbackX: 3, fallbackY: 4 },
  now: 1000,
})

describe("localStorageAdapter", () => {
  beforeEach(() => window.localStorage.clear())

  it("returns [] when nothing is stored", async () => {
    expect(await localStorageAdapter.load("/crypto")).toEqual([])
  })

  it("round-trips notes per pageKey", async () => {
    await localStorageAdapter.save("/crypto", [note])
    expect(await localStorageAdapter.load("/crypto")).toEqual([note])
    expect(await localStorageAdapter.load("/other")).toEqual([])
  })

  it("returns [] on corrupt JSON", async () => {
    window.localStorage.setItem("sticky-notes:/crypto", "{nope")
    expect(await localStorageAdapter.load("/crypto")).toEqual([])
  })
})

describe("restAdapter", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("GETs notes for a page", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ notes: [note] })))
    vi.stubGlobal("fetch", fetchMock)
    const adapter = restAdapter("/api/sticky-notes")
    const notes = await adapter.load("/crypto")
    expect(fetchMock).toHaveBeenCalledWith("/api/sticky-notes?page=%2Fcrypto")
    expect(notes).toEqual([note])
  })

  it("POSTs page and notes on save", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true })))
    vi.stubGlobal("fetch", fetchMock)
    const adapter = restAdapter("/api/sticky-notes")
    await adapter.save("/crypto", [note])
    expect(fetchMock).toHaveBeenCalledWith("/api/sticky-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/crypto", notes: [note] }),
    })
  })

  it("throws on non-OK responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })))
    const adapter = restAdapter("/api/sticky-notes")
    await expect(adapter.load("/crypto")).rejects.toThrow()
    await expect(adapter.save("/crypto", [])).rejects.toThrow()
  })
})
