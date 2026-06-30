'use client';

import { BloomFlowerSvg } from '@/components/site/bloom-flower-svg';
import { HeroBloomCopy } from '@/components/site/hero-bloom-copy';
import { clamp01, lerp } from '@/lib/bloom-palette';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return mobile;
}

type HeroOpeningProps = {
  bgBloomRef: React.RefObject<HTMLDivElement>;
};

export function HeroOpening({ bgBloomRef }: HeroOpeningProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [idle, setIdle] = useState(reducedMotion);

  const flowerSize = mobile ? 300 : 420;

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      setIdle(true);
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    const bgBloom = bgBloomRef.current;
    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=260%',
        pin,
        scrub: 1.05,
        onUpdate: (self) => {
          const bloomP = clamp01(self.progress / 0.72);
          setProgress(bloomP);
          setIdle(bloomP >= 0.98);

          if (bgBloom) {
            gsap.set(bgBloom, {
              opacity: lerp(0, mobile ? 0.48 : 0.72, clamp01((bloomP - 0.08) / 0.92)),
            });
          }
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, mobile, bgBloomRef]);

  return (
    <div ref={sectionRef} className="relative z-10">
      <div
        ref={pinRef}
        className="flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-16 pt-28"
      >
        <div className="relative mb-2 md:mb-4">
          <BloomFlowerSvg
            progress={progress}
            idle={idle}
            reducedMotion={reducedMotion}
            size={flowerSize}
            mobile={mobile}
          />
        </div>

        <HeroBloomCopy progress={progress} reducedMotion={reducedMotion} className="mt-2 md:mt-4" />
      </div>
    </div>
  );
}
