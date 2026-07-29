# Sticky Notes Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A reusable, drop-in sticky-notes annotation layer (colored, draggable, element-anchored notes) for React apps, built as a self-contained library in `src/lib/sticky-notes/` and demoed over this repo's dashboard pages with a Node.js JSON-file persistence route.

**Architecture:** Hybrid DOM + canvas. Notes are real HTML rendered in a `position: fixed` portal overlay (`pointer-events: none` root; only notes/toolbar re-enable pointer events). A devicePixelRatio-aware `<canvas>` underlay draws anchor connector strings, pins, and drag shadows on a dirty-flag rAF loop. Notes anchor to DOM elements via generated CSS selectors with document-position fallback. Persistence goes through a pluggable `StorageAdapter` (localStorage default; REST adapter + Next.js route handler with JSON file store for the demo).

**Tech Stack:** Next.js 16.2.2 (App Router), React 19, TypeScript, Vitest + jsdom for unit tests. No new runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-07-28-sticky-notes-overlay-design.md`

## Global Constraints

- Next.js **16.2.2** App Router. Route handlers are `route.ts` files exporting `GET`/`POST` taking a Web `Request`. Client components start with `"use client"`.
- React **19.2.4** / TypeScript strict. Import alias `@/*` → `src/*` (already configured in `tsconfig.json`).
- The library is self-contained in `src/lib/sticky-notes/` — **no new runtime dependencies**, and **inline styles only** inside the overlay (so the library works in any React app regardless of CSS framework).
- SSR safety: everything touching `window`/`document` runs client-side only; the portal renders only after mount.
- Overlay root: `position: fixed; inset: 0; z-index: 9999; pointer-events: none`. Only notes and the toolbar set `pointer-events: auto`.
- Notes are keyed by `pageKey` = `usePathname()` result.
- Unit tests (Vitest + jsdom) cover pure logic: store reducer, selector engine, adapters, file store. UI behavior is verified in the browser against the dev server (spec's verification approach); repo had no test infra before this plan.
- Amendment to spec (agreed direction): Vitest is added for pure-logic modules because they are cheaply testable; browser verification remains the strategy for UI tasks.
- Commit after every task. Windows environment; commands shown are Git-Bash compatible.

---

### Task 1: Test infrastructure + types & palette

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/sticky-notes/types.ts`
- Create: `src/lib/sticky-notes/__tests__/types.test.ts`
- Modify: `package.json` (add `test` script, dev deps)

**Interfaces:**
- Consumes: nothing.
- Produces: `NoteColor`, `NOTE_COLORS`, `NOTE_COLOR_LIST`, `NoteAnchor`, `StickyNote`, `StorageAdapter` — every later task imports these from `@/lib/sticky-notes/types`.

- [ ] **Step 1: Install dependencies**

The worktree has no `node_modules` yet.

Run: `npm install && npm install -D vitest jsdom`
Expected: both commands exit 0.

- [ ] **Step 2: Create vitest config and test script**

Create `vitest.config.ts`:

```ts
import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
```

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Write the failing test**

Create `src/lib/sticky-notes/__tests__/types.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { NOTE_COLORS, NOTE_COLOR_LIST } from "@/lib/sticky-notes/types"

describe("note colors", () => {
  it("defines exactly six colors, each with bg/strip/dot hex values", () => {
    expect(NOTE_COLOR_LIST).toHaveLength(6)
    for (const c of NOTE_COLOR_LIST) {
      expect(NOTE_COLORS[c].bg).toMatch(/^#[0-9a-f]{6}$/i)
      expect(NOTE_COLORS[c].strip).toMatch(/^#[0-9a-f]{6}$/i)
      expect(NOTE_COLORS[c].dot).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run src/lib/sticky-notes/__tests__/types.test.ts`
Expected: FAIL — cannot resolve `@/lib/sticky-notes/types`.

- [ ] **Step 5: Write the types module**

Create `src/lib/sticky-notes/types.ts`:

```ts
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
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/lib/sticky-notes/__tests__/types.test.ts`
Expected: PASS (1 test).

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts package.json package-lock.json src/lib/sticky-notes/
git commit -m "feat(sticky-notes): add vitest setup, note types and color palette"
```

---

### Task 2: Notes store (pure reducer + factory)

**Files:**
- Create: `src/lib/sticky-notes/store.ts`
- Test: `src/lib/sticky-notes/__tests__/store.test.ts`

**Interfaces:**
- Consumes: `StickyNote`, `NoteAnchor`, `NoteColor` from `./types`.
- Produces:
  - `type NotesState = { notes: StickyNote[]; loaded: boolean }`
  - `initialNotesState: NotesState`
  - `notesReducer(state: NotesState, action: NotesAction): NotesState` with actions `{type:"reset"}`, `{type:"load"; notes}`, `{type:"add"; note}`, `{type:"update"; id; patch; now}`, `{type:"remove"; id}`
  - `createNote(args: { id: string; pageKey: string; color: NoteColor; anchor: NoteAnchor; now: number }): StickyNote`
  - Task 6's provider drives this reducer with `React.useReducer`.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/sticky-notes/__tests__/store.test.ts`:

```ts
import { describe, expect, it } from "vitest"
import { createNote, initialNotesState, notesReducer } from "@/lib/sticky-notes/store"
import type { NoteAnchor } from "@/lib/sticky-notes/types"

const anchor: NoteAnchor = {
  selector: "#main",
  tag: "div",
  offsetX: 10,
  offsetY: 20,
  fallbackX: 110,
  fallbackY: 220,
}

const makeNote = (id = "n1") =>
  createNote({ id, pageKey: "/crypto", color: "yellow", anchor, now: 1000 })

describe("createNote", () => {
  it("fills defaults", () => {
    const n = makeNote()
    expect(n.text).toBe("")
    expect(n.size).toEqual({ w: 200, h: 170 })
    expect(n.minimized).toBe(false)
    expect(n.createdAt).toBe(1000)
    expect(n.updatedAt).toBe(1000)
    expect(n.pageKey).toBe("/crypto")
  })
})

describe("notesReducer", () => {
  it("load replaces notes and marks loaded", () => {
    const s = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    expect(s.notes).toHaveLength(1)
    expect(s.loaded).toBe(true)
  })

  it("reset clears notes and the loaded flag", () => {
    const loaded = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    const s = notesReducer(loaded, { type: "reset" })
    expect(s).toEqual({ notes: [], loaded: false })
  })

  it("add appends a note", () => {
    const loaded = notesReducer(initialNotesState, { type: "load", notes: [] })
    const s = notesReducer(loaded, { type: "add", note: makeNote() })
    expect(s.notes.map((n) => n.id)).toEqual(["n1"])
  })

  it("update patches fields and bumps updatedAt", () => {
    let s = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    s = notesReducer(s, { type: "update", id: "n1", patch: { text: "hello" }, now: 2000 })
    expect(s.notes[0].text).toBe("hello")
    expect(s.notes[0].updatedAt).toBe(2000)
    expect(s.notes[0].createdAt).toBe(1000)
  })

  it("update ignores unknown ids", () => {
    const loaded = notesReducer(initialNotesState, { type: "load", notes: [makeNote()] })
    const s = notesReducer(loaded, { type: "update", id: "nope", patch: { text: "x" }, now: 2000 })
    expect(s.notes[0].text).toBe("")
  })

  it("remove deletes by id", () => {
    let s = notesReducer(initialNotesState, { type: "load", notes: [makeNote("a"), makeNote("b")] })
    s = notesReducer(s, { type: "remove", id: "a" })
    expect(s.notes.map((n) => n.id)).toEqual(["b"])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/sticky-notes/__tests__/store.test.ts`
Expected: FAIL — cannot resolve `@/lib/sticky-notes/store`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/sticky-notes/store.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/sticky-notes/__tests__/store.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/sticky-notes/store.ts src/lib/sticky-notes/__tests__/store.test.ts
git commit -m "feat(sticky-notes): add pure notes reducer and note factory"
```

---

### Task 3: Selector engine (build + resolve anchors)

**Files:**
- Create: `src/lib/sticky-notes/selector.ts`
- Test: `src/lib/sticky-notes/__tests__/selector.test.ts`

**Interfaces:**
- Consumes: `NoteAnchor` from `./types`.
- Produces:
  - `buildSelector(el: Element): { selector: string; tag: string }` — used by the provider (placement) and note card (drag re-anchor).
  - `resolveAnchor(anchor: NoteAnchor, doc: Document): Element | null` — used by `useAnchorPosition` (Task 8). Returns `null` when the selector doesn't resolve, throws never (invalid selectors are caught), and returns `null` on tag mismatch.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/sticky-notes/__tests__/selector.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest"
import { buildSelector, resolveAnchor } from "@/lib/sticky-notes/selector"
import type { NoteAnchor } from "@/lib/sticky-notes/types"

const anchorFor = (selector: string, tag: string): NoteAnchor => ({
  selector,
  tag,
  offsetX: 0,
  offsetY: 0,
  fallbackX: 0,
  fallbackY: 0,
})

beforeEach(() => {
  document.body.innerHTML = ""
})

describe("buildSelector", () => {
  it("uses #id when present and stops walking up", () => {
    document.body.innerHTML = `<main><div id="revenue"></div></main>`
    const el = document.getElementById("revenue")!
    const { selector, tag } = buildSelector(el)
    expect(selector).toBe("#revenue")
    expect(tag).toBe("div")
    expect(resolveAnchor(anchorFor(selector, tag), document)).toBe(el)
  })

  it("uses stable data attributes when there is no id", () => {
    document.body.innerHTML = `<main><button data-testid="save"></button></main>`
    const el = document.querySelector("button")!
    const { selector, tag } = buildSelector(el)
    expect(selector).toBe(`main:nth-of-type(1) > button[data-testid="save"]`)
    expect(resolveAnchor(anchorFor(selector, tag), document)).toBe(el)
  })

  it("falls back to an nth-of-type structural path", () => {
    document.body.innerHTML =
      `<main><section></section><section><p>a</p><p>b</p></section></main>`
    const el = document.querySelectorAll("p")[1]
    const { selector, tag } = buildSelector(el)
    expect(selector).toBe(
      "main:nth-of-type(1) > section:nth-of-type(2) > p:nth-of-type(2)"
    )
    expect(tag).toBe("p")
    expect(resolveAnchor(anchorFor(selector, tag), document)).toBe(el)
  })

  it("returns 'body' for the body element itself", () => {
    const { selector, tag } = buildSelector(document.body)
    expect(selector).toBe("body")
    expect(tag).toBe("body")
    expect(resolveAnchor(anchorFor(selector, tag), document)).toBe(document.body)
  })
})

describe("resolveAnchor", () => {
  it("returns null when nothing matches", () => {
    expect(resolveAnchor(anchorFor("#missing", "div"), document)).toBeNull()
  })

  it("returns null when the tag does not match (layout changed)", () => {
    document.body.innerHTML = `<span id="thing"></span>`
    expect(resolveAnchor(anchorFor("#thing", "div"), document)).toBeNull()
  })

  it("returns null for an invalid selector instead of throwing", () => {
    expect(resolveAnchor(anchorFor(":::not-a-selector", "div"), document)).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/sticky-notes/__tests__/selector.test.ts`
Expected: FAIL — cannot resolve `@/lib/sticky-notes/selector`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/sticky-notes/selector.ts`:

```ts
import type { NoteAnchor } from "./types"

const STABLE_ATTRS = ["data-testid", "data-slot", "data-note-anchor"]

function nthOfType(el: Element): number {
  let i = 1
  let sib = el.previousElementSibling
  while (sib) {
    if (sib.tagName === el.tagName) i++
    sib = sib.previousElementSibling
  }
  return i
}

function segment(el: Element): string {
  if (el.id) return `#${CSS.escape(el.id)}`
  const tag = el.tagName.toLowerCase()
  for (const attr of STABLE_ATTRS) {
    const v = el.getAttribute(attr)
    if (v) return `${tag}[${attr}="${CSS.escape(v)}"]`
  }
  return `${tag}:nth-of-type(${nthOfType(el)})`
}

/**
 * Builds a CSS selector for an element: #id if available, else a stable
 * data-attribute, else an nth-of-type path from body. Walking stops at the
 * first #id segment (ids are assumed unique).
 */
export function buildSelector(el: Element): { selector: string; tag: string } {
  const doc = el.ownerDocument
  const tag = el.tagName.toLowerCase()
  if (el === doc.body) return { selector: "body", tag }
  const parts: string[] = []
  let cur: Element | null = el
  while (cur && cur !== doc.body && cur !== doc.documentElement) {
    const seg = segment(cur)
    parts.unshift(seg)
    if (seg.startsWith("#")) break
    cur = cur.parentElement
  }
  return { selector: parts.join(" > "), tag }
}

/**
 * Resolves an anchor back to its element. Returns null (never throws) when
 * the selector is invalid, matches nothing, or matches an element whose tag
 * differs from the recorded one.
 */
export function resolveAnchor(anchor: NoteAnchor, doc: Document): Element | null {
  let el: Element | null = null
  try {
    el = doc.querySelector(anchor.selector)
  } catch {
    return null
  }
  if (!el) return null
  if (el.tagName.toLowerCase() !== anchor.tag) return null
  return el
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/sticky-notes/__tests__/selector.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/sticky-notes/selector.ts src/lib/sticky-notes/__tests__/selector.test.ts
git commit -m "feat(sticky-notes): add selector build/resolve engine for element anchoring"
```

---

### Task 4: Storage adapters (localStorage + REST)

**Files:**
- Create: `src/lib/sticky-notes/adapters/local-storage.ts`
- Create: `src/lib/sticky-notes/adapters/rest.ts`
- Test: `src/lib/sticky-notes/__tests__/adapters.test.ts`

**Interfaces:**
- Consumes: `StorageAdapter`, `StickyNote` from `../types`.
- Produces:
  - `localStorageAdapter: StorageAdapter` — key format `sticky-notes:<pageKey>`; `load` returns `[]` on missing/corrupt data and never throws.
  - `restAdapter(baseUrl: string): StorageAdapter` — `load` GETs `<baseUrl>?page=<encoded pageKey>` expecting `{ notes: StickyNote[] }`; `save` POSTs `{ page, notes }` as JSON. Both throw on non-OK responses (the provider surfaces this as the "unsaved" state).

- [ ] **Step 1: Write the failing tests**

Create `src/lib/sticky-notes/__tests__/adapters.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { localStorageAdapter } from "@/lib/sticky-notes/adapters/local-storage"
import { restAdapter } from "@/lib/sticky-notes/adapters/rest"
import { createNote } from "@/lib/sticky-notes/store"

const note = createNote({
  id: "n1",
  pageKey: "/crypto",
  color: "blue",
  anchor: { selector: "#x", tag: "div", offsetX: 1, offsetY: 2, fallbackX: 3, fallbackY: 4 },
  now: 1000,
})

describe("localStorageAdapter", () => {
  beforeEach(() => window.localStorage.clear())

  it("returns [] when nothing is stored", async () => {
    expect(await localStorageAdapter.load("/crypto")).toEqual([])
  })

  it("round-trips notes per pageKey", async () => {
    await localStorageAdapter.save("/crypto", [note])
    expect(await localStorageAdapter.load("/crypto")).toEqual([note])
    expect(await localStorageAdapter.load("/other")).toEqual([])
  })

  it("returns [] on corrupt JSON", async () => {
    window.localStorage.setItem("sticky-notes:/crypto", "{nope")
    expect(await localStorageAdapter.load("/crypto")).toEqual([])
  })
})

describe("restAdapter", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("GETs notes for a page", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ notes: [note] })))
    vi.stubGlobal("fetch", fetchMock)
    const adapter = restAdapter("/api/sticky-notes")
    const notes = await adapter.load("/crypto")
    expect(fetchMock).toHaveBeenCalledWith("/api/sticky-notes?page=%2Fcrypto")
    expect(notes).toEqual([note])
  })

  it("POSTs page and notes on save", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true })))
    vi.stubGlobal("fetch", fetchMock)
    const adapter = restAdapter("/api/sticky-notes")
    await adapter.save("/crypto", [note])
    expect(fetchMock).toHaveBeenCalledWith("/api/sticky-notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "/crypto", notes: [note] }),
    })
  })

  it("throws on non-OK responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 500 })))
    const adapter = restAdapter("/api/sticky-notes")
    await expect(adapter.load("/crypto")).rejects.toThrow()
    await expect(adapter.save("/crypto", [])).rejects.toThrow()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/sticky-notes/__tests__/adapters.test.ts`
Expected: FAIL — cannot resolve the adapter modules.

- [ ] **Step 3: Write the implementations**

Create `src/lib/sticky-notes/adapters/local-storage.ts`:

```ts
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
```

Create `src/lib/sticky-notes/adapters/rest.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/sticky-notes/__tests__/adapters.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/sticky-notes/adapters/ src/lib/sticky-notes/__tests__/adapters.test.ts
git commit -m "feat(sticky-notes): add localStorage and REST storage adapters"
```

---

### Task 5: Server file store + API route

**Files:**
- Create: `src/lib/sticky-notes/server/file-store.ts`
- Create: `src/app/api/sticky-notes/route.ts`
- Test: `src/lib/sticky-notes/__tests__/file-store.test.ts`
- Modify: `.gitignore` (add `.data/`; create the file if it does not exist)

**Interfaces:**
- Consumes: nothing from the library (server-side module; imports only `fs`/`path`).
- Produces:
  - `type StoreShape = Record<string, unknown[]>` (pageKey → notes array)
  - `readStore(filePath: string): Promise<StoreShape>` — `{}` on missing/corrupt file, never throws.
  - `writeStore(filePath: string, store: StoreShape): Promise<void>` — creates parent directories.
  - HTTP: `GET /api/sticky-notes?page=<pageKey>` → `{ notes: [...] }` (400 if `page` missing); `POST /api/sticky-notes` with `{ page: string, notes: [] }` → `{ ok: true }` (400 on invalid body). Store file: `<repo>/.data/sticky-notes.json`. This is the contract `restAdapter` (Task 4) relies on.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/sticky-notes/__tests__/file-store.test.ts`:

```ts
// @vitest-environment node
import { mkdtemp, readFile, rm, writeFile } from "fs/promises"
import { tmpdir } from "os"
import path from "path"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { readStore, writeStore } from "@/lib/sticky-notes/server/file-store"

let dir: string
beforeEach(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "sticky-notes-"))
})
afterEach(async () => {
  await rm(dir, { recursive: true, force: true })
})

describe("file store", () => {
  it("readStore returns {} for a missing file", async () => {
    expect(await readStore(path.join(dir, "nope.json"))).toEqual({})
  })

  it("write/read round-trips", async () => {
    const p = path.join(dir, "store.json")
    await writeStore(p, { "/crypto": [{ id: "n1" }] })
    expect(await readStore(p)).toEqual({ "/crypto": [{ id: "n1" }] })
  })

  it("readStore returns {} on corrupt content", async () => {
    const p = path.join(dir, "store.json")
    await writeFile(p, "{{{", "utf8")
    expect(await readStore(p)).toEqual({})
  })

  it("writeStore creates parent directories", async () => {
    const p = path.join(dir, "nested", "deep", "store.json")
    await writeStore(p, {})
    expect(JSON.parse(await readFile(p, "utf8"))).toEqual({})
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/lib/sticky-notes/__tests__/file-store.test.ts`
Expected: FAIL — cannot resolve `@/lib/sticky-notes/server/file-store`.

- [ ] **Step 3: Write the file store**

Create `src/lib/sticky-notes/server/file-store.ts`:

```ts
import { promises as fs } from "fs"
import path from "path"

/** pageKey -> array of serialized notes */
export type StoreShape = Record<string, unknown[]>

export async function readStore(filePath: string): Promise<StoreShape> {
  try {
    const raw = await fs.readFile(filePath, "utf8")
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === "object" ? (parsed as StoreShape) : {}
  } catch {
    return {}
  }
}

export async function writeStore(filePath: string, store: StoreShape): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf8")
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/lib/sticky-notes/__tests__/file-store.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Write the route handler**

Create `src/app/api/sticky-notes/route.ts`:

```ts
import path from "path"
import { readStore, writeStore } from "@/lib/sticky-notes/server/file-store"

const STORE_PATH = path.join(process.cwd(), ".data", "sticky-notes.json")

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = url.searchParams.get("page")
  if (!page) {
    return Response.json({ error: "page query parameter is required" }, { status: 400 })
  }
  const store = await readStore(STORE_PATH)
  return Response.json({ notes: store[page] ?? [] })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (
    !body ||
    typeof (body as { page?: unknown }).page !== "string" ||
    !Array.isArray((body as { notes?: unknown }).notes)
  ) {
    return Response.json(
      { error: "body must be { page: string, notes: [] }" },
      { status: 400 }
    )
  }
  const { page, notes } = body as { page: string; notes: unknown[] }
  const store = await readStore(STORE_PATH)
  store[page] = notes
  await writeStore(STORE_PATH, store)
  return Response.json({ ok: true })
}
```

Append to `.gitignore` (create the file with this content if missing):

```
.data/
```

- [ ] **Step 6: Verify the route against the dev server**

Start the dev server in the background (`npm run dev`, or the preview tool once `.claude/launch.json` exists from Task 6 — at this point plain background `npm run dev` is fine). Then:

Run: `curl -s "http://localhost:3000/api/sticky-notes?page=/crypto"`
Expected: `{"notes":[]}`

Run: `curl -s -X POST -H "Content-Type: application/json" -d '{"page":"/t","notes":[{"id":"n1"}]}' http://localhost:3000/api/sticky-notes`
Expected: `{"ok":true}`

Run: `curl -s "http://localhost:3000/api/sticky-notes?page=/t"`
Expected: `{"notes":[{"id":"n1"}]}`

Run: `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/api/sticky-notes"`
Expected: `400`

Also confirm `.data/sticky-notes.json` exists and `git status` does NOT list it (gitignore works). Stop the dev server if you started it ad hoc.

- [ ] **Step 7: Commit**

```bash
git add src/lib/sticky-notes/server/ src/app/api/sticky-notes/route.ts src/lib/sticky-notes/__tests__/file-store.test.ts .gitignore
git commit -m "feat(sticky-notes): add JSON file store and /api/sticky-notes route"
```

---

### Task 6: Provider — context, persistence wiring, portal overlay

**Files:**
- Create: `src/lib/sticky-notes/provider.tsx`
- Create: `src/lib/sticky-notes/index.ts`
- Create: `src/components/sticky-notes-app-provider.tsx`
- Create: `.claude/launch.json`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `notesReducer`/`initialNotesState`/`createNote` (Task 2), `buildSelector` (Task 3), `localStorageAdapter` (Task 4), types (Task 1).
- Produces (used by Tasks 7–10):
  - `StickyNotesProvider({ adapter?: StorageAdapter, children })` — default adapter `localStorageAdapter`.
  - `useStickyNotesInternal()` returning `{ notes, addNoteAt(clientX, clientY), updateNote(id, patch), removeNote(id), layerVisible, setLayerVisible, activeColor, setActiveColor, placing, setPlacing, saveState, registryRef, dirtyRef, overlayRef }`.
  - `useStickyNotes()` (public) returning `{ notes, addNote, updateNote, removeNote, layerVisible, setLayerVisible }` where `addNote === addNoteAt`.
  - `type NoteGeometry = { x, y, w, h, anchorX, anchorY, detached, dragging, minimized, color }` (all numbers/booleans, `color: NoteColor`) — the canvas registry entry shape.
  - `type SaveState = "idle" | "saving" | "error"`.
  - The overlay portal root `<div data-sticky-notes-overlay>` (fixed, inset 0, z-index 9999, pointer-events none). Later tasks insert `<CanvasLayer />`, note cards, the placement catcher, and `<StickyNotesToolbar />` into the marked slots.

- [ ] **Step 1: Write the provider**

Create `src/lib/sticky-notes/provider.tsx`:

```tsx
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
  adapterRef.current = adapter
  const firstAfterLoadRef = React.useRef(true)

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
```

- [ ] **Step 2: Write the public entry point**

Create `src/lib/sticky-notes/index.ts`:

```ts
export { StickyNotesProvider, useStickyNotes } from "./provider"
export type { NoteGeometry, SaveState, NotePatch } from "./provider"
export { localStorageAdapter } from "./adapters/local-storage"
export { restAdapter } from "./adapters/rest"
export { NOTE_COLORS, NOTE_COLOR_LIST } from "./types"
export type { NoteAnchor, NoteColor, StickyNote, StorageAdapter } from "./types"
```

(Note: `StickyNotesToolbar` is added to these exports in Task 7 when it exists.)

- [ ] **Step 3: Mount in the app**

Create `src/components/sticky-notes-app-provider.tsx` (a Server Component cannot pass an adapter object to a client component, so the demo wires the adapter inside a client file):

```tsx
"use client"

import { StickyNotesProvider } from "@/lib/sticky-notes"

export function AppStickyNotes({ children }: { children: React.ReactNode }) {
  return <StickyNotesProvider>{children}</StickyNotesProvider>
}
```

Modify `src/app/layout.tsx` — add the import and wrap `{children}`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { AppStickyNotes } from "@/components/sticky-notes-app-provider";

export const metadata: Metadata = {
  title: "Design System - reUI & cult-ui Inspired Components",
  description: "A comprehensive design system built on shadcn/ui with reUI and cult-ui inspired components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppStickyNotes>{children}</AppStickyNotes>
      </body>
    </html>
  );
}
```

Create `.claude/launch.json` so later tasks can use the preview tool:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "dev",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

- [ ] **Step 4: Verify in the browser**

Start the dev server via the preview tool (config `dev`). Then verify:

1. `http://localhost:3000/` and `http://localhost:3000/crypto` render exactly as before (no layout change).
2. No errors in the browser console and no errors in the server logs.
3. The overlay exists: evaluate `!!document.querySelector("[data-sticky-notes-overlay]")` → `true`.
4. The page is still fully interactive (click a button/tab on the crypto dashboard).

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all tests from Tasks 1–5 still PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sticky-notes/provider.tsx src/lib/sticky-notes/index.ts src/components/sticky-notes-app-provider.tsx src/app/layout.tsx .claude/launch.json
git commit -m "feat(sticky-notes): add provider with persistence wiring and portal overlay"
```

---

### Task 7: Toolbar + placement mode

**Files:**
- Create: `src/lib/sticky-notes/toolbar.tsx`
- Modify: `src/lib/sticky-notes/provider.tsx` (render toolbar + placement catcher + Esc handling)
- Modify: `src/lib/sticky-notes/index.ts` (export `StickyNotesToolbar`)

**Interfaces:**
- Consumes: `useStickyNotesInternal()`, `NOTE_COLORS`, `NOTE_COLOR_LIST`.
- Produces: `StickyNotesToolbar()` component (floating pill, `pointer-events: auto`). Placement flow: toolbar "+" sets `placing = true`; a full-overlay catcher div captures the next click, calls `addNoteAt(clientX, clientY)`, and exits placement mode; `Escape` cancels.

- [ ] **Step 1: Write the toolbar**

Create `src/lib/sticky-notes/toolbar.tsx`:

```tsx
"use client"

import * as React from "react"
import { NOTE_COLORS, NOTE_COLOR_LIST } from "./types"
import { useStickyNotesInternal } from "./provider"

const pillBtn: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 9999,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export function StickyNotesToolbar() {
  const {
    notes,
    placing,
    setPlacing,
    activeColor,
    setActiveColor,
    layerVisible,
    setLayerVisible,
    saveState,
  } = useStickyNotesInternal()

  return (
    <div
      data-sticky-notes-toolbar=""
      style={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 9999,
        background: "rgba(24,24,27,0.92)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={() => setPlacing(!placing)}
        title={placing ? "Cancel (Esc)" : "Add note"}
        style={{
          ...pillBtn,
          background: placing ? "#f87171" : NOTE_COLORS[activeColor].strip,
          color: "#18181b",
          fontWeight: 700,
        }}
      >
        {placing ? "×" : "+"}
      </button>
      {NOTE_COLOR_LIST.map((c) => (
        <button
          key={c}
          onClick={() => setActiveColor(c)}
          title={c}
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: NOTE_COLORS[c].dot,
            border: c === activeColor ? "2px solid #ffffff" : "2px solid transparent",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
      <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.2)" }} />
      <button
        onClick={() => setLayerVisible(!layerVisible)}
        title={layerVisible ? "Hide notes" : "Show notes"}
        style={{ ...pillBtn, background: "transparent", color: "#ffffff", fontSize: 13 }}
      >
        {layerVisible ? "◉" : "◎"}
      </button>
      <span
        title="Notes on this page"
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 12,
          minWidth: 16,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {notes.length}
      </span>
      {saveState === "error" && (
        <span
          title="Notes not saved — will retry on the next change"
          style={{ width: 8, height: 8, borderRadius: 9999, background: "#f59e0b" }}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Wire toolbar + placement into the provider**

In `src/lib/sticky-notes/provider.tsx`:

Add the import:

```tsx
import { StickyNotesToolbar } from "./toolbar"
```

Add an Escape-cancels-placement effect after the "repaint" effect:

```tsx
  // Escape cancels placement mode.
  React.useEffect(() => {
    if (!placing) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlacing(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [placing])
```

Replace the four placeholder comments in the overlay portal with:

```tsx
          {/* canvas layer (Task 10) */}
          {/* note cards (Task 8) */}
          {placing && (
            <div
              data-sticky-notes-catcher=""
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "auto",
                cursor: "crosshair",
              }}
              onClick={(e) => {
                addNoteAt(e.clientX, e.clientY)
                setPlacing(false)
              }}
            />
          )}
          <StickyNotesToolbar />
```

In `src/lib/sticky-notes/index.ts`, add:

```ts
export { StickyNotesToolbar } from "./toolbar"
```

- [ ] **Step 3: Verify in the browser**

With the dev server running, on `http://localhost:3000/crypto`:

1. Toolbar pill is visible bottom-center: "+" button, 6 color swatches, visibility toggle, count `0`.
2. Click a swatch → it gets the white ring; the "+" button turns that color.
3. Click "+" → cursor over the page becomes a crosshair; press `Escape` → crosshair layer gone, "+" restored.
4. Click "+" then click the middle of the page → count changes `0 → 1` (the note itself is not rendered until Task 8 — the count and persisted state are the verification).
5. Reload the page → count is still `1` (localStorage load path works).
6. Toggle visibility button → no errors (nothing visible changes yet).
7. No console or server errors throughout.

Then clear the test note for a clean slate: evaluate `localStorage.clear()` in the browser console and reload (count returns to 0).

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/sticky-notes/toolbar.tsx src/lib/sticky-notes/provider.tsx src/lib/sticky-notes/index.ts
git commit -m "feat(sticky-notes): add floating toolbar and click-to-place mode"
```

---

### Task 8: Anchor tracking + note card (render, edit, delete, minimize)

**Files:**
- Create: `src/lib/sticky-notes/use-anchor-position.ts`
- Create: `src/lib/sticky-notes/note-card.tsx`
- Modify: `src/lib/sticky-notes/provider.tsx` (render note cards)

**Interfaces:**
- Consumes: `resolveAnchor` (Task 3), `useStickyNotesInternal` + `NoteGeometry` (Task 6), `NOTE_COLORS` (Task 1).
- Produces:
  - `computeAnchorPosition(anchor: NoteAnchor, doc: Document, win: Window): { x, y, detached, anchorX, anchorY }` — viewport coordinates; `anchorX/anchorY` is the anchor element's center (canvas pin point); when detached, `x/y` come from fallback document coords minus scroll and `anchorX/anchorY` are `0`.
  - `useAnchorPosition(anchor: NoteAnchor)` hook returning the same shape, live-updated on scroll (capture phase — inner scroll containers too), resize, anchor-element resize (ResizeObserver), and a 1 s safety interval for DOM re-renders.
  - `NoteCard({ note }: { note: StickyNote })` — full note UI. Task 9 extends it with drag/resize; Task 10 reads the geometry it publishes into `registryRef`.

- [ ] **Step 1: Write the anchor-position hook**

Create `src/lib/sticky-notes/use-anchor-position.ts`:

```tsx
"use client"

import * as React from "react"
import type { NoteAnchor } from "./types"
import { resolveAnchor } from "./selector"

export type AnchorPosition = {
  /** note top-left, viewport coordinates */
  x: number
  y: number
  /** true when the selector no longer resolves and fallback coords are used */
  detached: boolean
  /** anchor element center, viewport coordinates (0,0 when detached) */
  anchorX: number
  anchorY: number
}

export function computeAnchorPosition(
  anchor: NoteAnchor,
  doc: Document,
  win: Window
): AnchorPosition {
  const el = resolveAnchor(anchor, doc)
  if (!el) {
    return {
      x: anchor.fallbackX - win.scrollX,
      y: anchor.fallbackY - win.scrollY,
      detached: true,
      anchorX: 0,
      anchorY: 0,
    }
  }
  const rect = el.getBoundingClientRect()
  return {
    x: rect.left + anchor.offsetX,
    y: rect.top + anchor.offsetY,
    detached: false,
    anchorX: rect.left + rect.width / 2,
    anchorY: rect.top + rect.height / 2,
  }
}

export function useAnchorPosition(anchor: NoteAnchor): AnchorPosition {
  const [pos, setPos] = React.useState<AnchorPosition>(() => ({
    x: anchor.fallbackX,
    y: anchor.fallbackY,
    detached: false,
    anchorX: 0,
    anchorY: 0,
  }))

  React.useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setPos((prev) => {
        const next = computeAnchorPosition(anchor, document, window)
        return prev.x === next.x &&
          prev.y === next.y &&
          prev.detached === next.detached &&
          prev.anchorX === next.anchorX &&
          prev.anchorY === next.anchorY
          ? prev
          : next
      })
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    // capture: true so scrolls inside nested scroll containers are seen too
    window.addEventListener("scroll", schedule, { capture: true, passive: true })
    window.addEventListener("resize", schedule)

    const el = resolveAnchor(anchor, document)
    let ro: ResizeObserver | null = null
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(schedule)
      ro.observe(el)
    }
    // safety net for re-renders / layout changes not caught by the observers
    const interval = window.setInterval(schedule, 1000)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", schedule, true)
      window.removeEventListener("resize", schedule)
      ro?.disconnect()
      window.clearInterval(interval)
    }
  }, [anchor])

  return pos
}
```

- [ ] **Step 2: Write the note card (without drag/resize yet)**

Create `src/lib/sticky-notes/note-card.tsx`:

```tsx
"use client"

import * as React from "react"
import { NOTE_COLORS, type StickyNote } from "./types"
import { useAnchorPosition } from "./use-anchor-position"
import { useStickyNotesInternal } from "./provider"

const stripBtn: React.CSSProperties = {
  width: 18,
  height: 18,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 13,
  lineHeight: 1,
  padding: 0,
  color: "rgba(0,0,0,0.55)",
}

export function NoteCard({ note }: { note: StickyNote }) {
  const { updateNote, removeNote, registryRef, dirtyRef } = useStickyNotesInternal()
  const pos = useAnchorPosition(note.anchor)
  const colors = NOTE_COLORS[note.color]
  const x = pos.x
  const y = pos.y

  // Publish geometry for the canvas layer (Task 10 reads this registry).
  React.useEffect(() => {
    registryRef.current.set(note.id, {
      x,
      y,
      w: note.size.w,
      h: note.size.h,
      anchorX: pos.anchorX,
      anchorY: pos.anchorY,
      detached: pos.detached,
      dragging: false,
      minimized: note.minimized,
      color: note.color,
    })
    dirtyRef.current = true
  })

  React.useEffect(() => {
    const registry = registryRef.current
    return () => {
      registry.delete(note.id)
      dirtyRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (note.minimized) {
    return (
      <button
        title={note.text || "Sticky note"}
        onClick={() => updateNote(note.id, { minimized: false })}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${x}px, ${y}px)`,
          width: 22,
          height: 22,
          borderRadius: 9999,
          background: colors.dot,
          border: "2px solid rgba(0,0,0,0.15)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          pointerEvents: "auto",
          cursor: "pointer",
          padding: 0,
        }}
      />
    )
  }

  return (
    <div
      data-sticky-note={note.id}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        width: note.size.w,
        height: note.size.h,
        background: colors.bg,
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        data-sticky-note-strip=""
        style={{
          height: 24,
          flexShrink: 0,
          background: colors.strip,
          borderRadius: "4px 4px 0 0",
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
          padding: "0 4px",
          touchAction: "none",
        }}
      >
        {pos.detached && (
          <span
            title="Anchor lost — pinned to page position"
            style={{ marginRight: "auto", fontSize: 11 }}
          >
            📌
          </span>
        )}
        <button
          title="Minimize"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => updateNote(note.id, { minimized: true })}
          style={stripBtn}
        >
          –
        </button>
        <button
          title="Delete"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => removeNote(note.id)}
          style={stripBtn}
        >
          ×
        </button>
      </div>
      <textarea
        value={note.text}
        placeholder="Write something…"
        autoFocus={note.text === ""}
        onChange={(e) => updateNote(note.id, { text: e.target.value })}
        style={{
          flex: 1,
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          padding: 8,
          fontSize: 13,
          lineHeight: 1.4,
          color: "#1f2937",
          fontFamily: "inherit",
        }}
      />
    </div>
  )
}
```

- [ ] **Step 3: Render note cards in the provider**

In `src/lib/sticky-notes/provider.tsx`, add the import:

```tsx
import { NoteCard } from "./note-card"
```

Replace the `{/* note cards (Task 8) */}` placeholder in the overlay with:

```tsx
          {layerVisible && state.notes.map((n) => <NoteCard key={n.id} note={n} />)}
```

- [ ] **Step 4: Verify in the browser**

With the dev server running, on `http://localhost:3000/crypto`:

1. Click "+" and click on a stat card → a yellow note appears at the click point with a focused empty textarea.
2. Type "check this number" → text appears; count shows `1`.
3. Scroll the page → the note moves with the element it is anchored to (stays glued to the stat card).
4. Reload → the note reappears at the same element with its text.
5. Minimize (–) → note collapses to a colored dot; click the dot → restores.
6. Toolbar visibility toggle → notes disappear/reappear (toolbar stays).
7. Pick pink, place a second note elsewhere → it is pink; count `2`.
8. Delete (×) both notes → count `0`; reload → still `0`.
9. No console or server errors throughout.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sticky-notes/use-anchor-position.ts src/lib/sticky-notes/note-card.tsx src/lib/sticky-notes/provider.tsx
git commit -m "feat(sticky-notes): render element-anchored notes with edit, delete and minimize"
```

---

### Task 9: Drag-to-move with re-anchoring + resize

**Files:**
- Modify: `src/lib/sticky-notes/note-card.tsx`

**Interfaces:**
- Consumes: `buildSelector` (Task 3), `updateNote` (Task 6).
- Produces: drag behavior on the note strip (pointer capture; live visual offset; on drop, the note re-anchors to the element under the pointer via `buildSelector` and new offsets keep the note exactly where it was dropped). Resize handle at bottom-right (min 140×110). The geometry registry entry's `dragging` flag is true during drags (Task 10 uses it for the shadow).

- [ ] **Step 1: Add drag + resize to the note card**

In `src/lib/sticky-notes/note-card.tsx`:

Add the import:

```tsx
import { buildSelector } from "./selector"
```

Inside `NoteCard`, add drag state and the overlay ref (get `overlayRef` from the internal context). Change the context destructuring line to:

```tsx
  const { updateNote, removeNote, registryRef, dirtyRef, overlayRef } = useStickyNotesInternal()
```

Add after the `const pos = useAnchorPosition(note.anchor)` line:

```tsx
  const [drag, setDrag] = React.useState<{ dx: number; dy: number } | null>(null)
```

Change the `const x = pos.x` / `const y = pos.y` lines to:

```tsx
  const x = pos.x + (drag?.dx ?? 0)
  const y = pos.y + (drag?.dy ?? 0)
```

In the geometry-publishing effect, change `dragging: false,` to:

```tsx
      dragging: drag !== null,
```

Add the handlers before the `if (note.minimized)` return:

```tsx
  const reanchor = React.useCallback(
    (pointerX: number, pointerY: number, dx: number, dy: number) => {
      if (dx === 0 && dy === 0) return
      const left = pos.x + dx
      const top = pos.y + dy
      const overlay = overlayRef.current
      if (overlay) overlay.style.display = "none"
      const el = document.elementFromPoint(pointerX, pointerY)
      if (overlay) overlay.style.display = ""
      const target = el && el !== document.documentElement ? el : document.body
      const { selector, tag } = buildSelector(target)
      const rect = target.getBoundingClientRect()
      updateNote(note.id, {
        anchor: {
          selector,
          tag,
          offsetX: left - rect.left,
          offsetY: top - rect.top,
          fallbackX: left + window.scrollX,
          fallbackY: top + window.scrollY,
        },
      })
    },
    [note.id, pos.x, pos.y, overlayRef, updateNote]
  )

  const dragStart = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const target = e.currentTarget as HTMLElement
    target.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) =>
      setDrag({ dx: ev.clientX - startX, dy: ev.clientY - startY })
    const up = (ev: PointerEvent) => {
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerup", up)
      reanchor(ev.clientX, ev.clientY, ev.clientX - startX, ev.clientY - startY)
      setDrag(null)
    }
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerup", up)
  }

  const resizeStart = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = note.size.w
    const startH = note.size.h
    const target = e.currentTarget as HTMLElement
    target.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) =>
      updateNote(note.id, {
        size: {
          w: Math.max(140, startW + ev.clientX - startX),
          h: Math.max(110, startH + ev.clientY - startY),
        },
      })
    const up = () => {
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerup", up)
    }
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerup", up)
  }
```

Wire the strip: add `onPointerDown={dragStart}` to the strip div (the one with `data-sticky-note-strip`), and change its `cursor: "grab"` to `cursor: drag ? "grabbing" : "grab"`.

On the outer note div, make the shadow respond to dragging — replace the `boxShadow` line with:

```tsx
        boxShadow: drag
          ? "0 12px 28px rgba(0,0,0,0.35)"
          : "0 4px 12px rgba(0,0,0,0.2)",
```

Add the resize handle as the last child of the outer note div (after the `<textarea …/>`):

```tsx
      <div
        title="Resize"
        onPointerDown={resizeStart}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 14,
          height: 14,
          cursor: "nwse-resize",
          touchAction: "none",
          background:
            "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.25) 50%)",
          borderRadius: "0 0 4px 0",
        }}
      />
```

- [ ] **Step 2: Verify in the browser**

With the dev server running, on `http://localhost:3000/crypto`:

1. Place a note on a stat card. Drag it by its strip to a different card → it moves smoothly, shadow deepens while dragging.
2. Release → note stays put. Scroll → the note now tracks the NEW card (re-anchored).
3. Reload → note is on the new card.
4. Drag the bottom-right handle → note resizes live; cannot shrink below ~140×110.
5. Reload → size persisted.
6. Dragging the strip does not start when clicking the –/× buttons.
7. No console or server errors.
8. Clean up: delete test notes.

- [ ] **Step 3: Run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/lib/sticky-notes/note-card.tsx
git commit -m "feat(sticky-notes): add drag-to-move with re-anchoring and corner resize"
```

---

### Task 10: Canvas flair layer (connector strings, pins, drag shadows)

**Files:**
- Create: `src/lib/sticky-notes/canvas-layer.tsx`
- Modify: `src/lib/sticky-notes/provider.tsx` (render canvas layer)

**Interfaces:**
- Consumes: `NoteGeometry` registry (`registryRef`) and `dirtyRef` from Task 6; `NOTE_COLORS`.
- Produces: `CanvasLayer({ registryRef, dirtyRef })` — full-viewport, DPR-aware canvas, `pointer-events: none`, redrawing only when `dirtyRef.current` is set (note moves, scroll, resize). Draws per note: a sagging quadratic "string" from the note's top-left corner to a colored pin dot at the anchor element's center (skipped for minimized/detached notes), and a soft blurred shadow ellipse under a note while it is dragging.

- [ ] **Step 1: Write the canvas layer**

Create `src/lib/sticky-notes/canvas-layer.tsx`:

```tsx
"use client"

import * as React from "react"
import { NOTE_COLORS } from "./types"
import type { NoteGeometry } from "./provider"

export function CanvasLayer({
  registryRef,
  dirtyRef,
}: {
  registryRef: React.MutableRefObject<Map<string, NoteGeometry>>
  dirtyRef: React.MutableRefObject<boolean>
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dirtyRef.current = true
    }

    const markDirty = () => {
      dirtyRef.current = true
    }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!dirtyRef.current) return
      dirtyRef.current = false
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const g of registryRef.current.values()) {
        const colors = NOTE_COLORS[g.color]

        // soft shadow while dragging
        if (g.dragging && !g.minimized) {
          ctx.save()
          ctx.fillStyle = "rgba(0,0,0,0.18)"
          ctx.filter = "blur(10px)"
          ctx.beginPath()
          ctx.ellipse(g.x + g.w / 2, g.y + g.h + 14, g.w * 0.45, 10, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        if (g.detached || g.minimized) continue

        // sagging string from note corner to the anchor pin
        const sx = g.x + 10
        const sy = g.y + 10
        const px = g.anchorX
        const py = g.anchorY
        const mx = (sx + px) / 2
        const my = Math.max(sy, py) + 28
        ctx.strokeStyle = "rgba(90,90,90,0.55)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(mx, my, px, py)
        ctx.stroke()

        // pin dot at the anchor element center
        ctx.fillStyle = colors.dot
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = "rgba(0,0,0,0.3)"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", markDirty, { capture: true, passive: true })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", markDirty, true)
    }
  }, [registryRef, dirtyRef])

  return (
    <canvas
      ref={canvasRef}
      data-sticky-notes-canvas=""
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  )
}
```

- [ ] **Step 2: Wire into the provider**

In `src/lib/sticky-notes/provider.tsx`, add the import:

```tsx
import { CanvasLayer } from "./canvas-layer"
```

Replace the `{/* canvas layer (Task 10) */}` placeholder with:

```tsx
          {layerVisible && <CanvasLayer registryRef={registryRef} dirtyRef={dirtyRef} />}
```

- [ ] **Step 3: Verify in the browser**

With the dev server running, on `http://localhost:3000/crypto`:

1. Place a note on a stat card → a thin sagging string connects the note's top-left corner to a colored pin dot at the card's center.
2. Drag the note away → string stretches; while dragging a soft shadow appears under the note; on release the string re-attaches to the new anchor.
3. Scroll → string and pin track perfectly with the note and card.
4. Minimize the note → string and pin disappear; restore → they return.
5. Hide the layer via the toolbar → canvas and notes both gone; show → both back.
6. Zoom/resize the window → canvas stays sharp (DPR handling) and matches positions.
7. No console errors; scrolling stays smooth.
8. Clean up test notes.

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/sticky-notes/canvas-layer.tsx src/lib/sticky-notes/provider.tsx
git commit -m "feat(sticky-notes): add canvas underlay with anchor strings, pins and drag shadows"
```

---

### Task 11: Node persistence demo wiring + end-to-end verification

**Files:**
- Modify: `src/components/sticky-notes-app-provider.tsx` (switch demo to REST adapter)

**Interfaces:**
- Consumes: `restAdapter` (Task 4), `/api/sticky-notes` route (Task 5).
- Produces: the demo app persisting through the Node.js JSON-file store; the full feature verified end-to-end.

- [ ] **Step 1: Switch the demo to the REST adapter**

Replace the contents of `src/components/sticky-notes-app-provider.tsx` with:

```tsx
"use client"

import { restAdapter, StickyNotesProvider } from "@/lib/sticky-notes"

const adapter = restAdapter("/api/sticky-notes")

export function AppStickyNotes({ children }: { children: React.ReactNode }) {
  return <StickyNotesProvider adapter={adapter}>{children}</StickyNotesProvider>
}
```

- [ ] **Step 2: End-to-end verification in the browser**

With the dev server running:

1. On `/crypto`: place two notes (different colors), write text in both, drag one, resize one, minimize one.
2. Reload → everything restored exactly (now served from the Node route; check the network tab shows `GET /api/sticky-notes?page=/crypto` and debounced `POST`s).
3. Read `.data/sticky-notes.json` → contains the `/crypto` key with both notes.
4. Navigate to `/dashboard` (client-side nav) → count resets to this page's notes (0); place one note; navigate back to `/crypto` → its notes intact. Cross-page isolation confirmed.
5. Detached-anchor check: on `/crypto`, place a note on a stat card, then in the browser console remove that card's DOM node (e.g. `document.querySelector('<its selector>').remove()`) → the note stays at its page position and shows the 📌 detached icon; no string/pin drawn; no errors.
6. Stop/restart the dev server, reload → notes persist (file store survives restarts).
7. Save-failure indicator: stop the dev server, edit a note's text in the still-open page → after ~1 s the amber dot appears on the toolbar; restart the server, edit again → dot clears.

- [ ] **Step 3: Full quality gate**

Run: `npm test`
Expected: all unit tests PASS.

Run: `npm run lint`
Expected: no errors (warnings acceptable if pre-existing).

Run: `npm run build`
Expected: production build succeeds (proves SSR safety of the overlay).

- [ ] **Step 4: Screenshot proof**

With notes placed on `/crypto` (strings + pins visible, one minimized dot, toolbar showing), take a browser screenshot and share it with the user.

- [ ] **Step 5: Commit**

```bash
git add src/components/sticky-notes-app-provider.tsx
git commit -m "feat(sticky-notes): persist demo notes through the Node JSON-file API"
```

---

## Completion checklist (maps back to the spec)

- Provider/toolbar/hook/adapter public API — Tasks 1, 4, 6, 7
- Element anchoring with selector + offsets, fallback + 📌 detached state — Tasks 3, 8
- Canvas underlay: strings, pins, drag shadows, DPR-aware, dirty-flag rAF — Task 10
- Create (toolbar + click-to-place, Esc cancels), edit, drag + re-anchor, resize, minimize, delete, layer toggle — Tasks 7, 8, 9
- Per-path persistence, debounced optimistic saves, unsaved indicator, localStorage + REST + Node JSON-file route — Tasks 4, 5, 6, 11
- SSR safety + browser verification on the dashboards — Tasks 6, 11
