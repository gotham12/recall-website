'use client';

import BlurText from '@/components/BlurText';
import ShinyText from '@/components/ShinyText';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { Brain } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 48;

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

    const ctx = gsap.context(() => {
      gsap.to(orb, {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(rings, {
        scale: 1.15,
        opacity: 0.35,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: 'sine.inOut',
      });

      gsap.fromTo(
        particles,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.85,
          duration: 1.2,
          stagger: { amount: 0.8, from: 'center' },
          ease: 'back.out(1.4)',
          delay: 0.15,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=130%',
          scrub: 1.1,
          pin: overlay,
        },
      });

      tl.to(
        particles,
        {
          opacity: 0,
          scale: 0.2,
          x: () => gsap.utils.random(-220, 220),
          y: () => gsap.utils.random(-180, 180),
          rotate: () => gsap.utils.random(-180, 180),
          filter: 'blur(12px)',
          stagger: { amount: 0.6, from: 'random' },
          ease: 'power3.in',
        },
        0
      )
        .to(
          rings,
          {
            opacity: 0,
            scale: 1.8,
            filter: 'blur(20px)',
            stagger: 0.08,
            ease: 'power2.in',
          },
          0
        )
        .to(
          orb,
          {
            opacity: 0,
            scale: 0.4,
            y: -80,
            filter: 'blur(16px)',
            ease: 'power3.in',
          },
          0.05
        )
        .to(
          '.hero-intro-copy',
          {
            opacity: 0,
            y: -60,
            filter: 'blur(8px)',
            ease: 'power2.in',
          },
          0
        )
        .to(
          overlay,
          {
            pointerEvents: 'none',
          },
          0.85
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={overlayRef}
        className="relative z-20 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink px-6"
      >
        <AnimatedRays className="absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(79,140,255,0.22),transparent_55%)]" />

        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="hero-particle absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${8 + ((i * 17) % 84)}%`,
              top: `${10 + ((i * 23) % 78)}%`,
              background:
                i % 3 === 0 ? '#4F8CFF' : i % 3 === 1 ? '#8B5CF6' : '#34D399',
              boxShadow: '0 0 12px rgba(79,140,255,0.45)',
            }}
          />
        ))}

        <div className="hero-ring absolute h-56 w-56 rounded-full border border-recall-blue/30 md:h-72 md:w-72" />
        <div className="hero-ring absolute h-80 w-80 rounded-full border border-recall-violet/20 md:h-[22rem] md:w-[22rem]" />
        <div className="hero-ring absolute h-[28rem] w-[28rem] rounded-full border border-recall-mint/10" />

        <div ref={orbRef} className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-recall-blue to-recall-violet shadow-[0_0_80px_rgba(79,140,255,0.45)] md:h-28 md:w-28">
          <Brain className="h-12 w-12 text-white md:h-14 md:w-14" strokeWidth={1.5} />
        </div>

        <div className="hero-intro-copy relative z-10 max-w-3xl text-center">
          <BlurText
            text="Recall"
            className="font-display justify-center text-6xl text-white md:text-8xl"
            animateBy="letters"
            delay={50}
            threshold={0}
            rootMargin="0px"
          />
          <ShinyText
            text="Cognitive care that listens before crisis."
            className="mx-auto mt-4 max-w-xl text-lg text-white/70 md:text-xl"
            color="#cbd5e1"
            shineColor="#ffffff"
          />
          <p className="mt-8 animate-bounce text-xs uppercase tracking-[0.35em] text-white/40">
            Scroll to enter
          </p>
        </div>
      </div>
    </div>
  );
}
