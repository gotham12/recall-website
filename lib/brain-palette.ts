/** Brain-decline hero — healthy → grey → tumor → warm resolution. */

/** Beat 1–2: healthy, distant brain. Warm, neutral, alive. */
export const HEALTHY_PALETTE = {
  base: '#C9A98C',
  shadow: '#9C7B63',
  highlight: '#E8D2B8',
} as const;

/** Beat 3: years of decline. Desaturated, dim, but never pure black. */
export const DECLINE_PALETTE = {
  base: '#6E6E73',
  shadow: '#48484D',
  highlight: '#85858B',
} as const;

/**
 * Beat 4: the mass. Soft, blurred, charcoal — a shadow, not a wound.
 * Deliberately capped away from black/red and kept low-opacity + heavily
 * blurred so it reads as solemn weight, not a graphic reveal.
 */
export const TUMOR_PALETTE = {
  core: '#2A2B30',
  edge: '#3D3E45',
} as const;

/** Beat 4 resolution — reuses the site's existing warm "color returns" palette. */
export const RESOLUTION_GLOW = {
  amber: '#F5A623',
  coral: '#FF6B4A',
  rose: '#E8437A',
  violet: '#9B6EDB',
} as const;

export const SCENE_BG = {
  neutral: '#0B0E14',
  dim: '#06070A',
} as const;

/** Scroll-progress beat boundaries (0–1). No wide establishing shot — starts close. */
export const BEATS = {
  zoomEnd: 0.32,
  darkenEnd: 0.58,
  tumorFillEnd: 0.82,
  resolveEnd: 1,
} as const;

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function localProgress(global: number, start: number, end: number): number {
  return clamp01((global - start) / (end - start));
}

/** Simple hex RGB lerp — no new color libraries needed. */
export function lerpColor(from: string, to: string, t: number): string {
  const p = clamp01(t);
  const f = parseInt(from.slice(1), 16);
  const tc = parseInt(to.slice(1), 16);
  const r = Math.round(lerp((f >> 16) & 255, (tc >> 16) & 255, p));
  const g = Math.round(lerp((f >> 8) & 255, (tc >> 8) & 255, p));
  const b = Math.round(lerp(f & 255, tc & 255, p));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Deterministic "time passage" flicker — a handful of brief dimming pulses
 * derived purely from progress (no timers/RAF), so fast-scrolling never
 * desyncs it and it reproduces identically every time.
 */
export function declineFlicker(progressInBeat: number): number {
  const t = clamp01(progressInBeat);
  const wave =
    Math.max(0, Math.sin(t * Math.PI * 7.3)) * 0.5 +
    Math.max(0, Math.sin(t * Math.PI * 3.1 + 1.4)) * 0.5;
  const pulse = Math.pow(wave, 6);
  return clamp01(pulse) * 0.14;
}
