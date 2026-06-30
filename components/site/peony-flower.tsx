'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useId, useMemo } from 'react';

export type PeonyLayer = 'inner' | 'mid' | 'outer';

export type PeonyPetalDef = {
  layer: PeonyLayer;
  index: number;
  angle: number;
  width: number;
  height: number;
  /** Stagger offset 0–1 within bloom timeline */
  bloomAt: number;
  /** Closed-state tuck toward center (degrees) */
  tuck: number;
};

function peonyPetalPath(width: number, height: number): string {
  const w = width / 2;
  const h = height;
  return `M 0 0
    C ${(-w * 0.38).toFixed(2)} ${(-h * 0.06).toFixed(2)} ${(-w * 0.72).toFixed(2)} ${(-h * 0.38).toFixed(2)} ${(-w * 0.58).toFixed(2)} ${(-h * 0.68).toFixed(2)}
    Q ${(-w * 0.22).toFixed(2)} ${(-h * 0.94).toFixed(2)} 0 ${(-h).toFixed(2)}
    Q ${(w * 0.22).toFixed(2)} ${(-h * 0.94).toFixed(2)} ${(w * 0.58).toFixed(2)} ${(-h * 0.68).toFixed(2)}
    C ${(w * 0.72).toFixed(2)} ${(-h * 0.38).toFixed(2)} ${(w * 0.38).toFixed(2)} ${(-h * 0.06).toFixed(2)} 0 0 Z`;
}

function buildPetals(): PeonyPetalDef[] {
  const petals: PeonyPetalDef[] = [];
  const layers: { layer: PeonyLayer; count: number; w: number; h: number; offset: number; tuck: number }[] = [
    { layer: 'inner', count: 6, w: 22, h: 52, offset: 0, tuck: 18 },
    { layer: 'mid', count: 10, w: 30, h: 68, offset: 18, tuck: 12 },
    { layer: 'outer', count: 14, w: 38, h: 82, offset: 8, tuck: 6 },
  ];

  layers.forEach(({ layer, count, w, h, offset, tuck }) => {
    for (let i = 0; i < count; i++) {
      petals.push({
        layer,
        index: i,
        angle: offset + (360 / count) * i,
        width: w,
        height: h,
        bloomAt: layer === 'inner' ? 0.08 + i * 0.025 : layer === 'mid' ? 0.22 + i * 0.018 : 0.38 + i * 0.012,
        tuck,
      });
    }
  });

  return petals;
}

const PETALS = buildPetals();
const PARTICLE_SEEDS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 38 + ((i * 17) % 24),
  y: 28 + ((i * 13) % 30),
  r: 0.6 + (i % 3) * 0.35,
  delay: i * 0.18,
}));

type PeonyFlowerProps = {
  className?: string;
  size?: 'hero' | 'ambient';
};

export const PeonyFlower = forwardRef<HTMLDivElement, PeonyFlowerProps>(function PeonyFlower(
  { className, size = 'hero' },
  ref
) {
  const uid = useId().replace(/:/g, '');
  const dim = size === 'hero' ? 420 : 520;
  const cx = dim / 2;
  const cy = dim * 0.46;
  const stemBase = dim * 0.78;

  const gradIds = useMemo(
    () => ({
      inner: `pf-inner-${uid}`,
      mid: `pf-mid-${uid}`,
      outer: `pf-outer-${uid}`,
      center: `pf-center-${uid}`,
      sepal: `pf-sepal-${uid}`,
      leaf: `pf-leaf-${uid}`,
      glow: `pf-glow-${uid}`,
      soft: `pf-soft-${uid}`,
    }),
    [uid]
  );

  return (
    <div
      ref={ref}
      className={cn('flower-stage relative will-change-transform', className)}
      style={{ width: dim, height: dim }}
      data-flower-size={size}
    >
      <svg
        viewBox={`0 0 ${dim} ${dim}`}
        width={dim}
        height={dim}
        className="flower-svg overflow-visible"
        aria-hidden
      >
        <defs>
          <radialGradient id={gradIds.glow} cx="50%" cy="44%" r="50%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#f472b6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={gradIds.inner} x1="0%" y1="100%" x2="40%" y2="0%">
            <stop offset="0%" stopColor="#fce7f3" />
            <stop offset="45%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#f9a8d4" />
          </linearGradient>
          <linearGradient id={gradIds.mid} x1="0%" y1="100%" x2="35%" y2="0%">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="40%" stopColor="#fecdd3" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <linearGradient id={gradIds.outer} x1="0%" y1="100%" x2="30%" y2="0%">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="35%" stopColor="#fecaca" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <radialGradient id={gradIds.center} cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="35%" stopColor="#fde047" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
          <linearGradient id={gradIds.sepal} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id={gradIds.leaf} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <filter id={gradIds.soft} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient glow — breathes after bloom */}
        <ellipse
          className="flower-glow"
          cx={cx}
          cy={cy}
          rx={dim * 0.28}
          ry={dim * 0.24}
          fill={`url(#${gradIds.glow})`}
          opacity={0}
        />

        {/* Stem */}
        <g className="flower-stem" opacity={0.85}>
          <path
            d={`M ${cx} ${stemBase} C ${cx - 4} ${stemBase + dim * 0.08} ${cx + 3} ${stemBase + dim * 0.16} ${cx} ${dim - 8}`}
            fill="none"
            stroke="#14532d"
            strokeWidth={size === 'hero' ? 4 : 3.5}
            strokeLinecap="round"
          />
        </g>

        {/* Leaves */}
        <g className="flower-leaves" opacity={0}>
          <path
            className="flower-leaf flower-leaf-a"
            d={`M ${cx - 8} ${stemBase + 12} Q ${cx - 52} ${stemBase - 8} ${cx - 78} ${stemBase + 18} Q ${cx - 42} ${stemBase + 8} ${cx - 8} ${stemBase + 12}`}
            fill={`url(#${gradIds.leaf})`}
            opacity={0.88}
          />
          <path
            className="flower-leaf flower-leaf-b"
            d={`M ${cx + 10} ${stemBase + 20} Q ${cx + 58} ${stemBase + 4} ${cx + 72} ${stemBase + 32} Q ${cx + 38} ${stemBase + 22} ${cx + 10} ${stemBase + 20}`}
            fill={`url(#${gradIds.leaf})`}
            opacity={0.82}
          />
        </g>

        {/* Closed bud sepals */}
        <g className="flower-bud" transform={`translate(${cx} ${cy})`}>
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <g key={angle} transform={`rotate(${angle - 90})`}>
              <path
                className="flower-sepal"
                d="M 0 0 C -8 -4 -14 -28 -10 -46 C -4 -54 4 -54 10 -46 C 14 -28 8 -4 0 0 Z"
                fill={`url(#${gradIds.sepal})`}
                opacity={0.92 - i * 0.04}
              />
            </g>
          ))}
          <ellipse cx={0} cy={-8} rx={18} ry={24} fill="#4b5563" opacity={0.55} />
        </g>

        {/* Layered petals */}
        <g className="flower-petals" transform={`translate(${cx} ${cy})`}>
          {PETALS.map((petal) => {
            const fill =
              petal.layer === 'inner'
                ? `url(#${gradIds.inner})`
                : petal.layer === 'mid'
                  ? `url(#${gradIds.mid})`
                  : `url(#${gradIds.outer})`;
            return (
              <g
                key={`${petal.layer}-${petal.index}`}
                className="flower-petal-wrap"
                data-layer={petal.layer}
                data-index={petal.index}
                data-bloom-at={petal.bloomAt}
                data-tuck={petal.tuck}
                transform={`rotate(${petal.angle})`}
              >
                <g
                  className="flower-petal"
                  style={{ transformOrigin: '0px 0px', transformBox: 'fill-box' as never }}
                >
                  <path
                    d={peonyPetalPath(petal.width, petal.height)}
                    fill={fill}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={0.6}
                    filter={`url(#${gradIds.soft})`}
                  />
                </g>
              </g>
            );
          })}
        </g>

        {/* Center stamen */}
        <g className="flower-center" transform={`translate(${cx} ${cy})`} opacity={0}>
          <circle r={size === 'hero' ? 22 : 26} fill={`url(#${gradIds.center})`} />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (360 / 14) * i;
            return (
              <line
                key={i}
                x1={0}
                y1={0}
                x2={Math.cos((a * Math.PI) / 180) * 10}
                y2={Math.sin((a * Math.PI) / 180) * 10}
                stroke="#ca8a04"
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.65}
              />
            );
          })}
        </g>

        {/* Pollen / light dust */}
        <g className="flower-particles" opacity={0}>
          {PARTICLE_SEEDS.map((p) => (
            <circle
              key={p.id}
              className="flower-particle"
              cx={cx + (p.x - 50) * (dim / 100)}
              cy={cy + (p.y - 50) * (dim / 100)}
              r={p.r}
              fill="#fde68a"
              opacity={0.45}
              data-delay={p.delay}
            />
          ))}
        </g>
      </svg>
    </div>
  );
});
