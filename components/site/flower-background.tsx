'use client';

import BlurText from '@/components/BlurText';
import GradientText from '@/components/GradientText';
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
import { cn } from '@/lib/utils';
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
              opacity: gsap.utils.clamp(0.35, 1, 0.35 + bloomP * 0.65) * (1 - wiltP),
              y: gsap.utils.interpolate(bloomP * 8, -48, wiltP),
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
            <div className="hero-opening-copy relative z-20 mt-8 max-w-3xl text-center opacity-40 md:mt-10">
              <BlurText
                text="Recall"
                className="font-display justify-center text-7xl text-white md:text-9xl"
                animateBy="letters"
                delay={45}
                threshold={0}
              />
              <div className="mt-5">
                <GradientText
                  colors={['#9CA3AF', '#D1D5DB', '#FDA4AF', '#F9A8D4']}
                  animationSpeed={5}
                  className="font-display text-2xl italic md:text-4xl"
                >
                  Grey fades. Color returns.
                </GradientText>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/55 md:text-xl">
                Scroll to open the flower — memory and clarity returning, petal by petal.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
