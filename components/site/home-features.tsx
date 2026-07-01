'use client';

import FadeContent from '@/components/FadeContent';
import { ScreenshotGrid } from '@/components/site/screenshot-grid';
import { HOME_FEATURES, HOME_SCREENSHOTS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

/** Layout assignments for the bento: first two features are wide, rest are narrower */
const BENTO_SPAN = ['col-span-1 md:col-span-2', 'col-span-1 md:col-span-2', 'col-span-1', 'col-span-1', 'col-span-1 md:col-span-2'] as const;

export function HomeFeatures() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" aria-labelledby="features-heading" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-14 max-w-3xl">
          {/* Eyebrow intentionally removed — headline alone is sufficient (taste-skill: max 1 eyebrow per 3 sections) */}
          <h2
            id="features-heading"
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl"
          >
            Dignity for her.
            <br />
            <span className="text-white/45">Signal for you.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/55 md:text-xl">
            Every capability pairs what a family feels with how Recall delivers it. Voice-first for Margaret,
            clarity-first for Susan.
          </p>
        </FadeContent>

        {/* Feature bento grid — no hairlines, varied sizes, real card elevation */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {HOME_FEATURES.map((feature, i) => (
            <motion.article
              key={feature.id}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/8 bg-ink-100/60 p-7 md:p-8',
                BENTO_SPAN[i]
              )}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE_SPRING }}
            >
              {/* Hover spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(79,140,255,0.07), transparent 70%)',
                }}
              />

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-recall-sky/70">
                {feature.tag}
              </p>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/60 md:text-lg">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>

        <FadeContent blur threshold={0.06} delay={0.1} className="mt-20">
          <ScreenshotGrid columns={3} variant="dark" items={HOME_SCREENSHOTS} />
        </FadeContent>
      </div>
    </section>
  );
}
