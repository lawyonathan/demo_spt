"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { usePathname } from "next/navigation"
import type { NoteAnchor, NoteColor, StickyNote, StorageAdapter } from "./types"
import { localStorageAdapter } from "./adapters/local-storage"
import { createNote, initialNotesState, notesReducer } from "./store"
import { buildSelector } from "./selector"

export type NoteGeometry = {
  x: number
  y: number
  w: number
  h: number
  anchorX: number
  anchorY: number
  detached: boolean
  dragging: boolean
  minimized: boolean
  color: NoteColor
}

export type SaveState = "idle" | "saving" | "error"

export type NotePatch = Partial<
  Omit<StickyNote, "id" | "pageKey" | "createdAt" | "updatedAt">
>

type InternalContextValue = {
  notes: StickyNote[]
  addNoteAt: (clientX: number, clientY: number) => void
  updateNote: (id: string, patch: NotePatch) => void
  removeNote: (id: string) => void
  layerVisible: boolean
  setLayerVisible: (v: boolean) => void
  activeColor: NoteColor
  setActiveColor: (c: NoteColor) => void
  placing: boolean
  setPlacing: (p: boolean) => void
  saveState: SaveState
  registryRef: React.MutableRefObject<Map<string, NoteGeometry>>
  dirtyRef: React.MutableRefObject<boolean>
  overlayRef: React.MutableRefObject<HTMLDivElement | null>
}

const Ctx = React.createContext<InternalContextValue | null>(null)

export function useStickyNotesInternal(): InternalContextValue {
  const ctx = React.useContext(Ctx)
  if (!ctx) {
    throw new Error("Sticky notes components must be used inside <StickyNotesProvider>")
  }
  return ctx
}

/** Public hook: programmatic access to the notes layer. */
export function useStickyNotes() {
  const { notes, addNoteAt, updateNote, removeNote, layerVisible, setLayerVisible } =
    useStickyNotesInternal()
  return { notes, addNote: addNoteAt, updateNote, removeNote, layerVisible, setLayerVisible }
}

export function StickyNotesProvider({
  adapter = localStorageAdapter,
  children,
}: {
  adapter?: StorageAdapter
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [state, dispatch] = React.useReducer(notesReducer, initialNotesState)
  const [layerVisible, setLayerVisible] = React.useState(true)
  const [activeColor, setActiveColor] = React.useState<NoteColor>("yellow")
  const [placing, setPlacing] = React.useState(false)
  const [saveState, setSaveState] = React.useState<SaveState>("idle")
  const [mounted, setMounted] = React.useState(false)

  const registryRef = React.useRef(new Map<string, NoteGeometry>())
  const dirtyRef = React.useRef(true)
  const overlayRef = React.useRef<HTMLDivElement | null>(null)
  const adapterRef = React.useRef(adapter)
  const firstAfterLoadRef = React.useRef(true)

  // The load/save effects read the adapter through this ref so that swapping
  // the adapter prop does not re-trigger a load or restart the save debounce.
  React.useEffect(() => {
    adapterRef.current = adapter
  }, [adapter])

  React.useEffect(() => setMounted(true), [])

  // Load this page's notes whenever the pathname changes.
  React.useEffect(() => {
    let cancelled = false
    dispatch({ type: "reset" })
    firstAfterLoadRef.current = true
    adapterRef.current.load(pathname).then(
      (notes) => {
        if (!cancelled) dispatch({ type: "load", notes })
      },
      () => {
        if (!cancelled) dispatch({ type: "load", notes: [] })
      }
    )
    return () => {
      cancelled = true
    }
  }, [pathname])

  // Debounced save on any notes change after load.
  React.useEffect(() => {
    if (!state.loaded) return
    if (firstAfterLoadRef.current) {
      firstAfterLoadRef.current = false
      return
    }
    const t = window.setTimeout(() => {
      setSaveState("saving")
      adapterRef.current.save(pathname, state.notes).then(
        () => setSaveState("idle"),
        () => setSaveState("error")
      )
    }, 500)
    return () => window.clearTimeout(t)
  }, [state.notes, state.loaded, pathname])

  // Anything that moves notes must repaint the canvas layer.
  React.useEffect(() => {
    dirtyRef.current = true
  }, [state.notes, layerVisible])

  const addNoteAt = React.useCallback(
    (clientX: number, clientY: number) => {
      const overlay = overlayRef.current
      if (overlay) overlay.style.display = "none"
      const el = document.elementFromPoint(clientX, clientY)
      if (overlay) overlay.style.display = ""
      const target = el && el !== document.documentElement ? el : document.body
      const { selector, tag } = buildSelector(target)
      const rect = target.getBoundingClientRect()
      const anchor: NoteAnchor = {
        selector,
        tag,
        offsetX: clientX - rect.left,
        offsetY: clientY - rect.top,
        fallbackX: clientX + window.scrollX,
        fallbackY: clientY + window.scrollY,
      }
      dispatch({
        type: "add",
        note: createNote({
          id: crypto.randomUUID(),
          pageKey: pathname,
          color: activeColor,
          anchor,
          now: Date.now(),
        }),
      })
    },
    [pathname, activeColor]
  )

  const updateNote = React.useCallback((id: string, patch: NotePatch) => {
    dispatch({ type: "update", id, patch, now: Date.now() })
  }, [])

  const removeNote = React.useCallback((id: string) => {
    dispatch({ type: "remove", id })
  }, [])

  const value = React.useMemo<InternalContextValue>(
    () => ({
      notes: state.notes,
      addNoteAt,
      updateNote,
      removeNote,
      layerVisible,
      setLayerVisible,
      activeColor,
      setActiveColor,
      placing,
      setPlacing,
      saveState,
      registryRef,
      dirtyRef,
      overlayRef,
    }),
    [state.notes, addNoteAt, updateNote, removeNote, layerVisible, activeColor, placing, saveState]
  )

  const overlay = mounted
    ? createPortal(
        <div
          ref={overlayRef}
          data-sticky-notes-overlay=""
          style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}
        >
          {/* canvas layer (Task 10) */}
          {/* note cards (Task 8) */}
          {/* placement catcher (Task 7) */}
          {/* toolbar (Task 7) */}
        </div>,
        document.body
      )
    : null

  return (
    <Ctx.Provider value={value}>
      {children}
      {overlay}
    </Ctx.Provider>
  )
}
