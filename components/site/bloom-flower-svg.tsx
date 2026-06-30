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

  const glowOpacity = lerp(0, mobile ? 0.45 : 0.72, clamp01((p - 0.2) / 0.8));
  const bgLight = lerp(0, mobile ? 0.35 : 0.55, clamp01((p - 0.15) / 0.85));
  const stageGrey = lerp(1, 0, p);
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
      {/* Background radial wake */}
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          width: size * 1.1,
          height: size * 1.1,
          opacity: bgLight,
          background: `radial-gradient(circle, ${BLOOM_PALETTE.amber}33 0%, ${BLOOM_PALETTE.violet}18 35%, transparent 68%)`,
          filter: mobile ? 'blur(28px)' : 'blur(48px)',
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
          filter: stageGrey > 0.05 ? `grayscale(${stageGrey * 0.95}) saturate(${lerp(0.12, 1, p)}) brightness(${lerp(0.55, 1.05, p)})` : undefined,
          transformOrigin: `${cx}px ${cy}px`,
        }}
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="44%" r="50%">
            <stop offset="0%" stopColor={BLOOM_PALETTE.amber} stopOpacity={0.85} />
            <stop offset="40%" stopColor={BLOOM_PALETTE.rose} stopOpacity={0.45} />
            <stop offset="100%" stopColor={BLOOM_PALETTE.violet} stopOpacity={0} />
          </radialGradient>
          <filter id={`${uid}-soft`} x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center glow */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={size * 0.22}
          ry={size * 0.18}
          fill={`url(#${uid}-glow)`}
          opacity={glowOpacity}
          className={breathe ? 'flower-glow-pulse' : undefined}
        />

        {/* Stem */}
        <path
          d={`M ${cx} ${cy + size * 0.12} Q ${cx - 3} ${cy + size * 0.28} ${cx} ${size - 12}`}
          fill="none"
          stroke={lerpColor(BUD_PALETTE.sepal, '#166534', p)}
          strokeWidth={size * 0.008}
          strokeLinecap="round"
          opacity={lerp(0.45, 0.88, p)}
        />

        {/* Closed sepals */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const sepalP = clamp01(1 - p * 2.2);
          return (
            <g key={`sepal-${angle}`} transform={`translate(${cx} ${cy}) rotate(${angle})`} opacity={sepalP}>
              <path
                d={`M 0 0 C -6 -3 -12 -22 -8 -36 C -3 -42 3 -42 8 -36 C 12 -22 6 -3 0 0 Z`}
                fill={lerpColor(BUD_PALETTE.sepal, BUD_PALETTE.greyDark, 1 - sepalP)}
              />
            </g>
          );
        })}

        {/* Outer petals */}
        {outerPetals.map((petal, i) => {
          const local = easeOutBack(petalLocalProgress(p, petal.bloomAt));
          const rot = lerp(-78, 4 + (i % 2), local);
          const scaleY = lerp(0.1, 1, local);
          const opacity = lerp(0, 1, local);
          const fill = lerpColor(BUD_PALETTE.grey, petal.color, clamp01(p * 1.15));

          return (
            <g key={`outer-${i}`} transform={`translate(${cx} ${cy}) rotate(${petal.angle})`}>
              <g transform={`rotate(${rot}) scale(1 ${scaleY})`} opacity={opacity}>
                <path d={petalPath(petal.w, petal.h)} fill={fill} filter={`url(#${uid}-soft)`} />
              </g>
            </g>
          );
        })}

        {/* Inner petals */}
        {innerPetals.map((petal, i) => {
          const local = easeOutBack(petalLocalProgress(p, petal.bloomAt));
          const rot = lerp(-68, 2, local);
          const scaleY = lerp(0.08, 1, local);
          const opacity = lerp(0, 1, local);
          const fill = lerpColor(BUD_PALETTE.greyLight, petal.color, clamp01(p * 1.1));

          return (
            <g key={`inner-${i}`} transform={`translate(${cx} ${cy}) rotate(${petal.angle})`}>
              <g transform={`rotate(${rot}) scale(1 ${scaleY})`} opacity={opacity}>
                <path d={petalPath(petal.w, petal.h)} fill={fill} />
              </g>
            </g>
          );
        })}

        {/* Stamen center */}
        <g opacity={clamp01((p - 0.35) / 0.4)}>
          <circle cx={cx} cy={cy} r={size * 0.055} fill={lerpColor(BUD_PALETTE.grey, BLOOM_PALETTE.stamen, p)} />
          <circle cx={cx} cy={cy} r={size * 0.022} fill="#FEF9C3" opacity={0.9} />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (360 / 8) * i;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos((a * Math.PI) / 180) * size * 0.028}
                y2={cy + Math.sin((a * Math.PI) / 180) * size * 0.028}
                stroke={BLOOM_PALETTE.amber}
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0.55}
              />
            );
          })}
        </g>

        {/* Light motes — visible once bloomed */}
        {p > 0.72 &&
          !reducedMotion &&
          Array.from({ length: particleCount }).map((_, i) => (
            <circle
              key={`mote-${i}`}
              className="flower-mote"
              cx={cx + Math.cos(i * 1.3) * size * (0.1 + (i % 3) * 0.05)}
              cy={cy + size * 0.06 + (i % 4) * 5}
              r={mobile ? 1.2 : 1.8}
              fill={i % 2 === 0 ? BLOOM_PALETTE.amber : BLOOM_PALETTE.blush}
              opacity={lerp(0, 0.55, clamp01((p - 0.72) / 0.28)) * (0.35 + (i % 3) * 0.15)}
            />
          ))}
      </motion.svg>
    </div>
  );
});
