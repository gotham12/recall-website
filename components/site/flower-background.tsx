'use client';

import { AssetImage } from '@/components/site/asset-image';
import { HeroOpening } from '@/components/site/hero-opening';
import { BLOOM_PALETTE } from '@/lib/bloom-palette';
import { HERO_FLOWER, PAGE_BACKGROUNDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export type FlowerPhase = 'home' | 'problem' | 'product';

type FlowerBackgroundProps = {
  phase: FlowerPhase;
};

export function FlowerBackground({ phase }: FlowerBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgBloomRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} aria-hidden={phase !== 'home'} className={cn(phase === 'home' && 'contents')}>
      <div
        className={cn(
          'fixed inset-0 z-0 overflow-hidden',
          phase === 'home' && 'bg-gradient-to-b from-[#020408] via-ink to-ink-50/90'
        )}
      >
        {phase === 'problem' && (
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <AssetImage
                src={PAGE_BACKGROUNDS.problemBrain}
                alt=""
                fill
                priority
                className="object-cover object-center brightness-[0.95] contrast-[1.08] saturate-[0.85]"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-zinc-950/60 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
          </div>
        )}

        {phase === 'product' && (
          <div className="absolute inset-0">
            <div
              className="relative h-full w-full opacity-[0.42] saturate-[1.1]"
              style={{
                maskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, black 15%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, black 15%, transparent 72%)',
              }}
            >
              <AssetImage
                src={PAGE_BACKGROUNDS.productFlower}
                alt=""
                fill
                priority
                className="object-cover object-center scale-110"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-product-50/88 via-white/75 to-recall-mint/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.55),transparent_70%)]" />
          </div>
        )}

        {phase === 'home' && (
          <>
            <div
              ref={bgBloomRef}
              className="absolute inset-0 opacity-0"
              style={{
                background: `radial-gradient(circle at 50% 38%, ${BLOOM_PALETTE.amber}28, ${BLOOM_PALETTE.rose}12 35%, ${BLOOM_PALETTE.violet}08 55%, transparent 72%)`,
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_18%,rgba(7,11,20,0.84)_100%)]" />
          </>
        )}
      </div>

      {phase === 'home' && <HeroOpening bgBloomRef={bgBloomRef} />}
    </div>
  );
}
