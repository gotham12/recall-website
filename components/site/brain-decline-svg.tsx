'use client';

import {
  BEATS,
  DECLINE_PALETTE,
  HEALTHY_PALETTE,
  RESOLUTION_GLOW,
  TUMOR_PALETTE,
  clamp01,
  declineFlicker,
  lerp,
  lerpColor,
  localProgress,
} from '@/lib/brain-palette';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { forwardRef, useId, useMemo } from 'react';

/** Stylized, respectful brain silhouette — two lobes joined by a subtle central fissure. */
function brainOutlinePath(s: number): string {
  return `M ${s * 0.5} ${s * 0.17}
    C ${s * 0.28} ${s * 0.15} ${s * 0.1} ${s * 0.27} ${s * 0.09} ${s * 0.45}
    C ${s * 0.08} ${s * 0.58} ${s * 0.14} ${s * 0.68} ${s * 0.24} ${s * 0.74}
    C ${s * 0.22} ${s * 0.8} ${s * 0.28} ${s * 0.85} ${s * 0.36} ${s * 0.84}
    C ${s * 0.42} ${s * 0.86} ${s * 0.46} ${s * 0.82} ${s * 0.5} ${s * 0.78}
    C ${s * 0.54} ${s * 0.82} ${s * 0.58} ${s * 0.86} ${s * 0.64} ${s * 0.84}
    C ${s * 0.72} ${s * 0.85} ${s * 0.78} ${s * 0.8} ${s * 0.76} ${s * 0.74}
    C ${s * 0.86} ${s * 0.68} ${s * 0.92} ${s * 0.58} ${s * 0.91} ${s * 0.45}
    C ${s * 0.9} ${s * 0.27} ${s * 0.72} ${s * 0.15} ${s * 0.5} ${s * 0.17} Z`;
}

/** Gyri/sulci suggestion — a few soft curved strokes, not literal detail. */
function foldStrokes(s: number): string[] {
  return [
    `M ${s * 0.18} ${s * 0.36} Q ${s * 0.3} ${s * 0.3} ${s * 0.4} ${s * 0.37} Q ${s * 0.3} ${s * 0.42} ${s * 0.18} ${s * 0.36} Z`,
    `M ${s * 0.6} ${s * 0.32} Q ${s * 0.72} ${s * 0.28} ${s * 0.82} ${s * 0.38} Q ${s * 0.7} ${s * 0.4} ${s * 0.6} ${s * 0.32} Z`,
    `M ${s * 0.22} ${s * 0.55} Q ${s * 0.32} ${s * 0.5} ${s * 0.42} ${s * 0.58} Q ${s * 0.32} ${s * 0.62} ${s * 0.22} ${s * 0.55} Z`,
    `M ${s * 0.58} ${s * 0.56} Q ${s * 0.68} ${s * 0.5} ${s * 0.8} ${s * 0.6} Q ${s * 0.68} ${s * 0.64} ${s * 0.58} ${s * 0.56} Z`,
    `M ${s * 0.5} ${s * 0.2} L ${s * 0.5} ${s * 0.76}`,
  ];
}

/** Soft, irregular, heavily blurred — a shadow within the tissue, not a defined object. */
function tumorPath(s: number, cx: number, cy: number, r: number): string {
  return `M ${cx} ${cy - r}
    C ${cx + r * 0.7} ${cy - r * 0.75} ${cx + r * 1.05} ${cy - r * 0.1} ${cx + r * 0.8} ${cy + r * 0.5}
    C ${cx + r * 0.55} ${cy + r * 1.0} ${cx - r * 0.5} ${cy + r * 0.95} ${cx - r * 0.85} ${cy + r * 0.35}
    C ${cx - r * 1.05} ${cy - r * 0.15} ${cx - r * 0.55} ${cy - r * 0.7} ${cx} ${cy - r} Z`;
}

type BrainDeclineSvgProps = {
  progress: number;
  staticFrame?: boolean;
  mobile?: boolean;
  className?: string;
  size?: number;
};

export const BrainDeclineSvg = forwardRef<SVGSVGElement, BrainDeclineSvgProps>(function BrainDeclineSvg(
  { progress, staticFrame = false, mobile = false, className, size = 460 },
  ref
) {
  const uid = useId().replace(/:/g, '');
  const s = 400;
  const cx = s / 2;
  const cy = s / 2;
  const p = staticFrame ? 0.82 : clamp01(progress);

  const folds = useMemo(() => foldStrokes(s), []);
  const outline = useMemo(() => brainOutlinePath(s), []);

  /** Camera push: ease-in, slight overshoot, settle — driven purely by progress, no timers. */
  const zoomEase = gsap.parseEase('back.out(1.5)');

  let scale: number;
  let opacity = 1;

  if (staticFrame) {
    scale = 1.05;
  } else if (p < BEATS.establishingEnd) {
    scale = 0.4;
  } else if (p < BEATS.zoomEnd) {
    const t = localProgress(p, BEATS.establishingEnd, BEATS.zoomEnd);
    scale = lerp(0.4, mobile ? 1.0 : 1.15, zoomEase(t));
  } else if (p < BEATS.darkenEnd) {
    const t = localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd);
    scale = lerp(mobile ? 1.0 : 1.15, mobile ? 1.15 : 1.3, t);
  } else if (p < BEATS.tumorFillEnd) {
    const t = localProgress(p, BEATS.darkenEnd, BEATS.tumorFillEnd);
    scale = lerp(mobile ? 1.15 : 1.3, mobile ? 1.45 : 1.7, t);
  } else {
    const t = localProgress(p, BEATS.tumorFillEnd, BEATS.resolveEnd);
    scale = lerp(mobile ? 1.45 : 1.7, mobile ? 1.9 : 2.3, t);
    opacity = lerp(1, 0, clamp01((t - 0.35) / 0.65));
  }

  /** Beat 3: healthy → grey. Holds grey through beat 4. */
  const declineT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd));
  const baseFill = lerpColor(HEALTHY_PALETTE.base, DECLINE_PALETTE.base, declineT);
  const shadowFill = lerpColor(HEALTHY_PALETTE.shadow, DECLINE_PALETTE.shadow, declineT);
  const highlightOpacity = lerp(0.55, 0.18, declineT);

  /** Time-passage flicker — sparse, deterministic, scroll-bound (beat 3 only). */
  const flickerT = staticFrame ? 0 : localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd);
  const flicker = staticFrame ? 0 : declineFlicker(flickerT) * (p > BEATS.zoomEnd && p < BEATS.darkenEnd ? 1 : 0);

  /** Beat 4: tumor mass grows, then the whole frame expands and crossfades into hero content. */
  const tumorT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.darkenEnd, BEATS.tumorFillEnd));
  const tumorOpacity = lerp(0, 0.62, tumorT);
  const tumorScale = lerp(0.15, 1, gsap.parseEase('power2.out')(tumorT));

  const resolveT = staticFrame ? 0 : clamp01(localProgress(p, 0.88, BEATS.resolveEnd));

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <div
        className="brain-decline-svg pointer-events-none relative h-full w-full"
        style={{ transform: `scale(${scale})`, opacity, transformOrigin: '50% 50%' }}
      >
        <svg viewBox={`0 0 ${s} ${s}`} width="100%" height="100%" className="overflow-visible" aria-hidden ref={ref}>
          <defs>
            <radialGradient id={`${uid}-light`} cx="42%" cy="32%" r="60%">
              <stop offset="0%" stopColor={HEALTHY_PALETTE.highlight} stopOpacity={highlightOpacity} />
              <stop offset="100%" stopColor={baseFill} stopOpacity={0} />
            </radialGradient>
            <filter id={`${uid}-tumor-blur`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation={mobile ? 7 : 9} />
            </filter>
            <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={1.4} />
            </filter>
            <clipPath id={`${uid}-clip`}>
              <path d={outline} />
            </clipPath>
          </defs>

          {/* Base brain shape */}
          <path d={outline} fill={shadowFill} />
          <path d={outline} fill={baseFill} opacity={0.92} filter={`url(#${uid}-soft)`} />
          <path d={outline} fill={`url(#${uid}-light)`} />

          {/* Gyri/sulci suggestion — clipped within the silhouette, never literal */}
          <g clipPath={`url(#${uid}-clip)`} opacity={lerp(0.5, 0.22, declineT)}>
            {folds.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={shadowFill} strokeWidth={1.6} strokeLinecap="round" />
            ))}
          </g>

          {/* Tumor mass — soft, blurred, capped opacity. A shadow, not a wound. */}
          <g
            clipPath={`url(#${uid}-clip)`}
            opacity={tumorOpacity}
            transform={`translate(${s * 0.6} ${s * 0.5}) scale(${tumorScale}) translate(${-s * 0.6} ${-s * 0.5})`}
          >
            <path
              d={tumorPath(s, s * 0.6, s * 0.5, s * 0.16)}
              fill={TUMOR_PALETTE.core}
              filter={`url(#${uid}-tumor-blur)`}
            />
            <path
              d={tumorPath(s, s * 0.6, s * 0.5, s * 0.1)}
              fill={TUMOR_PALETTE.edge}
              opacity={0.5}
              filter={`url(#${uid}-tumor-blur)`}
            />
          </g>

          {/* Sparse dimming pulse — duration cue for "years passing", not a single snap */}
          {flicker > 0 && <rect x={0} y={0} width={s} height={s} fill="#000000" opacity={flicker} />}
        </svg>
      </div>

      {/* Beat 4 resolution — warm glow bridges directly into the site's hero content */}
      {!staticFrame && resolveT > 0 && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            opacity: resolveT,
            background: `radial-gradient(circle, ${RESOLUTION_GLOW.amber}66 0%, ${RESOLUTION_GLOW.rose}3a 35%, ${RESOLUTION_GLOW.violet}22 58%, transparent 75%)`,
            filter: 'blur(40px)',
          }}
        />
      )}
    </div>
  );
});
