'use client';

import { AssetImage } from '@/components/site/asset-image';
import { FLOWER_ASSETS } from '@/lib/constants';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type FlowerSpec = {
  x: number;
  y: number;
  size: number;
  rotate: number;
  asset: (typeof FLOWER_ASSETS)[number];
  delay: number;
};

const FLOWERS: FlowerSpec[] = [
  { x: 6, y: 14, size: 140, rotate: -12, asset: FLOWER_ASSETS[0], delay: 0 },
  { x: 16, y: 58, size: 120, rotate: 8, asset: FLOWER_ASSETS[1], delay: 0.12 },
  { x: 84, y: 20, size: 130, rotate: 15, asset: FLOWER_ASSETS[2], delay: 0.06 },
  { x: 74, y: 68, size: 150, rotate: -6, asset: FLOWER_ASSETS[3], delay: 0.18 },
  { x: 38, y: 8, size: 110, rotate: 20, asset: FLOWER_ASSETS[0], delay: 0.08 },
  { x: 52, y: 44, size: 165, rotate: -18, asset: FLOWER_ASSETS[1], delay: 0.14 },
  { x: 93, y: 48, size: 105, rotate: 10, asset: FLOWER_ASSETS[2], delay: 0.22 },
  { x: 4, y: 38, size: 125, rotate: -22, asset: FLOWER_ASSETS[3], delay: 0.16 },
  { x: 26, y: 78, size: 115, rotate: 6, asset: FLOWER_ASSETS[0], delay: 0.24 },
  { x: 90, y: 82, size: 135, rotate: -14, asset: FLOWER_ASSETS[1], delay: 0.1 },
  { x: 60, y: 86, size: 100, rotate: 18, asset: FLOWER_ASSETS[2], delay: 0.28 },
  { x: 32, y: 28, size: 95, rotate: -8, asset: FLOWER_ASSETS[3], delay: 0.32 },
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

    const flowers = gsap.utils.toArray<HTMLElement>('.scroll-flower-photo', root);

    const ctx = gsap.context(() => {
      if (mode === 'home') {
        gsap.set(flowers, {
          scale: 0.12,
          opacity: 0.15,
          rotation: -25,
          filter: 'grayscale(0.55) blur(1px) brightness(0.7)',
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }).to(flowers, {
          scale: 1,
          opacity: 0.98,
          rotation: (i) => FLOWERS[i]?.rotate ?? 0,
          filter: 'grayscale(0) blur(0px) brightness(1.08) saturate(1.15)',
          stagger: { amount: 0.55, from: 'random' },
          ease: 'power2.out',
        });

        flowers.forEach((el, i) => {
          gsap.to(el, {
            y: `+=${10 + (i % 4) * 5}`,
            x: `+=${i % 2 === 0 ? 8 : -8}`,
            rotation: `+=${i % 2 === 0 ? 4 : -4}`,
            duration: 3.2 + (i % 3) * 0.7,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: FLOWERS[i]?.delay ?? 0,
          });
        });
      }

      if (mode === 'wilt') {
        gsap.set(flowers, { scale: 0.9, opacity: 0.75 });
        gsap.to(flowers, {
          scale: 0.35,
          opacity: 0.12,
          rotation: '+=55',
          y: 50,
          filter: 'grayscale(1) sepia(0.4) brightness(0.45) saturate(0.3) blur(0.5px)',
          duration: 2,
          stagger: 0.07,
          ease: 'power3.inOut',
        });
      }

      if (mode === 'bloom') {
        gsap.set(flowers, {
          scale: 0.15,
          opacity: 0,
          rotation: -35,
          filter: 'grayscale(0.6) blur(2px) brightness(0.65)',
        });
        gsap.to(flowers, {
          scale: 1,
          opacity: 0.96,
          rotation: (i) => FLOWERS[i]?.rotate ?? 0,
          filter: 'grayscale(0) blur(0px) brightness(1.1) saturate(1.2)',
          duration: 1.6,
          stagger: { amount: 0.6, from: 'random' },
          ease: 'back.out(1.5)',
        });

        flowers.forEach((el, i) => {
          gsap.to(el, {
            y: `+=${12 + (i % 5) * 4}`,
            rotation: `+=${i % 2 === 0 ? 6 : -6}`,
            duration: 3.5 + (i % 4) * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.35 + (i % 6) * 0.1,
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
          className="scroll-flower-photo absolute relative will-change-transform"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            transform: `translate(-50%, -50%) rotate(${f.rotate}deg)`,
          }}
        >
          <AssetImage
            src={f.asset}
            alt=""
            fill
            className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            sizes={`${f.size}px`}
          />
        </div>
      ))}
    </div>
  );
}
