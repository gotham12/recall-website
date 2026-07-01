'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import { ScreenshotGrid } from '@/components/site/screenshot-grid';

const patientScreens = [
  { image: '/screenshots/patient-today.png', title: 'Today', desc: 'Sleep, heart rate, meds at a glance' },
  { image: '/screenshots/patient-clara.png', title: 'Clara', desc: 'Voice companion & orientation help' },
  { image: '/screenshots/patient-meds.png', title: 'Medications', desc: 'Tap to verify — vision-assisted' },
  { image: '/screenshots/patient-people.png', title: 'People', desc: 'Safety Circle & identity recall' },
  { image: '/screenshots/patient-routine.png', title: 'Routine', desc: 'Daily checklist & Word puzzle' },
];

const supervisorScreens = [
  { image: '/screenshots/supervisor-overview.png', title: 'Overview', desc: 'Comfort Mode & vitals snapshot' },
  { image: '/screenshots/supervisor-recall-ai.png', title: 'Recall AI', desc: 'Live care advisor briefings' },
  { image: '/screenshots/supervisor-acse.png', title: 'ACSE', desc: 'Real-time cognitive metrics' },
  { image: '/screenshots/supervisor-schedule.png', title: 'Schedule', desc: 'Meds, events & storm radar' },
  { image: '/screenshots/supervisor-insights.png', title: 'Insights', desc: 'Adherence trends & analytics' },
];

function ExperienceColumn({
  title,
  subtitle,
  accent,
  screens,
}: {
  title: string;
  subtitle: string;
  accent: string;
  screens: typeof patientScreens;
}) {
  return (
    <div>
      <div className={`mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${accent}`}>
        {title}
      </div>
      <p className="mb-8 text-sm text-product-800/65">{subtitle}</p>
      <ScreenshotGrid items={screens} columns={2} variant="light" phone />
    </div>
  );
}

export function DualExperienceSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mx-auto max-w-3xl text-center">
          <p className="section-label mb-4">Two experiences</p>
          <ScrollReveal
            containerClassName="!my-0"
            textClassName="font-display !text-4xl !text-product-950 md:!text-5xl"
          >
            Built for both sides of care
          </ScrollReveal>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-product-800/70">
            Margaret gets dignity and voice. Susan gets signal and control. Same data, different lenses — always in
            sync.
          </p>
        </FadeContent>

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <ExperienceColumn
            title="Patient · Margaret"
            subtitle="Large type, voice-first, zero shame. Clara guides daily life."
            accent="border-recall-mint/40 bg-recall-mint/15 text-emerald-700"
            screens={patientScreens}
          />
          <ExperienceColumn
            title="Caregiver · Susan"
            subtitle="Live ACSE, med logs, Recall AI, and remote Comfort Mode."
            accent="border-recall-violet/30 bg-recall-violet/10 text-violet-700"
            screens={supervisorScreens}
          />
        </div>
      </div>
    </section>
  );
}
