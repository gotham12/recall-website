'use client';

import { AssetImage } from '@/components/site/asset-image';
import { ForgetMeNotScene } from '@/components/site/forget-me-not-scene';
import { HERO_FLOWER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type FlowerSceneProps = {
  className?: string;
  size?: 'hero' | 'ambient';
  reducedMotion?: boolean;
  reducedBloomProgress?: number;
};

export const FlowerScene = forwardRef<HTMLDivElement, FlowerSceneProps>(function FlowerScene(
  { className, size = 'hero', reducedMotion = false, reducedBloomProgress = 0 },
  ref
) {
  const dim = size === 'hero' ? 'min(68vh, 440px)' : 'min(90vw, 480px)';

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
            className={cn('object-contain transition-opacity duration-700', showBloom ? 'opacity-0' : 'opacity-100')}
            sizes="480px"
          />
          <AssetImage
            src={HERO_FLOWER.bloom}
            alt=""
            fill
            className={cn('object-contain transition-opacity duration-700', showBloom ? 'opacity-100' : 'opacity-0')}
            sizes="480px"
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
      <ForgetMeNotScene ref={ref} size={size} />
    </div>
  );
});
