'use client';

import { BrainDeclineSvg } from '@/components/site/brain-decline-svg';
import { HeroBrainCopy } from '@/components/site/hero-brain-copy';
import { clamp01, lerp } from '@/lib/brain-palette';
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
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [showSkip, setShowSkip] = useState(!reducedMotion);

  const brainSize = mobile ? 260 : 420;

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      setShowSkip(false);
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    const bgBloom = bgBloomRef.current;
    if (!section || !pin) return;

    // Shorter pinned distance on mobile so the sequence doesn't fight
    // native touch-scroll momentum or feel like it's eating the scroll.
    const distance = mobile ? '+=220%' : '+=320%';

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: distance,
        pin,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setShowSkip(p < 0.96);

          if (bgBloom) {
            // Warm "color returns" glow only bridges in during the final resolve beat.
            gsap.set(bgBloom, {
              opacity: lerp(0, mobile ? 0.45 : 0.7, clamp01((p - 0.88) / 0.12)),
            });
          }
        },
      });
      scrollTriggerRef.current = st;

      ScrollTrigger.refresh();
    }, section);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [reducedMotion, mobile, bgBloomRef]);

  const handleSkip = () => {
    const st = scrollTriggerRef.current;
    if (st) {
      window.scrollTo({ top: st.end, behavior: 'smooth' });
    } else {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div ref={sectionRef} className="relative z-10">
      <div
        ref={pinRef}
        className="flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-16 pt-28"
      >
        <div className="relative mb-2 md:mb-4">
          <BrainDeclineSvg progress={progress} staticFrame={reducedMotion} size={brainSize} mobile={mobile} />
        </div>

        <HeroBrainCopy progress={progress} reducedMotion={reducedMotion} className="mt-2 md:mt-4" />
      </div>

      {showSkip && (
        <button
          type="button"
          onClick={handleSkip}
          className="fixed bottom-6 right-6 z-30 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 md:bottom-8 md:right-8"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
