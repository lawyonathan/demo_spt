import type { NoteAnchor, NoteColor, StickyNote } from "./types"

export type NotesState = { notes: StickyNote[]; loaded: boolean }

export type NotesAction =
  | { type: "reset" }
  | { type: "load"; notes: StickyNote[] }
  | { type: "add"; note: StickyNote }
  | {
      type: "update"
      id: string
      patch: Partial<Omit<StickyNote, "id" | "pageKey" | "createdAt" | "updatedAt">>
      now: number
    }
  | { type: "remove"; id: string }

export const initialNotesState: NotesState = { notes: [], loaded: false }

export function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case "reset":
      return { notes: [], loaded: false }
    case "load":
      // Adopts the caller's array by reference on purpose: the provider's
      // post-load save guard compares by identity (lastLoadRef). Copying here
      // would schedule an echo-save of every load — and an empty wipe on
      // failed loads.
      return { notes: action.notes, loaded: true }
    case "add":
      return { ...state, notes: [...state.notes, action.note] }
    case "update":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.id ? { ...n, ...action.patch, updatedAt: action.now } : n
        ),
      }
    case "remove":
      return { ...state, notes: state.notes.filter((n) => n.id !== action.id) }
  }
}

export function createNote(args: {
  id: string
  pageKey: string
  color: NoteColor
  anchor: NoteAnchor
  now: number
}): StickyNote {
  return {
    id: args.id,
    pageKey: args.pageKey,
    color: args.color,
    text: "",
    size: { w: 200, h: 170 },
    minimized: false,
    anchor: args.anchor,
    createdAt: args.now,
    updatedAt: args.now,
  }
}
