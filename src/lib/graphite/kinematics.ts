// Pointer kinematics → drafting telemetry. A slow, deliberate hand "presses
// harder" (soft, dark lead; high friction); a fast flick barely touches the
// paper (hard, light lead). Lateral motion rolls the pencil over (tilt).

import { clamp, lerp, smoothstep } from "./math"

export const LEAD_GRADES = ["4H", "2H", "HB", "2B", "4B", "6B", "8B"] as const
export type LeadGrade = (typeof LEAD_GRADES)[number]

export const MAX_TILT_DEG = 26
/** Speed (px/ms) at and above which the lead is treated as barely touching. */
export const FLICK_SPEED = 2.5

export interface KinematicSample {
  x: number
  y: number
  /** timestamp in ms (performance.now() or event.timeStamp) */
  t: number
}

export interface KinematicState {
  x: number
  y: number
  /** px/ms, smoothed */
  vx: number
  vy: number
  /** px/ms, smoothed magnitude */
  speed: number
  /** degrees, -MAX_TILT..MAX_TILT; negative leans left */
  tilt: number
  grade: LeadGrade
  /** 0..1 contact friction; 0 when the pencil is lifted (idle) */
  friction: number
  /** false once no sample has arrived for `idleMs` */
  active: boolean
}

export function gradeForSpeed(speed: number): LeadGrade {
  const t = clamp(speed / FLICK_SPEED, 0, 1)
  const idx = Math.round((1 - t) * (LEAD_GRADES.length - 1))
  return LEAD_GRADES[idx]
}

export function tiltForVelocity(vx: number, maxTilt = MAX_TILT_DEG): number {
  return clamp(Math.round(vx * 120) / 10, -maxTilt, maxTilt)
}

export function frictionForSpeed(speed: number, active = true): number {
  if (!active) return 0
  return 1 - smoothstep(0, FLICK_SPEED, speed)
}

export interface KinematicsOptions {
  /** 0..1 exponential smoothing weight for new velocity samples (default 0.35) */
  smoothing?: number
  /** ms without a sample before the pencil counts as lifted (default 150) */
  idleMs?: number
}

export interface KinematicsController {
  readonly state: KinematicState
  /** Feed a pointer sample. Returns the (mutated) state. */
  push(sample: KinematicSample): KinematicState
  /** Call every frame with the current time so velocity decays after the hand stops. */
  settle(now: number): KinematicState
  reset(): void
}

export function createKinematics(opts: KinematicsOptions = {}): KinematicsController {
  const smoothing = opts.smoothing ?? 0.35
  const idleMs = opts.idleMs ?? 150
  const state: KinematicState = { x: 0, y: 0, vx: 0, vy: 0, speed: 0, tilt: 0, grade: "HB", friction: 0, active: false }
  let last: KinematicSample | null = null
  let hasVelocity = false

  const derive = () => {
    state.speed = Math.hypot(state.vx, state.vy)
    state.tilt = tiltForVelocity(state.vx)
    state.grade = gradeForSpeed(state.speed)
    state.friction = frictionForSpeed(state.speed, state.active)
    return state
  }

  return {
    state,
    push(sample) {
      if (last) {
        const dt = Math.max(1, sample.t - last.t)
        const ivx = (sample.x - last.x) / dt
        const ivy = (sample.y - last.y) / dt
        if (hasVelocity && state.active) {
          state.vx = lerp(state.vx, ivx, smoothing)
          state.vy = lerp(state.vy, ivy, smoothing)
        } else {
          state.vx = ivx
          state.vy = ivy
        }
        hasVelocity = true
      }
      state.x = sample.x
      state.y = sample.y
      state.active = true
      last = sample
      return derive()
    },
    settle(now) {
      if (last && now - last.t > idleMs) {
        state.active = false
        hasVelocity = false
        state.vx *= 0.82
        state.vy *= 0.82
        if (Math.abs(state.vx) < 0.002) state.vx = 0
        if (Math.abs(state.vy) < 0.002) state.vy = 0
        return derive()
      }
      return state
    },
    reset() {
      last = null
      hasVelocity = false
      state.x = state.y = state.vx = state.vy = state.speed = state.tilt = state.friction = 0
      state.grade = "HB"
      state.active = false
    },
  }
}
