import type { StickyNote, StorageAdapter } from "../types"

export function restAdapter(baseUrl: string): StorageAdapter {
  return {
    async load(pageKey: string): Promise<StickyNote[]> {
      const res = await fetch(`${baseUrl}?page=${encodeURIComponent(pageKey)}`)
      if (!res.ok) throw new Error(`sticky-notes load failed: ${res.status}`)
      const data = (await res.json()) as { notes?: StickyNote[] }
      return data.notes ?? []
    },
    async save(pageKey: string, notes: StickyNote[]): Promise<void> {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pageKey, notes }),
      })
      if (!res.ok) throw new Error(`sticky-notes save failed: ${res.status}`)
    },
  }
}
