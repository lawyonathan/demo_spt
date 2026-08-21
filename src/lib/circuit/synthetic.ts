/**
 * Deterministic synthetic distribution-feeder network for the circuit
 * connectivity demo. Emits GeoJSON shaped the way the map component expects
 * real utility data to be shaped — swap `buildNetwork()` for a loader of your
 * own conductor/device GeoJSON and everything downstream keeps working.
 *
 * Expected line properties:  id, feeder, phase, rank, loading, kv, name, upstream
 * Expected device properties: id, feeder, type, phase, name, edge
 */

export type Phase = "ABC" | "A" | "B" | "C";
export type Rank = "backbone" | "lateral";
export type DeviceType =
  | "substation"
  | "breaker"
  | "recloser"
  | "switch_closed"
  | "switch_open"
  | "fuse"
  | "transformer"
  | "capacitor";

export interface EdgeProps {
  id: string;
  feeder: string;
  phase: Phase;
  rank: Rank;
  loading: number; // 0..1 of ampacity
  kv: number;
  name: string;
  len_m: number;
  /** ancestor edge ids from the substation down to (not including) this edge */
  upstream: string[];
}

export interface DeviceProps {
  id: string;
  feeder: string;
  type: DeviceType;
  phase: Phase;
  name: string;
  /** id of the conductor this device sits on (used for tracing) */
  edge: string;
}

type LineFeature = GeoJSON.Feature<GeoJSON.LineString, EdgeProps>;
type PointFeature = GeoJSON.Feature<GeoJSON.Point, DeviceProps>;

export interface Network {
  lines: GeoJSON.FeatureCollection<GeoJSON.LineString, EdgeProps>;
  devices: GeoJSON.FeatureCollection<GeoJSON.Point, DeviceProps>;
  substation: { name: string; coord: [number, number]; kv: number };
  feeders: string[];
  bounds: [[number, number], [number, number]];
}

/** mulberry32 — small seeded PRNG so the demo renders identically every run */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SUB: [number, number] = [-104.9403, 39.7212];
const M_PER_DEG_LAT = 111_320;
const mPerDegLon = M_PER_DEG_LAT * Math.cos((SUB[1] * Math.PI) / 180);

function move(p: [number, number], dxM: number, dyM: number): [number, number] {
  return [p[0] + dxM / mPerDegLon, p[1] + dyM / M_PER_DEG_LAT];
}

function segLenM(a: [number, number], b: [number, number]) {
  const dx = (b[0] - a[0]) * mPerDegLon;
  const dy = (b[1] - a[1]) * M_PER_DEG_LAT;
  return Math.hypot(dx, dy);
}

/** Unit vectors for the 4 cardinal directions */
const DIRS: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

interface FeederSpec {
  id: string;
  name: string;
  /** initial cardinal direction index into DIRS */
  dir: number;
  /** bias: probability of continuing straight vs turning */
  straightBias: number;
  /** which way this feeder prefers to turn (+1 ccw / -1 cw) */
  turn: 1 | -1;
  segments: number;
  /** loading at the feeder breaker (decays downstream) */
  headLoading: number;
}

const FEEDERS: FeederSpec[] = [
  { id: "FDR-1", name: "Larkspur 1", dir: 0, straightBias: 0.62, turn: 1, segments: 13, headLoading: 0.72 },
  { id: "FDR-2", name: "Larkspur 2", dir: 3, straightBias: 0.55, turn: -1, segments: 12, headLoading: 0.97 },
  { id: "FDR-3", name: "Larkspur 3", dir: 2, straightBias: 0.6, turn: -1, segments: 14, headLoading: 0.58 },
];

export function buildNetwork(): Network {
  const rand = rng(20260821);
  const lines: LineFeature[] = [];
  const devices: PointFeature[] = [];
  let edgeSeq = 0;
  let devSeq = 0;

  const pushEdge = (
    coords: [number, number][],
    props: Omit<EdgeProps, "id" | "len_m">
  ): EdgeProps => {
    const id = `e${edgeSeq++}`;
    let len = 0;
    for (let i = 1; i < coords.length; i++) len += segLenM(coords[i - 1], coords[i]);
    const full: EdgeProps = { ...props, id, len_m: Math.round(len) };
    lines.push({
      type: "Feature",
      id,
      geometry: { type: "LineString", coordinates: coords },
      properties: full,
    });
    return full;
  };

  const pushDevice = (
    coord: [number, number],
    props: Omit<DeviceProps, "id">
  ) => {
    const id = `d${devSeq++}`;
    devices.push({
      type: "Feature",
      id,
      geometry: { type: "Point", coordinates: coord },
      properties: { ...props, id },
    });
  };

  pushDevice(SUB, {
    feeder: "SUB",
    type: "substation",
    phase: "ABC",
    name: "Larkspur Substation",
    edge: "",
  });

  const phaseCycle: Phase[] = ["A", "B", "C"];

  for (const f of FEEDERS) {
    let cursor: [number, number] = SUB;
    let dir = f.dir;
    let upstream: string[] = [];
    let phaseIdx = FEEDERS.indexOf(f); // stagger so feeders don't sync phases
    let lateralCount = 0;

    const reclosersAt = new Set([
      Math.floor(f.segments * 0.35),
      Math.floor(f.segments * 0.7),
    ]);

    for (let s = 0; s < f.segments; s++) {
      const lenM = 280 + rand() * 420;
      const [ux, uy] = DIRS[dir];
      const next = move(cursor, ux * lenM, uy * lenM);
      // decay loading downstream with a little noise
      const loading = Math.max(
        0.12,
        f.headLoading * (1 - s / (f.segments + 2)) + (rand() - 0.5) * 0.06
      );
      const edge = pushEdge([cursor, next], {
        feeder: f.id,
        phase: "ABC",
        rank: "backbone",
        loading,
        kv: 13.2,
        name: `${f.name} main`,
        upstream,
      });

      if (s === 0) {
        pushDevice(move(cursor, ux * 60, uy * 60), {
          feeder: f.id,
          type: "breaker",
          phase: "ABC",
          name: `${f.name} breaker`,
          edge: edge.id,
        });
      }
      if (reclosersAt.has(s)) {
        pushDevice(move(cursor, ux * (lenM / 2), uy * (lenM / 2)), {
          feeder: f.id,
          type: "recloser",
          phase: "ABC",
          name: `Recloser ${f.id.slice(-1)}${s}`,
          edge: edge.id,
        });
      }
      if (s > 2 && rand() < 0.18) {
        pushDevice(next, {
          feeder: f.id,
          type: "switch_closed",
          phase: "ABC",
          name: `Switch S${f.id.slice(-1)}${s}`,
          edge: edge.id,
        });
      }
      if (s === Math.floor(f.segments / 2) && rand() < 0.9) {
        pushDevice(move(next, 0, 0), {
          feeder: f.id,
          type: "capacitor",
          phase: "ABC",
          name: `Cap bank C${f.id.slice(-1)}`,
          edge: edge.id,
        });
      }

      const nextUpstream = [...upstream, edge.id];

      // laterals tap off most joints, perpendicular to the backbone
      const tapRoll = rand();
      if (s > 0 && tapRoll < 0.78) {
        const sides = tapRoll < 0.22 ? [1, -1] : [rand() < 0.5 ? 1 : -1];
        for (const side of sides) {
          const phase = phaseCycle[phaseIdx++ % 3];
          lateralCount++;
          buildLateral(
            next,
            (dir + side + 4) % 4,
            f,
            phase,
            nextUpstream,
            `${f.name} lat ${lateralCount}`,
            0,
            rand,
            pushEdge,
            pushDevice
          );
        }
      }

      upstream = nextUpstream;
      cursor = next;
      // meander: keep going straight or take the feeder's preferred turn
      if (rand() > f.straightBias) {
        dir = (dir + (rand() < 0.75 ? f.turn : -f.turn) + 4) % 4;
      }
      // final segment ends in a normally-open tie to the adjacent circuit
      if (s === f.segments - 1) {
        pushDevice(cursor, {
          feeder: f.id,
          type: "switch_open",
          phase: "ABC",
          name: `Tie ${f.id} (N.O.)`,
          edge: edge.id,
        });
      }
    }
  }

  // bounds with padding
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const l of lines)
    for (const [x, y] of l.geometry.coordinates) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }

  return {
    lines: { type: "FeatureCollection", features: lines },
    devices: { type: "FeatureCollection", features: devices },
    substation: { name: "Larkspur Substation", coord: SUB, kv: 13.2 },
    feeders: FEEDERS.map((f) => f.id),
    bounds: [[minX, minY], [maxX, maxY]],
  };
}

function buildLateral(
  start: [number, number],
  dir: number,
  f: FeederSpec,
  phase: Phase,
  upstream: string[],
  name: string,
  depth: number,
  rand: () => number,
  pushEdge: (coords: [number, number][], props: Omit<EdgeProps, "id" | "len_m">) => EdgeProps,
  pushDevice: (coord: [number, number], props: Omit<DeviceProps, "id">) => void
) {
  let cursor = start;
  let d = dir;
  let up = upstream;
  const segments = 1 + Math.floor(rand() * (depth === 0 ? 3 : 2));

  for (let s = 0; s < segments; s++) {
    const lenM = 140 + rand() * 300;
    const [ux, uy] = DIRS[d];
    const next = move(cursor, ux * lenM, uy * lenM);
    const edge = pushEdge([cursor, next], {
      feeder: f.id,
      phase,
      rank: "lateral",
      loading: 0.15 + rand() * 0.5,
      kv: 13.2,
      name,
      upstream: up,
    });

    if (s === 0 && depth === 0) {
      pushDevice(move(cursor, ux * 40, uy * 40), {
        feeder: f.id,
        type: "fuse",
        phase,
        name: `Fuse ${name}`,
        edge: edge.id,
      });
    }

    // distribution transformers dotted along the run
    const xfmrs = Math.max(1, Math.floor(lenM / 150));
    for (let t = 1; t <= xfmrs; t++) {
      const frac = t / (xfmrs + 0.5);
      pushDevice(move(cursor, ux * lenM * frac, uy * lenM * frac), {
        feeder: f.id,
        type: "transformer",
        phase,
        name: `XFMR ${edge.id}-${t}`,
        edge: edge.id,
      });
    }

    up = [...up, edge.id];

    // occasional sub-branch
    if (depth === 0 && rand() < 0.3) {
      buildLateral(
        next,
        (d + (rand() < 0.5 ? 1 : 3)) % 4,
        f,
        phase,
        up,
        `${name}.${s}`,
        depth + 1,
        rand,
        pushEdge,
        pushDevice
      );
    }

    cursor = next;
    if (rand() < 0.35) d = (d + (rand() < 0.5 ? 1 : 3)) % 4;
  }
}

export interface StreetProps {
  cls: "minor" | "arterial";
}

/**
 * Muted synthetic street grid used as an offline basemap under the network.
 * In production you'd point the map at a real dark vector basemap instead
 * (e.g. Carto Dark Matter or a Protomaps build) and drop this.
 */
export function buildStreets(
  bounds: [[number, number], [number, number]]
): GeoJSON.FeatureCollection<GeoJSON.LineString, StreetProps> {
  const rand = rng(77_1031);
  const [[minX, minY], [maxX, maxY]] = bounds;
  const padX = (maxX - minX) * 0.45;
  const padY = (maxY - minY) * 0.45;
  const x0 = minX - padX, x1 = maxX + padX;
  const y0 = minY - padY, y1 = maxY + padY;

  const stepLon = 210 / mPerDegLon;
  const stepLat = 210 / M_PER_DEG_LAT;
  const features: GeoJSON.Feature<GeoJSON.LineString, StreetProps>[] = [];

  let i = 0;
  for (let x = x0; x <= x1; x += stepLon * (0.85 + rand() * 0.4), i++) {
    features.push({
      type: "Feature",
      geometry: { type: "LineString", coordinates: [[x, y0], [x, y1]] },
      properties: { cls: i % 4 === 2 ? "arterial" : "minor" },
    });
  }
  let j = 0;
  for (let y = y0; y <= y1; y += stepLat * (0.85 + rand() * 0.4), j++) {
    features.push({
      type: "Feature",
      geometry: { type: "LineString", coordinates: [[x0, y], [x1, y]] },
      properties: { cls: j % 4 === 1 ? "arterial" : "minor" },
    });
  }
  return { type: "FeatureCollection", features };
}

/** All edges electrically downstream of `edgeId` (inclusive). */
export function downstreamOf(net: Network, edgeId: string): Set<string> {
  const out = new Set<string>([edgeId]);
  for (const l of net.lines.features) {
    if (l.properties.upstream.includes(edgeId)) out.add(l.properties.id);
  }
  return out;
}

/** Path of edges from the substation down to `edgeId` (inclusive). */
export function upstreamOf(net: Network, edgeId: string): string[] {
  const edge = net.lines.features.find((l) => l.properties.id === edgeId);
  return edge ? [...edge.properties.upstream, edgeId] : [];
}
