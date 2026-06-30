'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import SpotlightCard from '@/components/SpotlightCard';
import { AssetImage } from '@/components/site/asset-image';
import { TEAM } from '@/lib/constants';
import { cn } from '@/lib/utils';

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
        <p className={cn('mt-5 max-w-2xl text-lg md:text-xl', bright ? 'text-product-800/70' : 'text-white/55')}>
          Recall is led by two co-founders combining clinical empathy with production-grade AI engineering.
        </p>
      </FadeContent>

      <div className="relative mx-auto mt-16 grid max-w-5xl gap-10 px-6 md:grid-cols-2">
        {TEAM.map((member, i) => (
          <FadeContent key={member.name} blur delay={i * 0.08} threshold={0.05}>
            <SpotlightCard
              className={cn(
                '!rounded-3xl overflow-hidden border p-0',
                bright
                  ? 'border-product-200 bg-white/80 shadow-xl shadow-recall-blue/10'
                  : 'border-white/10 bg-ink-100/70'
              )}
              spotlightColor={bright ? 'rgba(79, 140, 255, 0.25)' : 'rgba(139, 92, 246, 0.22)'}
            >
              <div className="relative aspect-[4/5] min-h-[300px] w-full overflow-hidden bg-ink-200">
                <AssetImage
                  src={member.photo}
                  alt={member.name}
                  fill
                  priority={i === 0}
                  className="object-cover object-top transition duration-700 hover:scale-105"
                  sizes="(max-width:768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h3 className="font-display text-2xl text-white md:text-3xl">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-recall-sky md:text-base">
                    {member.role}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  'border-t p-6 md:p-7',
                  bright ? 'border-product-200 bg-white/95' : 'border-white/10 bg-ink-100/90'
                )}
              >
                <p
                  className={cn(
                    'text-base leading-relaxed md:text-lg',
                    bright ? 'text-product-800/80' : 'text-white/70',
                    member.bio.length < 40 && 'font-display text-xl italic md:text-2xl'
                  )}
                >
                  {member.bio}
                </p>
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
