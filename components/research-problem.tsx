'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollVelocity from '@/components/ScrollVelocity';
import SpotlightCard from '@/components/SpotlightCard';
import { Badge } from '@/components/ui/badge';

const researchStats = [
  {
    value: '6.9M',
    label: "Americans aged 65+ live with Alzheimer's dementia — a number projected to double by 2050 as the population ages.",
    source: "Alzheimer's Association · 2025 Facts & Figures",
  },
  {
    value: '12M',
    label: "Unpaid family caregivers support someone with Alzheimer's or another dementia — nearly half of all elder care in the U.S.",
    source: "Alzheimer's Association · 2025",
  },
  {
    value: '$413B',
    label: 'Value of unpaid dementia caregiving in a single year — 19 billion hours of labor families absorb silently.',
    source: "Alzheimer's Association · 2024",
  },
  {
    value: '70%',
    label: 'Of lifetime dementia care costs fall on families — through out-of-pocket expenses and unpaid labor, not insurance.',
    source: "Alzheimer's Association · Lifetime cost $405K",
  },
];

const gaps = [
  {
    title: 'The quiet hours go unmonitored',
    body: 'Cognitive drift — repeat questions, sundowning, disorientation — often happens between visits. By the time a caregiver notices, the moment has already escalated.',
  },
  {
    title: 'Specialist shortage at scale',
    body: 'More than 18,000 geriatricians will be needed by 2050 for projected dementia cases — more than double the number practicing today. Families fill the gap alone.',
  },
  {
    title: 'Medication is a silent killer',
    body: 'An estimated 100,000+ Americans die annually from medication errors. For dementia patients, missed doses and double-doses are common — and often invisible until harm is done.',
  },
  {
    title: 'Caregiver burnout is clinical',
    body: "Dementia caregivers report emotional, financial, and physical strain at twice the rate of other caregivers. Depression affects up to 60% in some studies. Burnout is not weakness — it's structural.",
  },
  {
    title: 'Two people, zero shared picture',
    body: 'Margaret lives the confusion. Susan carries the worry. Without a shared real-time signal, every phone call starts from scratch — and every decision feels like guesswork.',
  },
  {
    title: 'Reactive care, not early signal',
    body: 'ER visits, Comfort Mode equivalents, and crisis plans activate after panic — not before. The system is built for catastrophe, not prevention.',
  },
];

const crisisSteps = [
  { time: '2:00 PM', event: 'Margaret asks "What day is it?" three times in twenty minutes.' },
  { time: '4:15 PM', event: 'She skips her afternoon medication. No one is notified.' },
  { time: '6:30 PM', event: 'Sundowning begins. She calls Susan, frightened and disoriented.' },
  { time: '8:00 PM', event: 'Susan leaves work early. Margaret is in distress. The ER is discussed.' },
  { time: 'Next day', event: 'The neurologist asks what happened. Susan reconstructs from memory. Data is gone.' },
];

export function ResearchProblemSection() {
  return (
    <>
      <ScrollVelocity
        texts={[
          "Every 65 seconds someone develops Alzheimer's in the U.S.",
          '19 billion hours of unpaid care per year',
          '$384B projected health costs in 2025',
          '2× caregiver strain vs. non-dementia care',
          '861,000 new direct care workers needed by 2032',
        ]}
        velocity={80}
        className="text-sm font-medium uppercase tracking-[0.2em] text-white/35 md:text-base"
        parallaxClassName="border-y border-white/5 bg-ink-50/30 py-4"
      />

      <section id="problem" className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,107,74,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <FadeContent blur className="max-w-3xl">
            <p className="section-label mb-4">Chapter 1 · The problem</p>
            <ScrollReveal containerClassName="!my-0" textClassName="font-display !text-5xl !leading-[1.02] text-white md:!text-6xl">
              When the system fails, families absorb the shock alone.
            </ScrollReveal>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              Dementia isn&apos;t only a medical diagnosis — it&apos;s a years-long coordination problem spanning
              medications, cognition, safety, identity, and grief. The infrastructure meant to help largely doesn&apos;t
              exist at home.
            </p>
          </FadeContent>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {researchStats.map((s) => (
              <FadeContent key={s.value} blur threshold={0.15}>
                <SpotlightCard
                  className="h-full border-white/10 bg-ink-100/80 p-6"
                  spotlightColor="rgba(79, 140, 255, 0.22)"
                >
                  <div className="font-display text-4xl text-white md:text-5xl">{s.value}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.label}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-widest text-white/30">{s.source}</p>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>

          <FadeContent blur className="mt-20">
            <h3 className="font-display text-2xl md:text-3xl">Six structural gaps families face every day</h3>
            <p className="mt-3 max-w-2xl text-white/50">
              Sources:{' '}
              <a
                href="https://www.alz.org/alzheimers-dementia/facts-figures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-recall-blue/80 underline-offset-2 hover:underline"
              >
                Alzheimer&apos;s Association 2025 Facts & Figures
              </a>
              , NIH/PMC caregiver burden reviews.
            </p>
          </FadeContent>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gaps.map((g) => (
              <FadeContent key={g.title} blur threshold={0.12}>
                <SpotlightCard
                  className="h-full border-white/10 bg-ink-100/60 p-6"
                  spotlightColor="rgba(255, 107, 74, 0.18)"
                >
                  <Badge variant="outline" className="mb-4 border-recall-coral/30 bg-recall-coral/10 text-recall-coral">
                    Gap
                  </Badge>
                  <h4 className="font-semibold text-white">{g.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{g.body}</p>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>

          <FadeContent blur className="mt-20">
            <SpotlightCard
              className="overflow-hidden border-recall-coral/20 bg-ink-100/80 p-0"
              spotlightColor="rgba(255, 107, 74, 0.15)"
            >
              <div className="border-b border-white/10 bg-recall-coral/5 px-6 py-4 md:px-8">
                <p className="section-label text-recall-coral/80">Without early signal</p>
                <h3 className="font-display text-2xl">A single afternoon can unravel</h3>
              </div>
              <div className="divide-y divide-white/5">
                {crisisSteps.map((step) => (
                  <div
                    key={step.time}
                    className="flex flex-col gap-1 px-6 py-5 md:flex-row md:items-center md:gap-8 md:px-8"
                  >
                    <span className="shrink-0 font-mono text-sm text-recall-coral">{step.time}</span>
                    <span className="text-sm leading-relaxed text-white/60">{step.event}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </FadeContent>
        </div>
      </section>
    </>
  );
}
