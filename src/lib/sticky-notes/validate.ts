import { NOTE_COLOR_LIST, type NoteAnchor, type NoteColor, type StickyNote } from "./types"

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isNoteColor(value: unknown): value is NoteColor {
  return NOTE_COLOR_LIST.includes(value as NoteColor)
}

function isSize(value: unknown): value is StickyNote["size"] {
  return isRecord(value) && typeof value.w === "number" && typeof value.h === "number"
}

function isAnchor(value: unknown): value is NoteAnchor {
  return (
    isRecord(value) &&
    typeof value.selector === "string" &&
    typeof value.tag === "string" &&
    typeof value.offsetX === "number" &&
    typeof value.offsetY === "number" &&
    typeof value.fallbackX === "number" &&
    typeof value.fallbackY === "number"
  )
}

/**
 * Storage is untrusted: it may hold notes written by an older version of this
 * library, or hand-edited JSON. Anything that does not match the current shape
 * is dropped rather than allowed to crash a note card mid-render.
 */
export function isValidNote(value: unknown): value is StickyNote {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.pageKey === "string" &&
    isNoteColor(value.color) &&
    typeof value.text === "string" &&
    isSize(value.size) &&
    typeof value.minimized === "boolean" &&
    isAnchor(value.anchor) &&
    typeof value.createdAt === "number" &&
    typeof value.updatedAt === "number"
  )
}

/** Keeps only well-formed notes, warning once with the number dropped. */
export function keepValidNotes(loaded: readonly unknown[]): StickyNote[] {
  const valid = loaded.filter(isValidNote)
  const dropped = loaded.length - valid.length
  if (dropped > 0) {
    console.warn(`[sticky-notes] dropped ${dropped} malformed note(s) while loading`)
  }
  return valid
}
