"use client"

import * as React from "react"
import { NOTE_COLORS, type StickyNote } from "./types"
import { useAnchorPosition } from "./use-anchor-position"
import { useStickyNotesInternal } from "./provider"

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
  const { updateNote, removeNote, registryRef, dirtyRef } = useStickyNotesInternal()
  const pos = useAnchorPosition(note.anchor)
  const colors = NOTE_COLORS[note.color]
  const x = pos.x
  const y = pos.y

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
      dragging: false,
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        data-sticky-note-strip=""
        style={{
          height: 24,
          flexShrink: 0,
          background: colors.strip,
          borderRadius: "4px 4px 0 0",
          cursor: "grab",
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
        autoFocus={note.text === ""}
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
    </div>
  )
}
