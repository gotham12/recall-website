/** Brain-decline hero — tissue zoom → dim → tumor growth → resolve. */

export const HEALTHY_PALETTE = {
  base: '#C9A98C',
  shadow: '#9C7B63',
  highlight: '#E8D2B8',
} as const;

export const DECLINE_PALETTE = {
  base: '#6E6E73',
  shadow: '#48484D',
  highlight: '#85858B',
} as const;

export const TUMOR_PALETTE = {
  core: '#1A1B22',
  edge: '#8B3D52',
  pulse: '#C45C6A',
} as const;

export const RESOLUTION_GLOW = {
  amber: '#F5A623',
  coral: '#FF6B4A',
  rose: '#E8437A',
  violet: '#9B6EDB',
} as const;

/** Tissue focus — posterior right hemisphere where tumor emerges. */
export const TISSUE_FOCUS = {
  cx: 0.6,
  cy: 0.52,
} as const;

/**
 * Beat map (0–1). No wide establishing shot: p=0 is already cropped tissue.
 */
export const BEATS = {
  tissueZoomEnd: 0.3,
  darkenEnd: 0.52,
  tumorGrowEnd: 0.78,
  resolveEnd: 1,
} as const;

/** Shared thresholds for copy reveal, bloom, and SVG resolve. */
export const RESOLVE = {
  copyTagline: BEATS.tumorGrowEnd - 0.06,
  copyHeadline: BEATS.tumorGrowEnd,
  copySub: BEATS.tumorGrowEnd + 0.06,
  copyCta: BEATS.tumorGrowEnd + 0.12,
  sceneFade: BEATS.tumorGrowEnd + 0.04,
  bloomStart: BEATS.darkenEnd,
  bloomPeak: BEATS.tumorGrowEnd,
  staticFrame: BEATS.tumorGrowEnd - 0.02,
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

export function lerpColor(from: string, to: string, t: number): string {
  const p = clamp01(t);
  const f = parseInt(from.slice(1), 16);
  const tc = parseInt(to.slice(1), 16);
  const r = Math.round(lerp((f >> 16) & 255, (tc >> 16) & 255, p));
  const g = Math.round(lerp((f >> 8) & 255, (tc >> 8) & 255, p));
  const b = Math.round(lerp(f & 255, tc & 255, p));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function declineFlicker(progressInBeat: number): number {
  const t = clamp01(progressInBeat);
  const wave =
    Math.max(0, Math.sin(t * Math.PI * 7.3)) * 0.5 +
    Math.max(0, Math.sin(t * Math.PI * 3.1 + 1.4)) * 0.5;
  return clamp01(Math.pow(wave, 6)) * 0.1;
}
