# Circuit connectivity visualization (`/circuit`)

A modernized distribution-circuit view: layered glow rendering on a muted dark
basemap, feeder focus mode, downstream tracing with animated power flow, and
three color modes (phase / loading / feeder). Runs fully offline on
deterministic synthetic data.

## Where things live

| File | Role |
|---|---|
| `src/app/circuit/page.tsx` | Route shell |
| `src/components/circuit/circuit-map.tsx` | Map, layers, interactions, UI panels |
| `src/lib/circuit/synthetic.ts` | Synthetic network + street grid generator, trace helpers |
| `public/vendor/maplibre/` | Vendored maplibre worker (see note below) |

## Swapping in real GeoJSON

Replace `buildNetwork()` with a loader that returns the same shape:

- **Conductor lines** with properties `id`, `feeder`, `phase` (`ABC|A|B|C`),
  `rank` (`backbone|lateral`), `loading` (0–1), `kv`, `name`, and `upstream`
  (array of ancestor conductor ids from the source — this one field powers both
  trace directions). Stable per-feature `id`s are required (`promoteId`).
- **Device points** with `id`, `feeder`, `type` (substation, breaker, recloser,
  switch_closed, switch_open, fuse, transformer, capacitor), `phase`, `name`,
  and `edge` (id of the conductor the device sits on).

If your export lacks `rank`/`upstream`, derive them once in preprocessing from
phasing (3φ vs 1φ) and network topology.

## Basemap

The demo generates a muted street grid so it renders with zero network access.
For production, set `REMOTE_BASEMAP = true` in `circuit-map.tsx` and point
`BASEMAP_URL` at a dark vector style (Carto Dark Matter, or a self-hosted
Protomaps/OpenFreeMap build). Keep the basemap near-monochrome — the network
should be the only saturated thing on screen.

## MapLibre worker note

This maplibre-gl build resolves its worker module relative to
`import.meta.url`, which bundlers rewrite to a chunk URL where the file does
not exist — GeoJSON sources then silently never load. The fix is
`maplibregl.setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs")` with the
worker and its shared chunk copied into `public/vendor/maplibre/`. Re-copy both
from `node_modules/maplibre-gl/dist/` when upgrading maplibre.

## Design notes

- Phase palette (`#d97706` / `#0891b2` / `#9333ea`) is validated for
  colorblind-safe adjacent-pair separation and ≥3:1 contrast on the dark
  surface.
- Conductors render as a 3-layer stack (glow → casing → core) with rounded
  joins; width and opacity are driven by `rank` and zoom, so the backbone
  dominates far out and laterals/devices fade in as you approach.
- Selection dims everything else via paint expressions; tracing marks edges
  with `feature-state` and animates a dash layer along the traced path.

## Screenshot harness

`window.__circuit` exposes `setMode`, `selectFeeder`, `traceDevice`, `clear`,
`zoomTo`, and `debug` for driving the view from Playwright or the console.
