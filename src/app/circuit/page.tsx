import type { Metadata } from "next";
import CircuitMap from "@/components/circuit/circuit-map";

export const metadata: Metadata = {
  title: "Grid Explorer — Circuit Connectivity",
  description:
    "Modern distribution circuit connectivity visualization: layered glow rendering, focus mode, and downstream tracing on a dark basemap.",
};

export default function CircuitPage() {
  return <CircuitMap />;
}
