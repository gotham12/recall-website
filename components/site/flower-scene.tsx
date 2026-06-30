'use client';

import { AssetImage } from '@/components/site/asset-image';
import { PeonyFlower } from '@/components/site/peony-flower';
import { HERO_FLOWER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type FlowerSceneProps = {
  className?: string;
  size?: 'hero' | 'ambient';
  /** Simple cross-fade for prefers-reduced-motion */
  reducedMotion?: boolean;
  reducedBloomProgress?: number;
};

export const FlowerScene = forwardRef<HTMLDivElement, FlowerSceneProps>(function FlowerScene(
  { className, size = 'hero', reducedMotion = false, reducedBloomProgress = 0 },
  ref
) {
  const dim = size === 'hero' ? 'min(72vh, 420px)' : 'min(95vw, 520px)';

  if (reducedMotion) {
    const showBloom = reducedBloomProgress >= 0.5;
    return (
      <div
        className={cn('flower-scene relative flex items-center justify-center', className)}
        style={{ width: dim, height: dim }}
      >
        <div ref={ref} className="flower-stage relative h-full w-full">
          <AssetImage
            src={HERO_FLOWER.bud}
            alt=""
            fill
            priority={size === 'hero'}
            className={cn(
              'object-contain transition-opacity duration-700',
              showBloom ? 'opacity-0' : 'opacity-100'
            )}
            sizes="560px"
          />
          <AssetImage
            src={HERO_FLOWER.bloom}
            alt=""
            fill
            className={cn(
              'object-contain transition-opacity duration-700',
              showBloom ? 'opacity-100' : 'opacity-0'
            )}
            sizes="560px"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('flower-scene relative flex items-center justify-center', className)}
      style={{ width: dim, height: dim }}
    >
      <PeonyFlower ref={ref} size={size} />
    </div>
  );
});
