"use client"

import { restAdapter, StickyNotesProvider } from "@/lib/sticky-notes"

const adapter = restAdapter("/api/sticky-notes")

export function AppStickyNotes({ children }: { children: React.ReactNode }) {
  return <StickyNotesProvider adapter={adapter}>{children}</StickyNotesProvider>
}
