import type { NoteAnchor } from "./types"

const STABLE_ATTRS = ["data-testid", "data-slot", "data-note-anchor"]

const UNSAFE_IN_SELECTOR = /[^a-zA-Z0-9_-]/g

/**
 * Escapes a value for use inside a selector. Browsers provide CSS.escape;
 * jsdom does not, so tests fall back to backslash-escaping every character
 * that is not safe in a CSS identifier.
 */
function escapeForSelector(value: string): string {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value)
  }
  return value.replace(UNSAFE_IN_SELECTOR, (char) => `\\${char}`)
}

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
  if (el.id) return `#${escapeForSelector(el.id)}`
  const tag = el.tagName.toLowerCase()
  for (const attr of STABLE_ATTRS) {
    const v = el.getAttribute(attr)
    if (v) return `${tag}[${attr}="${escapeForSelector(v)}"]`
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
