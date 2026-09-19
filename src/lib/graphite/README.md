# Graphite kit

Digital charcoal and graphite for the web: cold-press paper grain, tone that
is *deposited* as you scroll (contour → hatch → flat rub), a lead field the
cursor smudges like a blending stump, dust that kicks up on fast moves, a
charcoal sweep that inverts the sheet to obsidian slate, chalk on the far
side, hand-drawn "boiling" lines, drafting telemetry and procedural
pencil-on-paper foley.

Everything is Canvas 2D + SVG filter primitives + Web Audio. No WebGL, no
GSAP, no Lenis, no new dependencies. Demo route: `/graphite`.

## Where things live

| Path | What |
| --- | --- |
| `src/lib/graphite/math.ts` | seeded PRNG, easing, `stageWindow`, hatch generation (Liang–Barsky clip), polyline slicing, sweep paths, Bayer dither |
| `src/lib/graphite/kinematics.ts` | pointer velocity → tilt, lead grade (4H…8B), friction |
| `src/lib/graphite/brush.ts` | speckle stamps/strokes, the smear (stump), eraser, charcoal sweep, dust particles |
| `src/lib/graphite/foley.ts` | pink-noise friction synth, velocity-modulated low-pass, pencil tap |
| `src/lib/graphite/use-*.ts` | `useScrollProgress`, `usePointerKinematics`, `useGraphiteFoley`, `useMountProgress`, `useReducedMotion` |
| `src/components/ui/graphite.css` | tone variables, paper layers, typography, filter utilities, heading layers |
| `src/components/ui/graphite-filters.tsx` | the SVG `<filter>` defs (`rough`, `boil`, `rub`, `chalk`) |
| `src/components/ui/graphite-paper.tsx` | the sheet: tone, grain, fibres, grid, vignette, deckle |
| `src/components/ui/graphite-heading.tsx` | contour → hatch → flat-rub display type |
| `src/components/ui/graphite-sketch.tsx` | scroll-scrubbed progressive tonal drawing (SVG) |
| `src/components/ui/graphite-smudge-canvas.tsx` | the blending-stump field with dust |
| `src/components/ui/graphite-inversion.tsx` | sticky charcoal-sweep transition to slate |
| `src/components/ui/graphite-sandbox.tsx` | calibrated leads, stump, eraser, PNG export |
| `src/components/ui/graphite-telemetry.tsx` | fixed tilt / lead / friction / scroll bar |
| `src/components/ui/graphite-marginalia.tsx` | tiny stars, arrows, cheeky notes |

`graphite.css` is imported once from `src/app/globals.css`, so the kit works
on any route. The display and script fonts (Anton, Caveat) are loaded by
`src/app/graphite/layout.tsx` via `next/font/google` and exposed as
`--font-graphite-display` / `--font-graphite-script`; without them the CSS
falls back to Impact / a system script.

## How each effect is made

**Paper tooth.** Two `feTurbulence` layers as CSS `background-image` data
URIs on the sheet: high-frequency fractal noise (grain) multiplied onto the
paper colour, plus anisotropic noise (`baseFrequency='0.006 0.35'`) for cotton
fibres. On slate the blend flips to `screen`. Cost: zero JS.

**Hand-drawn / boiling lines.** `#graphite-rough` is a low-frequency
`feTurbulence` → `feDisplacementMap` (scale ≈ 2.4 px). `#graphite-boil` is the
same filter with `<animate attributeName="seed">` stepping four seeds at
~8 fps, so lines never quite hold still, like animation shot on twos.
Reduced-motion users get the still version automatically.

**Flat rub (headings, tone fills).** `#graphite-rub` eats holes out of the
fill: paper-tooth noise → `feColorMatrix` to an alpha mask → `feComposite in`.
A blurred, half-alpha copy is merged underneath as loose powder, then the
whole thing is displaced. `#graphite-chalk` is the sparser slate variant.

**Progressive tone.** `GraphiteHeading` stacks three layers of the same text
(text-stroke contour, `background-clip: text` hatch, filtered solid) and
reveals each with `clip-path: inset(...)` driven by CSS variables. `GraphiteSketch`
does the SVG version: real paths with `pathLength=1` / `stroke-dashoffset`
draw-on, a construction pass offset by a pixel, hatch lines generated per
shape (clipped to its bbox, revealed line by line), a crossing hatch and a
rubbed fill. One scroll progress (`useScrollProgress`, mode `"enter"`) is
mapped onto stage windows with `stageWindow(p, start, end)`.

**Lead physics.** A mark is never a flat fill: `stampGraphite` scatters
speckles in a disc, denser and darker at the centre, and `strokeGraphite`
stamps along the segment. Velocity is pressure (`kinematics.ts`): a slow
hand lays a wide, dark line (8B, high friction), a flick barely touches
(4H). Lateral velocity rolls the lead over (`tilt`, ±26°), widening the stroke.

**The stump (smudge).** `smearGraphite` copies the pixels under the previous
pointer position into a scratch canvas, feathers them with a radial
`destination-in` mask, lays them down under the current position, then
`destination-out` speckles where the powder was lifted so the paper shows
through. Transparent pixels carry nothing, so smearing bare paper is a
no-op. Coalesced pointer events keep fast drags continuous.

**Dust.** Above ~1.1 px/ms the field spawns particles trailing the motion
with gravity and a life-based fade, drawn on a second overlay canvas that
only animates while particles exist or the pointer is inside.

**Inversion.** A tall section (`260vh`) pins a viewport-height stage;
`useScrollProgress` mode `"through"` scrubs it. Nine broad sweeps
(`sweepPath` + `charcoalSweep`: four jittered round-capped passes with
`multiply`, plus dry flank speckle) are drawn from alternating sides in
staggered windows, each cut to its `slicePolyline` prefix. Past 78 % a slate
fill seals the sheet; past 88 % chalk flecks arrive. Every draw re-seeds its
PRNG, so scrubbing back and forth is stable, and it only redraws when
progress changes.

**Telemetry and foley.** `usePointerKinematics` feeds the fixed bar at 10 Hz.
`useGraphiteFoley` (opt-in, needs a click) loops 2 s of Paul-Kellet pink
noise through a low-pass whose cutoff (520→1200 Hz) and gain follow the max
of pointer and scroll velocity, with a band-passed tap on pointer down.

## Tuning knobs

- Grain: `<GraphitePaper grain={0.3}>` (0..1) or the `--graphite-grain-opacity` variable.
- Wobble amount: `scale` on the displacement maps in `graphite-filters.tsx`.
- Rub dryness: the alpha row of the `feColorMatrix` in `#graphite-rub` (`3.2 … -1.05`); raise the offset for more holes.
- Stage timing: the `stageWindow` ranges in `GraphiteHeading` / `GraphiteSketch`.
- Stump: `stumpRadius`, `hoverStrength`, `pressStrength` on `GraphiteSmudgeCanvas`.
- Sweep drama: `sweeps`, `height`, and `width` / `bow` in `planSweeps`.
- Pressure model: `FLICK_SPEED`, `MAX_TILT_DEG` in `kinematics.ts`.

## Composing a page

```tsx
<GraphitePaper tone={tone} grid vignette>
  <GraphiteTelemetry plate="Plate I" foley={useGraphiteFoley()} />
  <GraphiteHeading as="h1" reveal="mount">Graphite</GraphiteHeading>
  <GraphiteSketch shapes={SPHERE_STUDY} />
  <GraphiteSmudgeCanvas label="SMUDGE" className="aspect-[16/9]" />
  <GraphiteInversion onProgress={(p) => setTone(p >= 0.9 ? "slate" : "paper")}>…</GraphiteInversion>
  <GraphiteSandbox />
</GraphitePaper>
```

`GraphitePaper` renders the filter defs once; nest further papers with
`filters={false}`. Any subtree can be forced to the dark palette with
`data-graphite-tone="slate"` (the inversion does this for its slate content).

## Caveats

- Canvases reset when their host resizes (the sandbox keeps its drawing; the smudge field re-lays).
- SVG filters on very large text are GPU-cheap in Chromium/Firefox and a little heavier in WebKit; keep `#graphite-rub` to headings and fills, not body copy.
- The foley never auto-starts; browsers require a gesture.
- If you outgrow Canvas 2D (full-page smudge at 4K, ink that flows), the same model ports to a ping-pong framebuffer shader: the stump becomes a velocity-advected texture read, the tooth an fBM sample. Nothing in the component API would change.
