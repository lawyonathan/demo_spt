import * as React from "react"
import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { StickyNotesProvider } from "@/lib/sticky-notes/provider"
import { createNote } from "@/lib/sticky-notes/store"
import type { StickyNote, StorageAdapter } from "@/lib/sticky-notes/types"

vi.mock("next/navigation", () => ({ usePathname: () => "/test" }))

// The provider's save debounce is 500ms; wait past it before asserting.
const PAST_DEBOUNCE_MS = 700

const storedNote = (): StickyNote =>
  createNote({
    id: "n1",
    pageKey: "/test",
    color: "yellow",
    anchor: { selector: "body", tag: "body", offsetX: 0, offsetY: 0, fallbackX: 0, fallbackY: 0 },
    now: 1000,
  })

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  ;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  container = document.createElement("div")
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

async function mountWith(adapter: StorageAdapter) {
  await act(async () => {
    root.render(
      <StickyNotesProvider adapter={adapter}>
        <p>host app</p>
      </StickyNotesProvider>
    )
  })
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, PAST_DEBOUNCE_MS))
  })
}

/**
 * The provider suppresses the post-load save by comparing state.notes to the
 * exact array the load produced (lastLoadRef). That identity only holds because
 * the reducer's "load" branch adopts the caller's array by reference — if it
 * copied, every load would echo back a save, and a failed load would write an
 * empty array over the stored notes.
 */
describe("provider load/save guard", () => {
  it("never saves after a load that rejects", async () => {
    const save = vi.fn().mockResolvedValue(undefined)
    await mountWith({ load: () => Promise.reject(new Error("offline")), save })
    expect(save).not.toHaveBeenCalled()
  })

  it("never saves after a load that resolves with notes", async () => {
    const save = vi.fn().mockResolvedValue(undefined)
    await mountWith({ load: () => Promise.resolve([storedNote()]), save })
    expect(save).not.toHaveBeenCalled()
  })
})
