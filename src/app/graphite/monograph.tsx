"use client"

import * as React from "react"
import Link from "next/link"
import { GraphitePaper, type GraphiteTone } from "@/components/ui/graphite-paper"
import { GraphiteHeading } from "@/components/ui/graphite-heading"
import { GraphiteSketch, SPHERE_STUDY, type SketchStage } from "@/components/ui/graphite-sketch"
import { GraphiteSmudgeCanvas } from "@/components/ui/graphite-smudge-canvas"
import { GraphiteInversion } from "@/components/ui/graphite-inversion"
import { GraphiteSandbox } from "@/components/ui/graphite-sandbox"
import { GraphiteTelemetry } from "@/components/ui/graphite-telemetry"
import { GraphiteMarginalia } from "@/components/ui/graphite-marginalia"
import { useGraphiteFoley } from "@/lib/graphite"

const PLATES = [
  ["i", "Friction study"],
  ["ii", "Progressive tone"],
  ["iii", "The stump"],
  ["iv", "Inversion"],
  ["v", "Sandbox"],
] as const

const pct = (v: number) => `${Math.round(v * 100).toString().padStart(3, "0")}%`

export function GraphiteMonograph() {
  const [tone, setTone] = React.useState<GraphiteTone>("paper")
  const [plate, setPlate] = React.useState<string>(PLATES[0][1])
  const [stage, setStage] = React.useState<SketchStage>({ contour: 0, hatch: 0, tone: 0 })
  const foley = useGraphiteFoley()

  // the sheet is sealed with charcoal near the end of the sweep; flip the whole page then
  const onInversion = React.useCallback((p: number) => setTone(p >= 0.9 ? "slate" : "paper"), [])

  // which plate is on screen, for the telemetry bar
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-plate]"))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setPlate(e.target.getAttribute("data-plate") ?? "")
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <GraphitePaper tone={tone} grid vignette className="min-h-screen pb-24">
      <GraphiteTelemetry plate={`Plate ${plate}`} foley={foley} />

      {/* Plate I — hero */}
      <header data-plate={`${PLATES[0][0]} · ${PLATES[0][1]}`} className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 pt-28 md:px-10">
        <Link href="/" className="graphite-mono absolute left-6 top-20 underline-offset-4 hover:underline md:left-10">
          &larr; Design system
        </Link>
        <p className="graphite-mono">Monograph &#8470; 01 &middot; cold-press cotton, 300 gsm</p>
        <GraphiteHeading as="h1" reveal="mount" duration={1800} className="mt-6 text-[clamp(4.5rem,17vw,15rem)]">
          Graphite
        </GraphiteHeading>
        <p className="graphite-script graphite-soft mt-8 max-w-xl text-2xl leading-snug md:text-3xl">
          a study of lead, tooth and pressure. The page is the paper; your cursor is the blending stump.
        </p>
        <ol className="graphite-mono mt-12 flex flex-wrap gap-x-8 gap-y-2">
          {PLATES.map(([n, label]) => (
            <li key={n}>
              {n} &mdash; {label}
            </li>
          ))}
        </ol>
        <GraphiteMarginalia kind="arrow" note="start here, press lightly" rotate={-8} className="right-10 top-32 hidden md:inline-flex" />
        <GraphiteMarginalia kind="star" size={22} className="bottom-24 left-[58%] hidden md:inline-flex" />
      </header>

      {/* Plate II — tone is deposited */}
      <section
        data-plate={`${PLATES[1][0]} · ${PLATES[1][1]}`}
        className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:items-center md:px-10"
      >
        <div className="relative">
          <p className="graphite-mono">Plate II &middot; progressive tone</p>
          <GraphiteHeading as="h2" className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)]">
            Deposited, not drawn
          </GraphiteHeading>
          <p className="graphite-script graphite-soft mt-6 text-2xl leading-snug">
            Scroll slowly. First the contour, twice: the light construction pass and the committed line. Then a hatch, laid one stroke at a time. Only
            then does the flat side of the lead come down and sculpt the form out of the paper tooth.
          </p>
          <ol className="graphite-mono mt-8 space-y-2">
            <li style={{ opacity: 0.35 + stage.contour * 0.65 }}>i. contour &middot; {pct(stage.contour)}</li>
            <li style={{ opacity: 0.35 + stage.hatch * 0.65 }}>ii. hatch &middot; {pct(stage.hatch)}</li>
            <li style={{ opacity: 0.35 + stage.tone * 0.65 }}>iii. tone &middot; {pct(stage.tone)}</li>
          </ol>
          <GraphiteMarginalia kind="loop" note="tooth = the paper's texture" className="-bottom-12 left-0 hidden md:inline-flex" />
        </div>
        <GraphiteSketch shapes={SPHERE_STUDY} onStage={setStage} className="w-full" />
      </section>

      {/* Plate III — the stump */}
      <section data-plate={`${PLATES[2][0]} · ${PLATES[2][1]}`} className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <div className="relative mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="graphite-mono">Plate III &middot; the blending stump</p>
            <GraphiteHeading as="h2" className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)]">
              Smudge
            </GraphiteHeading>
          </div>
          <p className="graphite-script graphite-soft max-w-md text-2xl leading-snug">
            Hover to feather the lead. Press and drag to move it. Go fast and the dust lifts.
          </p>
          <GraphiteMarginalia kind="asterisk" note="don't press too hard here" rotate={6} className="-top-8 right-0 hidden lg:inline-flex" />
        </div>
        <GraphiteSmudgeCanvas label="SMUDGE" className="graphite-hairline aspect-[16/9] w-full" />
      </section>

      {/* Plate IV — inversion */}
      <GraphiteInversion
        data-plate={`${PLATES[3][0]} · ${PLATES[3][1]}`}
        onProgress={onInversion}
        before={
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="graphite-mono">Plate IV &middot; inversion</p>
            <GraphiteHeading as="h2" reveal="none" className="mt-4 text-[clamp(3rem,10vw,8rem)]">
              Keep scrolling
            </GraphiteHeading>
            <p className="graphite-script graphite-soft mt-6 text-2xl">the charcoal comes in from the side of the stick</p>
          </div>
        }
      >
        <div className="flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="graphite-mono">Plate IV &middot; slate</p>
          <GraphiteHeading as="h2" reveal="none" className="mt-4 text-[clamp(3rem,10vw,8rem)]">
            Obsidian
          </GraphiteHeading>
          <p className="graphite-script graphite-soft mt-6 max-w-xl text-2xl">
            What&apos;s left renders in stippled chalk and silver dust. Same kit, inverted tone.
          </p>
        </div>
      </GraphiteInversion>

      {/* Plate V — sandbox */}
      <section data-plate={`${PLATES[4][0]} · ${PLATES[4][1]}`} className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <p className="graphite-mono">Plate V &middot; sandbox</p>
        <GraphiteHeading as="h2" className="mt-4 text-[clamp(2.75rem,7vw,5.5rem)]">
          Your turn
        </GraphiteHeading>
        <p className="graphite-script graphite-soft mt-6 max-w-2xl text-2xl leading-snug">
          Seven calibrated tools. Speed is pressure: go slow to press hard, sweep sideways to roll the lead over.
        </p>
        <GraphiteSandbox className="mt-8" />
      </section>

      <footer className="graphite-mono mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-2 px-6 pb-12 md:px-10">
        <span>Canvas 2D &middot; SVG filters &middot; Web Audio</span>
        <span>no WebGL, no new dependencies</span>
        <span>src/lib/graphite &middot; src/components/ui/graphite-*</span>
      </footer>
    </GraphitePaper>
  )
}
