'use client';

import AnimatedButton from '@/components/ui/animated-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { AssetImage } from '@/components/site/asset-image';
import {
  applyBloomProgress,
  applyCloseProgress,
  initClosedState,
  prefersReducedMotion,
  resetAmbientMotion,
  startAmbientMotion,
} from '@/components/site/flower-animation';
import { FlowerScene } from '@/components/site/flower-scene';
import { DEMO_URL, HERO_COPY, HERO_FLOWER, PAGE_BACKGROUNDS } from '@/lib/constants';
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
    const bgBloom = bgBloomRef.current;
    if (!root) return;

    resetAmbientMotion();

    const ctx = gsap.context(() => {
      if (phase !== 'home') return;

      if (reducedMotion) {
        if (!openingRef.current || !pinRef.current || !heroStage) return;
        ScrollTrigger.create({
          trigger: openingRef.current,
          start: 'top top',
          end: '+=240%',
          pin: pinRef.current,
          scrub: 0.6,
          onUpdate: (self) => {
            const openP = gsap.utils.clamp(0, 1, self.progress / 0.42);
            const closeP = gsap.utils.clamp(0, 1, (self.progress - 0.5) / 0.5);
            setReducedBloom(openP >= 0.5 && closeP < 0.4 ? 1 : 0);
            gsap.set('.hero-opening-copy', { opacity: 1 - closeP * 0.85, y: closeP * -36 });
            if (bgBloom) gsap.set(bgBloom, { opacity: gsap.utils.interpolate(0, 0.5, openP) * (1 - closeP) });
          },
        });
        return;
      }

      if (!heroStage || !openingRef.current || !pinRef.current) return;

      initClosedState(heroStage);
      if (bgBloom) gsap.set(bgBloom, { opacity: 0 });

      let ambientRunning = false;

      ScrollTrigger.create({
        trigger: openingRef.current,
        start: 'top top',
        end: '+=300%',
        pin: pinRef.current,
        scrub: 1.1,
        onUpdate: (self) => {
          const openEnd = 0.46;
          const openP = gsap.utils.clamp(0, 1, self.progress / openEnd);
          const closeP = gsap.utils.clamp(0, 1, (self.progress - openEnd) / (1 - openEnd));

          if (closeP <= 0.01) {
            applyBloomProgress(heroStage, openP);
          } else {
            applyBloomProgress(heroStage, 1);
            applyCloseProgress(heroStage, closeP);
          }

          if (bgBloom) {
            gsap.set(bgBloom, {
              opacity: gsap.utils.interpolate(0, 0.55, openP) * (1 - closeP * 0.9),
            });
          }

          gsap.set('.hero-opening-copy', {
            opacity: gsap.utils.clamp(0.88, 1, 0.88 + openP * 0.12) * (1 - closeP * 0.9),
            y: gsap.utils.interpolate(openP * 3, -42, closeP),
            filter: closeP > 0.25 ? `blur(${closeP * 6}px)` : 'blur(0px)',
          });

          if (openP >= 0.98 && closeP < 0.02 && !ambientRunning) {
            ambientRunning = true;
            startAmbientMotion(heroStage);
          }
        },
      });
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
          'fixed inset-0 z-0 overflow-hidden',
          phase === 'home' && 'bg-gradient-to-b from-[#020408] via-ink to-ink-50/90'
        )}
      >
        {/* Problem — gloomy neurodegenerative brain atmosphere */}
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

        {/* Product — hyperrealistic forget-me-not photographic background */}
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
                className="flower-bg-blend object-cover object-center scale-110"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-product-50/88 via-white/75 to-recall-mint/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,255,255,0.55),transparent_70%)]" />
          </div>
        )}

        {/* Home — subtle photographic wash behind scroll hero */}
        {phase === 'home' && (
          <>
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 68%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black, transparent 68%)',
              }}
            >
              <div className="relative h-full w-full">
                <AssetImage
                  src={HERO_FLOWER.image}
                  alt=""
                  fill
                  className="flower-bg-blend object-cover object-center blur-sm scale-110"
                  sizes="100vw"
                />
              </div>
            </div>
            <div
              ref={bgBloomRef}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(56,189,248,0.12),rgba(125,211,252,0.05)_45%,transparent_72%)] opacity-0"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,transparent_20%,rgba(7,11,20,0.82)_100%)]" />
          </>
        )}
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
            <div className="hero-opening-copy pointer-events-auto relative z-20 mt-4 max-w-3xl text-center md:mt-6">
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
                  <InteractiveHoverButton className="border-sky-400/30 bg-sky-400/10 px-8 text-white">
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
