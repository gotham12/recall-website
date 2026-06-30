'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';
import { AssetImage } from '@/components/site/asset-image';

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

function ExperienceStack({
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
      <ScrollStack useWindowScroll itemDistance={120} itemScale={0.04} baseScale={0.88}>
        {screens.map((s) => (
          <ScrollStackItem key={s.label} itemClassName="!h-auto !p-6 !rounded-[2rem]">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="phone-frame w-[220px] shrink-0">
                <div className="phone-notch" />
                <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-ink-200">
                  <AssetImage src={s.src} alt={`Recall ${s.label} screen`} fill className="object-cover object-top" sizes="220px" />
                </div>
              </div>
              <div className="text-center md:pt-6 md:text-left">
                <h4 className="font-display text-xl">{s.label}</h4>
                <p className="mt-1 text-sm text-white/50">{s.desc}</p>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
}

export function DualExperienceSection() {
  return (
    <section className="border-y border-white/5 bg-ink-50/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mx-auto max-w-3xl text-center">
          <p className="section-label mb-4">Two experiences</p>
          <ScrollReveal containerClassName="!my-0" textClassName="font-display !text-4xl text-white md:!text-5xl">
            Built for both sides of care
          </ScrollReveal>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-white/55">
            Margaret gets dignity and voice. Susan gets signal and control. Same data, different lenses — always in
            sync.
          </p>
        </FadeContent>

        <div className="mt-20 grid gap-20 lg:grid-cols-2 lg:gap-16">
          <ExperienceStack
            title="Patient · Margaret"
            subtitle="Large type, voice-first, zero shame. Clara guides daily life."
            accent="border-recall-mint/30 bg-recall-mint/10 text-recall-mint"
            screens={patientScreens}
          />
          <ExperienceStack
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
