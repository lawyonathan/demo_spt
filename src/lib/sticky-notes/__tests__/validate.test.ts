import { afterEach, describe, expect, it, vi } from "vitest"
import { isValidNote, keepValidNotes } from "@/lib/sticky-notes/validate"
import { createNote } from "@/lib/sticky-notes/store"

const validNote = createNote({
  id: "n1",
  pageKey: "/crypto",
  color: "blue",
  anchor: { selector: "#x", tag: "div", offsetX: 1, offsetY: 2, fallbackX: 3, fallbackY: 4 },
  now: 1000,
})

afterEach(() => vi.restoreAllMocks())

describe("isValidNote", () => {
  it("accepts a well-formed note", () => {
    expect(isValidNote(validNote)).toBe(true)
  })

  it("rejects a note whose color is not a known color", () => {
    expect(isValidNote({ ...validNote, color: "chartreuse" })).toBe(false)
  })

  it("rejects garbage and structurally incomplete notes", () => {
    expect(isValidNote(null)).toBe(false)
    expect(isValidNote("note")).toBe(false)
    expect(isValidNote([validNote])).toBe(false)
    expect(isValidNote({ ...validNote, size: { w: 200 } })).toBe(false)
    expect(isValidNote({ ...validNote, anchor: { selector: "#x" } })).toBe(false)
    expect(isValidNote({ ...validNote, createdAt: "yesterday" })).toBe(false)
  })
})

describe("keepValidNotes", () => {
  it("keeps valid notes, drops the rest and warns with the count", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    expect(keepValidNotes([validNote, null, { ...validNote, color: "chartreuse" }])).toEqual([
      validNote,
    ])
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toContain("2")
  })

  it("does not warn when every note is valid", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    expect(keepValidNotes([validNote])).toEqual([validNote])
    expect(warn).not.toHaveBeenCalled()
  })
})
