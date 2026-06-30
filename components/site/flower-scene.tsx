'use client';

import { AssetImage } from '@/components/site/asset-image';
import { assetPath } from '@/lib/asset-path';
import { HERO_FLOWER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const PETAL_COUNT = 12;

type FlowerSceneProps = {
  className?: string;
  size?: 'hero' | 'ambient';
};

export const FlowerScene = forwardRef<HTMLDivElement, FlowerSceneProps>(function FlowerScene(
  { className, size = 'hero' },
  ref
) {
  const dim = size === 'hero' ? 'min(72vh, 560px)' : 'min(95vw, 900px)';
  const petalH = size === 'hero' ? 210 : 320;
  const petalW = size === 'hero' ? 92 : 140;

  return (
    <div
      className={cn('flower-scene relative flex items-center justify-center', className)}
      style={{ perspective: '1400px', perspectiveOrigin: '50% 42%' }}
    >
      <div
        ref={ref}
        className="flower-stage relative preserve-3d"
        style={{ width: dim, height: dim, transformStyle: 'preserve-3d' }}
      >
        <div className="flower-glow pointer-events-none absolute left-1/2 top-[46%] h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/20 blur-[80px]" />

        <div className="flower-bud absolute inset-[18%] z-20 opacity-100">
          <AssetImage
            src={HERO_FLOWER.bud}
            alt=""
            fill
            priority
            className="object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            sizes="560px"
          />
        </div>

        {Array.from({ length: PETAL_COUNT }).map((_, i) => {
          const angle = (360 / PETAL_COUNT) * i;
          return (
            <div
              key={i}
              className="flower-petal-wrap absolute left-1/2 top-[46%] z-10"
              style={{
                width: 0,
                height: 0,
                transform: `rotateZ(${angle}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="flower-petal absolute opacity-0"
                style={{
                  width: petalW,
                  height: petalH,
                  left: -petalW / 2,
                  top: -petalH * 0.82,
                  transform: 'rotateX(-78deg)',
                  transformOrigin: '50% 92%',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-[48%_48%_42%_42%] shadow-[inset_0_-12px_30px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.25)]"
                  style={{
                    backgroundImage: `url(${assetPath(HERO_FLOWER.bloom)})`,
                    backgroundSize: '220% 220%',
                    backgroundPosition: `${50 + Math.cos((angle * Math.PI) / 180) * 22}% ${38 + Math.sin((angle * Math.PI) / 180) * 18}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

        <div
          className="flower-center absolute left-1/2 top-[46%] z-30 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow-[0_0_40px_rgba(251,191,36,0.35)]"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, #fef3c7 0%, #fbbf24 35%, #d97706 70%, #92400e 100%)',
          }}
        />

        <div
          className="flower-stem absolute bottom-[8%] left-1/2 z-0 w-[3px] origin-top -translate-x-1/2 rounded-full opacity-80"
          style={{
            height: size === 'hero' ? '34%' : '28%',
            background: 'linear-gradient(to bottom, #166534, #14532d 55%, #052e16)',
          }}
        />

        <div className="flower-leaf flower-leaf-a absolute bottom-[14%] left-[42%] z-0 h-16 w-28 origin-right rotate-[28deg] rounded-[0_80%_0_80%] bg-gradient-to-br from-green-700/80 to-green-900/90 opacity-0" />
        <div className="flower-leaf flower-leaf-b absolute bottom-[10%] left-[54%] z-0 h-14 w-24 origin-left -rotate-[22deg] rounded-[80%_0_80%_0] bg-gradient-to-bl from-green-600/75 to-green-900/90 opacity-0" />
      </div>
    </div>
  );
});
