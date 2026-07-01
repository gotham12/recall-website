'use client';

import { assetPath } from '@/lib/asset-path';
import {
  BEATS,
  clamp01,
  declineFlicker,
  lerp,
  localProgress,
} from '@/lib/brain-palette';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

const BRAIN_HEALTHY_SRC = '/screenshots/brain-diagram-healthy.png';
const BRAIN_TUMOR_SRC = '/screenshots/brain-diagram-decline.png';

type BrainDeclineSvgProps = {
  progress: number;
  /** True for reduced-motion: renders a static already-darkened frame. */
  staticFrame?: boolean;
  mobile?: boolean;
  className?: string;
  size?: number;
};

/**
 * Hyperrealistic brain decline sequence — four beats driven by scroll progress.
 *
 * Layers (bottom → top):
 *   1. Healthy brain photo  — always present; CSS filter lerps to grey in beat 3.
 *   2. Tumor brain photo    — crossfades in during beats 3–4.
 *   3. Flicker overlay      — sparse deterministic dimming pulses in beat 3.
 *   4. Resolve glow         — warm radial gradient crossfades in during beat 4 resolve.
 *
 * Camera push is achieved by scaling the wrapper — only transform/opacity/filter
 * are animated; no layout properties touch the DOM.
 *
 * mix-blend-mode: lighten eliminates the square PNG matte — black photo background
 * becomes transparent against the near-black site bg (#020408).
 */
export function BrainDeclineSvg({
  progress,
  staticFrame = false,
  mobile = false,
  className,
  size = 480,
}: BrainDeclineSvgProps) {
  const p = staticFrame ? 0.85 : clamp01(progress);
  const zoomEase = gsap.parseEase('back.out(1.4)');
  const tumorEase = gsap.parseEase('power2.out');

  /* ── Camera scale (zoom push) ──────────────────────────── */
  let scale: number;
  const maxScale = mobile ? 1.85 : 2.6;

  if (staticFrame) {
    scale = 1.0;
  } else if (p <= BEATS.establishingEnd) {
    scale = mobile ? 0.36 : 0.32;
  } else if (p <= BEATS.zoomEnd) {
    const t = zoomEase(localProgress(p, BEATS.establishingEnd, BEATS.zoomEnd));
    scale = lerp(mobile ? 0.36 : 0.32, mobile ? 0.9 : 1.05, t);
  } else if (p <= BEATS.darkenEnd) {
    const t = localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd);
    scale = lerp(mobile ? 0.9 : 1.05, mobile ? 1.1 : 1.3, t);
  } else if (p <= BEATS.tumorFillEnd) {
    const t = localProgress(p, BEATS.darkenEnd, BEATS.tumorFillEnd);
    scale = lerp(mobile ? 1.1 : 1.3, mobile ? 1.5 : 1.9, t);
  } else {
    const t = localProgress(p, BEATS.tumorFillEnd, BEATS.resolveEnd);
    scale = lerp(mobile ? 1.5 : 1.9, maxScale, t);
  }

  /* ── Healthy brain CSS filter (desaturation in beat 3) ── */
  const declineT = staticFrame
    ? 1
    : clamp01(localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd));
  const saturate = lerp(1, 0.12, declineT);
  const brightness = lerp(1, 0.55, declineT);
  const contrast = lerp(1, 1.08, declineT);
  const healthyFilter = `saturate(${saturate.toFixed(3)}) brightness(${brightness.toFixed(3)}) contrast(${contrast.toFixed(3)})`;

  /* ── Tumor layer opacity ─────────────────────────────── */
  const tumorT = staticFrame
    ? 1
    : clamp01(localProgress(p, BEATS.darkenEnd - 0.06, BEATS.tumorFillEnd));
  const tumorOpacity = tumorEase(tumorT) * (staticFrame ? 0.95 : 0.92);

  /* ── Time-passage flicker (beat 3 only) ─────────────── */
  const flickerBeatT = staticFrame
    ? 0
    : localProgress(p, BEATS.zoomEnd, BEATS.darkenEnd);
  const inBeat3 = p > BEATS.zoomEnd && p < BEATS.darkenEnd;
  const flicker = inBeat3 && !staticFrame ? declineFlicker(flickerBeatT) : 0;

  /* ── Whole-scene fade-out (beat 4 → resolve) ─────────── */
  const resolveT = staticFrame
    ? 0
    : clamp01(localProgress(p, 0.86, BEATS.resolveEnd));
  const sceneOpacity = lerp(1, 0, clamp01((resolveT - 0.2) / 0.8));

  /* ── Resolve warm glow ───────────────────────────────── */
  const glowOpacity = staticFrame ? 0 : clamp01(localProgress(p, 0.8, BEATS.tumorFillEnd)) * 0.65;

  /* mix-blend-mode: screen makes the black photo background fully transparent
     against the dark site bg while white diagram lines show through perfectly. */
  const imgStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    mixBlendMode: 'screen',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <div
      className={cn('relative select-none', className)}
      style={{ width: size, height: size, opacity: sceneOpacity }}
      aria-hidden
    >
      {/* Camera push wrapper — only scale changes, no layout */}
      <div
        className="brain-decline-svg absolute inset-0"
        style={{
          transform: `scale(${scale.toFixed(4)})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Layer 1: Healthy brain — color→grey via CSS filter */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(BRAIN_HEALTHY_SRC)}
          alt=""
          style={{ ...imgStyle, filter: healthyFilter }}
          loading="eager"
          decoding="async"
        />

        {/* Layer 2: Tumor brain — fades in during beats 3–4 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetPath(BRAIN_TUMOR_SRC)}
          alt=""
          style={{ ...imgStyle, opacity: tumorOpacity, mixBlendMode: 'lighten' }}
          loading="eager"
          decoding="async"
        />

        {/* Layer 3: Flicker — sparse deterministic time-passage pulse */}
        {flicker > 0.005 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000000',
              opacity: flicker,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Layer 4: Warm glow bridge — glows amber/rose in the transition zone */}
        {glowOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(245,166,35,0.4) 0%, rgba(232,67,122,0.22) 35%, rgba(155,110,219,0.12) 60%, transparent 80%)',
              filter: 'blur(32px)',
              opacity: glowOpacity,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
}
