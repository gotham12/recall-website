'use client';

import BlurText from '@/components/BlurText';
import GradientText from '@/components/GradientText';
import ShinyText from '@/components/ShinyText';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { Brain, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 140;
const ORB_COLORS = ['#FF6B4A', '#4F8CFF', '#8B5CF6', '#34D399', '#F472B6', '#38BDF8', '#FBBF24'];

export function HeroIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    const orb = orbRef.current;
    if (!root || !overlay || !orb) return;

    const particles = gsap.utils.toArray<HTMLElement>('.hero-particle', overlay);
    const rings = gsap.utils.toArray<HTMLElement>('.hero-ring', overlay);
    const blobs = gsap.utils.toArray<HTMLElement>('.hero-blob', overlay);
    const shards = gsap.utils.toArray<HTMLElement>('.hero-shard', overlay);

    const ctx = gsap.context(() => {
      gsap.to(orb, { rotate: 360, duration: 36, repeat: -1, ease: 'none' });

      gsap.to(blobs, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        scale: () => gsap.utils.random(0.85, 1.2),
        duration: () => gsap.utils.random(4, 8),
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'sine.inOut',
      });

      gsap.to(rings, {
        scale: 1.2,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: 'sine.inOut',
      });

      gsap.fromTo(
        shards,
        { scale: 0, opacity: 0, rotate: -90 },
        {
          scale: 1,
          opacity: 0.75,
          rotate: 0,
          duration: 1.4,
          stagger: { amount: 1.2, from: 'random' },
          ease: 'back.out(1.8)',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        particles,
        { scale: 0, opacity: 0 },
        {
          scale: () => gsap.utils.random(0.6, 1.4),
          opacity: () => gsap.utils.random(0.5, 1),
          duration: 1.6,
          stagger: { amount: 1.4, from: 'random' },
          ease: 'elastic.out(1, 0.65)',
          delay: 0.1,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=280%',
          scrub: 1.4,
          pin: overlay,
        },
      });

      tl.to(
        particles,
        {
          opacity: 0,
          scale: 0.1,
          x: () => gsap.utils.random(-320, 320),
          y: () => gsap.utils.random(-280, 280),
          rotate: () => gsap.utils.random(-240, 240),
          filter: 'blur(16px) hue-rotate(90deg)',
          stagger: { amount: 1.2, from: 'random' },
          ease: 'power4.in',
        },
        0
      )
        .to(
          shards,
          {
            opacity: 0,
            scale: 2.2,
            rotate: () => gsap.utils.random(-180, 180),
            filter: 'blur(24px)',
            stagger: 0.04,
            ease: 'power3.in',
          },
          0
        )
        .to(
          blobs,
          {
            opacity: 0,
            scale: 2.5,
            filter: 'blur(40px)',
            stagger: 0.1,
            ease: 'power2.in',
          },
          0
        )
        .to(
          rings,
          {
            opacity: 0,
            scale: 2.4,
            filter: 'blur(28px)',
            stagger: 0.08,
            ease: 'power2.in',
          },
          0.05
        )
        .to(
          orb,
          {
            opacity: 0,
            scale: 0.2,
            y: -120,
            rotate: 180,
            filter: 'blur(20px) brightness(2)',
            ease: 'power4.in',
          },
          0.08
        )
        .to(
          '.hero-intro-copy',
          {
            opacity: 0,
            y: -100,
            scale: 0.85,
            filter: 'blur(12px)',
            ease: 'power3.in',
          },
          0
        )
        .to(
          '.hero-aurora-sweep',
          {
            opacity: 0,
            scale: 1.8,
            ease: 'power2.in',
          },
          0.2
        )
        .to(overlay, { pointerEvents: 'none' }, 0.9);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={overlayRef}
        className="relative z-20 flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-ink"
      >
        <AnimatedRays className="absolute inset-0 opacity-60" />

        <div className="hero-aurora-sweep pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,74,0.35),transparent_42%),radial-gradient(circle_at_80%_15%,rgba(79,140,255,0.35),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(52,211,153,0.28),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.3),transparent_38%)]" />

        {ORB_COLORS.map((color, i) => (
          <div
            key={color}
            className="hero-blob absolute rounded-full blur-3xl"
            style={{
              width: `${180 + i * 40}px`,
              height: `${180 + i * 40}px`,
              left: `${5 + i * 13}%`,
              top: `${8 + ((i * 17) % 70)}%`,
              background: color,
              opacity: 0.22,
            }}
          />
        ))}

        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`shard-${i}`}
            className="hero-shard absolute h-px w-24 origin-center"
            style={{
              left: `${(i * 41) % 100}%`,
              top: `${(i * 29) % 100}%`,
              rotate: `${i * 15}deg`,
              background: `linear-gradient(90deg, transparent, ${ORB_COLORS[i % ORB_COLORS.length]}, transparent)`,
            }}
          />
        ))}

        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full"
            style={{
              width: `${2 + (i % 5)}px`,
              height: `${2 + (i % 5)}px`,
              left: `${(i * 7.3) % 96}%`,
              top: `${(i * 11.7) % 92}%`,
              background: ORB_COLORS[i % ORB_COLORS.length],
              boxShadow: `0 0 ${8 + (i % 6) * 2}px ${ORB_COLORS[i % ORB_COLORS.length]}`,
            }}
          />
        ))}

        <div className="hero-ring absolute h-64 w-64 rounded-full border-2 border-recall-coral/40 md:h-80 md:w-80" />
        <div className="hero-ring absolute h-96 w-96 rounded-full border border-recall-blue/35 md:h-[28rem] md:w-[28rem]" />
        <div className="hero-ring absolute h-[32rem] w-[32rem] rounded-full border border-recall-violet/25" />
        <div className="hero-ring absolute h-[40rem] w-[40rem] rounded-full border border-recall-mint/15" />

        <div
          ref={orbRef}
          className="relative mb-10 flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-recall-coral via-recall-violet to-recall-blue shadow-[0_0_120px_rgba(139,92,246,0.55)] md:h-32 md:w-32"
        >
          <Brain className="h-14 w-14 text-white md:h-16 md:w-16" strokeWidth={1.5} />
          <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-recall-mint" />
        </div>

        <div className="hero-intro-copy relative z-10 max-w-4xl px-6 text-center">
          <BlurText
            text="Recall"
            className="font-display justify-center text-7xl text-white md:text-9xl"
            animateBy="letters"
            delay={40}
            threshold={0}
            rootMargin="0px"
          />
          <div className="mt-5">
            <GradientText
              colors={['#FF6B4A', '#4F8CFF', '#34D399', '#F472B6', '#38BDF8']}
              animationSpeed={4}
              className="font-display text-2xl italic md:text-4xl"
            >
              Cognitive care that listens before crisis.
            </GradientText>
          </div>
          <ShinyText
            text="A living story — from weight to lift."
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg"
            color="#e2e8f0"
            shineColor="#ffffff"
          />
        </div>
      </div>
    </div>
  );
}
