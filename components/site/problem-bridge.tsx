'use client';

import BlurText from '@/components/BlurText';
import GradientText from '@/components/GradientText';
import AnimatedButton from '@/components/ui/animated-button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import Link from 'next/link';

export function ProblemBridge() {
  return (
    <section className="relative border-t border-zinc-800 bg-black py-28 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <BlurText
          text="There is a way forward."
          className="font-display justify-center text-4xl text-zinc-200 md:text-6xl"
          delay={60}
        />
        <div className="mt-6">
          <GradientText
            colors={['#34D399', '#4F8CFF', '#38BDF8', '#34D399']}
            animationSpeed={5}
            className="font-display text-3xl italic md:text-5xl"
          >
            The colors lift when hope arrives.
          </GradientText>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-500 md:text-xl">
          Step into the product chapter — brighter tones, Clara voice, Recall AI briefings, and the Recall Cascade in
          action.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/product/">
            <InteractiveHoverButton className="border-recall-mint/40 bg-recall-mint/15 text-white">
              Continue to the product
            </InteractiveHoverButton>
          </Link>
          <Link href="/">
            <AnimatedButton className="rounded-full border-zinc-700 bg-transparent text-zinc-300 dark:bg-transparent">
              Back to home
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
