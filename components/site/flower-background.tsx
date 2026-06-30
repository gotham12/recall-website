'use client';

import BlurText from '@/components/BlurText';
import GradientText from '@/components/GradientText';
import { FlowerScene } from '@/components/site/flower-scene';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type FlowerPhase = 'home' | 'problem' | 'product';

type FlowerBackgroundProps = {
  phase: FlowerPhase;
};

function bloomFlower(
  stage: HTMLElement,
  opts: { duration?: number; delay?: number; ease?: string } = {}
) {
  const petals = stage.querySelectorAll<HTMLElement>('.flower-petal');
  const bud = stage.querySelector<HTMLElement>('.flower-bud');
  const center = stage.querySelector<HTMLElement>('.flower-center');
  const leaves = stage.querySelectorAll<HTMLElement>('.flower-leaf');
  const glow = stage.querySelector<HTMLElement>('.flower-glow');
  const stem = stage.querySelector<HTMLElement>('.flower-stem');

  const tl = gsap.timeline({
    defaults: { ease: opts.ease ?? 'power3.out' },
    delay: opts.delay ?? 0,
  });

  tl.set(stage, { filter: 'grayscale(0) brightness(1) saturate(1.1)' })
    .to(bud, { scale: 1.08, duration: 0.35 })
    .to(bud, { opacity: 0, scale: 0.85, duration: 0.55 }, '-=0.1')
    .to(
      petals,
      {
        opacity: 1,
        rotationX: -18,
        duration: opts.duration ?? 1.6,
        stagger: { amount: 0.85, from: 'center' },
      },
      '-=0.35'
    )
    .to(center, { opacity: 1, scale: 1, duration: 0.45 }, '-=0.55')
    .to(leaves, { opacity: 0.85, duration: 0.6, stagger: 0.12 }, '-=0.5')
    .to(glow, { opacity: 0.75, scale: 1.15, duration: 1.2 }, 0)
    .to(stem, { scaleY: 1, opacity: 0.9, duration: 0.8, transformOrigin: 'top center' }, 0);

  return tl;
}

function wiltFlower(stage: HTMLElement, opts: { duration?: number; delay?: number } = {}) {
  const petals = stage.querySelectorAll<HTMLElement>('.flower-petal');
  const center = stage.querySelector<HTMLElement>('.flower-center');
  const leaves = stage.querySelectorAll<HTMLElement>('.flower-leaf');
  const glow = stage.querySelector<HTMLElement>('.flower-glow');

  return gsap.timeline({ delay: opts.delay ?? 0 }).to(
    [petals, center, leaves, glow],
    {
      rotationX: 48,
      y: 36,
      opacity: 0.22,
      filter: 'grayscale(0.95) sepia(0.35) brightness(0.45) saturate(0.35)',
      duration: opts.duration ?? 1.8,
      stagger: { amount: 0.25, from: 'random' },
      ease: 'power3.inOut',
    },
    0
  );
}

export function FlowerBackground({ phase }: FlowerBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const ambientStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const heroStage = heroStageRef.current;
    const ambientStage = ambientStageRef.current;
    if (!root || !ambientStage) return;

    const ctx = gsap.context(() => {
      gsap.set(ambientStage, { scale: 1.35, opacity: phase === 'problem' ? 0.14 : 0.22 });

      if (phase === 'home' && heroStage && openingRef.current && pinRef.current) {
        gsap.set(heroStage.querySelectorAll('.flower-petal'), { opacity: 0, rotationX: -78 });
        gsap.set(heroStage.querySelector('.flower-center'), { opacity: 0, scale: 0.6 });
        gsap.set(heroStage.querySelector('.flower-bud'), { opacity: 1, scale: 1 });

        const openTl = bloomFlower(heroStage, { duration: 1.8, delay: 0.25 });
        bloomFlower(ambientStage, { duration: 2, delay: 0.4, ease: 'power2.out' });

        openTl.eventCallback('onComplete', () => {
          gsap.to([heroStage, ambientStage], {
            y: '+=6',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });

        const wiltTl = gsap.timeline({
          scrollTrigger: {
            trigger: openingRef.current,
            start: 'top top',
            end: '+=240%',
            scrub: 1.3,
            pin: pinRef.current,
          },
        });

        wiltTl
          .to('.hero-opening-copy', { opacity: 0, y: -50, filter: 'blur(8px)', ease: 'power2.in' }, 0.15)
          .add(wiltFlower(heroStage, { duration: 1 }).timeScale(1.2), 0.1)
          .add(wiltFlower(ambientStage, { duration: 1 }).timeScale(1.2), 0.1)
          .to(ambientStage, { opacity: 0.1, scale: 1.1, ease: 'power2.in' }, 0.2);
      }

      if (phase === 'problem') {
        gsap.set(ambientStage.querySelector('.flower-bud'), { opacity: 0 });
        gsap.set(ambientStage.querySelectorAll('.flower-petal'), {
          opacity: 0.22,
          rotationX: 52,
        });
        gsap.set(ambientStage.querySelector('.flower-center'), { opacity: 0.12 });
        gsap.set(ambientStage.querySelectorAll('.flower-leaf'), { opacity: 0.08, rotationX: 30 });
        gsap.set(ambientStage, {
          filter: 'grayscale(1) sepia(0.3) brightness(0.4) saturate(0.25)',
          opacity: 0.12,
        });
        wiltFlower(ambientStage, { duration: 1.4, delay: 0.15 });
      }

      if (phase === 'product') {
        gsap.set(ambientStage.querySelectorAll('.flower-petal'), { opacity: 0, rotationX: -78 });
        gsap.set(ambientStage.querySelector('.flower-bud'), { opacity: 1 });
        gsap.set(ambientStage, { filter: 'grayscale(0.4) brightness(0.7)', opacity: 0.2 });
        bloomFlower(ambientStage, { duration: 2, delay: 0.15 });
        gsap.to(ambientStage, {
          opacity: 0.28,
          duration: 2,
          delay: 0.5,
          ease: 'power2.out',
        });
        gsap.to(ambientStage, {
          y: '+=8',
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.2,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [phase]);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none">
      {/* Integrated ambient flower — every page */}
      <div
        className={cn(
          'fixed inset-0 z-0 overflow-hidden',
          phase === 'problem' && 'bg-gradient-to-b from-zinc-950 via-zinc-950 to-black',
          phase === 'product' && 'bg-gradient-to-b from-product-50/80 via-white/50 to-recall-mint/10',
          phase === 'home' && 'bg-gradient-to-b from-ink via-ink to-ink-50/80'
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center pt-[8vh]">
          <FlowerScene ref={ambientStageRef} size="ambient" className="opacity-100" />
        </div>
        <div
          className={cn(
            'absolute inset-0',
            phase === 'problem' && 'bg-[radial-gradient(circle_at_50%_40%,transparent_20%,rgba(0,0,0,0.55)_100%)]',
            phase === 'product' && 'bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.55),transparent_65%)]',
            phase === 'home' && 'bg-[radial-gradient(circle_at_50%_38%,transparent_25%,rgba(7,11,20,0.72)_100%)]'
          )}
        />
      </div>

      {/* Home-only pinned opening */}
      {phase === 'home' && (
        <div ref={openingRef} className="relative z-10">
          <div
            ref={pinRef}
            className="flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-16 pt-28"
          >
            <FlowerScene ref={heroStageRef} size="hero" />
            <div className="hero-opening-copy relative z-20 mt-8 max-w-3xl text-center md:mt-10">
              <BlurText
                text="Recall"
                className="font-display justify-center text-7xl text-white md:text-9xl"
                animateBy="letters"
                delay={45}
                threshold={0}
              />
              <div className="mt-5">
                <GradientText
                  colors={['#F472B6', '#FB7185', '#FDA4AF', '#F9A8D4']}
                  animationSpeed={4}
                  className="font-display text-2xl italic md:text-4xl"
                >
                  A flower opens. A story begins.
                </GradientText>
              </div>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/55 md:text-xl">
                Scroll — the bloom gives way as the weight of the problem arrives.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
