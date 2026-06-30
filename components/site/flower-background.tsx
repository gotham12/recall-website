'use client';

import AnimatedButton from '@/components/ui/animated-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import {
  applyBloomProgress,
  applyWiltProgress,
  initClosedState,
  initWiltedState,
  prefersReducedMotion,
  resetAmbientMotion,
  startAmbientMotion,
} from '@/components/site/flower-animation';
import { FlowerScene } from '@/components/site/flower-scene';
import { DEMO_URL, HERO_COPY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type FlowerPhase = 'home' | 'problem' | 'product';

type FlowerBackgroundProps = {
  phase: FlowerPhase;
};

export function FlowerBackground({ phase }: FlowerBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const ambientStageRef = useRef<HTMLDivElement>(null);
  const bgBloomRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [reducedBloom, setReducedBloom] = useState(0);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const heroStage = heroStageRef.current;
    const ambientStage = ambientStageRef.current;
    const bgBloom = bgBloomRef.current;
    if (!root || !ambientStage) return;

    resetAmbientMotion();

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        if (phase === 'home' && openingRef.current && pinRef.current) {
          ScrollTrigger.create({
            trigger: openingRef.current,
            start: 'top top',
            end: '+=220%',
            pin: pinRef.current,
            scrub: 0.6,
            onUpdate: (self) => {
              const bloomP = gsap.utils.clamp(0, 1, self.progress / 0.45);
              const wiltP = gsap.utils.clamp(0, 1, (self.progress - 0.55) / 0.45);
              setReducedBloom(bloomP >= 0.5 && wiltP < 0.35 ? 1 : bloomP >= 0.5 ? 1 : 0);
              gsap.set('.hero-opening-copy', {
                opacity: 1 - wiltP,
                y: wiltP * -40,
              });
              if (bgBloom) gsap.set(bgBloom, { opacity: gsap.utils.interpolate(0, 0.55, bloomP) });
            },
          });
        }
        return;
      }

      initClosedState(ambientStage);
      gsap.set(ambientStage, { scale: phase === 'problem' ? 1.2 : 1.35, opacity: phase === 'problem' ? 0.14 : 0.2 });

      if (phase === 'home' && heroStage && openingRef.current && pinRef.current) {
        initClosedState(heroStage);
        if (bgBloom) gsap.set(bgBloom, { opacity: 0 });

        let ambientRunning = false;

        ScrollTrigger.create({
          trigger: openingRef.current,
          start: 'top top',
          end: '+=280%',
          pin: pinRef.current,
          scrub: 1.1,
          onUpdate: (self) => {
            const bloomEnd = 0.48;
            const bloomP = gsap.utils.clamp(0, 1, self.progress / bloomEnd);
            const wiltP = gsap.utils.clamp(0, 1, (self.progress - bloomEnd) / (1 - bloomEnd));

            applyBloomProgress(heroStage, bloomP);
            applyBloomProgress(ambientStage, bloomP * 0.92);

            if (bgBloom) {
              gsap.set(bgBloom, {
                opacity: gsap.utils.interpolate(0, 0.62, bloomP),
              });
            }

            gsap.set('.hero-opening-copy', {
              opacity: gsap.utils.clamp(0.85, 1, 0.85 + bloomP * 0.15) * (1 - wiltP),
              y: gsap.utils.interpolate(bloomP * 4, -48, wiltP),
              filter: wiltP > 0.2 ? `blur(${wiltP * 8}px)` : 'blur(0px)',
            });

            if (wiltP > 0.02) {
              applyWiltProgress(heroStage, wiltP);
              applyWiltProgress(ambientStage, wiltP * 1.05);
              gsap.set(ambientStage, {
                opacity: gsap.utils.interpolate(0.2, 0.08, wiltP),
              });
            } else if (bloomP >= 0.98 && !ambientRunning) {
              ambientRunning = true;
              startAmbientMotion(heroStage);
              startAmbientMotion(ambientStage);
            }
          },
        });
      }

      if (phase === 'problem') {
        initWiltedState(ambientStage);
        gsap.set(ambientStage, {
          scale: 1.2,
          opacity: 0.12,
        });
      }

      if (phase === 'product') {
        initClosedState(ambientStage);
        gsap.set(ambientStage, { filter: 'grayscale(0.35) brightness(0.75)', opacity: 0.18 });

        const tl = gsap.timeline({ delay: 0.2 });
        tl.call(() => applyBloomProgress(ambientStage, 0));
        tl.to(
          {},
          {
            duration: 2.4,
            ease: 'none',
            onUpdate: function () {
              applyBloomProgress(ambientStage, this.progress());
            },
          }
        );
        tl.call(() => startAmbientMotion(ambientStage), [], '-=0.2');
        tl.to(ambientStage, { opacity: 0.28, duration: 1.2 }, '-=0.8');
      }
    }, root);

    return () => {
      resetAmbientMotion();
      ctx.revert();
    };
  }, [phase, reducedMotion]);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none">
      <div
        className={cn(
          'fixed inset-0 z-0 overflow-hidden transition-colors duration-700',
          phase === 'problem' && 'bg-gradient-to-b from-zinc-950 via-zinc-950 to-black',
          phase === 'product' && 'bg-gradient-to-b from-product-50/80 via-white/50 to-recall-mint/10',
          phase === 'home' && 'bg-gradient-to-b from-[#030508] via-ink to-ink-50/80'
        )}
      >
        {/* Background brightens as bloom completes (home) */}
        {phase === 'home' && (
          <div
            ref={bgBloomRef}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(253,164,175,0.14),rgba(79,140,255,0.06)_45%,transparent_70%)] opacity-0"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center pt-[8vh]">
          <FlowerScene
            ref={ambientStageRef}
            size="ambient"
            reducedMotion={reducedMotion}
            reducedBloomProgress={reducedBloom}
            className="opacity-100"
          />
        </div>

        <div
          className={cn(
            'absolute inset-0',
            phase === 'problem' && 'bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(0,0,0,0.55)_100%)]',
            phase === 'product' && 'bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.55),transparent_65%)]',
            phase === 'home' && 'bg-[radial-gradient(circle_at_50%_38%,transparent_22%,rgba(7,11,20,0.78)_100%)]'
          )}
        />
      </div>

      {phase === 'home' && (
        <div ref={openingRef} className="relative z-10">
          <div
            ref={pinRef}
            className="flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-16 pt-28"
          >
            <FlowerScene
              ref={heroStageRef}
              size="hero"
              reducedMotion={reducedMotion}
              reducedBloomProgress={reducedBloom}
            />
            <div className="hero-opening-copy pointer-events-auto relative z-20 mt-6 max-w-3xl text-center md:mt-8">
              <p className="mb-4 font-display text-sm uppercase tracking-[0.22em] text-white/40">Recall</p>
              <h1 className="font-display text-4xl leading-[1.08] text-white md:text-5xl lg:text-6xl">
                {HERO_COPY.headline}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
                {HERO_COPY.subhead}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton className="rounded-full border-white/15 bg-white px-8 text-ink">
                    Try the live app
                  </AnimatedButton>
                </a>
                <Link href="/#demo">
                  <InteractiveHoverButton className="border-recall-coral/25 bg-recall-coral/10 px-8 text-white">
                    Watch the demo
                  </InteractiveHoverButton>
                </Link>
              </div>
              <p className="mx-auto mt-6 max-w-md text-sm text-white/40 md:text-base">{HERO_COPY.scrollHint}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
