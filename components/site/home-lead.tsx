'use client';

import FadeContent from '@/components/FadeContent';
import SpotlightCard from '@/components/SpotlightCard';
import {
  CAREGIVER_TESTIMONIAL,
  KEY_STATS,
  PITCH_SUMMARY,
} from '@/lib/constants';

export function HomeLeadSections() {
  return (
    <>
      <section id="pitch" className="relative border-b border-white/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeContent blur className="mx-auto max-w-4xl text-center">
            <p className="section-label mb-4">Recall in 30 seconds</p>
            <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
              {PITCH_SUMMARY.headline}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
              {PITCH_SUMMARY.body}
            </p>
            <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left md:grid-cols-1">
              {PITCH_SUMMARY.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/70 md:text-lg"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-recall-blue" />
                  {bullet}
                </li>
              ))}
            </ul>
          </FadeContent>
        </div>
      </section>

      <section id="voices" className="relative py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeContent blur threshold={0.08}>
            <SpotlightCard
              className="mx-auto max-w-4xl border-white/10 bg-ink-100/80 p-8 md:p-12"
              spotlightColor="rgba(255, 107, 74, 0.15)"
            >
              <p className="section-label mb-4 text-recall-coral/80">A familiar moment</p>
              <blockquote className="font-display text-2xl leading-snug text-white md:text-3xl lg:text-4xl">
                &ldquo;{CAREGIVER_TESTIMONIAL.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <cite className="text-base not-italic text-recall-sky md:text-lg">
                  — {CAREGIVER_TESTIMONIAL.attribution}
                </cite>
                <span className="text-sm text-white/40">{CAREGIVER_TESTIMONIAL.context}</span>
              </footer>
            </SpotlightCard>
          </FadeContent>
        </div>
      </section>

      <section id="stats" className="relative border-y border-white/5 bg-ink-50/40 py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeContent blur className="mb-10 text-center">
            <p className="section-label mb-3">The scale of the crisis</p>
            <h2 className="font-display text-2xl text-white md:text-3xl">This is not a niche problem.</h2>
          </FadeContent>
          <div className="grid gap-5 md:grid-cols-3">
            {KEY_STATS.map((stat, i) => (
              <FadeContent key={stat.value} blur delay={i * 0.06} threshold={0.06}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-100/70 p-6 text-center md:p-8">
                  <div className="font-display text-5xl text-white md:text-6xl lg:text-7xl">{stat.value}</div>
                  <p className="mt-3 text-base leading-relaxed text-white/60 md:text-lg">{stat.label}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/35 md:text-sm">{stat.source}</p>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
