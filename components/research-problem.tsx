'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollVelocity from '@/components/ScrollVelocity';
import SpotlightCard from '@/components/SpotlightCard';
import { AssetImage } from '@/components/site/asset-image';
import { Badge } from '@/components/ui/badge';

const PROBLEM_PHOTOS = [
  {
    src: '/screenshots/problem-caregiver-burnout.png',
    caption: 'Unpaid caregivers absorb the emotional weight alone',
    alt: 'Exhausted caregiver at kitchen table with medications',
  },
  {
    src: '/screenshots/problem-elderly-alone.png',
    caption: 'Cognitive drift often happens in quiet, unmonitored hours',
    alt: 'Elderly man sitting alone on bed looking confused',
  },
  {
    src: '/screenshots/problem-empty-clinic.png',
    caption: 'Specialist shortages leave families navigating empty systems',
    alt: 'Empty hospital corridor at night',
  },
  {
    src: '/screenshots/problem-medication-error.png',
    caption: 'Missed doses and errors stay invisible until harm is done',
    alt: 'Pill organizer with empty compartments on counter',
  },
] as const;

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
    photo: PROBLEM_PHOTOS[1].src,
  },
  {
    title: 'Specialist shortage at scale',
    body: 'More than 18,000 geriatricians will be needed by 2050 for projected dementia cases — more than double the number practicing today. Families fill the gap alone.',
    photo: PROBLEM_PHOTOS[2].src,
  },
  {
    title: 'Medication is a silent killer',
    body: 'An estimated 100,000+ Americans die annually from medication errors. For dementia patients, missed doses and double-doses are common — and often invisible until harm is done.',
    photo: PROBLEM_PHOTOS[3].src,
  },
  {
    title: 'Caregiver burnout is clinical',
    body: "Dementia caregivers report emotional, financial, and physical strain at twice the rate of other caregivers. Depression affects up to 60% in some studies. Burnout is not weakness — it's structural.",
    photo: PROBLEM_PHOTOS[0].src,
  },
  {
    title: 'Two people, zero shared picture',
    body: 'Margaret lives the confusion. Susan carries the worry. Without a shared real-time signal, every phone call starts from scratch — and every decision feels like guesswork.',
    photo: PROBLEM_PHOTOS[0].src,
  },
  {
    title: 'Reactive care, not early signal',
    body: 'ER visits, Comfort Mode equivalents, and crisis plans activate after panic — not before. The system is built for catastrophe, not prevention.',
    photo: PROBLEM_PHOTOS[2].src,
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
        className="text-base font-medium uppercase tracking-[0.2em] text-zinc-500 md:text-lg"
        parallaxClassName="border-y border-zinc-800/50 bg-black/35 py-5 backdrop-blur-md"
      />

      <section id="problem" className="relative overflow-hidden py-28 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,120,130,0.06),transparent_55%)]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <FadeContent blur className="max-w-4xl">
            <p className="section-label mb-5 text-zinc-500">Chapter 1 · The problem</p>
            <ScrollReveal
              containerClassName="!my-0"
              textClassName="font-display !text-5xl !leading-[1.02] text-zinc-100 md:!text-7xl"
            >
              When the system fails, families absorb the shock alone.
            </ScrollReveal>
            <p className="mt-6 text-xl leading-relaxed text-zinc-400 md:text-2xl">
              Dementia isn&apos;t only a medical diagnosis — it&apos;s a years-long coordination problem spanning
              medications, cognition, safety, identity, and grief. The infrastructure meant to help largely doesn&apos;t
              exist at home.
            </p>
          </FadeContent>

          <FadeContent blur className="mt-16">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {PROBLEM_PHOTOS.map((photo) => (
                <figure
                  key={photo.src}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 grayscale-[0.35] transition duration-700 hover:grayscale-0"
                >
                  <AssetImage src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width:768px) 50vw, 280px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm leading-snug text-zinc-300 md:text-base">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </FadeContent>

          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {researchStats.map((s) => (
              <FadeContent key={s.value} blur threshold={0.15}>
                <SpotlightCard
                  className="h-full border-zinc-700/50 bg-zinc-900/90 p-7 md:p-8"
                  spotlightColor="rgba(161, 161, 170, 0.15)"
                >
                  <div className="font-display text-6xl leading-none text-zinc-100 md:text-7xl lg:text-8xl">{s.value}</div>
                  <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">{s.label}</p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-zinc-600 md:text-sm">{s.source}</p>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>

          <FadeContent blur className="mt-24">
            <h3 className="font-display text-3xl text-zinc-100 md:text-4xl lg:text-5xl">
              Six structural gaps families face every day
            </h3>
            <p className="mt-4 max-w-3xl text-lg text-zinc-500 md:text-xl">
              Sources:{' '}
              <a
                href="https://www.alz.org/alzheimers-dementia/facts-figures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 underline-offset-2 hover:underline"
              >
                Alzheimer&apos;s Association 2025 Facts & Figures
              </a>
              , NIH/PMC caregiver burden reviews.
            </p>
          </FadeContent>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gaps.map((g) => (
              <FadeContent key={g.title} blur threshold={0.12}>
                <SpotlightCard
                  className="h-full overflow-hidden border-zinc-700/40 bg-zinc-900/80 p-0"
                  spotlightColor="rgba(113, 113, 122, 0.12)"
                >
                  <div className="relative aspect-[16/10] w-full border-b border-zinc-800 grayscale-[0.4]">
                    <AssetImage src={g.photo} alt="" fill className="object-cover" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  </div>
                  <div className="p-6 md:p-7">
                    <Badge variant="outline" className="mb-4 border-zinc-600/50 bg-zinc-800/80 text-zinc-400">
                      Gap
                    </Badge>
                    <h4 className="text-xl font-semibold text-zinc-100 md:text-2xl">{g.title}</h4>
                    <p className="mt-3 text-base leading-relaxed text-zinc-500 md:text-lg">{g.body}</p>
                  </div>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>

          <FadeContent blur className="mt-24">
            <SpotlightCard
              className="overflow-hidden border-zinc-700/50 bg-zinc-900/90 p-0"
              spotlightColor="rgba(113, 113, 122, 0.1)"
            >
              <div className="relative border-b border-zinc-800">
                <div className="relative aspect-[21/9] w-full grayscale-[0.5]">
                  <AssetImage
                    src={PROBLEM_PHOTOS[0].src}
                    alt="Caregiver crisis"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-end p-6 md:p-10">
                  <div>
                    <p className="section-label mb-2 text-zinc-500">Without early signal</p>
                    <h3 className="font-display text-3xl text-zinc-100 md:text-4xl lg:text-5xl">
                      A single afternoon can unravel
                    </h3>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-zinc-800/80">
                {crisisSteps.map((step) => (
                  <div
                    key={step.time}
                    className="flex flex-col gap-2 px-6 py-6 md:flex-row md:items-center md:gap-10 md:px-10 md:py-7"
                  >
                    <span className="shrink-0 font-mono text-base text-zinc-400 md:text-lg">{step.time}</span>
                    <span className="text-base leading-relaxed text-zinc-500 md:text-lg">{step.event}</span>
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
