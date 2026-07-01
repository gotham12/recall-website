/** Brain-decline hero — profile → brain → tissue → tumor → resolve. */

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

/** Skull / temple — where profile zoom lands before brain diagram appears. */
export const PROFILE_FOCUS = {
  cx: 0.72,
  cy: 0.24,
} as const;

/** Lower-right hemisphere — decay cluster in brain-diagram-decline.png. */
export const TISSUE_FOCUS = {
  cx: 0.68,
  cy: 0.62,
} as const;

/**
 * Beat map (0–1).
 * 1. Full side profile
 * 2. Zoom into skull → brain diagram
 * 3. Zoom into tissue
 * 4. Tumor growth + decline
 * 5. Resolve to copy
 */
export const BEATS = {
  profileEnd: 0.18,
  brainEnterEnd: 0.38,
  tissueZoomEnd: 0.58,
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
  bloomStart: BEATS.tissueZoomEnd,
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
  return clamp01(Math.pow(wave, 6)) * 0.05;
}
