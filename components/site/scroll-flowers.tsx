'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type FlowerSpec = {
  x: number;
  y: number;
  size: number;
  hue: number;
  delay: number;
};

const FLOWERS: FlowerSpec[] = [
  { x: 8, y: 18, size: 52, hue: 330, delay: 0 },
  { x: 18, y: 62, size: 44, hue: 280, delay: 0.1 },
  { x: 82, y: 24, size: 48, hue: 200, delay: 0.05 },
  { x: 72, y: 70, size: 56, hue: 160, delay: 0.15 },
  { x: 42, y: 12, size: 38, hue: 310, delay: 0.08 },
  { x: 55, y: 48, size: 64, hue: 340, delay: 0.12 },
  { x: 92, y: 52, size: 40, hue: 190, delay: 0.2 },
  { x: 5, y: 42, size: 46, hue: 350, delay: 0.18 },
  { x: 28, y: 82, size: 42, hue: 270, delay: 0.22 },
  { x: 88, y: 86, size: 50, hue: 175, delay: 0.14 },
  { x: 62, y: 88, size: 36, hue: 320, delay: 0.25 },
  { x: 35, y: 30, size: 34, hue: 210, delay: 0.3 },
];

type ScrollFlowersProps = {
  mode: 'home' | 'wilt' | 'bloom';
  className?: string;
};

export function ScrollFlowers({ mode, className }: ScrollFlowersProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const petals = gsap.utils.toArray<HTMLElement>('.scroll-flower', root);
    const stems = gsap.utils.toArray<HTMLElement>('.scroll-flower-stem', root);

    const ctx = gsap.context(() => {
      if (mode === 'home') {
        gsap.set(petals, { scale: 0.15, opacity: 0.2, rotate: -20, filter: 'grayscale(0.4)' });
        gsap.set(stems, { scaleY: 0.3, opacity: 0.3 });

        gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        })
          .to(petals, {
            scale: 1,
            opacity: 0.95,
            rotate: 0,
            filter: 'grayscale(0)',
            stagger: { amount: 0.4, from: 'random' },
            ease: 'power2.out',
          })
          .to(
            stems,
            {
              scaleY: 1,
              opacity: 0.85,
              stagger: { amount: 0.35, from: 'random' },
              ease: 'power2.out',
            },
            0
          );

        petals.forEach((el, i) => {
          gsap.to(el, {
            y: `+=${8 + (i % 4) * 4}`,
            x: `+=${i % 2 === 0 ? 6 : -6}`,
            duration: 2.8 + (i % 3) * 0.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: FLOWERS[i]?.delay ?? 0,
          });
        });
      }

      if (mode === 'wilt') {
        gsap.set(petals, { scale: 0.85, opacity: 0.7, rotate: 0 });
        gsap.to(petals, {
          scale: 0.35,
          opacity: 0.15,
          rotate: 55,
          y: 40,
          filter: 'grayscale(1) sepia(0.35) brightness(0.55)',
          duration: 1.8,
          stagger: 0.06,
          ease: 'power3.inOut',
        });
        gsap.to(stems, {
          scaleY: 0.2,
          opacity: 0.12,
          rotate: 12,
          duration: 1.6,
          stagger: 0.05,
          ease: 'power3.inOut',
        });
      }

      if (mode === 'bloom') {
        gsap.set(petals, { scale: 0.2, opacity: 0, rotate: -30, filter: 'grayscale(0.5)' });
        gsap.set(stems, { scaleY: 0.2, opacity: 0 });
        gsap.to(petals, {
          scale: 1,
          opacity: 0.92,
          rotate: 0,
          filter: 'grayscale(0) brightness(1.05)',
          duration: 1.4,
          stagger: { amount: 0.5, from: 'random' },
          ease: 'back.out(1.6)',
        });
        gsap.to(stems, {
          scaleY: 1,
          opacity: 0.8,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power2.out',
        });

        petals.forEach((el, i) => {
          gsap.to(el, {
            y: `+=${10 + (i % 5) * 3}`,
            rotate: `+=${i % 2 === 0 ? 8 : -8}`,
            duration: 3.2 + (i % 4) * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.3 + (i % 6) * 0.1,
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, [mode]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 z-[5] overflow-hidden',
        mode === 'wilt' && 'opacity-90',
        className
      )}
    >
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="scroll-flower-stem mx-auto h-16 w-0.5 origin-bottom rounded-full bg-emerald-500/40"
            style={{ height: f.size * 0.9 }}
          />
          <svg
            className="scroll-flower relative -mt-1"
            width={f.size}
            height={f.size}
            viewBox="0 0 100 100"
            style={{ marginLeft: -f.size / 2 }}
          >
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="50"
                cy="28"
                rx="14"
                ry="22"
                fill={`hsl(${f.hue} 85% 65%)`}
                transform={`rotate(${angle} 50 50)`}
                opacity={0.92}
              />
            ))}
            <circle cx="50" cy="50" r="11" fill={`hsl(${f.hue} 90% 55%)`} />
            <circle cx="46" cy="46" r="4" fill={`hsl(${f.hue} 95% 75%)`} opacity={0.6} />
          </svg>
        </div>
      ))}
    </div>
  );
}
