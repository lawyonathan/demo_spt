// Pure geometry + noise helpers for the graphite kit. No DOM here so it all
// runs under vitest and in workers.

export type Point = { x: number; y: number }
export type Rect = { x: number; y: number; w: number; h: number }
export type Rng = () => number

/** Small, fast, seedable PRNG so every "hand-drawn" jitter is reproducible. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge1 === edge0) return x < edge0 ? 0 : 1
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/**
 * Maps a global 0..1 progress onto a sub-window, so one scroll position can
 * drive "contour, then hatch, then tone" in sequence (with overlap if the
 * windows overlap).
 */
export function stageWindow(progress: number, start: number, end: number): number {
  if (end <= start) return progress >= end ? 1 : 0
  return clamp((progress - start) / (end - start), 0, 1)
}

/** Jitters every vertex so a clean polyline reads as a hand-held stroke. */
export function roughen(points: Point[], amplitude: number, rng: Rng): Point[] {
  return points.map((p) => ({
    x: p.x + (rng() - 0.5) * 2 * amplitude,
    y: p.y + (rng() - 0.5) * 2 * amplitude,
  }))
}

export function pointsToPath(points: Point[]): string {
  if (points.length === 0) return ""
  const [first, ...rest] = points
  return `M${first.x.toFixed(2)} ${first.y.toFixed(2)}` + rest.map((p) => ` L${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join("")
}

export function polylineLength(points: Point[]): number {
  let len = 0
  for (let i = 1; i < points.length; i++) len += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
  return len
}

/** Prefix of a polyline covering the first `t` (0..1) of its length. Used to "draw on" a stroke. */
export function slicePolyline(points: Point[], t: number): Point[] {
  if (points.length < 2) return points.slice()
  const target = clamp(t, 0, 1) * polylineLength(points)
  if (target <= 0) return [points[0]]
  const out: Point[] = [points[0]]
  let walked = 0
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const seg = Math.hypot(b.x - a.x, b.y - a.y)
    if (walked + seg >= target) {
      const k = seg === 0 ? 0 : (target - walked) / seg
      out.push({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) })
      return out
    }
    walked += seg
    out.push(b)
  }
  return out
}

/** Liang–Barsky segment/rect clip. Returns null when the segment misses the rect. */
export function clipToRect(a: Point, b: Point, r: Rect): [Point, Point] | null {
  const dx = b.x - a.x
  const dy = b.y - a.y
  let t0 = 0
  let t1 = 1
  const p = [-dx, dx, -dy, dy]
  const q = [a.x - r.x, r.x + r.w - a.x, a.y - r.y, r.y + r.h - a.y]
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return null
      continue
    }
    const t = q[i] / p[i]
    if (p[i] < 0) {
      if (t > t1) return null
      if (t > t0) t0 = t
    } else {
      if (t < t0) return null
      if (t < t1) t1 = t
    }
  }
  return [
    { x: a.x + t0 * dx, y: a.y + t0 * dy },
    { x: a.x + t1 * dx, y: a.y + t1 * dy },
  ]
}

/**
 * Parallel hatch lines covering `rect` at `angleDeg`, spaced `spacing` apart.
 * `jitter` (px) wobbles each line's offset so the hatch reads as hand-laid.
 */
export function hatchLines(rect: Rect, angleDeg: number, spacing: number, rng: Rng = Math.random, jitter = 0): Array<[Point, Point]> {
  const a = (angleDeg * Math.PI) / 180
  const d = { x: Math.cos(a), y: Math.sin(a) }
  const n = { x: -d.y, y: d.x }
  const cx = rect.x + rect.w / 2
  const cy = rect.y + rect.h / 2
  const half = Math.hypot(rect.w, rect.h) / 2 + spacing
  const count = Math.ceil(half / Math.max(0.5, spacing))
  const lines: Array<[Point, Point]> = []
  for (let k = -count; k <= count; k++) {
    const offset = k * spacing + (jitter ? (rng() - 0.5) * 2 * jitter : 0)
    const ox = cx + n.x * offset
    const oy = cy + n.y * offset
    const clipped = clipToRect({ x: ox - d.x * half, y: oy - d.y * half }, { x: ox + d.x * half, y: oy + d.y * half }, rect)
    if (clipped) lines.push(clipped)
  }
  return lines
}

/** Uniform random points inside a rect (chalk stipple, dust seeds, paper flecks). */
export function stipple(rect: Rect, count: number, rng: Rng): Point[] {
  const pts: Point[] = []
  for (let i = 0; i < count; i++) pts.push({ x: rect.x + rng() * rect.w, y: rect.y + rng() * rect.h })
  return pts
}

/** 4×4 ordered-dither matrix, used for the stippled chalk phase. Threshold is 0..1. */
export const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const

export function bayerThreshold(x: number, y: number): number {
  return (BAYER_4[((y % 4) + 4) % 4][((x % 4) + 4) % 4] + 0.5) / 16
}

/**
 * A broad sweeping arc from `from` to `to`, bowed sideways by `bow` px and
 * perturbed by noise. This is the spine of a charcoal sweep.
 */
export function sweepPath(from: Point, to: Point, bow: number, segments: number, rng: Rng, wobble = 0): Point[] {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const pts: Point[] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const arc = Math.sin(t * Math.PI) * bow
    const w = wobble ? (rng() - 0.5) * 2 * wobble : 0
    pts.push({ x: from.x + dx * t + nx * (arc + w), y: from.y + dy * t + ny * (arc + w) })
  }
  return pts
}
