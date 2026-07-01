'use client';

import {
  BEATS,
  RESOLVE,
  RESOLUTION_GLOW,
  TISSUE_FOCUS,
  TUMOR_PALETTE,
  clamp01,
  declineFlicker,
  lerp,
  localProgress,
} from '@/lib/brain-palette';
import { assetPath } from '@/lib/asset-path';
import { HERO_BRAIN } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { forwardRef } from 'react';

type BrainDeclineSvgProps = {
  progress: number;
  staticFrame?: boolean;
  mobile?: boolean;
  className?: string;
  size?: number;
};

/** Engraved diagram PNGs with screen blend — no black matte, radial mask (no square frame). */
export const BrainDeclineSvg = forwardRef<HTMLDivElement, BrainDeclineSvgProps>(function BrainDeclineSvg(
  { progress, staticFrame = false, mobile = false, className, size = 580 },
  ref
) {
  const p = staticFrame ? RESOLVE.staticFrame : clamp01(progress);
  const zoomEase = gsap.parseEase('power2.inOut');
  const tumorEase = gsap.parseEase('power2.out');

  const tissueZoomT =
    staticFrame || p > BEATS.tissueZoomEnd
      ? 1
      : zoomEase(localProgress(p, 0, BEATS.tissueZoomEnd));

  // Already zoomed at p=0 — no wide establishing shot
  const startScale = mobile ? 3.4 : 3.8;
  const endScale = mobile ? 5.0 : 5.6;
  const scale = lerp(startScale, endScale, tissueZoomT);

  const declineT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.tissueZoomEnd, BEATS.darkenEnd));
  const inDarken = p > BEATS.tissueZoomEnd && p < BEATS.darkenEnd;
  const flicker =
    inDarken && !staticFrame ? declineFlicker(localProgress(p, BEATS.tissueZoomEnd, BEATS.darkenEnd)) : 0;

  // Tumor grows during tissue zoom, then pulses through hold beat
  let tumorT = 0;
  if (staticFrame) {
    tumorT = 1;
  } else if (p <= BEATS.tissueZoomEnd) {
    tumorT = tumorEase(localProgress(p, 0, BEATS.tissueZoomEnd));
  } else if (p <= BEATS.tumorGrowEnd) {
    const holdT = localProgress(p, BEATS.tissueZoomEnd, BEATS.tumorGrowEnd);
    tumorT = 1 + Math.sin(holdT * Math.PI * 4) * 0.08 * holdT;
  } else {
    tumorT = 1;
  }

  const tumorOpacity = tumorEase(Math.min(tumorT, 1));
  const tumorScale = lerp(0.08, 1.25, tumorEase(Math.min(tumorT, 1)));

  const healthySat = lerp(100, 20, declineT);
  const healthyBright = lerp(1, 0.5, declineT);
  const declineOpacity = lerp(0, 1, declineT);

  const resolveT = staticFrame ? 0 : clamp01(localProgress(p, RESOLVE.sceneFade, BEATS.resolveEnd));
  const sceneOpacity = lerp(1, 0, resolveT);
  const glowT = staticFrame ? 0 : clamp01(localProgress(p, RESOLVE.bloomStart, RESOLVE.bloomPeak));
  const glowOpacity = glowT * 0.65;

  const focusX = TISSUE_FOCUS.cx * 100;
  const focusY = TISSUE_FOCUS.cy * 100;

  const maskStyle = {
    WebkitMaskImage: 'radial-gradient(circle at center, black 58%, transparent 76%)',
    maskImage: 'radial-gradient(circle at center, black 58%, transparent 76%)',
  } as const;

  return (
    <div
      ref={ref}
      className={cn('relative select-none', className)}
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
            background: `radial-gradient(circle, ${RESOLUTION_GLOW.amber}55 0%, ${RESOLUTION_GLOW.rose}33 45%, transparent 72%)`,
            filter: 'blur(36px)',
          }}
        />
      )}

      <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: `${focusX}% ${focusY}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(HERO_BRAIN.healthy)}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              mixBlendMode: 'screen',
              filter: `saturate(${healthySat}%) brightness(${healthyBright})`,
              opacity: 1 - flicker,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath(HERO_BRAIN.decline)}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              mixBlendMode: 'screen',
              opacity: declineOpacity,
            }}
          />
        </div>

        {/* Growing tumor mass at tissue focus */}
        <div
          className="pointer-events-none absolute will-change-transform"
          style={{
            left: `${focusX}%`,
            top: `${focusY}%`,
            width: mobile ? size * 0.22 : size * 0.26,
            height: mobile ? size * 0.22 : size * 0.26,
            transform: `translate(-50%, -50%) scale(${tumorScale})`,
            opacity: tumorOpacity,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${TUMOR_PALETTE.core} 0%, ${TUMOR_PALETTE.edge} 55%, transparent 78%)`,
              filter: 'blur(6px)',
            }}
          />
          <div
            className="absolute inset-[18%] rounded-full"
            style={{
              background: `radial-gradient(circle, ${TUMOR_PALETTE.pulse}88 0%, ${TUMOR_PALETTE.edge} 70%, transparent 100%)`,
              opacity: 0.75,
            }}
          />
        </div>
      </div>
    </div>
  );
});
