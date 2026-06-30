'use client';

import { AlertTriangle, Clock, DollarSign, HeartCrack, Stethoscope, Users } from 'lucide-react';
import { FadeUp, Marquee, MetricCard, SectionHeader } from './primitives';

const researchStats = [
  {
    value: '6.9M',
    label: 'Americans aged 65+ live with Alzheimer\'s dementia — a number projected to double by 2050 as the population ages.',
    source: "Alzheimer's Association · 2025 Facts & Figures",
    accent: 'blue' as const,
  },
  {
    value: '12M',
    label: 'Unpaid family caregivers support someone with Alzheimer\'s or another dementia — nearly half of all elder care in the U.S.',
    source: "Alzheimer's Association · 2025",
    accent: 'violet' as const,
  },
  {
    value: '$413B',
    label: 'Value of unpaid dementia caregiving in a single year — 19 billion hours of labor families absorb silently.',
    source: "Alzheimer's Association · 2024",
    accent: 'coral' as const,
  },
  {
    value: '70%',
    label: 'Of lifetime dementia care costs fall on families — through out-of-pocket expenses and unpaid labor, not insurance.',
    source: "Alzheimer's Association · Lifetime cost $405K",
    accent: 'mint' as const,
  },
];

const gaps = [
  {
    icon: Clock,
    title: 'The quiet hours go unmonitored',
    body: 'Cognitive drift — repeat questions, sundowning, disorientation — often happens between visits. By the time a caregiver notices, the moment has already escalated.',
  },
  {
    icon: Stethoscope,
    title: 'Specialist shortage at scale',
    body: 'More than 18,000 geriatricians will be needed by 2050 for projected dementia cases — more than double the number practicing today. Families fill the gap alone.',
  },
  {
    icon: DollarSign,
    title: 'Medication is a silent killer',
    body: 'An estimated 100,000+ Americans die annually from medication errors. For dementia patients, missed doses and double-doses are common — and often invisible until harm is done.',
  },
  {
    icon: HeartCrack,
    title: 'Caregiver burnout is clinical',
    body: 'Dementia caregivers report emotional, financial, and physical strain at twice the rate of other caregivers. Depression affects up to 60% in some studies. Burnout is not weakness — it\'s structural.',
  },
  {
    icon: Users,
    title: 'Two people, zero shared picture',
    body: 'Margaret lives the confusion. Susan carries the worry. Without a shared real-time signal, every phone call starts from scratch — and every decision feels like guesswork.',
  },
  {
    icon: AlertTriangle,
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
      <Marquee
        items={[
          'Every 65 seconds someone develops Alzheimer\'s in the U.S.',
          '19 billion hours of unpaid care per year',
          '$384B projected health costs in 2025',
          '2× caregiver strain vs. non-dementia care',
          '861,000 new direct care workers needed by 2032',
        ]}
      />

      <section id="problem" className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-recall-coral/10 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <FadeUp>
            <SectionHeader
              label="The crisis in neurodegenerative care"
              title={
                <>
                  Families are the system of care.
                  <span className="block text-white/45">The system wasn&apos;t built for them.</span>
                </>
              }
              description="Dementia isn't only a medical diagnosis — it's a years-long coordination problem spanning medications, cognition, safety, identity, and grief. The infrastructure meant to help largely doesn't exist at home."
            />
          </FadeUp>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {researchStats.map((s, i) => (
              <FadeUp key={s.value} delay={i * 0.06}>
                <MetricCard {...s} />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.15} className="mt-20">
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
          </FadeUp>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gaps.map((g, i) => (
              <FadeUp key={g.title} delay={0.05 * i}>
                <div className="glass group h-full rounded-2xl p-6 transition hover:border-white/15 hover:bg-white/[0.05]">
                  <g.icon className="mb-4 h-5 w-5 text-recall-coral" strokeWidth={1.75} />
                  <h4 className="font-semibold text-white">{g.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{g.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.1} className="mt-20">
            <div className="glass-strong overflow-hidden rounded-3xl border border-recall-coral/20">
              <div className="border-b border-white/10 bg-recall-coral/5 px-6 py-4 md:px-8">
                <p className="section-label text-recall-coral/80">Without early signal</p>
                <h3 className="font-display text-2xl">A single afternoon can unravel</h3>
              </div>
              <div className="divide-y divide-white/5">
                {crisisSteps.map((step) => (
                  <div key={step.time} className="flex flex-col gap-1 px-6 py-5 md:flex-row md:items-center md:gap-8 md:px-8">
                    <span className="shrink-0 font-mono text-sm text-recall-coral">{step.time}</span>
                    <span className="text-sm leading-relaxed text-white/60">{step.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
