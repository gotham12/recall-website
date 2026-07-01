'use client';

import AnimatedButton from '@/components/ui/animated-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { DEMO_URL, HERO_COPY } from '@/lib/constants';
import { clamp01, lerp } from '@/lib/brain-palette';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const HEADLINE_WORDS = HERO_COPY.headline.split(/\s+/);
const SUBHEAD_WORDS = HERO_COPY.subhead.split(/\s+/);

type HeroBrainCopyProps = {
  progress: number;
  reducedMotion?: boolean;
  className?: string;
};

function wordOpacity(global: number, index: number, total: number, start: number, span: number): number {
  const threshold = start + (index / total) * span;
  return clamp01((global - threshold) / 0.035);
}

/**
 * Word-by-word reveal, retimed to bloom in during beat 4 of the brain
 * sequence (the warm crossfade), rather than across the whole scroll.
 */
export function HeroBrainCopy({ progress, reducedMotion = false, className }: HeroBrainCopyProps) {
  const p = reducedMotion ? 1 : progress;
  const taglineP = clamp01((p - 0.7) / 0.1);
  const headlineP = clamp01((p - 0.78) / 0.16);
  const subP = clamp01((p - 0.87) / 0.1);
  const ctaP = clamp01((p - 0.93) / 0.07);
  const hintP = clamp01((p - 0.97) / 0.03);

  return (
    <div className={cn('pointer-events-auto relative z-20 max-w-3xl text-center', className)}>
      <p
        className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/40"
        style={{
          opacity: taglineP,
          filter: reducedMotion ? 'none' : `blur(${lerp(6, 0, taglineP)}px)`,
          transform: `translateY(${lerp(8, 0, taglineP)}px)`,
        }}
      >
        Grey fades. Color returns.
      </p>

      <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
        {HEADLINE_WORDS.map((word, i) => {
          const wo = wordOpacity(headlineP, i, HEADLINE_WORDS.length, 0, 0.8);
          return (
            <span
              key={`${word}-${i}`}
              className="mr-[0.28em] inline-block"
              style={{
                opacity: wo,
                filter: reducedMotion ? 'none' : `blur(${lerp(10, 0, wo)}px)`,
                transform: `translateY(${lerp(12, 0, wo)}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed md:text-xl">
        {SUBHEAD_WORDS.map((word, i) => {
          const wo = wordOpacity(subP, i, SUBHEAD_WORDS.length, 0, 0.85) * subP;
          return (
            <span
              key={`sub-${word}-${i}`}
              className="mr-[0.26em] inline-block text-white/60"
              style={{
                opacity: wo,
                filter: reducedMotion ? 'none' : `blur(${lerp(8, 0, wo)}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </p>

      <div
        className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        style={{ opacity: ctaP, transform: `translateY(${lerp(16, 0, ctaP)}px)` }}
      >
        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
          <AnimatedButton className="rounded-full border-white/15 bg-white px-8 text-ink">
            Try the live app
          </AnimatedButton>
        </a>
        <Link href="/#demo">
          <InteractiveHoverButton className="border-recall-coral/30 bg-recall-coral/10 px-8 text-white">
            Watch the demo
          </InteractiveHoverButton>
        </Link>
      </div>

      <p
        className="mx-auto mt-6 max-w-md text-sm text-white/40 md:text-base"
        style={{ opacity: hintP * 0.85 }}
      >
        {HERO_COPY.scrollHint}
      </p>
    </div>
  );
}
