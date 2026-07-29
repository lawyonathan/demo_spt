import { describe, expect, it } from "vitest"
import { createNote, initialNotesState, notesReducer } from "@/lib/sticky-notes/store"
import type { NoteAnchor } from "@/lib/sticky-notes/types"

const anchor: NoteAnchor = {
  selector: "#main",
  tag: "div",
  offsetX: 10,
  offsetY: 20,
  fallbackX: 110,
  fallbackY: 220,
}

const makeNote = (id = "n1") =>
  createNote({ id, pageKey: "/crypto", color: "yellow", anchor, now: 1000 })

describe("createNote", () => {
  it("fills defaults", () => {
    const n = makeNote()
    expect(n.text).toBe("")
    expect(n.size).toEqual({ w: 200, h: 170 })
    expect(n.minimized).toBe(false)
    expect(n.createdAt).toBe(1000)
    expect(n.updatedAt).toBe(1000)
    expect(n.pageKey).toBe("/crypto")
  })
})

describe("notesReducer", () => {
  it("load replaces notes and marks loaded", () => {
    const s = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    expect(s.notes).toHaveLength(1)
    expect(s.loaded).toBe(true)
  })

  it("reset clears notes and the loaded flag", () => {
    const loaded = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    const s = notesReducer(loaded, { type: "reset" })
    expect(s).toEqual({ notes: [], loaded: false })
  })

  it("add appends a note", () => {
    const loaded = notesReducer(initialNotesState, { type: "load", notes: [] })
    const s = notesReducer(loaded, { type: "add", note: makeNote() })
    expect(s.notes.map((n) => n.id)).toEqual(["n1"])
  })

  it("update patches fields and bumps updatedAt", () => {
    let s = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    s = notesReducer(s, { type: "update", id: "n1", patch: { text: "hello" }, now: 2000 })
    expect(s.notes[0].text).toBe("hello")
    expect(s.notes[0].updatedAt).toBe(2000)
    expect(s.notes[0].createdAt).toBe(1000)
  })

  it("update ignores unknown ids", () => {
    const loaded = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    const s = notesReducer(loaded, { type: "update", id: "nope", patch: { text: "x" }, now: 2000 })
    expect(s.notes[0].text).toBe("")
  })

  it("remove deletes by id", () => {
    let s = notesReducer(initialNotesState, { type: "load", notes: [makeNote("a"), makeNote("b")] })
    s = notesReducer(s, { type: "remove", id: "a" })
    expect(s.notes.map((n) => n.id)).toEqual(["b"])
  })
})
