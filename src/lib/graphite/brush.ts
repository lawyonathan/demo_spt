// Canvas 2D "physics" for lead and charcoal. Graphite is never a flat fill:
// every mark is a cloud of speckles whose density and alpha fall off from the
// stroke centre, so the paper tooth shows through.

import { clamp, lerp, mulberry32, roughen, type Point, type Rng } from "./math"

export const GRAPHITE_INK = "#1f1e1c"
export const CHARCOAL_INK = "#141416"
export const CHALK_INK = "#e8e4da"

export interface GraphiteStampOptions {
  radius: number
  /** 0..1 speckle density (default 0.7) */
  density?: number
  /** 0..1 peak alpha (default 0.5) */
  opacity?: number
  color?: string
  rng?: Rng
}

/** One footprint of the lead: a disc of speckles, denser and darker at the centre. */
export function stampGraphite(ctx: CanvasRenderingContext2D, x: number, y: number, o: GraphiteStampOptions): void {
  const r = Math.max(0.5, o.radius)
  const density = o.density ?? 0.7
  const opacity = o.opacity ?? 0.5
  const rng = o.rng ?? Math.random
  const count = Math.max(1, Math.round(r * r * density * 0.9))
  ctx.fillStyle = o.color ?? GRAPHITE_INK
  for (let i = 0; i < count; i++) {
    const ang = rng() * Math.PI * 2
    const rad = Math.sqrt(rng()) * r
    const px = x + Math.cos(ang) * rad
    const py = y + Math.sin(ang) * rad
    const falloff = 1 - rad / r
    ctx.globalAlpha = clamp(opacity * (0.35 + 0.65 * falloff) * (0.5 + rng() * 0.5), 0, 1)
    const s = 0.6 + rng() * 1.2
    ctx.fillRect(px - s / 2, py - s / 2, s, s)
  }
  ctx.globalAlpha = 1
}

/** Drags the lead from `from` to `to`, stamping along the way. */
export function strokeGraphite(ctx: CanvasRenderingContext2D, from: Point, to: Point, o: GraphiteStampOptions): void {
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  const spacing = Math.max(0.8, o.radius * 0.3)
  const steps = Math.max(1, Math.ceil(dist / spacing))
  for (let k = 0; k <= steps; k++) {
    const t = k / steps
    stampGraphite(ctx, lerp(from.x, to.x, t), lerp(from.y, to.y, t), o)
  }
}

export interface SmearOptions {
  radius: number
  /** 0..1 how much lead the stump carries per move (default 0.45) */
  strength?: number
  /** device pixel ratio the target canvas was scaled with */
  dpr?: number
  /** reusable offscreen canvas; created on demand if omitted (allocates per call) */
  scratch?: HTMLCanvasElement
  rng?: Rng
}

/**
 * The blending stump. Lifts the lead under `from`, feathers it, and lays it
 * down under `to`; then exposes a little paper where the powder was displaced.
 * Transparent pixels carry nothing, so smearing over bare paper is a no-op.
 */
export function smearGraphite(ctx: CanvasRenderingContext2D, from: Point, to: Point, o: SmearOptions): void {
  const r = o.radius
  if (Math.hypot(to.x - from.x, to.y - from.y) < 0.5) return
  const dpr = o.dpr ?? 1
  const strength = o.strength ?? 0.45
  const scratch = o.scratch ?? document.createElement("canvas")
  const size = Math.max(2, Math.ceil(r * 2 * dpr))
  if (scratch.width !== size || scratch.height !== size) {
    scratch.width = size
    scratch.height = size
  }
  const sctx = scratch.getContext("2d")
  if (!sctx) return
  sctx.setTransform(1, 0, 0, 1, 0, 0)
  sctx.globalCompositeOperation = "source-over"
  sctx.clearRect(0, 0, size, size)
  sctx.drawImage(ctx.canvas, (from.x - r) * dpr, (from.y - r) * dpr, size, size, 0, 0, size, size)
  // feather the pickup so the smear has no hard rim
  sctx.globalCompositeOperation = "destination-in"
  const g = sctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(0,0,0,1)")
  g.addColorStop(0.55, "rgba(0,0,0,0.75)")
  g.addColorStop(1, "rgba(0,0,0,0)")
  sctx.fillStyle = g
  sctx.fillRect(0, 0, size, size)

  ctx.save()
  ctx.globalAlpha = clamp(strength, 0, 1)
  ctx.drawImage(scratch, to.x - r, to.y - r, r * 2, r * 2)
  ctx.restore()

  // powder displaced from under the stump exposes the paper tooth
  ctx.save()
  ctx.globalCompositeOperation = "destination-out"
  stampGraphite(ctx, from.x, from.y, { radius: r * 0.8, density: 0.22, opacity: strength * 0.35, color: "#000", rng: o.rng })
  ctx.restore()
}

/** Kneaded eraser: soft radial lift. */
export function eraseGraphite(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, strength = 0.6): void {
  ctx.save()
  ctx.globalCompositeOperation = "destination-out"
  const g = ctx.createRadialGradient(x, y, 0, x, y, radius)
  g.addColorStop(0, `rgba(0,0,0,${clamp(strength, 0, 1)})`)
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  ctx.restore()
}

export interface SweepOptions {
  width: number
  color?: string
  /** base alpha per pass (default 0.26) */
  alpha?: number
  rng: Rng
}

/**
 * A broad side-of-the-stick charcoal sweep: several jittered passes with
 * round caps, plus dry speckle on both flanks. Draw with "multiply" over paper.
 */
export function charcoalSweep(ctx: CanvasRenderingContext2D, points: Point[], o: SweepOptions): void {
  if (points.length < 2) return
  const color = o.color ?? CHARCOAL_INK
  const base = o.alpha ?? 0.26
  ctx.save()
  ctx.lineJoin = "round"
  ctx.strokeStyle = color
  for (let pass = 0; pass < 5; pass++) {
    const w = o.width * (1 - pass * 0.16)
    const pts = roughen(points, o.width * 0.16, o.rng)
    ctx.lineCap = "round"
    ctx.globalAlpha = clamp(base * (0.8 + pass * 0.3), 0, 1)
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
    ctx.stroke()
  }
  // dry edge: speckle on both flanks of every segment
  ctx.fillStyle = color
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy) || 1
    const nx = -dy / len
    const ny = dx / len
    const count = Math.max(1, Math.round(len * 0.6))
    for (let k = 0; k < count; k++) {
      const t = o.rng()
      const side = o.rng() < 0.5 ? -1 : 1
      const off = side * (o.width * 0.42 + o.rng() * o.width * 0.32)
      const px = a.x + dx * t + nx * off
      const py = a.y + dy * t + ny * off
      const s = 0.8 + o.rng() * 1.8
      ctx.globalAlpha = 0.25 + o.rng() * 0.45
      ctx.fillRect(px - s / 2, py - s / 2, s, s)
    }
  }
  ctx.restore()
}

/**
 * A repeating tile of paper tooth: random flecks with random alpha. Punch it
 * out of a charcoal layer with `knockOutTooth` so the sheet shows through the
 * way it does under a dry stick. Pattern space is scaled back to CSS pixels.
 */
export function createToothPattern(ctx: CanvasRenderingContext2D, seed: number, dpr = 1, size = 160, coverage = 0.28): CanvasPattern | null {
  const tile = document.createElement("canvas")
  tile.width = size
  tile.height = size
  const t = tile.getContext("2d")
  if (!t) return null
  const rng = mulberry32(seed)
  t.fillStyle = "#000"
  const count = Math.round(size * size * coverage)
  for (let i = 0; i < count; i++) {
    t.globalAlpha = 0.25 + rng() * 0.7
    const s = 0.8 + rng() * 1.6
    t.fillRect(rng() * size, rng() * size, s, s)
  }
  const pattern = ctx.createPattern(tile, "repeat")
  if (pattern && dpr !== 1 && typeof DOMMatrix !== "undefined") pattern.setTransform(new DOMMatrix().scale(1 / dpr))
  return pattern
}

export function knockOutTooth(ctx: CanvasRenderingContext2D, pattern: CanvasPattern, width: number, height: number, strength = 0.5): void {
  ctx.save()
  ctx.globalCompositeOperation = "destination-out"
  ctx.globalAlpha = clamp(strength, 0, 1)
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, width, height)
  ctx.restore()
}

export interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  /** ms remaining */
  life: number
  ttl: number
  size: number
}

/** Kicks up graphite dust behind a fast-moving stump. */
export function spawnDust(x: number, y: number, vx: number, vy: number, count: number, rng: Rng): DustParticle[] {
  const out: DustParticle[] = []
  for (let i = 0; i < count; i++) {
    const ttl = 500 + rng() * 800
    out.push({
      x: x + (rng() - 0.5) * 10,
      y: y + (rng() - 0.5) * 10,
      // mostly trailing the motion, with a little scatter
      vx: -vx * 0.12 + (rng() - 0.5) * 0.25,
      vy: -vy * 0.12 + (rng() - 0.5) * 0.25 - 0.05,
      life: ttl,
      ttl,
      size: 0.8 + rng() * 1.6,
    })
  }
  return out
}

/** Integrates dust for `dt` ms, removing dead particles. Mutates in place and returns the same array. */
export function stepDust(particles: DustParticle[], dt: number, gravity = 0.0012): DustParticle[] {
  let w = 0
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.life -= dt
    if (p.life <= 0) continue
    p.vy += gravity * dt
    p.vx *= 0.985
    p.x += p.vx * dt
    p.y += p.vy * dt
    particles[w++] = p
  }
  particles.length = w
  return particles
}

export function drawDust(ctx: CanvasRenderingContext2D, particles: DustParticle[], color = GRAPHITE_INK): void {
  ctx.fillStyle = color
  for (const p of particles) {
    ctx.globalAlpha = clamp((p.life / p.ttl) * 0.8, 0, 1)
    ctx.fillRect(p.x, p.y, p.size, p.size)
  }
  ctx.globalAlpha = 1
}
