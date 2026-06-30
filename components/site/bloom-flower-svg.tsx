'use client';

import {
  BLOOM_PALETTE,
  BUD_PALETTE,
  PETAL_BLOOM_COLORS,
  clamp01,
  easeOutBack,
  lerp,
  lerpColor,
  petalLocalProgress,
} from '@/lib/bloom-palette';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { forwardRef, useId, useMemo } from 'react';

const OUTER_COUNT = 5;
const INNER_COUNT = 5;

function petalPath(width: number, height: number): string {
  const w = width / 2;
  const h = height;
  return `M 0 0
    C ${(-w * 0.42).toFixed(1)} ${(-h * 0.05).toFixed(1)} ${(-w * 0.58).toFixed(1)} ${(-h * 0.38).toFixed(1)} ${(-w * 0.45).toFixed(1)} ${(-h * 0.72).toFixed(1)}
    Q ${(-w * 0.18).toFixed(1)} ${(-h * 0.96).toFixed(1)} 0 ${(-h).toFixed(1)}
    Q ${(w * 0.18).toFixed(1)} ${(-h * 0.96).toFixed(1)} ${(w * 0.45).toFixed(1)} ${(-h * 0.72).toFixed(1)}
    C ${(w * 0.58).toFixed(1)} ${(-h * 0.38).toFixed(1)} ${(w * 0.42).toFixed(1)} ${(-h * 0.05).toFixed(1)} 0 0 Z`;
}

type BloomFlowerSvgProps = {
  progress: number;
  idle?: boolean;
  reducedMotion?: boolean;
  className?: string;
  size?: number;
  mobile?: boolean;
};

export const BloomFlowerSvg = forwardRef<SVGSVGElement, BloomFlowerSvgProps>(function BloomFlowerSvg(
  { progress, idle = false, reducedMotion = false, className, size = 400, mobile = false },
  ref
) {
  const uid = useId().replace(/:/g, '');
  const cx = size / 2;
  const cy = size * 0.44;
  const p = reducedMotion ? 1 : clamp01(progress);

  const glowOpacity = lerp(0, mobile ? 0.5 : 0.85, clamp01((p - 0.15) / 0.75));
  const bgLight = lerp(0, mobile ? 0.4 : 0.65, clamp01((p - 0.1) / 0.85));
  const breathe = idle && !reducedMotion;

  const outerPetals = useMemo(
    () =>
      Array.from({ length: OUTER_COUNT }, (_, i) => ({
        angle: (360 / OUTER_COUNT) * i - 90,
        bloomAt: 0.04 + i * 0.055,
        color: PETAL_BLOOM_COLORS[i % PETAL_BLOOM_COLORS.length],
        w: size * 0.19,
        h: size * 0.28,
      })),
    [size]
  );

  const innerPetals = useMemo(
    () =>
      Array.from({ length: INNER_COUNT }, (_, i) => ({
        angle: (360 / INNER_COUNT) * i - 90 + 36,
        bloomAt: 0.12 + i * 0.045,
        color: PETAL_BLOOM_COLORS[(i + 2) % PETAL_BLOOM_COLORS.length],
        w: size * 0.13,
        h: size * 0.19,
      })),
    [size]
  );

  const particleCount = mobile ? 4 : 9;

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          opacity: bgLight,
          background: `radial-gradient(circle, ${BLOOM_PALETTE.amber}55 0%, ${BLOOM_PALETTE.rose}35 30%, ${BLOOM_PALETTE.violet}20 55%, transparent 70%)`,
          filter: mobile ? 'blur(32px)' : 'blur(56px)',
        }}
      />

      <motion.svg
        ref={ref}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="flower-bloom-svg relative overflow-visible"
        aria-hidden
        animate={
          p < 0.06 && !reducedMotion
            ? { scale: [1, 1.016, 1] }
            : breathe
              ? { rotate: [0, 1.2, 0, -1.2, 0], scale: [1, 1.012, 1] }
              : reducedMotion
                ? { scale: [1, 1.008, 1] }
                : undefined
        }
        transition={
          p < 0.06 && !reducedMotion
            ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
            : breathe
              ? { duration: 9, repeat: Infinity, ease: 'easeInOut' }
              : reducedMotion
                ? { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                : undefined
        }
        style={{
          transformOrigin: `${cx}px ${cy}px`,
        }}
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="44%" r="50%">
            <stop offset="0%" stopColor={BLOOM_PALETTE.amber} stopOpacity={1} />
            <stop offset="45%" stopColor={BLOOM_PALETTE.rose} stopOpacity={0.7} />
            <stop offset="100%" stopColor={BLOOM_PALETTE.violet} stopOpacity={0} />
          </radialGradient>
          <filter id={`${uid}-soft`} x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse
          cx={cx}
          cy={cy}
          rx={size * 0.24}
          ry={size * 0.2}
          fill={`url(#${uid}-glow)`}
          opacity={glowOpacity}
          className={breathe ? 'flower-glow-pulse' : undefined}
        />

        <path
          d={`M ${cx} ${cy + size * 0.12} Q ${cx - 3} ${cy + size * 0.28} ${cx} ${size - 12}`}
          fill="none"
          stroke={lerpColor(BUD_PALETTE.sepal, '#166534', p)}
          strokeWidth={size * 0.008}
          strokeLinecap="round"
          opacity={lerp(0.45, 0.92, p)}
        />

        {[0, 72, 144, 216, 288].map((angle) => {
          const sepalP = clamp01(1 - p * 2.2);
          return (
            <g key={`sepal-${angle}`} transform={`translate(${cx} ${cy}) rotate(${angle})`} opacity={sepalP}>
              <path
                d="M 0 0 C -6 -3 -12 -22 -8 -36 C -3 -42 3 -42 8 -36 C 12 -22 6 -3 0 0 Z"
                fill={lerpColor(BUD_PALETTE.sepal, BUD_PALETTE.greyDark, 1 - sepalP)}
              />
            </g>
          );
        })}

        {outerPetals.map((petal, i) => {
          const local = easeOutBack(petalLocalProgress(p, petal.bloomAt));
          const rot = lerp(-78, 4 + (i % 2), local);
          const scaleY = lerp(0.1, 1, local);
          const opacity = lerp(0, 1, local);
          const colorT = clamp01(local * 0.85 + p * 0.35);
          const fill = lerpColor(BUD_PALETTE.grey, petal.color, colorT);

          return (
            <g key={`outer-${i}`} transform={`translate(${cx} ${cy}) rotate(${petal.angle})`}>
              <g transform={`rotate(${rot}) scale(1 ${scaleY})`} opacity={opacity}>
                <path d={petalPath(petal.w, petal.h)} fill={fill} filter={`url(#${uid}-soft)`} />
              </g>
            </g>
          );
        })}

        {innerPetals.map((petal, i) => {
          const local = easeOutBack(petalLocalProgress(p, petal.bloomAt));
          const rot = lerp(-68, 2, local);
          const scaleY = lerp(0.08, 1, local);
          const opacity = lerp(0, 1, local);
          const colorT = clamp01(local * 0.9 + p * 0.3);
          const fill = lerpColor(BUD_PALETTE.greyLight, petal.color, colorT);

          return (
            <g key={`inner-${i}`} transform={`translate(${cx} ${cy}) rotate(${petal.angle})`}>
              <g transform={`rotate(${rot}) scale(1 ${scaleY})`} opacity={opacity}>
                <path d={petalPath(petal.w, petal.h)} fill={fill} />
              </g>
            </g>
          );
        })}

        <g opacity={clamp01((p - 0.3) / 0.35)}>
          <circle cx={cx} cy={cy} r={size * 0.058} fill={lerpColor(BUD_PALETTE.grey, BLOOM_PALETTE.stamen, p)} />
          <circle cx={cx} cy={cy} r={size * 0.024} fill="#FEF9C3" opacity={0.95} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (360 / 8) * i;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos((a * Math.PI) / 180) * size * 0.03}
                y2={cy + Math.sin((a * Math.PI) / 180) * size * 0.03}
                stroke={BLOOM_PALETTE.amber}
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.65}
              />
            );
          })}
        </g>

        {p > 0.65 &&
          !reducedMotion &&
          Array.from({ length: particleCount }).map((_, i) => (
            <circle
              key={`mote-${i}`}
              className="flower-mote"
              cx={cx + Math.cos(i * 1.3) * size * (0.1 + (i % 3) * 0.05)}
              cy={cy + size * 0.06 + (i % 4) * 5}
              r={mobile ? 1.4 : 2}
              fill={i % 2 === 0 ? BLOOM_PALETTE.amber : BLOOM_PALETTE.coral}
              opacity={lerp(0, 0.7, clamp01((p - 0.65) / 0.35)) * (0.4 + (i % 3) * 0.15)}
            />
          ))}
      </motion.svg>
    </div>
  );
});
