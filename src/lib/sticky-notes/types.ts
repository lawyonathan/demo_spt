export type NoteColor = "yellow" | "pink" | "blue" | "green" | "orange" | "purple"

export const NOTE_COLOR_LIST: NoteColor[] = [
  "yellow",
  "pink",
  "blue",
  "green",
  "orange",
  "purple",
]

/** bg = note body, strip = drag handle bar, dot = minimized dot / canvas pin */
export const NOTE_COLORS: Record<NoteColor, { bg: string; strip: string; dot: string }> = {
  yellow: { bg: "#fef3a2", strip: "#fde047", dot: "#facc15" },
  pink: { bg: "#fbcfe8", strip: "#f9a8d4", dot: "#f472b6" },
  blue: { bg: "#bfdbfe", strip: "#93c5fd", dot: "#60a5fa" },
  green: { bg: "#bbf7d0", strip: "#86efac", dot: "#4ade80" },
  orange: { bg: "#fed7aa", strip: "#fdba74", dot: "#fb923c" },
  purple: { bg: "#e9d5ff", strip: "#d8b4fe", dot: "#c084fc" },
}

export type NoteAnchor = {
  /** CSS selector to the anchor element */
  selector: string
  /** lowercase tag name of the anchor element, sanity-checked on resolve */
  tag: string
  /** note top-left relative to the anchor's top-left */
  offsetX: number
  offsetY: number
  /** absolute document coordinates, used if the selector no longer resolves */
  fallbackX: number
  fallbackY: number
}

export type StickyNote = {
  id: string
  /** pathname the note belongs to, e.g. "/crypto" */
  pageKey: string
  color: NoteColor
  text: string
  size: { w: number; h: number }
  minimized: boolean
  anchor: NoteAnchor
  createdAt: number
  updatedAt: number
}

export interface StorageAdapter {
  load(pageKey: string): Promise<StickyNote[]>
  save(pageKey: string, notes: StickyNote[]): Promise<void>
}
