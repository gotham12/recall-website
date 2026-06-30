'use client';

import { AssetImage } from '@/components/site/asset-image';
import { assetPath } from '@/lib/asset-path';
import { HERO_FLOWER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

/** Classic forget-me-not: five petals, sky-blue with pale edge. */
const PETAL_COUNT = 5;

type ForgetMeNotSceneProps = {
  className?: string;
  size?: 'hero' | 'ambient';
};

export const ForgetMeNotScene = forwardRef<HTMLDivElement, ForgetMeNotSceneProps>(function ForgetMeNotScene(
  { className, size = 'hero' },
  ref
) {
  const dim = size === 'hero' ? 'min(68vh, 440px)' : 'min(90vw, 480px)';
  const petalW = size === 'hero' ? 118 : 100;
  const petalH = size === 'hero' ? 128 : 108;

  return (
    <div
      className={cn('flower-scene relative flex items-center justify-center', className)}
      style={{ perspective: '1200px', perspectiveOrigin: '50% 44%' }}
    >
      <div
        ref={ref}
        className="flower-stage relative preserve-3d"
        style={{ width: dim, height: dim, transformStyle: 'preserve-3d' }}
      >
        {/* Soft blue glow when open */}
        <div className="flower-glow pointer-events-none absolute left-1/2 top-[44%] h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/25 blur-[72px] opacity-0" />

        {/* Full bloom photo — revealed at peak openness for hyperreal finish */}
        <div className="flower-bloom-photo pointer-events-none absolute inset-[6%] z-[5] opacity-0">
          <AssetImage
            src={HERO_FLOWER.bloom}
            alt=""
            fill
            priority={size === 'hero'}
            className="object-contain drop-shadow-[0_24px_64px_rgba(56,189,248,0.25)]"
            sizes="480px"
          />
        </div>

        {/* Closed bud */}
        <div className="flower-bud absolute inset-[14%] z-20">
          <AssetImage
            src={HERO_FLOWER.bud}
            alt=""
            fill
            priority={size === 'hero'}
            className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            sizes="480px"
          />
        </div>

        {/* Five unfurling petals — textured from bloom macro photo */}
        {Array.from({ length: PETAL_COUNT }).map((_, i) => {
          const angle = (360 / PETAL_COUNT) * i - 90;
          const bgX = 50 + Math.cos((angle * Math.PI) / 180) * 18;
          const bgY = 42 + Math.sin((angle * Math.PI) / 180) * 14;
          return (
            <div
              key={i}
              className="flower-petal-wrap absolute left-1/2 top-[44%] z-10"
              style={{
                width: 0,
                height: 0,
                transform: `rotateZ(${angle + 90}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="flower-petal absolute opacity-0"
                data-bloom-at={(0.06 + i * 0.07).toFixed(2)}
                data-tuck="22"
                data-index={i}
                style={{
                  width: petalW,
                  height: petalH,
                  left: -petalW / 2,
                  top: -petalH * 0.88,
                  transform: 'rotateX(-82deg)',
                  transformOrigin: '50% 94%',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-[50%_50%_46%_46%] shadow-[inset_0_-8px_24px_rgba(0,0,0,0.12),0_6px_20px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundImage: `url(${assetPath(HERO_FLOWER.bloom)})`,
                    backgroundSize: '240% 240%',
                    backgroundPosition: `${bgX}% ${bgY}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Yellow eye — forget-me-not center */}
        <div
          className="flower-center absolute left-1/2 top-[44%] z-30 flex h-[11%] w-[11%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full opacity-0"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, #fefce8 0%, #fde047 35%, #eab308 65%, #ca8a04 100%)',
            boxShadow: '0 0 28px rgba(250,204,21,0.45)',
          }}
        >
          <div className="h-[35%] w-[35%] rounded-full bg-white/90" />
        </div>

        <div
          className="flower-stem absolute bottom-[10%] left-1/2 z-0 w-[2px] origin-top -translate-x-1/2 rounded-full opacity-75"
          style={{
            height: size === 'hero' ? '32%' : '28%',
            background: 'linear-gradient(to bottom, #4ade80, #166534 60%, #052e16)',
          }}
        />

        <div className="flower-leaves opacity-0">
          <div className="flower-leaf flower-leaf-a absolute bottom-[16%] left-[43%] z-0 h-12 w-20 origin-right rotate-[32deg] rounded-[0_80%_0_80%] bg-gradient-to-br from-green-600/80 to-green-900/90" />
          <div className="flower-leaf flower-leaf-b absolute bottom-[12%] left-[53%] z-0 h-10 w-16 origin-left -rotate-[26deg] rounded-[80%_0_80%_0] bg-gradient-to-bl from-green-500/75 to-green-900/90" />
        </div>

        {/* Pollen motes */}
        <div className="flower-particles pointer-events-none absolute inset-0 z-40 opacity-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="flower-particle absolute rounded-full bg-yellow-100/80"
              style={{
                width: 3 + (i % 2),
                height: 3 + (i % 2),
                left: `${38 + ((i * 19) % 24)}%`,
                top: `${32 + ((i * 13) % 28)}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
