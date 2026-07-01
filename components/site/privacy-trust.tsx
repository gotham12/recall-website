'use client';

import FadeContent from '@/components/FadeContent';
import { PRIVACY_TRUST } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Lock, Server, Shield, UserCheck } from 'lucide-react';

const icons = [Lock, Server, UserCheck, Shield];

export function PrivacyTrustSection({ bright = false }: { bright?: boolean }) {
  return (
    <section id="privacy" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-10 max-w-3xl">
          <p className={cn('section-label mb-3', bright ? 'text-recall-blue/80' : 'text-white/45')}>
            Trust & privacy
          </p>
          <h2
            className={cn(
              'font-display text-3xl md:text-4xl',
              bright ? 'text-product-950' : 'text-white'
            )}
          >
            {PRIVACY_TRUST.headline}
          </h2>
          <p className={cn('mt-4 text-lg', bright ? 'text-product-800/70' : 'text-white/55')}>
            Cognitive care is intimate. Recall is architected so families keep control of sensitive data.
          </p>
        </FadeContent>

        <div className="grid gap-4 md:grid-cols-2">
          {PRIVACY_TRUST.points.map((point, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <FadeContent key={point} blur threshold={0.08} delay={i * 0.05}>
                <div
                  className={cn(
                    'flex gap-4 rounded-2xl border p-5 md:p-6',
                    bright
                      ? 'border-product-200 bg-white/90 shadow-sm'
                      : 'border-white/10 bg-ink-100/60'
                  )}
                >
                  <Icon
                    className={cn('mt-0.5 h-5 w-5 shrink-0', bright ? 'text-recall-blue' : 'text-recall-sky')}
                    strokeWidth={1.75}
                  />
                  <p className={cn('text-base leading-relaxed md:text-lg', bright ? 'text-product-800/80' : 'text-white/65')}>
                    {point}
                  </p>
                </div>
              </FadeContent>
            );
          })}
        </div>

        <p className={cn('mt-8 text-sm md:text-base', bright ? 'text-product-800/50' : 'text-white/40')}>
          {PRIVACY_TRUST.disclaimer}
        </p>
      </div>
    </section>
  );
}
