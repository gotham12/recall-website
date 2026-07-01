'use client';

import {
  BEATS,
  clamp01,
  declineFlicker,
  lerp,
  localProgress,
} from '@/lib/brain-palette';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { forwardRef } from 'react';

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

function foldStrokes(s: number): string[] {
  return [
    `M ${s * 0.18} ${s * 0.36} Q ${s * 0.3} ${s * 0.3} ${s * 0.4} ${s * 0.37} Q ${s * 0.3} ${s * 0.42} ${s * 0.18} ${s * 0.36} Z`,
    `M ${s * 0.6} ${s * 0.32} Q ${s * 0.72} ${s * 0.28} ${s * 0.82} ${s * 0.38} Q ${s * 0.7} ${s * 0.4} ${s * 0.6} ${s * 0.32} Z`,
    `M ${s * 0.22} ${s * 0.55} Q ${s * 0.32} ${s * 0.5} ${s * 0.42} ${s * 0.58} Q ${s * 0.32} ${s * 0.62} ${s * 0.22} ${s * 0.55} Z`,
    `M ${s * 0.58} ${s * 0.56} Q ${s * 0.68} ${s * 0.5} ${s * 0.8} ${s * 0.6} Q ${s * 0.68} ${s * 0.64} ${s * 0.58} ${s * 0.56} Z`,
    `M ${s * 0.5} ${s * 0.2} L ${s * 0.5} ${s * 0.76}`,
  ];
}

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

/** Inline SVG brain diagram — no PNG matte, no black square. */
export const BrainDeclineSvg = forwardRef<SVGSVGElement, BrainDeclineSvgProps>(function BrainDeclineSvg(
  { progress, staticFrame = false, mobile = false, className, size = 520 },
  ref
) {
  const s = 400;
  const p = staticFrame ? 0.85 : clamp01(progress);
  const zoomEase = gsap.parseEase('back.out(1.35)');
  const tumorEase = gsap.parseEase('power2.out');

  let scale: number;
  const maxScale = mobile ? 1.75 : 2.2;

  if (staticFrame) {
    scale = 1.05;
  } else if (p <= BEATS.zoomEnd) {
    const t = zoomEase(localProgress(p, 0, BEATS.zoomEnd));
    scale = lerp(mobile ? 1.0 : 1.05, mobile ? 1.15 : 1.3, t);
  } else if (p <= BEATS.darkenEnd) {
    const t = localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd);
    scale = lerp(mobile ? 1.15 : 1.3, mobile ? 1.35 : 1.55, t);
  } else if (p <= BEATS.tumorFillEnd) {
    const t = localProgress(p, BEATS.darkenEnd, BEATS.tumorFillEnd);
    scale = lerp(mobile ? 1.35 : 1.55, mobile ? 1.6 : 1.85, t);
  } else {
    const t = localProgress(p, BEATS.tumorFillEnd, BEATS.resolveEnd);
    scale = lerp(mobile ? 1.6 : 1.85, maxScale, t);
  }

  const declineT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd));
  const lineOpacity = lerp(0.92, 0.38, declineT);
  const lineColor = declineT > 0.5 ? '#9CA3AF' : '#E8E4DC';

  const tumorT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.darkenEnd - 0.04, BEATS.tumorFillEnd));
  const tumorOpacity = tumorEase(tumorT) * 0.55;

  const flickerBeatT = staticFrame ? 0 : localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd);
  const inBeat3 = p > BEATS.zoomEnd && p < BEATS.darkenEnd;
  const flicker = inBeat3 && !staticFrame ? declineFlicker(flickerBeatT) : 0;

  const resolveT = staticFrame ? 0 : clamp01(localProgress(p, 0.86, BEATS.resolveEnd));
  const sceneOpacity = lerp(1, 0, clamp01((resolveT - 0.2) / 0.8));
  const glowOpacity = staticFrame ? 0 : clamp01(localProgress(p, 0.8, BEATS.tumorFillEnd)) * 0.5;

  const outline = brainOutlinePath(s);
  const folds = foldStrokes(s);

  return (
    <div
      className={cn('relative select-none overflow-visible', className)}
      style={{ width: size, height: size, opacity: sceneOpacity }}
      aria-hidden
    >
      {glowOpacity > 0 && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 1.2,
            height: size * 1.2,
            opacity: glowOpacity,
            background:
              'radial-gradient(circle, rgba(245,166,35,0.35) 0%, rgba(232,67,122,0.18) 40%, transparent 72%)',
            filter: 'blur(36px)',
          }}
        />
      )}

      <div
        className="brain-decline-svg absolute inset-0"
        style={{
          transform: `scale(${scale.toFixed(4)})`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg
          ref={ref}
          viewBox={`0 0 ${s} ${s}`}
          width="100%"
          height="100%"
          className="overflow-visible"
        >
          <defs>
            <clipPath id="brain-clip">
              <path d={outline} />
            </clipPath>
            <filter id="tumor-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={mobile ? 6 : 8} />
            </filter>
          </defs>

          <path d={outline} fill="none" stroke={lineColor} strokeWidth={1.8} opacity={lineOpacity * 0.5} />
          <path d={outline} fill="none" stroke={lineColor} strokeWidth={1.2} opacity={lineOpacity} />

          <g clipPath="url(#brain-clip)" opacity={lerp(0.55, 0.25, declineT)}>
            {folds.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={lineColor}
                strokeWidth={i === 4 ? 1.4 : 1.1}
                strokeLinecap="round"
                opacity={lineOpacity}
              />
            ))}
          </g>

          <g
            clipPath="url(#brain-clip)"
            opacity={tumorOpacity}
            transform={`translate(${s * 0.6} ${s * 0.52}) scale(${lerp(0.2, 1, tumorT)}) translate(${-s * 0.6} ${-s * 0.52})`}
          >
            <path
              d={tumorPath(s, s * 0.6, s * 0.52, s * 0.14)}
              fill="#3D3E45"
              filter="url(#tumor-soft)"
            />
          </g>

          {flicker > 0 && <rect x={0} y={0} width={s} height={s} fill="#000" opacity={flicker} />}
        </svg>
      </div>
    </div>
  );
});
