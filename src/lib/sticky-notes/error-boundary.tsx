"use client"

import * as React from "react"

/**
 * Renders nothing if the notes overlay throws, so a broken note can never take
 * the host app's React tree down with it.
 */
export class StickyNotesErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error) {
    console.error("[sticky-notes] overlay crashed and was hidden:", error)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}
