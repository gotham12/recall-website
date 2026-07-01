'use client';

import {
  BEATS,
  DECLINE_PALETTE,
  HEALTHY_PALETTE,
  RESOLVE,
  RESOLUTION_GLOW,
  TISSUE_FOCUS,
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

const S = 400;
const FOCUS_X = S * TISSUE_FOCUS.cx;
const FOCUS_Y = S * TISSUE_FOCUS.cy;

function brainOutlinePath(): string {
  return `M ${S * 0.5} ${S * 0.17}
    C ${S * 0.28} ${S * 0.15} ${S * 0.1} ${S * 0.27} ${S * 0.09} ${S * 0.45}
    C ${S * 0.08} ${S * 0.58} ${S * 0.14} ${S * 0.68} ${S * 0.24} ${S * 0.74}
    C ${S * 0.22} ${S * 0.8} ${S * 0.28} ${S * 0.85} ${S * 0.36} ${S * 0.84}
    C ${S * 0.42} ${S * 0.86} ${S * 0.46} ${S * 0.82} ${S * 0.5} ${S * 0.78}
    C ${S * 0.54} ${S * 0.82} ${S * 0.58} ${S * 0.86} ${S * 0.64} ${S * 0.84}
    C ${S * 0.72} ${S * 0.85} ${S * 0.78} ${S * 0.8} ${S * 0.76} ${S * 0.74}
    C ${S * 0.86} ${S * 0.68} ${S * 0.92} ${S * 0.58} ${S * 0.91} ${S * 0.45}
    C ${S * 0.9} ${S * 0.27} ${S * 0.72} ${S * 0.15} ${S * 0.5} ${S * 0.17} Z`;
}

function foldStrokes(): string[] {
  return [
    `M ${S * 0.18} ${S * 0.36} Q ${S * 0.3} ${S * 0.3} ${S * 0.4} ${S * 0.37} Q ${S * 0.3} ${S * 0.42} ${S * 0.18} ${S * 0.36} Z`,
    `M ${S * 0.6} ${S * 0.32} Q ${S * 0.72} ${S * 0.28} ${S * 0.82} ${S * 0.38} Q ${S * 0.7} ${S * 0.4} ${S * 0.6} ${S * 0.32} Z`,
    `M ${S * 0.22} ${S * 0.55} Q ${S * 0.32} ${S * 0.5} ${S * 0.42} ${S * 0.58} Q ${S * 0.32} ${S * 0.62} ${S * 0.22} ${S * 0.55} Z`,
    `M ${S * 0.58} ${S * 0.56} Q ${S * 0.68} ${S * 0.5} ${S * 0.8} ${S * 0.6} Q ${S * 0.68} ${S * 0.64} ${S * 0.58} ${S * 0.56} Z`,
    `M ${S * 0.5} ${S * 0.2} L ${S * 0.5} ${S * 0.76}`,
    `M ${S * 0.55} ${S * 0.48} Q ${S * 0.62} ${S * 0.44} ${S * 0.68} ${S * 0.5}`,
    `M ${S * 0.58} ${S * 0.54} Q ${S * 0.65} ${S * 0.52} ${S * 0.7} ${S * 0.58}`,
  ];
}

function tumorPath(cx: number, cy: number, r: number): string {
  return `M ${cx} ${cy - r}
    C ${cx + r * 0.65} ${cy - r * 0.7} ${cx + r * 0.95} ${cy - r * 0.05} ${cx + r * 0.75} ${cy + r * 0.45}
    C ${cx + r * 0.5} ${cy + r * 0.95} ${cx - r * 0.45} ${cy + r * 0.9} ${cx - r * 0.8} ${cy + r * 0.3}
    C ${cx - r * 0.95} ${cy - r * 0.2} ${cx - r * 0.5} ${cy - r * 0.65} ${cx} ${cy - r} Z`;
}

type BrainDeclineSvgProps = {
  progress: number;
  staticFrame?: boolean;
  mobile?: boolean;
  className?: string;
  size?: number;
};

export const BrainDeclineSvg = forwardRef<SVGSVGElement, BrainDeclineSvgProps>(function BrainDeclineSvg(
  { progress, staticFrame = false, mobile = false, className, size = 560 },
  ref
) {
  const uid = useId().replace(/:/g, '');
  const clipId = `brain-clip-${uid}`;

  const p = staticFrame ? RESOLVE.staticFrame : clamp01(progress);
  const zoomEase = gsap.parseEase('power2.inOut');
  const tumorEase = gsap.parseEase('power2.out');

  const outline = useMemo(() => brainOutlinePath(), []);
  const folds = useMemo(() => foldStrokes(), []);

  const tissueZoomT = staticFrame
    ? 1
    : p <= BEATS.tissueZoomEnd
      ? zoomEase(localProgress(p, 0, BEATS.tissueZoomEnd))
      : 1;

  const startCrop = mobile ? 108 : 98;
  const midCrop = mobile ? 88 : 78;
  const endCrop = mobile ? 62 : 52;

  let cropSize: number;
  if (p <= BEATS.tissueZoomEnd) {
    cropSize = lerp(startCrop, midCrop, tissueZoomT);
  } else if (p <= BEATS.tumorGrowEnd) {
    cropSize = midCrop;
  } else {
    cropSize = lerp(midCrop, endCrop, zoomEase(localProgress(p, BEATS.tumorGrowEnd, BEATS.resolveEnd)));
  }

  const vx = FOCUS_X - cropSize / 2;
  const vy = FOCUS_Y - cropSize / 2;

  const declineT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.tissueZoomEnd, BEATS.darkenEnd));
  const tissueFill = lerpColor(HEALTHY_PALETTE.base, DECLINE_PALETTE.base, declineT);
  const lineColor = lerpColor(HEALTHY_PALETTE.highlight, DECLINE_PALETTE.highlight, declineT);
  const lineOpacity = lerp(0.88, 0.42, declineT);
  const outlineOpacity = lerp(0.15, 0.55, tissueZoomT);

  const flickerT = staticFrame ? 0 : localProgress(p, BEATS.tissueZoomEnd, BEATS.darkenEnd);
  const inDarken = p > BEATS.tissueZoomEnd && p < BEATS.darkenEnd;
  const flicker = inDarken && !staticFrame ? declineFlicker(flickerT) : 0;

  const tumorT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.darkenEnd, BEATS.tumorGrowEnd));
  const tumorScale = lerp(0.32, 1.35, tumorEase(tumorT));
  const tumorOpacity = lerp(0.28, 0.92, tumorEase(tumorT));
  const tumorBlur = lerp(1.5, 3, tumorEase(tumorT));

  const pulseT = staticFrame ? 0 : clamp01(localProgress(p, BEATS.darkenEnd, BEATS.tumorGrowEnd));
  const tumorPulse = 1 + Math.sin(pulseT * Math.PI * 5) * 0.05 * pulseT;

  const resolveT = staticFrame ? 0 : clamp01(localProgress(p, RESOLVE.sceneFade, BEATS.resolveEnd));
  const sceneOpacity = lerp(1, 0, resolveT);
  const glowT = staticFrame ? 0 : clamp01(localProgress(p, RESOLVE.bloomStart, RESOLVE.bloomPeak));
  const glowOpacity = glowT * 0.65;

  return (
    <div
      className={cn('relative select-none overflow-hidden', className)}
      style={{ width: size, height: size, opacity: sceneOpacity }}
      aria-hidden
    >
      {glowOpacity > 0 && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 1.15,
            height: size * 1.15,
            opacity: glowOpacity,
            background: `radial-gradient(circle, ${RESOLUTION_GLOW.amber}55 0%, ${RESOLUTION_GLOW.rose}33 45%, transparent 72%)`,
            filter: 'blur(36px)',
          }}
        />
      )}

      <svg
        ref={ref}
        viewBox={`${vx} ${vy} ${cropSize} ${cropSize}`}
        width={size}
        height={size}
        className="brain-decline-svg overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={outline} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${clipId})`}>
          <path d={outline} fill={tissueFill} opacity={lerp(0.82, 0.5, declineT)} />

          {folds.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={lineColor}
              strokeWidth={i >= 5 ? 0.9 : 1.1}
              strokeLinecap="round"
              opacity={lineOpacity}
            />
          ))}

          <g
            opacity={tumorOpacity}
            transform={`translate(${FOCUS_X} ${FOCUS_Y}) scale(${tumorScale * tumorPulse}) translate(${-FOCUS_X} ${-FOCUS_Y})`}
          >
            <path
              d={tumorPath(FOCUS_X, FOCUS_Y, S * 0.11)}
              fill={TUMOR_PALETTE.core}
              style={{ filter: `blur(${tumorBlur}px)` }}
            />
            <path
              d={tumorPath(FOCUS_X, FOCUS_Y, S * 0.07)}
              fill={TUMOR_PALETTE.edge}
              opacity={0.7}
            />
          </g>

          {flicker > 0 && <rect x={0} y={0} width={S} height={S} fill="#000" opacity={flicker} />}
        </g>

        <path
          d={outline}
          fill="none"
          stroke={lineColor}
          strokeWidth={1.2}
          opacity={outlineOpacity * lineOpacity}
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </div>
  );
});
