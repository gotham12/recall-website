'use client';

import { FadeUp, PhoneMockup, SectionHeader } from './primitives';

const patientScreens = [
  { src: '/screenshots/patient-today.png', label: 'Today', desc: 'Sleep, heart rate, meds at a glance' },
  { src: '/screenshots/patient-clara.png', label: 'Clara', desc: 'Voice companion & orientation help' },
  { src: '/screenshots/patient-meds.png', label: 'Medications', desc: 'Tap to verify — vision-assisted' },
  { src: '/screenshots/patient-people.png', label: 'People', desc: 'Safety Circle & identity recall' },
  { src: '/screenshots/patient-routine.png', label: 'Routine', desc: 'Daily checklist & Word puzzle' },
];

const supervisorScreens = [
  { src: '/screenshots/supervisor-overview.png', label: 'Overview', desc: 'Comfort Mode & vitals snapshot' },
  { src: '/screenshots/supervisor-recall-ai.png', label: 'Recall AI', desc: 'Live care advisor briefings' },
  { src: '/screenshots/supervisor-acse.png', label: 'ACSE', desc: 'Real-time cognitive metrics' },
  { src: '/screenshots/supervisor-schedule.png', label: 'Schedule', desc: 'Meds, events & storm radar' },
  { src: '/screenshots/supervisor-insights.png', label: 'Insights', desc: 'Adherence trends & analytics' },
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
      <p className="mb-8 text-sm text-white/50">{subtitle}</p>
      <div className="flex flex-col gap-10">
        {screens.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.05}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
              <PhoneMockup src={s.src} alt={`Recall ${s.label} screen`} />
              <div className="text-center sm:pt-8 sm:text-left">
                <h4 className="font-display text-xl">{s.label}</h4>
                <p className="mt-1 text-sm text-white/50">{s.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

export function DualExperienceSection() {
  return (
    <section className="border-y border-white/5 bg-ink-50/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <SectionHeader
            align="center"
            label="Two experiences"
            title="Built for both sides of care"
            description="Margaret gets dignity and voice. Susan gets signal and control. Same data, different lenses — always in sync."
          />
        </FadeUp>

        <div className="mt-20 grid gap-20 lg:grid-cols-2 lg:gap-16">
          <ExperienceColumn
            title="Patient · Margaret"
            subtitle="Large type, voice-first, zero shame. Clara guides daily life."
            accent="border-recall-mint/30 bg-recall-mint/10 text-recall-mint"
            screens={patientScreens}
          />
          <ExperienceColumn
            title="Caregiver · Susan"
            subtitle="Live ACSE, med logs, Recall AI, and remote Comfort Mode."
            accent="border-recall-violet/30 bg-recall-violet/10 text-recall-violet"
            screens={supervisorScreens}
          />
        </div>
      </div>
    </section>
  );
}
