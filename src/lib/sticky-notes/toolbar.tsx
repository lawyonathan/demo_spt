"use client"

import * as React from "react"
import { NOTE_COLORS, NOTE_COLOR_LIST } from "./types"
import { useStickyNotesInternal } from "./provider"

const pillBtn: React.CSSProperties = {
  width: 26,
  height: 26,
  borderRadius: 9999,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export function StickyNotesToolbar() {
  const {
    notes,
    placing,
    setPlacing,
    activeColor,
    setActiveColor,
    layerVisible,
    setLayerVisible,
    saveState,
  } = useStickyNotesInternal()

  return (
    <div
      data-sticky-notes-toolbar=""
      style={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: 9999,
        background: "rgba(24,24,27,0.92)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={() => setPlacing(!placing)}
        title={placing ? "Cancel (Esc)" : "Add note"}
        style={{
          ...pillBtn,
          background: placing ? "#f87171" : NOTE_COLORS[activeColor].strip,
          color: "#18181b",
          fontWeight: 700,
        }}
      >
        {placing ? "×" : "+"}
      </button>
      {NOTE_COLOR_LIST.map((c) => (
        <button
          key={c}
          onClick={() => setActiveColor(c)}
          title={c}
          style={{
            width: 18,
            height: 18,
            borderRadius: 9999,
            background: NOTE_COLORS[c].dot,
            border: c === activeColor ? "2px solid #ffffff" : "2px solid transparent",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
      <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.2)" }} />
      <button
        onClick={() => setLayerVisible(!layerVisible)}
        title={layerVisible ? "Hide notes" : "Show notes"}
        style={{ ...pillBtn, background: "transparent", color: "#ffffff", fontSize: 13 }}
      >
        {layerVisible ? "◉" : "◎"}
      </button>
      <span
        title="Notes on this page"
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 12,
          minWidth: 16,
          textAlign: "center",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {notes.length}
      </span>
      {saveState === "error" && (
        <span
          title="Notes not saved — will retry on the next change"
          style={{ width: 8, height: 8, borderRadius: 9999, background: "#f59e0b" }}
        />
      )}
    </div>
  )
}
