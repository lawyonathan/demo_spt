import type { StickyNote, StorageAdapter } from "../types"

const PREFIX = "sticky-notes"

export const localStorageAdapter: StorageAdapter = {
  async load(pageKey: string): Promise<StickyNote[]> {
    try {
      const raw = window.localStorage.getItem(`${PREFIX}:${pageKey}`)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? (parsed as StickyNote[]) : []
    } catch {
      return []
    }
  },
  async save(pageKey: string, notes: StickyNote[]): Promise<void> {
    window.localStorage.setItem(`${PREFIX}:${pageKey}`, JSON.stringify(notes))
  },
}
