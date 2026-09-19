// Procedural pencil foley with zero audio files: looped pink noise through a
// low-pass whose cutoff and gain ride the hand's velocity. Slow drags whisper
// (~520 Hz), fast scrapes open up (~1200 Hz).

import { clamp } from "./math"

export interface GraphiteFoley {
  readonly running: boolean
  start(): Promise<void>
  /** px/ms; 0 is silent */
  setVelocity(v: number): void
  /** short wood-core tap for pointer down */
  tap(): void
  stop(): void
}

type AudioContextCtor = typeof AudioContext

function resolveAudioContext(): AudioContextCtor | null {
  if (typeof window === "undefined") return null
  const w = window as typeof window & { webkitAudioContext?: AudioContextCtor }
  return w.AudioContext ?? w.webkitAudioContext ?? null
}

/** Paul Kellet's pink-noise approximation, 2 s looped. */
function pinkNoiseBuffer(ac: AudioContext): AudioBuffer {
  const seconds = 2
  const buffer = ac.createBuffer(1, ac.sampleRate * seconds, ac.sampleRate)
  const data = buffer.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.969 * b2 + white * 0.153852
    b3 = 0.8665 * b3 + white * 0.3104856
    b4 = 0.55 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.016898
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
    b6 = white * 0.115926
  }
  return buffer
}

export function createFoley(): GraphiteFoley | null {
  const Ctor = resolveAudioContext()
  if (!Ctor) return null

  let ac: AudioContext | null = null
  let source: AudioBufferSourceNode | null = null
  let filter: BiquadFilterNode | null = null
  let gain: GainNode | null = null
  let running = false

  return {
    get running() {
      return running
    },
    async start() {
      if (running) return
      ac = new Ctor()
      await ac.resume()
      source = ac.createBufferSource()
      source.buffer = pinkNoiseBuffer(ac)
      source.loop = true
      filter = ac.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.value = 520
      filter.Q.value = 0.7
      gain = ac.createGain()
      gain.gain.value = 0
      source.connect(filter).connect(gain).connect(ac.destination)
      source.start()
      running = true
    },
    setVelocity(v) {
      if (!running || !ac || !gain || !filter) return
      const t = clamp(v / 3, 0, 1)
      const now = ac.currentTime
      gain.gain.setTargetAtTime(0.22 * t, now, 0.05)
      filter.frequency.setTargetAtTime(520 + 680 * t, now, 0.08)
    },
    tap() {
      if (!running || !ac) return
      const burst = ac.createBufferSource()
      const len = Math.floor(ac.sampleRate * 0.04)
      const buf = ac.createBuffer(1, len, ac.sampleRate)
      const d = buf.getChannelData(0)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3
      burst.buffer = buf
      const bp = ac.createBiquadFilter()
      bp.type = "bandpass"
      bp.frequency.value = 1800
      bp.Q.value = 2.5
      const g = ac.createGain()
      g.gain.value = 0.18
      burst.connect(bp).connect(g).connect(ac.destination)
      burst.start()
    },
    stop() {
      if (!running) return
      running = false
      try {
        source?.stop()
      } catch {
        // already stopped
      }
      source?.disconnect()
      filter?.disconnect()
      gain?.disconnect()
      void ac?.close()
      ac = source = filter = gain = null
    },
  }
}
