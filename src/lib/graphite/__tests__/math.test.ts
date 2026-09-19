import { describe, expect, it } from "vitest"
import {
  bayerThreshold,
  clamp,
  clipToRect,
  hatchLines,
  mulberry32,
  polylineLength,
  slicePolyline,
  smoothstep,
  stageWindow,
  sweepPath,
} from "@/lib/graphite/math"

describe("mulberry32", () => {
  it("is deterministic for a seed and uniform-ish in [0,1)", () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    const xs = Array.from({ length: 200 }, () => a())
    expect(Array.from({ length: 200 }, () => b())).toEqual(xs)
    expect(xs.every((x) => x >= 0 && x < 1)).toBe(true)
    expect(new Set(xs).size).toBeGreaterThan(190)
  })
})

describe("scalar helpers", () => {
  it("clamps and eases", () => {
    expect(clamp(5, 0, 1)).toBe(1)
    expect(clamp(-1, 0, 1)).toBe(0)
    expect(smoothstep(0, 1, 0.5)).toBeCloseTo(0.5)
    expect(smoothstep(0, 1, -1)).toBe(0)
    expect(smoothstep(0, 1, 2)).toBe(1)
    expect(smoothstep(1, 1, 0.5)).toBe(0)
  })

  it("stageWindow maps a global progress onto a sub-window", () => {
    expect(stageWindow(0.1, 0.2, 0.6)).toBe(0)
    expect(stageWindow(0.4, 0.2, 0.6)).toBeCloseTo(0.5)
    expect(stageWindow(0.9, 0.2, 0.6)).toBe(1)
    expect(stageWindow(0.5, 0.5, 0.5)).toBe(1)
  })
})

describe("polylines", () => {
  const line = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
  ]

  it("measures length", () => {
    expect(polylineLength(line)).toBe(20)
  })

  it("slices a prefix by fraction of length, interpolating the tail", () => {
    expect(slicePolyline(line, 0)).toEqual([{ x: 0, y: 0 }])
    expect(slicePolyline(line, 0.5)).toEqual([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ])
    expect(slicePolyline(line, 0.75)).toEqual([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 5 },
    ])
    expect(slicePolyline(line, 1)).toEqual(line)
    expect(slicePolyline(line, 1)).not.toBe(line)
  })

  it("sweepPath starts and ends where asked and bows in between", () => {
    const pts = sweepPath({ x: 0, y: 0 }, { x: 100, y: 0 }, 20, 10, mulberry32(1))
    expect(pts).toHaveLength(11)
    expect(pts[0]).toEqual({ x: 0, y: 0 })
    expect(pts[10].x).toBeCloseTo(100)
    expect(pts[10].y).toBeCloseTo(0)
    expect(Math.abs(pts[5].y)).toBeCloseTo(20)
  })
})

describe("clipToRect", () => {
  const rect = { x: 0, y: 0, w: 100, h: 50 }

  it("keeps a segment fully inside", () => {
    expect(clipToRect({ x: 10, y: 10 }, { x: 20, y: 20 }, rect)).toEqual([
      { x: 10, y: 10 },
      { x: 20, y: 20 },
    ])
  })

  it("trims a segment crossing the rect", () => {
    const out = clipToRect({ x: -50, y: 25 }, { x: 150, y: 25 }, rect)
    expect(out).not.toBeNull()
    expect(out![0].x).toBeCloseTo(0)
    expect(out![1].x).toBeCloseTo(100)
  })

  it("drops a segment that misses", () => {
    expect(clipToRect({ x: -10, y: 60 }, { x: 200, y: 60 }, rect)).toBeNull()
    expect(clipToRect({ x: 200, y: -10 }, { x: 200, y: 100 }, rect)).toBeNull()
  })
})

describe("hatchLines", () => {
  it("covers the rect and never leaves it", () => {
    const rect = { x: 10, y: 20, w: 100, h: 50 }
    const lines = hatchLines(rect, -35, 8, mulberry32(3), 1)
    expect(lines.length).toBeGreaterThan(10)
    for (const [a, b] of lines) {
      for (const p of [a, b]) {
        expect(p.x).toBeGreaterThanOrEqual(rect.x - 1e-6)
        expect(p.x).toBeLessThanOrEqual(rect.x + rect.w + 1e-6)
        expect(p.y).toBeGreaterThanOrEqual(rect.y - 1e-6)
        expect(p.y).toBeLessThanOrEqual(rect.y + rect.h + 1e-6)
      }
    }
  })

  it("is reproducible for a seed", () => {
    const rect = { x: 0, y: 0, w: 40, h: 40 }
    expect(hatchLines(rect, 12, 5, mulberry32(9), 2)).toEqual(hatchLines(rect, 12, 5, mulberry32(9), 2))
  })
})

describe("bayerThreshold", () => {
  it("yields 16 distinct thresholds in (0,1) over a 4×4 tile", () => {
    const seen = new Set<number>()
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) seen.add(bayerThreshold(x, y))
    expect(seen.size).toBe(16)
    for (const v of seen) {
      expect(v).toBeGreaterThan(0)
      expect(v).toBeLessThan(1)
    }
    expect(bayerThreshold(-1, -1)).toBe(bayerThreshold(3, 3))
  })
})
