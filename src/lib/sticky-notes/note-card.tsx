"use client"

import * as React from "react"
import { NOTE_COLORS, type StickyNote } from "./types"
import { useAnchorPosition } from "./use-anchor-position"
import { useStickyNotesInternal } from "./provider"
import { buildSelector } from "./selector"
import { elementUnderPoint } from "./dom-utils"

const stripBtn: React.CSSProperties = {
  width: 18,
  height: 18,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 13,
  lineHeight: 1,
  padding: 0,
  color: "rgba(0,0,0,0.55)",
}

export function NoteCard({ note }: { note: StickyNote }) {
  const { updateNote, removeNote, registryRef, dirtyRef, overlayRef } = useStickyNotesInternal()
  const pos = useAnchorPosition(note.anchor)
  const [drag, setDrag] = React.useState<{ dx: number; dy: number } | null>(null)
  const colors = NOTE_COLORS[note.color]
  const x = pos.x + (drag?.dx ?? 0)
  const y = pos.y + (drag?.dy ?? 0)

  // Publish geometry for the canvas layer (Task 10 reads this registry).
  React.useEffect(() => {
    registryRef.current.set(note.id, {
      x,
      y,
      w: note.size.w,
      h: note.size.h,
      anchorX: pos.anchorX,
      anchorY: pos.anchorY,
      detached: pos.detached,
      dragging: drag !== null,
      minimized: note.minimized,
      color: note.color,
    })
    dirtyRef.current = true
  })

  React.useEffect(() => {
    const registry = registryRef.current
    return () => {
      registry.delete(note.id)
      dirtyRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // reanchor must see the position from the render at DROP time, not the render
  // that registered the pointerup listener — the page may scroll mid-drag.
  const posRef = React.useRef(pos)
  posRef.current = pos

  const reanchor = React.useCallback(
    (pointerX: number, pointerY: number, dx: number, dy: number) => {
      if (dx === 0 && dy === 0) return
      const left = posRef.current.x + dx
      const top = posRef.current.y + dy
      const target = elementUnderPoint(overlayRef, pointerX, pointerY)
      const { selector, tag } = buildSelector(target)
      const rect = target.getBoundingClientRect()
      updateNote(note.id, {
        anchor: {
          selector,
          tag,
          offsetX: left - rect.left,
          offsetY: top - rect.top,
          fallbackX: left + window.scrollX,
          fallbackY: top + window.scrollY,
        },
      })
    },
    [note.id, overlayRef, updateNote]
  )

  const dragStart = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const target = e.currentTarget as HTMLElement
    target.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) =>
      setDrag({ dx: ev.clientX - startX, dy: ev.clientY - startY })
    const up = (ev: PointerEvent) => {
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerup", up)
      reanchor(ev.clientX, ev.clientY, ev.clientX - startX, ev.clientY - startY)
      setDrag(null)
    }
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerup", up)
  }

  const resizeStart = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startY = e.clientY
    const startW = note.size.w
    const startH = note.size.h
    const target = e.currentTarget as HTMLElement
    target.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) =>
      updateNote(note.id, {
        size: {
          w: Math.max(140, startW + ev.clientX - startX),
          h: Math.max(110, startH + ev.clientY - startY),
        },
      })
    const up = () => {
      target.removeEventListener("pointermove", move)
      target.removeEventListener("pointerup", up)
    }
    target.addEventListener("pointermove", move)
    target.addEventListener("pointerup", up)
  }

  if (note.minimized) {
    return (
      <button
        title={note.text || "Sticky note"}
        onClick={() => updateNote(note.id, { minimized: false })}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate(${x}px, ${y}px)`,
          width: 22,
          height: 22,
          borderRadius: 9999,
          background: colors.dot,
          border: "2px solid rgba(0,0,0,0.15)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          pointerEvents: "auto",
          cursor: "pointer",
          padding: 0,
        }}
      />
    )
  }

  return (
    <div
      data-sticky-note={note.id}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        width: note.size.w,
        height: note.size.h,
        background: colors.bg,
        borderRadius: 4,
        boxShadow: drag
          ? "0 12px 28px rgba(0,0,0,0.35)"
          : "0 4px 12px rgba(0,0,0,0.2)",
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        data-sticky-note-strip=""
        onPointerDown={dragStart}
        style={{
          height: 24,
          flexShrink: 0,
          background: colors.strip,
          borderRadius: "4px 4px 0 0",
          cursor: drag ? "grabbing" : "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
          padding: "0 4px",
          touchAction: "none",
        }}
      >
        {pos.detached && (
          <span
            title="Anchor lost — pinned to page position"
            style={{ marginRight: "auto", fontSize: 11 }}
          >
            📌
          </span>
        )}
        <button
          title="Minimize"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => updateNote(note.id, { minimized: true })}
          style={stripBtn}
        >
          –
        </button>
        <button
          title="Delete"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => removeNote(note.id)}
          style={stripBtn}
        >
          ×
        </button>
      </div>
      <textarea
        value={note.text}
        placeholder="Write something…"
        // Equal timestamps mean never edited, i.e. just created. Trade-off: an
        // empty note that is reloaded from storage also steals focus once.
        autoFocus={note.text === "" && note.createdAt === note.updatedAt}
        onChange={(e) => updateNote(note.id, { text: e.target.value })}
        style={{
          flex: 1,
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          padding: 8,
          fontSize: 13,
          lineHeight: 1.4,
          color: "#1f2937",
          fontFamily: "inherit",
        }}
      />
      <div
        title="Resize"
        onPointerDown={resizeStart}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 14,
          height: 14,
          cursor: "nwse-resize",
          touchAction: "none",
          background:
            "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.25) 50%)",
          borderRadius: "0 0 4px 0",
        }}
      />
    </div>
  )
}
