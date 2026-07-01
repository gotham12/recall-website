'use client';

import {
  BEATS,
  PROFILE_FOCUS,
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

/** Engraved side profile — white line art matching brain-diagram style. */
function ProfileSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 520"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Shoulders */}
      <path
        d="M 40 430 C 90 390 130 360 155 330 L 168 298"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 360 430 C 310 390 270 360 245 330 L 232 298"
        stroke="white"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path d="M 155 330 C 200 348 200 348 245 330" stroke="white" strokeWidth="1.1" opacity="0.4" />

      {/* Neck */}
      <path
        d="M 168 298 C 178 278 188 258 192 238"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.65"
      />
      <path
        d="M 232 298 C 222 278 212 258 208 238"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.65"
      />

      {/* Head — profile facing right */}
      <path
        d="M 192 238
           C 182 218 182 192 192 168
           C 202 144 224 124 254 112
           C 284 100 312 108 328 128
           C 342 146 346 170 338 192
           C 330 214 310 230 286 238
           C 268 244 252 248 238 254
           C 222 262 210 274 202 288
           C 196 300 192 314 190 328
           C 188 344 182 358 172 366
           C 162 374 148 372 142 360
           C 136 348 140 332 148 318
           C 156 304 168 292 178 282
           C 186 274 190 262 192 250
           C 194 244 194 240 192 238 Z"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Ear */}
      <path
        d="M 178 282 C 168 292 162 306 164 320 C 166 332 174 336 182 328"
        stroke="white"
        strokeWidth="1"
        opacity="0.65"
      />

      {/* Brow & nose */}
      <path d="M 328 128 C 338 140 342 156 336 172" stroke="white" strokeWidth="1.1" opacity="0.7" />
      <path d="M 254 112 C 276 106 298 114 312 128" stroke="white" strokeWidth="1" opacity="0.55" />

      {/* Cranial cross-hatch */}
      <path d="M 228 134 Q 262 128 296 142" stroke="white" strokeWidth="0.75" opacity="0.32" />
      <path d="M 220 162 Q 258 156 298 168" stroke="white" strokeWidth="0.75" opacity="0.32" />
      <path d="M 214 190 Q 252 184 290 196" stroke="white" strokeWidth="0.75" opacity="0.32" />
      <path d="M 210 218 Q 246 212 282 222" stroke="white" strokeWidth="0.75" opacity="0.32" />
      <path d="M 238 124 L 244 226" stroke="white" strokeWidth="0.55" opacity="0.22" />
      <path d="M 268 118 L 272 228" stroke="white" strokeWidth="0.55" opacity="0.22" />
      <path d="M 298 126 L 298 232" stroke="white" strokeWidth="0.55" opacity="0.22" />

      {/* Faint brain outline beneath skull */}
      <path
        d="M 232 168 C 252 158 278 160 294 176 C 304 188 302 206 288 218 C 270 232 244 230 228 216 C 216 204 218 186 228 174 C 230 170 232 168 232 168 Z"
        stroke="white"
        strokeWidth="0.85"
        opacity="0.25"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

/** Cinematic zoom: side profile → brain diagram → tissue → tumor. */
export const BrainDeclineSvg = forwardRef<HTMLDivElement, BrainDeclineSvgProps>(function BrainDeclineSvg(
  { progress, staticFrame = false, mobile = false, className, size = 580 },
  ref
) {
  const p = staticFrame ? RESOLVE.staticFrame : clamp01(progress);
  const zoomEase = gsap.parseEase('power2.inOut');
  const enterEase = gsap.parseEase('power3.inOut');
  const tumorEase = gsap.parseEase('power2.out');

  const profileT = staticFrame ? 0 : localProgress(p, 0, BEATS.profileEnd);
  const brainEnterT = staticFrame ? 1 : localProgress(p, BEATS.profileEnd, BEATS.brainEnterEnd);
  const tissueT = staticFrame ? 1 : localProgress(p, BEATS.brainEnterEnd, BEATS.tissueZoomEnd);
  const tumorBeatT = staticFrame ? 1 : localProgress(p, BEATS.tissueZoomEnd, BEATS.tumorGrowEnd);

  // —— Profile shot: full figure, then zoom toward temple ——
  const profileScale = lerp(1, mobile ? 2.4 : 2.8, zoomEase(profileT + brainEnterT * 0.55));
  const profileOpacity =
    staticFrame ? 0 : p < BEATS.profileEnd ? 1 : lerp(1, 0, enterEase(brainEnterT));

  // —— Brain diagram: crossfade in during skull zoom, then keep zooming ——
  const brainFadeIn = staticFrame ? 1 : enterEase(localProgress(p, BEATS.profileEnd * 0.55, BEATS.brainEnterEnd));
  const brainScaleAtEnter = mobile ? 2.4 : 2.8;
  let brainScale = brainScaleAtEnter;
  if (p <= BEATS.brainEnterEnd) {
    brainScale = lerp(brainScaleAtEnter, mobile ? 1.05 : 1.0, enterEase(brainEnterT));
  } else if (p <= BEATS.tissueZoomEnd) {
    brainScale = lerp(mobile ? 1.05 : 1.0, mobile ? 2.6 : 3.0, zoomEase(tissueT));
  } else if (p <= BEATS.tumorGrowEnd) {
    brainScale = lerp(mobile ? 2.6 : 3.0, mobile ? 4.2 : 4.8, zoomEase(tumorBeatT));
  } else {
    brainScale = mobile ? 4.2 : 4.8;
  }

  // Transform origin shifts: temple → brain center → tissue focus
  let originX: number = PROFILE_FOCUS.cx;
  let originY: number = PROFILE_FOCUS.cy;
  if (p > BEATS.brainEnterEnd * 0.85) {
    const handoff = clamp01((p - BEATS.brainEnterEnd * 0.85) / (BEATS.tissueZoomEnd - BEATS.brainEnterEnd * 0.85));
    originX = lerp(0.5, TISSUE_FOCUS.cx, handoff);
    originY = lerp(0.48, TISSUE_FOCUS.cy, handoff);
  } else if (p > BEATS.profileEnd) {
    const handoff = enterEase(brainEnterT);
    originX = lerp(PROFILE_FOCUS.cx, 0.5, handoff);
    originY = lerp(PROFILE_FOCUS.cy, 0.48, handoff);
  }

  const declineT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.tissueZoomEnd, BEATS.tumorGrowEnd));
  const inDarken = p > BEATS.tissueZoomEnd && p < BEATS.tumorGrowEnd;
  const flicker =
    inDarken && !staticFrame ? declineFlicker(localProgress(p, BEATS.tissueZoomEnd, BEATS.tumorGrowEnd)) : 0;

  const tumorT = staticFrame ? 1 : clamp01(localProgress(p, BEATS.tissueZoomEnd * 0.65, BEATS.tumorGrowEnd));
  const tumorOpacity = tumorEase(tumorT);
  const tumorScale = lerp(0.05, 1.2, tumorEase(tumorT));

  const healthySat = lerp(100, 18, declineT);
  const healthyBright = lerp(1, 0.48, declineT);
  const declineOpacity = lerp(0, 1, declineT);

  const resolveT = staticFrame ? 0 : clamp01(localProgress(p, RESOLVE.sceneFade, BEATS.resolveEnd));
  const sceneOpacity = lerp(1, 0, resolveT);
  const glowT = staticFrame ? 0 : clamp01(localProgress(p, RESOLVE.bloomStart, RESOLVE.bloomPeak));
  const glowOpacity = glowT * 0.65;

  const focusX = TISSUE_FOCUS.cx * 100;
  const focusY = TISSUE_FOCUS.cy * 100;
  const originPct = `${originX * 100}% ${originY * 100}%`;

  const vignetteStyle = {
    WebkitMaskImage: 'radial-gradient(circle at center, black 62%, transparent 88%)',
    maskImage: 'radial-gradient(circle at center, black 62%, transparent 88%)',
  } as const;

  return (
    <div
      ref={ref}
      className={cn('relative select-none', className)}
      style={{ width: size, height: size * 1.08, opacity: sceneOpacity }}
      aria-hidden
    >
      {glowOpacity > 0 && (
        <div
          className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: size * 1.2,
            height: size * 1.2,
            opacity: glowOpacity,
            background: `radial-gradient(circle, ${RESOLUTION_GLOW.amber}55 0%, ${RESOLUTION_GLOW.rose}33 45%, transparent 72%)`,
            filter: 'blur(36px)',
          }}
        />
      )}

      <div className="absolute inset-0 overflow-hidden" style={vignetteStyle}>
        {/* Beat 1–2: side profile, zooming into skull */}
        {profileOpacity > 0.01 && (
          <div
            className="absolute inset-x-0 top-0 will-change-transform"
            style={{
              height: '92%',
              opacity: profileOpacity,
              transform: `scale(${profileScale})`,
              transformOrigin: originPct,
            }}
          >
            <ProfileSilhouette />
          </div>
        )}

        {/* Beat 2–4: engraved brain diagram, progressive zoom */}
        {brainFadeIn > 0.01 && (
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              opacity: brainFadeIn,
              transform: `scale(${brainScale})`,
              transformOrigin: originPct,
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
        )}

        {/* Beat 4: growing tumor at tissue focus */}
        {tumorOpacity > 0.01 && (
          <div
            className="pointer-events-none absolute will-change-transform"
            style={{
              left: `${focusX}%`,
              top: `${focusY}%`,
              width: mobile ? size * 0.2 : size * 0.24,
              height: mobile ? size * 0.2 : size * 0.24,
              transform: `translate(-50%, -50%) scale(${tumorScale})`,
              opacity: tumorOpacity * brainFadeIn,
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
        )}
      </div>
    </div>
  );
});
