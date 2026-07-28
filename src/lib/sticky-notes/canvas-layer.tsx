"use client"

import * as React from "react"
import { NOTE_COLORS } from "./types"
import type { NoteGeometry } from "./provider"

export function CanvasLayer({
  registryRef,
  dirtyRef,
}: {
  registryRef: React.RefObject<Map<string, NoteGeometry>>
  dirtyRef: React.RefObject<boolean>
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dirtyRef.current = true
    }

    const markDirty = () => {
      dirtyRef.current = true
    }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (!dirtyRef.current) return
      dirtyRef.current = false
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const g of registryRef.current.values()) {
        const colors = NOTE_COLORS[g.color]

        // soft shadow while dragging
        if (g.dragging && !g.minimized) {
          ctx.save()
          ctx.fillStyle = "rgba(0,0,0,0.18)"
          ctx.filter = "blur(10px)"
          ctx.beginPath()
          ctx.ellipse(g.x + g.w / 2, g.y + g.h + 14, g.w * 0.45, 10, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        if (g.detached || g.minimized) continue

        // sagging string from note corner to the anchor pin
        const sx = g.x + 10
        const sy = g.y + 10
        const px = g.anchorX
        const py = g.anchorY
        const mx = (sx + px) / 2
        const my = Math.max(sy, py) + 28
        ctx.strokeStyle = "rgba(90,90,90,0.55)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(mx, my, px, py)
        ctx.stroke()

        // pin dot at the anchor element center
        ctx.fillStyle = colors.dot
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = "rgba(0,0,0,0.3)"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", markDirty, { capture: true, passive: true })
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", markDirty, true)
    }
  }, [registryRef, dirtyRef])

  return (
    <canvas
      ref={canvasRef}
      data-sticky-notes-canvas=""
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />
  )
}
