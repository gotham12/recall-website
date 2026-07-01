/** Brain-decline hero — tissue zoom + tumor → dim → resolve. */

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

/** Lower-right hemisphere — matches decay cluster in brain-diagram-decline.png. */
export const TISSUE_FOCUS = {
  cx: 0.68,
  cy: 0.62,
} as const;

/**
 * Beat map (0–1). p=0 is already zoomed on tissue — no wide establishing shot.
 * Tumor grows during tissueZoom; decline crossfade follows.
 */
export const BEATS = {
  tissueZoomEnd: 0.35,
  darkenEnd: 0.55,
  tumorGrowEnd: 0.82,
  resolveEnd: 1,
} as const;

/** Shared thresholds for copy reveal, bloom, and scene resolve. */
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

export function declineFlicker(progressInBeat: number): number {
  const t = clamp01(progressInBeat);
  const wave =
    Math.max(0, Math.sin(t * Math.PI * 7.3)) * 0.5 +
    Math.max(0, Math.sin(t * Math.PI * 3.1 + 1.4)) * 0.5;
  return clamp01(Math.pow(wave, 6)) * 0.06;
}
