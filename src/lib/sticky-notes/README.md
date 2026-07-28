# Sticky notes overlay

A page-anchored sticky-note layer that floats above the whole app. Notes are
placed by clicking anywhere on the page, stay attached to the element under the
click (via a generated CSS selector), and are stored per pathname. Rendering
happens in a portal on `document.body`, so no host layout is touched.

## Quickstart

The provider is a client component, so a Server Component layout wraps it in a
thin `"use client"` shim — see `src/components/sticky-notes-app-provider.tsx`:

```tsx
"use client"
import { restAdapter, StickyNotesProvider } from "@/lib/sticky-notes"

// Created once at module scope: a new adapter object on every render is fine
// (the provider reads it through a ref) but pointless churn.
const adapter = restAdapter("/api/sticky-notes")

export function AppStickyNotes({ children }: { children: React.ReactNode }) {
  return <StickyNotesProvider adapter={adapter}>{children}</StickyNotesProvider>
}
```

```tsx
// src/app/layout.tsx (Server Component)
<body>
  <AppStickyNotes>{children}</AppStickyNotes>
</body>
```

Omit the `adapter` prop to get `localStorageAdapter`.

## Adapters

A `StorageAdapter` is `load(pageKey)` / `save(pageKey, notes)`, both async.

- **`localStorageAdapter`** (default) — one key per page, `sticky-notes:<pathname>`.
  `load` never throws (corrupt or missing JSON yields `[]`); `save` can throw,
  most plausibly on a quota error.
- **`restAdapter(baseUrl)`** — talks to the route handler at
  `src/app/api/sticky-notes/route.ts`. Contract: `GET ?page=<pathname>` returns
  `{ notes: [] }`; `POST { page, notes }` returns `{ ok: true }`, and answers
  `400` if the body is not that shape. Notes land in `.data/sticky-notes.json`,
  so the working directory must be writable. Both methods **throw** on a non-OK
  response.

A rejected `save` surfaces as the amber dot on the toolbar, meaning "not saved,
will retry on the next change". A rejected `load` leaves the page empty and,
by design, never writes that emptiness back over the stored notes.

## `useStickyNotes()`

Available anywhere inside the provider:

| Member | Purpose |
| --- | --- |
| `notes` | `StickyNote[]` for the current page |
| `addNote(clientX, clientY)` | place a note at viewport coordinates |
| `updateNote(id, patch)` | patch text / size / color / minimized / anchor |
| `removeNote(id)` | delete a note |
| `layerVisible`, `setLayerVisible` | show or hide the whole layer |
| `saveState` | `"idle" \| "saving" \| "error"` |

## Anchoring

Selectors prefer `#id`, then a stable attribute (`data-testid`, `data-slot`,
`data-note-anchor`) that is unique among siblings, then an `nth-of-type` path.
Add the valueless marker `data-note-anchor` to any element you want notes to
stick to reliably across refactors:

```tsx
<section data-note-anchor>…</section>
```

If a selector stops resolving, the note detaches and falls back to stored
document coordinates, showing a pin badge.

## Known limits

- The REST store is a single-user demo store: one JSON file, no auth, no
  per-user partitioning, last write wins.
- Saves are debounced 500ms. Navigating away flushes a pending save, but closing
  the tab inside that window can lose the last edit.
- Anchors are CSS-selector-based, so a large DOM restructure detaches notes.
- Notes are keyed by pathname only; query strings and hashes are ignored.
