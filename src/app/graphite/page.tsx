import type { Metadata } from "next"
import { GraphiteMonograph } from "./monograph"

export const metadata: Metadata = {
  title: "Graphite — Anatomy of a Stroke",
  description:
    "A monograph on digital charcoal and graphite: cold-press paper grain, scroll-deposited tone, a smudgeable lead field, charcoal inversion to slate and a calibrated sandbox.",
}

export default function GraphitePage() {
  return <GraphiteMonograph />
}
