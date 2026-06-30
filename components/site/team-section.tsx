'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import SpotlightCard from '@/components/SpotlightCard';
import { TEAM } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function TeamSection({ bright = false }: { bright?: boolean }) {
  return (
    <section id="team" className="relative py-24 md:py-32">
      <FadeContent blur className="relative mx-auto max-w-6xl px-6">
        <p className={cnLabel(bright)}>Meet the team</p>
        <ScrollReveal
          containerClassName="!my-0 max-w-3xl"
          textClassName={cn(
            'font-display !text-4xl md:!text-5xl',
            bright ? '!text-product-950' : '!text-white'
          )}
        >
          Built by caregivers&apos; children who watched the system fail.
        </ScrollReveal>
        <p className={cn('mt-5 max-w-2xl text-lg', bright ? 'text-product-800/70' : 'text-white/55')}>
          Recall is led by two co-founders combining clinical empathy with production-grade AI engineering.
        </p>
      </FadeContent>

      <div className="relative mx-auto mt-16 grid max-w-4xl gap-8 px-6 md:grid-cols-2">
        {TEAM.map((member, i) => (
          <FadeContent key={member.name} blur delay={i * 0.1}>
            <SpotlightCard
              className={cn(
                'overflow-hidden border p-0',
                bright
                  ? 'border-product-200 bg-white/80 shadow-xl shadow-recall-blue/10'
                  : 'border-white/10 bg-ink-100/70'
              )}
              spotlightColor={bright ? 'rgba(79, 140, 255, 0.25)' : 'rgba(139, 92, 246, 0.22)'}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition duration-700 hover:scale-105"
                  sizes="(max-width:768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-recall-sky">
                    {member.role}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </FadeContent>
        ))}
      </div>
    </section>
  );
}

function cnLabel(bright: boolean) {
  return cn('section-label mb-4', bright ? 'text-recall-blue/80' : 'text-white/45');
}
