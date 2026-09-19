import { describe, expect, it } from "vitest"
import { charcoalSweep, spawnDust, stampGraphite, stepDust, strokeGraphite } from "@/lib/graphite/brush"
import { mulberry32 } from "@/lib/graphite/math"

/** A minimal CanvasRenderingContext2D stand-in that records what the brush asks of it. */
function fakeContext() {
  const calls: Array<{ kind: string; alpha: number }> = []
  const ctx = {
    globalAlpha: 1,
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    lineCap: "butt",
    lineJoin: "miter",
    fillRect() {
      calls.push({ kind: "fillRect", alpha: ctx.globalAlpha })
    },
    stroke() {
      calls.push({ kind: "stroke", alpha: ctx.globalAlpha })
    },
    beginPath() {},
    moveTo() {},
    lineTo() {},
    save() {},
    restore() {},
  }
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls }
}

describe("stampGraphite", () => {
  it("lays speckles with alpha inside [0,1] and resets alpha afterwards", () => {
    const { ctx, calls } = fakeContext()
    stampGraphite(ctx, 10, 10, { radius: 6, rng: mulberry32(1) })
    const rects = calls.filter((c) => c.kind === "fillRect")
    expect(rects.length).toBeGreaterThan(10)
    expect(rects.every((c) => c.alpha >= 0 && c.alpha <= 1)).toBe(true)
    expect(ctx.globalAlpha).toBe(1)
  })

  it("scales speckle count with radius² and density", () => {
    const small = fakeContext()
    const big = fakeContext()
    stampGraphite(small.ctx, 0, 0, { radius: 3, density: 0.5, rng: mulberry32(2) })
    stampGraphite(big.ctx, 0, 0, { radius: 6, density: 1, rng: mulberry32(2) })
    expect(big.calls.length).toBeGreaterThan(small.calls.length * 4)
  })
})

describe("strokeGraphite", () => {
  it("stamps more often over longer distances", () => {
    const short = fakeContext()
    const long = fakeContext()
    strokeGraphite(short.ctx, { x: 0, y: 0 }, { x: 5, y: 0 }, { radius: 2, rng: mulberry32(3) })
    strokeGraphite(long.ctx, { x: 0, y: 0 }, { x: 50, y: 0 }, { radius: 2, rng: mulberry32(3) })
    expect(long.calls.length).toBeGreaterThan(short.calls.length * 5)
  })
})

describe("charcoalSweep", () => {
  it("makes five stroke passes plus flank speckle, and nothing for a lone point", () => {
    const { ctx, calls } = fakeContext()
    charcoalSweep(
      ctx,
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
      ],
      { width: 20, rng: mulberry32(4) }
    )
    expect(calls.filter((c) => c.kind === "stroke")).toHaveLength(5)
    expect(calls.filter((c) => c.kind === "fillRect").length).toBeGreaterThan(30)

    const lone = fakeContext()
    charcoalSweep(lone.ctx, [{ x: 0, y: 0 }], { width: 20, rng: mulberry32(4) })
    expect(lone.calls).toHaveLength(0)
  })
})

describe("dust", () => {
  it("spawns the requested count trailing the motion", () => {
    const dust = spawnDust(50, 50, 2, 0, 6, mulberry32(5))
    expect(dust).toHaveLength(6)
    // moving right (+vx) throws dust back to the left on average
    const meanVx = dust.reduce((s, p) => s + p.vx, 0) / dust.length
    expect(meanVx).toBeLessThan(0)
  })

  it("integrates gravity and drops dead particles in place", () => {
    const dust = spawnDust(0, 0, 0, 0, 3, mulberry32(6))
    dust[0].life = 10
    const before = dust[1].vy
    const same = stepDust(dust, 16)
    expect(same).toBe(dust)
    expect(dust).toHaveLength(2)
    expect(dust[0].vy).toBeGreaterThan(before)
    stepDust(dust, 10_000)
    expect(dust).toHaveLength(0)
  })
})
