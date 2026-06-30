/** Recall bloom palette — grey memory returning to warm life. */
export const BLOOM_PALETTE = {
  /** Warm coral — life re-entering */
  coral: '#FF6B4A',
  /** Golden amber — memory warmth */
  amber: '#F5A623',
  /** Deep rose — emotional core */
  rose: '#E8437A',
  /** Soft violet — clarity & dignity */
  violet: '#9B6EDB',
  /** Blush — gentle return */
  blush: '#FDA4AF',
  /** Center stamen gold */
  stamen: '#FBBF24',
} as const;

export const BUD_PALETTE = {
  grey: '#6B7280',
  greyLight: '#9CA3AF',
  greyDark: '#374151',
  sepal: '#4B5563',
} as const;

export const PETAL_BLOOM_COLORS = [
  BLOOM_PALETTE.coral,
  BLOOM_PALETTE.amber,
  BLOOM_PALETTE.rose,
  BLOOM_PALETTE.violet,
  BLOOM_PALETTE.blush,
] as const;

/** Ease-out with slight overshoot for petal unfurl */
export function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

export function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Interpolate hex colors (simple RGB lerp) */
export function lerpColor(from: string, to: string, t: number): string {
  const p = clamp01(t);
  const f = parseInt(from.slice(1), 16);
  const tc = parseInt(to.slice(1), 16);
  const r = Math.round(lerp((f >> 16) & 255, (tc >> 16) & 255, p));
  const g = Math.round(lerp((f >> 8) & 255, (tc >> 8) & 255, p));
  const b = Math.round(lerp(f & 255, tc & 255, p));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function petalLocalProgress(global: number, bloomAt: number): number {
  return clamp01((global - bloomAt * 0.42) / (1 - bloomAt * 0.42 + 0.05));
}
