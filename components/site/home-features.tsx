'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import { ScreenshotGrid } from '@/components/site/screenshot-grid';
import { HOME_FEATURES, HOME_SCREENSHOTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function HomeFeatures() {
  return (
    <section id="how-it-works" aria-labelledby="features-heading" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-14 max-w-3xl">
          <p className="section-label mb-4">How Recall helps</p>
          <h2 id="features-heading" className="sr-only">
            How Recall helps families
          </h2>
          <ScrollReveal
            containerClassName="!my-0"
            textClassName="font-display !text-4xl text-white md:!text-5xl"
          >
            Dignity for her. Signal for you.
          </ScrollReveal>
          <p className="mt-5 text-lg text-white/55 md:text-xl">
            Every capability pairs what a family feels with how Recall delivers it — voice-first for Margaret,
            clarity-first for Susan.
          </p>
        </FadeContent>

        <div className="space-y-6">
          {HOME_FEATURES.map((feature, i) => (
            <FadeContent key={feature.id} blur threshold={0.08} delay={i * 0.06}>
              <article
                className={cn(
                  'grid gap-4 border-b border-white/5 pb-8 md:grid-cols-[1fr_2fr] md:items-baseline md:gap-10',
                  i === HOME_FEATURES.length - 1 && 'border-b-0 pb-0'
                )}
              >
                <div>
                  <h3 className="font-display text-2xl text-white md:text-3xl">{feature.title}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.16em] text-recall-sky/80">{feature.tag}</p>
                </div>
                <p className="text-lg leading-relaxed text-white/65 md:text-xl">{feature.description}</p>
              </article>
            </FadeContent>
          ))}
        </div>

        <FadeContent blur threshold={0.06} delay={0.1} className="mt-20">
          <ScreenshotGrid columns={3} variant="dark" items={HOME_SCREENSHOTS} />
        </FadeContent>
      </div>
    </section>
  );
}
