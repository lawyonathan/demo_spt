import { describe, expect, it } from "vitest"
import { createKinematics, frictionForSpeed, gradeForSpeed, LEAD_GRADES, MAX_TILT_DEG, tiltForVelocity } from "@/lib/graphite/kinematics"

describe("gradeForSpeed", () => {
  it("presses hard when slow and barely touches when fast", () => {
    expect(gradeForSpeed(0)).toBe("8B")
    expect(gradeForSpeed(10)).toBe("4H")
  })

  it("is monotonic from soft to hard as speed rises", () => {
    let prev: number = LEAD_GRADES.length
    for (let s = 0; s <= 3; s += 0.1) {
      const idx = LEAD_GRADES.indexOf(gradeForSpeed(s))
      expect(idx).toBeLessThanOrEqual(prev)
      prev = idx
    }
  })
})

describe("tiltForVelocity", () => {
  it("leans with lateral velocity and clamps", () => {
    expect(tiltForVelocity(0)).toBe(0)
    expect(tiltForVelocity(-1)).toBe(-12)
    expect(tiltForVelocity(10)).toBe(MAX_TILT_DEG)
    expect(tiltForVelocity(-10)).toBe(-MAX_TILT_DEG)
  })
})

describe("frictionForSpeed", () => {
  it("is full contact at rest, none when lifted, fading with speed", () => {
    expect(frictionForSpeed(0)).toBe(1)
    expect(frictionForSpeed(0, false)).toBe(0)
    expect(frictionForSpeed(1.25)).toBeCloseTo(0.5)
    expect(frictionForSpeed(5)).toBe(0)
  })
})

describe("createKinematics", () => {
  it("derives velocity from consecutive samples", () => {
    const k = createKinematics({ smoothing: 1 })
    k.push({ x: 0, y: 0, t: 0 })
    const s = k.push({ x: 20, y: 0, t: 10 })
    expect(s.vx).toBeCloseTo(2)
    expect(s.vy).toBe(0)
    expect(s.speed).toBeCloseTo(2)
    expect(s.active).toBe(true)
    expect(s.tilt).toBe(24)
  })

  it("smooths new samples against the previous velocity", () => {
    const k = createKinematics({ smoothing: 0.5 })
    k.push({ x: 0, y: 0, t: 0 })
    k.push({ x: 20, y: 0, t: 10 }) // first velocity snaps: 2 px/ms
    const s = k.push({ x: 20, y: 0, t: 20 }) // instantaneous 0, smoothed halfway
    expect(s.vx).toBeCloseTo(1)
  })

  it("lifts the pencil after idleMs and decays velocity", () => {
    const k = createKinematics({ smoothing: 1, idleMs: 100 })
    k.push({ x: 0, y: 0, t: 0 })
    k.push({ x: 10, y: 0, t: 10 })
    expect(k.settle(50).active).toBe(true)
    const lifted = k.settle(200)
    expect(lifted.active).toBe(false)
    expect(lifted.friction).toBe(0)
    expect(lifted.speed).toBeLessThan(1)
    for (let t = 300; t < 3000; t += 16) k.settle(t)
    expect(k.state.speed).toBe(0)
  })

  it("reset clears everything", () => {
    const k = createKinematics()
    k.push({ x: 5, y: 5, t: 0 })
    k.push({ x: 50, y: 5, t: 10 })
    k.reset()
    expect(k.state).toMatchObject({ x: 0, y: 0, vx: 0, vy: 0, speed: 0, active: false, grade: "HB" })
  })
})
