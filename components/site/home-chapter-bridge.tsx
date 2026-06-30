'use client';

import FadeContent from '@/components/FadeContent';
import { PageNavCards } from '@/components/site/navbar';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeChapterBridge() {
  const sectionRef = useRef<HTMLElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wash = washRef.current;
    if (!section || !wash) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(wash, { opacity: 0.45 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wash,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Warm wash — dark problem → bright product */}
      <div
        ref={washRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-recall-blue/[0.06] to-product-100/25 opacity-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(253,164,175,0.08),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeContent blur className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-label mb-4">Two chapters. One arc.</p>
          <h2 id="story-heading" className="font-display text-3xl text-white md:text-5xl">
            Feel the weight of the problem.
            <span className="mt-2 block bg-gradient-to-r from-recall-blue via-recall-violet to-recall-mint bg-clip-text text-transparent italic">
              Then feel the lift of the product.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/55 md:text-xl">
            The story darkens before it brightens — one continuous emotional journey from crisis to clarity.
          </p>
        </FadeContent>

        <FadeContent blur threshold={0.08} delay={0.08}>
          <PageNavCards />
        </FadeContent>
      </div>
    </section>
  );
}
