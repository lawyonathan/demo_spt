"use client"

import { StickyNotesProvider } from "@/lib/sticky-notes"

export function AppStickyNotes({ children }: { children: React.ReactNode }) {
  return <StickyNotesProvider>{children}</StickyNotesProvider>
}
