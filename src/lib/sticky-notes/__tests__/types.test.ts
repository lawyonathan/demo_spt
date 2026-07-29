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
