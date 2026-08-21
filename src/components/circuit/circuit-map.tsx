"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  buildNetwork,
  buildStreets,
  downstreamOf,
  upstreamOf,
  type DeviceProps,
  type EdgeProps,
  type Network,
} from "@/lib/circuit/synthetic";

type ColorMode = "phase" | "loading" | "feeder";
type Expr = maplibregl.ExpressionSpecification;

/**
 * In production, point this at a muted dark vector basemap and set
 * REMOTE_BASEMAP=true — e.g. Carto Dark Matter:
 *   https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gt/style.json
 * The demo ships a generated street grid instead so it renders identically
 * with no network access.
 */
const BASEMAP_URL =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gt/style.json";
const REMOTE_BASEMAP = false;

function syntheticBasemap(
  bounds: [[number, number], [number, number]]
): maplibregl.StyleSpecification {
  return {
    version: 8,
    name: "synthetic-dark",
    sources: {
      streets: { type: "geojson", data: buildStreets(bounds) },
    },
    layers: [
      { id: "bg", type: "background", paint: { "background-color": "#0a0d12" } },
      {
        id: "streets-minor",
        type: "line",
        source: "streets",
        filter: ["==", ["get", "cls"], "minor"],
        paint: {
          "line-color": "#141922",
          "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 11, 0.7, 16, 3],
        },
      },
      {
        id: "streets-arterial",
        type: "line",
        source: "streets",
        filter: ["==", ["get", "cls"], "arterial"],
        paint: {
          "line-color": "#1b212d",
          "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 11, 1.4, 16, 6],
        },
      },
    ],
  };
}

// Phase palette validated for CVD separation + contrast on a dark surface.
const PHASE_COLORS: Record<string, string> = {
  ABC: "#e8edf4",
  A: "#d97706",
  B: "#0891b2",
  C: "#9333ea",
};
const PHASE_GLOW: Record<string, string> = {
  ABC: "#9db8d8",
  A: "#f59e0b",
  B: "#22d3ee",
  C: "#c084fc",
};
const FEEDER_COLORS: Record<string, string> = {
  "FDR-1": "#d97706",
  "FDR-2": "#0891b2",
  "FDR-3": "#9333ea",
};
const FEEDER_LABELS: Record<string, string> = {
  "FDR-1": "Larkspur 1",
  "FDR-2": "Larkspur 2",
  "FDR-3": "Larkspur 3",
};

const DEVICE_LABELS: Record<string, string> = {
  substation: "Substation",
  breaker: "Feeder breaker",
  recloser: "Recloser",
  switch_closed: "Switch (closed)",
  switch_open: "Tie switch (open)",
  fuse: "Fuse",
  transformer: "Transformer",
  capacitor: "Capacitor bank",
};

function matchOn(prop: string, table: Record<string, string>, fallback: string): Expr {
  const pairs = Object.entries(table).flat();
  return ["match", ["get", prop], ...pairs, fallback] as unknown as Expr;
}

function lineColor(mode: ColorMode): Expr {
  if (mode === "phase") return matchOn("phase", PHASE_COLORS, "#e8edf4");
  if (mode === "feeder") return matchOn("feeder", FEEDER_COLORS, "#e8edf4");
  return [
    "interpolate", ["linear"], ["get", "loading"],
    0.15, "#155e75",
    0.5, "#0891b2",
    0.75, "#67e8f9",
    0.88, "#f59e0b",
    1.0, "#ef4444",
  ] as unknown as Expr;
}

function glowColor(mode: ColorMode): Expr {
  if (mode === "phase") return matchOn("phase", PHASE_GLOW, "#9db8d8");
  if (mode === "feeder") return matchOn("feeder", FEEDER_COLORS, "#9db8d8");
  return lineColor("loading");
}

/**
 * Wraps a per-feature opacity expression in the lateral fade-in: laterals
 * ramp 0→full between z11.4 and z13, backbone is always at full. The zoom
 * interpolate must be top-level, so `inner` is embedded in each stop output.
 */
function fadedOpacity(inner: Expr | number): Expr {
  return [
    "interpolate", ["linear"], ["zoom"],
    11.4, ["*", ["match", ["get", "rank"], "backbone", 1, 0], inner],
    13, inner,
  ] as unknown as Expr;
}

function dimBySelection(sel: string | null, on: number, off: number): Expr | number {
  if (!sel) return on;
  return ["case", ["==", ["get", "feeder"], sel], on, off] as unknown as Expr;
}

/**
 * Zoom-interpolated width whose per-stop outputs are data-driven
 * (rank + hover boost). MapLibre requires the zoom interpolate to be the
 * top-level expression, so the arithmetic lives inside each stop output.
 */
function rankWidth(mul: number, add: number, hoverBoost: number): Expr {
  const stops: [number, number, number][] = [
    [11, 1.9, 0.9],
    [14, 3.4, 1.8],
    [16.5, 7, 3.6],
  ];
  const out = (bb: number, lat: number): unknown => [
    "+",
    ["match", ["get", "rank"], "backbone", bb * mul + add, lat * mul + add],
    ["case", ["boolean", ["feature-state", "hover"], false], hoverBoost, 0],
  ];
  const expr: unknown[] = ["interpolate", ["exponential", 1.6], ["zoom"]];
  for (const [z, bb, lat] of stops) expr.push(z, out(bb, lat));
  return expr as unknown as Expr;
}

const coreWidth = () => rankWidth(1, 0, 1.3);
const casingWidth = () => rankWidth(1, 2.6, 1.3);
const glowWidth = () => rankWidth(4.2, 0, 4);

interface Tooltip {
  x: number;
  y: number;
  title: string;
  rows: [string, string][];
  accent: string;
}

interface TraceInfo {
  device: string;
  feeder: string;
  transformers: number;
  miles: number;
  edges: number;
}

declare global {
  interface Window {
    __circuit?: {
      setMode: (m: ColorMode) => void;
      selectFeeder: (id: string | null) => void;
      traceDevice: (name: string) => void;
      clear: () => void;
      ready: () => boolean;
      zoomTo: (lng: number, lat: number, zoom: number) => void;
      debug: () => Record<string, unknown>;
    };
  }
}

export default function CircuitMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<ColorMode>("phase");
  const [selFeeder, setSelFeeder] = useState<string | null>(null);
  const [trace, setTrace] = useState<TraceInfo | null>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const net = useMemo<Network>(() => buildNetwork(), []);
  const tracedIdsRef = useRef<Set<string>>(new Set());
  const hoverRef = useRef<{ source: string; id: string | number } | null>(null);

  const feederStats = useMemo(() => {
    const stats: Record<
      string,
      { miles: number; transformers: number; laterals: number; peak: number; customers: number }
    > = {};
    for (const id of net.feeders)
      stats[id] = { miles: 0, transformers: 0, laterals: 0, peak: 0, customers: 0 };
    for (const l of net.lines.features) {
      const s = stats[l.properties.feeder];
      if (!s) continue;
      s.miles += l.properties.len_m / 1609.34;
      s.peak = Math.max(s.peak, l.properties.loading);
      if (l.properties.rank === "lateral") s.laterals++;
    }
    for (const d of net.devices.features) {
      const s = stats[d.properties.feeder];
      if (s && d.properties.type === "transformer") {
        s.transformers++;
        s.customers += 7;
      }
    }
    return stats;
  }, [net]);

  // ---- map init -----------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    // This maplibre-gl build resolves its worker module relative to
    // import.meta.url, which bundlers rewrite to a chunk URL where the worker
    // file doesn't exist — sources then silently never load. The worker (and
    // the shared chunk it imports) are vendored in public/vendor/maplibre/;
    // re-copy them from node_modules/maplibre-gl/dist/ when upgrading maplibre.
    maplibregl.setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");

    (async () => {
      let style: maplibregl.StyleSpecification | string = syntheticBasemap(net.bounds);
      if (REMOTE_BASEMAP) {
        try {
          const res = await fetch(BASEMAP_URL, { signal: AbortSignal.timeout(6000) });
          if (!res.ok) throw new Error(String(res.status));
          style = (await res.json()) as maplibregl.StyleSpecification;
        } catch {
          style = syntheticBasemap(net.bounds);
        }
      }
      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style,
        bounds: net.bounds,
        fitBoundsOptions: { padding: { top: 90, bottom: 60, left: 70, right: 70 } },
        attributionControl: { compact: true },
        fadeDuration: 0,
      });
      mapRef.current = map;
      map.on("error", (e) => console.warn("[circuit-map]", e.error?.message ?? e));

      map.on("load", () => {
        // guard against a container measured mid-CSS-load
        map.resize();
        requestAnimationFrame(() => map.resize());
        map.addSource("net", {
          type: "geojson",
          data: net.lines,
          promoteId: "id",
        });
        map.addSource("devices", {
          type: "geojson",
          data: net.devices,
          promoteId: "id",
        });

        // 1. glow — the soft neon halo under everything
        map.addLayer({
          id: "net-glow",
          type: "line",
          source: "net",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": glowColor("phase"),
            "line-width": glowWidth(),
            "line-blur": 8,
            "line-opacity": 0.3,
          },
        });
        // 2. casing — separates the conductor from the basemap
        map.addLayer({
          id: "net-casing",
          type: "line",
          source: "net",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": "#05070b",
            "line-width": casingWidth(),
            "line-opacity": 0.85,
          },
        });
        // 3. core — the conductor itself
        map.addLayer({
          id: "net-core",
          type: "line",
          source: "net",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": lineColor("phase"),
            "line-width": coreWidth(),
            "line-opacity": 1,
          },
        });
        // 4. flow — animated dashes on the traced path only
        map.addLayer({
          id: "net-flow",
          type: "line",
          source: "net",
          layout: { "line-cap": "round", "line-join": "round" },
          filter: ["in", ["get", "id"], ["literal", []]],
          paint: {
            "line-color": "#ffffff",
            "line-width": ["match", ["get", "rank"], "backbone", 2.2, 1.4] as unknown as Expr,
            "line-opacity": 0.9,
            "line-dasharray": [0, 4, 3],
          },
        });
        // invisible wide hit target for hover/click on conductors
        map.addLayer({
          id: "net-hit",
          type: "line",
          source: "net",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: { "line-color": "#000", "line-width": 16, "line-opacity": 0.02 },
        });

        // ---- devices, minimal geometric symbol set ----
        map.addLayer({
          id: "dev-transformer",
          type: "circle",
          source: "devices",
          minzoom: 12.6,
          filter: ["==", ["get", "type"], "transformer"],
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 12.6, 1.4, 16.5, 4] as unknown as Expr,
            "circle-color": matchOn("phase", PHASE_COLORS, "#e8edf4"),
            "circle-stroke-color": "#05070b",
            "circle-stroke-width": 1,
            "circle-opacity": ["interpolate", ["linear"], ["zoom"], 12.6, 0, 13.4, 1] as unknown as Expr,
          },
        });
        map.addLayer({
          id: "dev-fuse",
          type: "circle",
          source: "devices",
          minzoom: 12.2,
          filter: ["==", ["get", "type"], "fuse"],
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 12.2, 2, 16.5, 4.5] as unknown as Expr,
            "circle-color": "#0b0e13",
            "circle-stroke-color": "#94a3b8",
            "circle-stroke-width": 1.5,
          },
        });
        map.addLayer({
          id: "dev-switch",
          type: "circle",
          source: "devices",
          minzoom: 11.5,
          filter: ["in", ["get", "type"], ["literal", ["switch_closed", "capacitor", "breaker"]]],
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 11.5, 3, 16.5, 6] as unknown as Expr,
            "circle-color": ["match", ["get", "type"], "switch_closed", "#e2e8f4", "#0b0e13"] as unknown as Expr,
            "circle-stroke-color": "#e2e8f4",
            "circle-stroke-width": 1.8,
          },
        });
        // recloser: double ring
        map.addLayer({
          id: "dev-recloser-ring",
          type: "circle",
          source: "devices",
          minzoom: 11,
          filter: ["==", ["get", "type"], "recloser"],
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 5.5, 16.5, 9] as unknown as Expr,
            "circle-color": "rgba(0,0,0,0)",
            "circle-stroke-color": "#e8edf4",
            "circle-stroke-width": 1.4,
          },
        });
        map.addLayer({
          id: "dev-recloser-dot",
          type: "circle",
          source: "devices",
          minzoom: 11,
          filter: ["==", ["get", "type"], "recloser"],
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 2, 16.5, 3.4] as unknown as Expr,
            "circle-color": "#e8edf4",
          },
        });
        // normally-open tie point — operationally critical, gets the alert hue
        map.addLayer({
          id: "dev-tie",
          type: "circle",
          source: "devices",
          filter: ["==", ["get", "type"], "switch_open"],
          paint: {
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 11, 4, 16.5, 7] as unknown as Expr,
            "circle-color": "#0b0e13",
            "circle-stroke-color": "#fb7185",
            "circle-stroke-width": 2,
          },
        });
        // substation badge
        map.addLayer({
          id: "dev-sub-halo",
          type: "circle",
          source: "devices",
          filter: ["==", ["get", "type"], "substation"],
          paint: {
            "circle-radius": 20,
            "circle-color": "#9db8d8",
            "circle-blur": 1,
            "circle-opacity": 0.25,
          },
        });
        map.addLayer({
          id: "dev-sub-ring",
          type: "circle",
          source: "devices",
          filter: ["==", ["get", "type"], "substation"],
          paint: {
            "circle-radius": 9,
            "circle-color": "#0b0e13",
            "circle-stroke-color": "#f8fafc",
            "circle-stroke-width": 2,
          },
        });
        map.addLayer({
          id: "dev-sub-core",
          type: "circle",
          source: "devices",
          filter: ["==", ["get", "type"], "substation"],
          paint: { "circle-radius": 3.5, "circle-color": "#f8fafc" },
        });

        // substation label as a DOM marker (keeps us off map glyphs entirely)
        const el = document.createElement("div");
        el.className =
          "pointer-events-none rounded-full border border-white/15 bg-zinc-950/80 px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-200 shadow-lg backdrop-blur-md";
        el.textContent = `${net.substation.name} · ${net.substation.kv} kV`;
        new maplibregl.Marker({ element: el, anchor: "bottom", offset: [0, -16] })
          .setLngLat(net.substation.coord)
          .addTo(map);

        setReady(true);
      });
    })();

    return () => {
      cancelled = true;
      setReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- paint updates on mode / selection change ---------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !map.getLayer("net-core")) return;
    const traced = (on: Expr | number, boost: number): Expr =>
      ["case", ["boolean", ["feature-state", "traced"], false], boost, on] as unknown as Expr;

    map.setPaintProperty("net-core", "line-color", lineColor(mode));
    map.setPaintProperty("net-glow", "line-color", glowColor(mode));
    map.setPaintProperty("net-core", "line-opacity",
      fadedOpacity(traced(dimBySelection(selFeeder, 1, 0.07), 1)));
    map.setPaintProperty("net-casing", "line-opacity",
      fadedOpacity(traced(dimBySelection(selFeeder, 0.85, 0.05), 0.9)));
    map.setPaintProperty("net-glow", "line-opacity",
      fadedOpacity(traced(dimBySelection(selFeeder, selFeeder ? 0.55 : 0.3, 0.02), 0.85)));

    const devDim = (on: number, off: number): Expr =>
      ["case",
        ["any", ["==", ["get", "feeder"], selFeeder ?? "__all__"], ["==", ["get", "type"], "substation"]],
        on, selFeeder ? off : on,
      ] as unknown as Expr;
    // transformers carry phase identity only while color encodes phase;
    // in other modes they go neutral so the map tells one color story
    map.setPaintProperty(
      "dev-transformer",
      "circle-color",
      mode === "phase" ? matchOn("phase", PHASE_COLORS, "#e8edf4") : "#64748b"
    );
    for (const layer of [
      "dev-transformer", "dev-fuse", "dev-switch", "dev-recloser-ring",
      "dev-recloser-dot", "dev-tie", "dev-sub-halo", "dev-sub-ring", "dev-sub-core",
    ]) {
      map.setPaintProperty(layer, "circle-opacity", devDim(layer === "dev-sub-halo" ? 0.25 : 1, 0.12));
      map.setPaintProperty(layer, "circle-stroke-opacity", devDim(1, 0.12));
    }
  }, [mode, selFeeder, ready]);

  // ---- flow animation on the traced path ----------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !map.getLayer("net-flow")) return;
    const ids = [...tracedIdsRef.current];
    map.setFilter("net-flow", ["in", ["get", "id"], ["literal", ids]] as unknown as maplibregl.FilterSpecification);
    if (ids.length === 0) return;

    const seq: [number, number, number][] = [
      [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5],
      [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0],
    ];
    let step = 0;
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      if (t - last > 70) {
        last = t;
        step = (step + 1) % seq.length;
        if (map.getLayer("net-flow"))
          map.setPaintProperty("net-flow", "line-dasharray", seq[step]);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trace, ready]);

  // ---- interactions -------------------------------------------------------
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const deviceLayers = [
      "dev-tie", "dev-recloser-ring", "dev-switch", "dev-fuse",
      "dev-transformer", "dev-sub-ring",
    ];

    const clearHover = () => {
      if (hoverRef.current) {
        map.setFeatureState(hoverRef.current, { hover: false });
        hoverRef.current = null;
      }
    };

    const onMove = (e: maplibregl.MapMouseEvent) => {
      const feats = map.queryRenderedFeatures(e.point, {
        layers: [...deviceLayers, "net-hit"],
      });
      const f = feats[0];
      clearHover();
      if (!f) {
        setTooltip(null);
        map.getCanvas().style.cursor = "";
        return;
      }
      map.getCanvas().style.cursor = "pointer";
      if (f.layer.id === "net-hit") {
        const p = f.properties as unknown as EdgeProps;
        hoverRef.current = { source: "net", id: f.id as string };
        map.setFeatureState(hoverRef.current, { hover: true });
        setTooltip({
          x: e.point.x, y: e.point.y,
          title: p.name,
          accent: mode === "loading"
            ? (p.loading > 0.88 ? "#ef4444" : p.loading > 0.75 ? "#f59e0b" : "#22d3ee")
            : PHASE_COLORS[p.phase],
          rows: [
            ["Feeder", FEEDER_LABELS[p.feeder] ?? p.feeder],
            ["Phase", p.phase === "ABC" ? "3φ (ABC)" : `1φ (${p.phase})`],
            ["Voltage", `${p.kv} kV`],
            ["Loading", `${Math.round(p.loading * 100)} %`],
          ],
        });
      } else {
        const p = f.properties as unknown as DeviceProps;
        setTooltip({
          x: e.point.x, y: e.point.y,
          title: p.name,
          accent: p.type === "switch_open" ? "#fb7185" : "#e8edf4",
          rows: [
            ["Type", DEVICE_LABELS[p.type]],
            ["Feeder", FEEDER_LABELS[p.feeder] ?? "—"],
            ...(p.type !== "substation"
              ? [["Phase", p.phase === "ABC" ? "3φ" : p.phase] as [string, string]]
              : []),
            ...(p.type === "substation" ? [] : [["Action", "Click to trace downstream"] as [string, string]]),
          ],
        });
      }
    };

    const onClick = (e: maplibregl.MapMouseEvent) => {
      const feats = map.queryRenderedFeatures(e.point, {
        layers: [...deviceLayers, "net-hit"],
      });
      const f = feats[0];
      if (!f) {
        applyTrace(new Set());
        setTrace(null);
        setSelFeeder(null);
        return;
      }
      if (f.layer.id === "net-hit") {
        const p = f.properties as unknown as EdgeProps;
        applyTrace(new Set());
        setTrace(null);
        setSelFeeder(p.feeder);
        fitToEdges(
          new Set(
            net.lines.features
              .filter((l) => l.properties.feeder === p.feeder)
              .map((l) => l.properties.id)
          )
        );
      } else {
        const p = f.properties as unknown as DeviceProps;
        if (p.type === "substation" || !p.edge) return;
        runTrace(p);
      }
    };

    map.on("mousemove", onMove);
    map.on("click", onClick);
    return () => {
      map.off("mousemove", onMove);
      map.off("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, mode]);

  function applyTrace(ids: Set<string>) {
    const map = mapRef.current;
    if (!map) return;
    for (const id of tracedIdsRef.current)
      map.setFeatureState({ source: "net", id }, { traced: false });
    tracedIdsRef.current = ids;
    for (const id of ids) map.setFeatureState({ source: "net", id }, { traced: true });
  }

  function fitToEdges(ids: Set<string>) {
    const map = mapRef.current;
    if (!map || ids.size === 0) return;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const l of net.lines.features) {
      if (!ids.has(l.properties.id)) continue;
      for (const [x, y] of l.geometry.coordinates) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
    }
    map.fitBounds([[minX, minY], [maxX, maxY]], {
      padding: { top: 110, bottom: 80, left: 90, right: 300 },
      duration: 900,
      maxZoom: 14.5,
    });
  }

  function runTrace(device: DeviceProps) {
    const down = downstreamOf(net, device.edge);
    const up = upstreamOf(net, device.edge);
    const all = new Set([...down, ...up]);
    applyTrace(all);
    setSelFeeder(device.feeder);
    fitToEdges(down);

    let miles = 0;
    let transformers = 0;
    for (const l of net.lines.features)
      if (down.has(l.properties.id)) miles += l.properties.len_m / 1609.34;
    for (const d of net.devices.features)
      if (d.properties.type === "transformer" && down.has(d.properties.edge)) transformers++;
    setTrace({
      device: device.name,
      feeder: device.feeder,
      transformers,
      miles,
      edges: down.size,
    });
  }

  // dev/test hooks (also handy in the browser console)
  useEffect(() => {
    window.__circuit = {
      setMode,
      selectFeeder: (id) => {
        applyTrace(new Set());
        setTrace(null);
        setSelFeeder(id);
        if (id)
          fitToEdges(
            new Set(
              net.lines.features
                .filter((l) => l.properties.feeder === id)
                .map((l) => l.properties.id)
            )
          );
      },
      traceDevice: (name) => {
        const d = net.devices.features.find((x) => x.properties.name === name);
        if (d) runTrace(d.properties);
      },
      clear: () => {
        applyTrace(new Set());
        setTrace(null);
        setSelFeeder(null);
      },
      ready: () => ready,
      zoomTo: (lng, lat, zoom) =>
        mapRef.current?.jumpTo({ center: [lng, lat], zoom }),
      debug: () => {
        const m = mapRef.current;
        if (!m) return { map: null };
        return {
          zoom: m.getZoom(),
          center: m.getCenter().toArray(),
          layers: m.getStyle().layers.map((l) => l.id),
          netFeatures: m.querySourceFeatures("net").length,
          rendered: m.queryRenderedFeatures(undefined, { layers: ["net-core"] }).length,
        };
      },
    };
    return () => { delete window.__circuit; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, net]);

  const sel = selFeeder ? feederStats[selFeeder] : null;

  return (
    <div className="dark relative h-dvh w-full overflow-hidden bg-[#0a0d12] font-sans text-zinc-100">
      {/* h-full/w-full, not just inset-0: maplibre's stylesheet forces
          position:relative on this element, which would collapse it */}
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {/* vignette for depth */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />

      {/* title */}
      <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 ring-1 ring-white/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">Grid Explorer</div>
          <div className="text-[11px] text-zinc-400">
            {net.substation.name} · 3 feeders · {net.lines.features.length} conductors
          </div>
        </div>
      </div>

      {/* color-mode segmented control */}
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-zinc-950/70 p-1 shadow-2xl backdrop-blur-xl">
        {(["phase", "loading", "feeder"] as ColorMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
              mode === m
                ? "bg-white/15 text-white shadow-inner"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* zoom */}
      <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 shadow-2xl backdrop-blur-xl">
        <button
          aria-label="Zoom in"
          onClick={() => mapRef.current?.zoomIn()}
          className="px-3 py-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          +
        </button>
        <div className="h-px bg-white/10" />
        <button
          aria-label="Zoom out"
          onClick={() => mapRef.current?.zoomOut()}
          className="px-3 py-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          −
        </button>
      </div>

      {/* legend — bottom-right; bottom-left is reserved by the app's
          sticky-notes launcher */}
      <div className="absolute bottom-10 right-4 w-52 rounded-2xl border border-white/10 bg-zinc-950/70 p-3.5 shadow-2xl backdrop-blur-xl">
        <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {mode === "phase" ? "Phasing" : mode === "loading" ? "Loading (% of rating)" : "Feeders"}
        </div>
        {mode === "loading" ? (
          <div>
            <div
              className="h-2 w-full rounded-full"
              style={{
                background:
                  "linear-gradient(to right,#155e75,#0891b2,#67e8f9,#f59e0b,#ef4444)",
              }}
            />
            <div className="mt-1.5 flex justify-between text-[10px] tabular-nums text-zinc-400">
              <span>15</span><span>50</span><span>75</span><span className="text-amber-400">88</span><span className="text-red-400">100</span>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5">
            {(mode === "phase"
              ? [
                  ["3φ backbone", PHASE_COLORS.ABC],
                  ["Phase A", PHASE_COLORS.A],
                  ["Phase B", PHASE_COLORS.B],
                  ["Phase C", PHASE_COLORS.C],
                ]
              : net.feeders.map((f) => [FEEDER_LABELS[f], FEEDER_COLORS[f]])
            ).map(([label, color]) => (
              <div key={label} className="flex items-center gap-2.5">
                <span
                  className="h-1 w-6 rounded-full"
                  style={{ background: color as string, boxShadow: `0 0 8px ${color}66` }}
                />
                <span className="text-[11px] text-zinc-300">{label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 space-y-1.5 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-rose-400 bg-transparent" />
            <span className="text-[11px] text-zinc-300">Open tie point</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full border border-zinc-200">
              <span className="h-1 w-1 rounded-full bg-zinc-200" />
            </span>
            <span className="text-[11px] text-zinc-300">Recloser</span>
          </div>
        </div>
      </div>

      {/* feeder / trace detail panel */}
      {(sel || trace) && (
        <div className="absolute right-4 top-20 w-64 rounded-2xl border border-white/10 bg-zinc-950/70 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {trace ? "Downstream trace" : "Feeder"}
              </div>
              <div className="mt-0.5 text-sm font-semibold tracking-tight">
                {trace ? trace.device : FEEDER_LABELS[selFeeder!]}
              </div>
            </div>
            <button
              onClick={() => window.__circuit?.clear()}
              aria-label="Close"
              className="rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/10 hover:text-zinc-200"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>
          {trace ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                ["Transformers", String(trace.transformers)],
                ["Customers est.", String(trace.transformers * 7)],
                ["Exposure", `${trace.miles.toFixed(1)} mi`],
                ["Sections", String(trace.edges)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/5 p-2.5">
                  <div className="text-base font-semibold tabular-nums tracking-tight">{v}</div>
                  <div className="text-[10px] text-zinc-400">{k}</div>
                </div>
              ))}
              <div className="col-span-2 mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                <span className="inline-block h-0.5 w-5 rounded bg-white [box-shadow:0_0_6px_#fff]" />
                Animated path = energized route from source
              </div>
            </div>
          ) : sel ? (
            <div className="mt-3 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Line miles", sel.miles.toFixed(1)],
                  ["Transformers", String(sel.transformers)],
                  ["Laterals", String(sel.laterals)],
                  ["Customers est.", String(sel.customers)],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/5 p-2.5">
                    <div className="text-base font-semibold tabular-nums tracking-tight">{v}</div>
                    <div className="text-[10px] text-zinc-400">{k}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Peak section loading</span>
                  <span
                    className={`font-semibold tabular-nums ${
                      sel.peak > 0.88 ? "text-red-400" : sel.peak > 0.75 ? "text-amber-400" : "text-cyan-300"
                    }`}
                  >
                    {Math.round(sel.peak * 100)}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      sel.peak > 0.88 ? "bg-red-500" : sel.peak > 0.75 ? "bg-amber-500" : "bg-cyan-400"
                    }`}
                    style={{ width: `${Math.min(100, sel.peak * 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-500">
                Click a device to trace its downstream impact. Click empty map to reset.
              </p>
            </div>
          ) : null}
        </div>
      )}

      {/* hover tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 w-52 rounded-xl border border-white/10 bg-zinc-950/85 p-3 shadow-2xl backdrop-blur-xl"
          style={{
            left: Math.min(tooltip.x + 14, (containerRef.current?.clientWidth ?? 800) - 220),
            top: Math.max(tooltip.y - 10, 8),
          }}
        >
          <div className="mb-1.5 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: tooltip.accent, boxShadow: `0 0 8px ${tooltip.accent}` }}
            />
            <span className="text-xs font-semibold tracking-tight">{tooltip.title}</span>
          </div>
          <div className="space-y-0.5">
            {tooltip.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between text-[11px]">
                <span className="text-zinc-500">{k}</span>
                <span className="tabular-nums text-zinc-300">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
