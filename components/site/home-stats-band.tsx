'use client';

import CountUp from '@/components/CountUp';
import FadeContent from '@/components/FadeContent';
import { HOME_STATS } from '@/lib/constants';

function StatItem({
  stat,
  delay,
  large,
}: {
  stat: (typeof HOME_STATS)[number];
  delay: number;
  large?: boolean;
}) {
  return (
    <FadeContent blur threshold={0.15} delay={delay}>
      <div className={large ? '' : ''}>
        <div
          className={
            large
              ? 'font-display text-[5rem] font-extrabold leading-none tracking-tight text-white md:text-[7rem] lg:text-[8.5rem]'
              : 'font-display text-6xl font-extrabold leading-none tracking-tight text-white md:text-7xl'
          }
        >
          {'prefix' in stat && stat.prefix}
          <CountUp to={stat.value} duration={2.4} delay={delay + 0.2} separator="," />
          {stat.suffix}
        </div>
        <p className={`mt-4 leading-snug text-white/65 ${large ? 'max-w-xs text-xl md:text-2xl' : 'max-w-[220px] text-lg'}`}>
          {stat.label}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/30">{stat.source}</p>
      </div>
    </FadeContent>
  );
}

export function HomeStatsBand() {
  return (
    <section id="stats" aria-labelledby="stats-context" className="relative py-20 md:py-28">
      {/* Hairline separator — no eyebrow, the numbers speak */}
      <div aria-hidden className="mx-auto mb-16 max-w-6xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Asymmetric layout: first stat large-left, two others stacked right */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: hero stat — large numeral */}
          <div>
            <StatItem stat={HOME_STATS[0]} delay={0} large />
          </div>

          {/* Right: two smaller stats stacked */}
          <div className="flex flex-col justify-center gap-10 md:gap-12">
            {HOME_STATS.slice(1).map((stat, i) => (
              <StatItem key={stat.id} stat={stat} delay={(i + 1) * 0.18} />
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="mx-auto mt-16 max-w-6xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>
    </section>
  );
}
