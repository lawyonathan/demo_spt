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
