# Sticky Notes Overlay — Design

**Date:** 2026-07-28
**Status:** Approved by user (all four sections)

## Goal

A reusable, drop-in sticky-notes annotation layer for React + Node.js web apps: colored, draggable sticky notes that can be placed anywhere on top of a running app. Built as a self-contained library and demoed on this repo's dashboard pages (crypto, finance, CRM, real estate).

Architecture decision: **Hybrid DOM + canvas** — notes are real HTML (free text editing, focus, accessibility) rendered in a portal overlay; a canvas underlay draws decorative flair (anchor connector strings, pins, drag shadows) for the canvasUI aesthetic.

## 1. Package shape & public API

Library lives in `src/lib/sticky-notes/` as a self-contained folder, extractable to an npm package later.

Public surface:

- **`<StickyNotesProvider adapter={...}>`** — wraps the app once (mounted in `src/app/layout.tsx` so it covers every page). Renders the portal overlay: canvas underlay + notes layer + toolbar.
- **`<StickyNotesToolbar />`** — floating pill (bottom-center): add-note button, color swatches, show/hide layer toggle, note count. Rendered by the provider by default.
- **`useStickyNotes()`** — hook exposing `notes`, `addNote`, `updateNote`, `removeNote`, `setLayerVisible` for programmatic use.
- **`StorageAdapter`** interface — `load(pageKey): Promise<StickyNote[]>` and `save(pageKey, notes: StickyNote[]): Promise<void>`. Ships with:
  - `localStorageAdapter` (default, zero-config)
  - `restAdapter(baseUrl)` (fetch-based)
  - A ready-made Next.js route handler for `/api/sticky-notes` backed by a JSON file store (`.data/sticky-notes.json`), demonstrating the Node persistence path.

The overlay root is `position: fixed; inset: 0; pointer-events: none; z-index` above app content. Only notes and the toolbar re-enable `pointer-events: auto`, so the app underneath stays fully interactive.

## 2. Data model & element anchoring

```ts
type NoteColor = "yellow" | "pink" | "blue" | "green" | "orange" | "purple"

type StickyNote = {
  id: string
  pageKey: string          // pathname, e.g. "/crypto"
  color: NoteColor
  text: string
  size: { w: number; h: number }
  minimized: boolean
  anchor: {
    selector: string       // stable CSS selector to the anchor element
    offsetX: number        // note top-left relative to anchor's top-left
    offsetY: number
    fallbackX: number      // absolute document coords used if selector breaks
    fallbackY: number
  }
  createdAt: number
  updatedAt: number
}
```

- **Selector generation:** prefer `#id` → stable `[data-*]` attributes → structural `nth-of-type` path from the nearest stable ancestor. Also store the element's tag name as a sanity check when resolving.
- **Tracking:** each note resolves its anchor element and positions itself at `anchorRect + offset`. Updates flow from passive `scroll`/`resize` listeners plus a `ResizeObserver` on the anchor element; positions are applied with `transform: translate()` for smoothness.
- **Broken anchors:** if the selector no longer resolves (or resolves to a different tag), the note falls back to its stored document coordinates (`fallbackX/Y`) and shows a subtle "detached" pin icon. Notes are never lost and never crash the layer.
- Re-anchoring happens on drag-end: the note anchors to the element under the drop point.

## 3. Canvas flair layer & interactions

**Canvas underlay:** a full-viewport `<canvas>` (devicePixelRatio-aware) sits just below the notes in the overlay stack. It redraws on a dirty-flag requestAnimationFrame loop (only when notes move, scroll happens, or state changes). It draws:

- a curved "string" connector from each note to its anchor point, ending in a small pin dot
- soft shadow blobs under a note while it is being dragged

**Interactions:**

- **Create:** toolbar "+" (with a pre-selected color) enters placement mode — crosshair cursor; click anywhere places a note. The element under the cursor is found via `elementFromPoint` (with the overlay's pointer-events momentarily disabled), its selector is computed, and the note spawns in edit mode. `Esc` cancels placement.
- **Edit:** click the note body → inline autosizing textarea-style editing.
- **Move:** drag the note's top strip; on drop, the note re-anchors to the element under the drop point.
- **Resize:** bottom-right corner handle.
- **Minimize:** button collapses the note to a colored dot; clicking the dot restores it.
- **Delete:** × button on the note.
- **Layer toggle:** toolbar eye button hides/shows all notes (and the canvas layer).

## 4. Persistence, error handling & verification

- Notes are keyed by `pageKey` (pathname); each page loads its own set on mount and on client-side navigation.
- Saves are optimistic and debounced (~500 ms) through the adapter.
- Adapter failures never block the UI: notes stay usable in memory, and the toolbar shows a small "unsaved" indicator until a save succeeds.
- All browser-only code (portal, canvas, observers, localStorage) mounts client-side only — SSR-safe for Next.js 16.

**Verification (repo has no test infra):** run the dev server; on the crypto and finance dashboards place, edit, drag, resize, minimize, and delete notes; reload to confirm persistence (both localStorage and the REST/JSON-file adapter); verify anchored notes track their elements during scroll; screenshot the result.

## Out of scope (v1)

- Multi-user / realtime sync
- Auth or per-user note ownership
- Note metadata display (timestamps/author) beyond what's stored
- Keyboard-shortcut / double-click creation
- Mobile/touch-optimized interactions
