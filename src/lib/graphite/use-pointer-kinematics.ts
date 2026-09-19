"use client"

import * as React from "react"
import { createKinematics, type KinematicState, type KinematicsController, type KinematicsOptions } from "./kinematics"

export interface PointerKinematicsOptions extends KinematicsOptions {
  /** element to listen on; omit for the whole window */
  target?: React.RefObject<HTMLElement | null>
  /** how often the React-facing snapshot refreshes (default 12 Hz) */
  hz?: number
}

export interface PointerKinematics {
  /** live controller for rAF consumers (no re-render) */
  controller: KinematicsController
  /** throttled snapshot for rendering telemetry */
  telemetry: KinematicState
}

const IDLE: KinematicState = { x: 0, y: 0, vx: 0, vy: 0, speed: 0, tilt: 0, grade: "HB", friction: 0, active: false }

export function usePointerKinematics({ target, hz = 12, smoothing, idleMs }: PointerKinematicsOptions = {}): PointerKinematics {
  const controller = React.useMemo(() => createKinematics({ smoothing, idleMs }), [smoothing, idleMs])
  const [telemetry, setTelemetry] = React.useState<KinematicState>(IDLE)

  React.useEffect(() => {
    const el: HTMLElement | Window | null = target ? target.current : window
    if (!el) return
    let raf = 0
    let lastPublish = 0
    const interval = 1000 / hz

    const onMove = (e: PointerEvent) => {
      controller.push({ x: e.clientX, y: e.clientY, t: e.timeStamp || performance.now() })
    }
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      controller.settle(now)
      if (now - lastPublish >= interval) {
        lastPublish = now
        setTelemetry({ ...controller.state })
      }
    }
    el.addEventListener("pointermove", onMove as EventListener, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener("pointermove", onMove as EventListener)
    }
  }, [controller, target, hz])

  return { controller, telemetry }
}
