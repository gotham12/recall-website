'use client';

import { BrainDeclineSvg } from '@/components/site/brain-decline-svg';
import { HeroBrainCopy } from '@/components/site/hero-brain-copy';
import { SCROLLER } from '@/components/ui/smooth-scroll';
import { BEATS, RESOLVE, clamp01, lerp } from '@/lib/brain-palette';
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

function useIsMobile() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(max-width: 768px)');
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia('(max-width: 768px)').matches,
    () => false
  );
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

  const brainSize = mobile ? 360 : 580;

  useLayoutEffect(() => {
    const bgBloom = bgBloomRef.current;

    if (reducedMotion) {
      setProgress(1);
      setShowSkip(false);
      if (bgBloom) {
        gsap.set(bgBloom, { opacity: mobile ? 0.5 : 0.72 });
      }
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const distance = mobile ? '+=200%' : '+=280%';

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        scroller: SCROLLER,
        start: 'top top',
        end: distance,
        pin,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setShowSkip(p < 0.96);

          if (bgBloom) {
            gsap.set(bgBloom, {
              opacity: lerp(0, mobile ? 0.5 : 0.72, clamp01((p - RESOLVE.bloomPeak) / (BEATS.resolveEnd - RESOLVE.bloomPeak))),
            });
          }
        },
      });
      scrollTriggerRef.current = st;
      setProgress(st.progress);
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener('lenis-ready', refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('lenis-ready', refresh);
      window.removeEventListener('load', refresh);
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [reducedMotion, mobile, bgBloomRef]);

  const handleSkip = () => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    st.scroll(st.end);
    setProgress(1);
    setShowSkip(false);
    const bgBloom = bgBloomRef.current;
    if (bgBloom) {
      gsap.set(bgBloom, { opacity: mobile ? 0.5 : 0.72 });
    }
  };

  return (
    <div ref={sectionRef} className="relative z-40">
      <div
        ref={pinRef}
        className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink/90 px-6 pb-16 pt-28 backdrop-blur-[1px]"
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
          className="fixed bottom-6 right-6 z-50 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 md:bottom-8 md:right-8"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
