import { describe, expect, it } from "vitest"
import { enterProgress, throughProgress } from "@/lib/graphite/scroll-math"

describe("enterProgress", () => {
  const vh = 1000
  it("starts as the element clears the bottom edge and finishes after `span` viewport-heights", () => {
    expect(enterProgress(1200, vh)).toBe(0)
    expect(enterProgress(950, vh)).toBe(0) // exactly at the 5% offset line
    expect(enterProgress(950 - 275, vh)).toBeCloseTo(0.5)
    expect(enterProgress(950 - 550, vh)).toBe(1)
    expect(enterProgress(-500, vh)).toBe(1)
  })
  it("degrades to 1 with no viewport", () => {
    expect(enterProgress(100, 0)).toBe(1)
  })
})

describe("throughProgress", () => {
  it("scrubs a tall section past a sticky viewport", () => {
    expect(throughProgress(100, 3000, 1000)).toBe(0)
    expect(throughProgress(0, 3000, 1000)).toBe(0)
    expect(throughProgress(-1000, 3000, 1000)).toBeCloseTo(0.5)
    expect(throughProgress(-2000, 3000, 1000)).toBe(1)
    expect(throughProgress(-5000, 3000, 1000)).toBe(1)
  })
  it("is a step when the section is not taller than the viewport", () => {
    expect(throughProgress(10, 500, 1000)).toBe(0)
    expect(throughProgress(0, 500, 1000)).toBe(1)
  })
})
