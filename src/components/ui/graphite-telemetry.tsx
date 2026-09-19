"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { usePointerKinematics, type GraphiteFoleyState } from "@/lib/graphite"

export interface GraphiteTelemetryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** right-hand label, e.g. the current plate */
  plate?: string
  /** pass the result of useGraphiteFoley() to get a sound toggle */
  foley?: GraphiteFoleyState
}

function formatTilt(tilt: number) {
  const sign = tilt < 0 ? "−" : "+"
  return `${sign}${Math.abs(Math.round(tilt)).toString().padStart(2, "0")}°`
}

/**
 * Fixed drafting-annotation bar: lead tilt, grade and friction derived from
 * the hand's velocity, plus scroll depth. Monospace uppercase, like the
 * notes in the margin of a technical plate.
 */
export function GraphiteTelemetry({ plate, foley, className, ...props }: GraphiteTelemetryProps) {
  const { telemetry } = usePointerKinematics({ hz: 10 })
  const [scroll, setScroll] = React.useState(0)

  React.useEffect(() => {
    let raf = 0
    const measure = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? Math.round((window.scrollY / max) * 100) : 0)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    measure()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <div className={cn("graphite-telemetry", className)} role="status" aria-live="off" {...props}>
      <span>
        Tilt <span className="graphite-telemetry__value">{formatTilt(telemetry.tilt)}</span>
      </span>
      <span>
        Lead <span className="graphite-telemetry__value">{telemetry.grade}</span>
      </span>
      <span>
        Friction <span className="graphite-telemetry__value">{Math.round(telemetry.friction * 100)}%</span>
      </span>
      <span>
        Scroll <span className="graphite-telemetry__value">{scroll}%</span>
      </span>
      <span className="graphite-telemetry__spacer" />
      {foley && foley.supported && (
        <button type="button" className="graphite-button" aria-pressed={foley.enabled} onClick={foley.toggle}>
          {foley.enabled ? "Sound on" : "Sound off"}
        </button>
      )}
      {plate && <span className="graphite-telemetry__plate">{plate}</span>}
    </div>
  )
}
