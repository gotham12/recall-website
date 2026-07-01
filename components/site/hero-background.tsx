'use client';

import { HeroOpening } from '@/components/site/hero-opening';
import { useRef } from 'react';

/** Hero-only backdrop for the brain intro sequence on the home page. */
export function HeroBackground() {
  const bgBloomRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0 bg-gradient-to-b from-[#020408] via-ink to-ink">
        <div
          ref={bgBloomRef}
          className="absolute inset-0 opacity-0"
          style={{
            background:
              'radial-gradient(circle at 50% 38%, rgba(245,166,35,0.28) 0%, rgba(232,67,122,0.16) 35%, transparent 68%)',
          }}
        />
      </div>
      <HeroOpening bgBloomRef={bgBloomRef} />
    </>
  );
}
