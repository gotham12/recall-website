'use client';

import { AssetImage } from '@/components/site/asset-image';
import { HERO_FLOWER } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type ForgetMeNotSceneProps = {
  className?: string;
  size?: 'hero' | 'ambient';
};

/**
 * Single hyperrealistic forget-me-not photo — animated via scale, filter, and clip-path
 * so we never show rectangular PNG bounds or mismatched bud/bloom assets.
 */
export const ForgetMeNotScene = forwardRef<HTMLDivElement, ForgetMeNotSceneProps>(function ForgetMeNotScene(
  { className, size = 'hero' },
  ref
) {
  const dim = size === 'hero' ? 'min(68vh, 440px)' : 'min(90vw, 480px)';

  return (
    <div
      className={cn('flower-scene relative flex items-center justify-center', className)}
      style={{ width: dim, height: dim }}
    >
      <div ref={ref} className="flower-stage relative h-full w-full" style={{ width: dim, height: dim }}>
        <div className="flower-glow pointer-events-none absolute left-1/2 top-[46%] h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/30 blur-[80px] opacity-0" />

        <div className="flower-master pointer-events-none absolute inset-[4%] relative">
          <AssetImage
            src={HERO_FLOWER.image}
            alt=""
            fill
            priority={size === 'hero'}
            className="flower-master-img object-contain object-center drop-shadow-[0_28px_70px_rgba(56,189,248,0.22)]"
            sizes="480px"
          />
        </div>

        <div className="flower-particles pointer-events-none absolute inset-0 opacity-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="flower-particle absolute rounded-full bg-yellow-100/70"
              style={{
                width: 3,
                height: 3,
                left: `${40 + ((i * 17) % 20)}%`,
                top: `${34 + ((i * 11) % 22)}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
