'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import { GlowBorderCard } from '@/components/ui/glow-border-card';
import { VIDEO_ID } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function DemoVideoSection({ bright = false }: { bright?: boolean }) {
  return (
    <section id="demo" className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl px-6">
        <FadeContent blur className="mx-auto max-w-3xl text-center">
          <p className="section-label mb-4">Product demo</p>
          <ScrollReveal
            containerClassName="!my-0"
            textClassName={cnTitle(bright)}
          >
            See Recall in action
          </ScrollReveal>
          <p className={cn('mx-auto mt-5 max-w-2xl text-lg leading-relaxed', bright ? 'text-product-800/70' : 'text-white/55')}>
            Six minutes with Margaret and Susan — Clara voice, med verification, ACSE scoring, Comfort Mode, and Recall
            AI.
          </p>
        </FadeContent>

        <FadeContent blur threshold={0.12} className="mt-12">
          <GlowBorderCard
            width="100%"
            aspectRatio="auto"
            borderRadius="1.5rem"
            colorPreset="aurora"
            className={cn(
              'overflow-hidden shadow-2xl shadow-recall-blue/10',
              bright ? 'border-product-200 bg-white/90' : 'border-white/10 bg-ink-200'
            )}
          >
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="Recall — AI-native cognitive care demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </GlowBorderCard>
          <p className={cn('mt-4 text-center text-xs', bright ? 'text-product-800/45' : 'text-white/35')}>
            Margaret Chen demo · No password · Supervisor password:{' '}
            <span className={cn('font-mono', bright ? 'text-product-800/65' : 'text-white/50')}>care</span>
          </p>
        </FadeContent>
      </div>
    </section>
  );
}

function cnTitle(bright: boolean) {
  return bright
    ? 'font-display !text-4xl !text-product-950 md:!text-5xl'
    : 'font-display !text-4xl text-white md:!text-5xl';
}
