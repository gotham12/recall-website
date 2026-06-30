'use client';

import CountUp from '@/components/CountUp';
import FadeContent from '@/components/FadeContent';
import { HOME_STATS } from '@/lib/constants';
import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

function StatValue({
  value,
  suffix,
  prefix,
  delay,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  delay: number;
}) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <span className="font-display text-6xl tracking-tight text-white md:text-7xl lg:text-8xl">
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span className="font-display text-6xl tracking-tight text-white md:text-7xl lg:text-8xl">
      {prefix}
      <CountUp to={value} duration={2.2} delay={delay} separator="," />
      {suffix}
    </span>
  );
}

export function HomeStatsBand() {
  return (
    <section id="stats" aria-labelledby="stats-heading" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-14 max-w-2xl">
          <p id="stats-heading" className="section-label mb-3">
            The scale of what families carry
          </p>
          <h2 className="font-display text-2xl text-white/90 md:text-3xl">
            Memory loss is not a niche problem. It is a quiet global crisis.
          </h2>
        </FadeContent>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          {HOME_STATS.map((stat, i) => (
            <FadeContent key={stat.id} blur threshold={0.12} delay={i * 0.12}>
              <div className="text-left md:text-center">
                <StatValue
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={'prefix' in stat ? stat.prefix : undefined}
                  delay={i * 0.35}
                />
                <p className="mt-4 max-w-xs text-lg leading-snug text-white/70 md:mx-auto md:text-xl">
                  {stat.label}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/35 md:text-sm">
                  {stat.source}
                </p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
