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
    const open = reducedBloomProgress >= 0.45;
    return (
      <div
        className={cn('flower-scene relative flex items-center justify-center', className)}
        style={{ width: dim, height: dim }}
      >
        <div ref={ref} className="flower-stage relative h-full w-full">
          <div className="flower-master absolute inset-[4%] relative transition-all duration-700">
            <AssetImage
              src={HERO_FLOWER.image}
              alt=""
              fill
              priority={size === 'hero'}
              className="flower-master-img object-contain"
              sizes="480px"
            />
          </div>
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
