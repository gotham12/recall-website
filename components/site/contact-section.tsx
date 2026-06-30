'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import SpotlightCard from '@/components/SpotlightCard';
import { CONTACT_EMAIL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import AnimatedButton from '@/components/ui/animated-button';
import { GlowBorderCard } from '@/components/ui/glow-border-card';
import { Mail } from 'lucide-react';

export function ContactSection({ bright = false }: { bright?: boolean }) {
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <GlowBorderCard
          width="100%"
          aspectRatio="auto"
          borderRadius="1.5rem"
          colorPreset={bright ? 'aurora' : 'custom'}
          className={cn(
            'min-h-[220px]',
            bright ? 'border-product-200 bg-white/90' : 'border-white/10 bg-ink-100/80'
          )}
        >
          <div className="flex w-full flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
            <div>
              <p className={cn('section-label mb-3', bright ? 'text-recall-blue/80' : 'text-white/45')}>
                Contact
              </p>
              <h2
                className={cn(
                  'font-display text-3xl md:text-4xl',
                  bright ? 'text-product-950' : 'text-white'
                )}
              >
                Let&apos;s build dignified care together.
              </h2>
              <p className={cn('mt-3 max-w-lg', bright ? 'text-product-800/70' : 'text-white/55')}>
                Partnerships, pilots, and press — reach out anytime.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={cn(
                  'mt-4 inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-80',
                  bright ? 'text-recall-blue' : 'text-recall-sky'
                )}
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <AnimatedButton
                className={cn(
                  'rounded-full',
                  bright ? 'bg-recall-blue text-white dark:bg-recall-blue dark:text-white' : 'bg-white text-ink'
                )}
              >
                Email us
              </AnimatedButton>
            </a>
          </div>
        </GlowBorderCard>
      </div>
    </section>
  );
}
