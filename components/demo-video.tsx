'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import { CONTACT_EMAIL, VIDEO_ID } from '@/lib/constants';
import { gmailComposeUrl } from '@/lib/asset-path';
import { cn } from '@/lib/utils';

export function DemoVideoSection({ bright = false }: { bright?: boolean }) {
  return (
    <section id="demo" className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl px-6">
        <FadeContent blur threshold={0.05} className="mx-auto max-w-3xl text-center">
          <p className="section-label mb-4">Product demo</p>
          <ScrollReveal containerClassName="!my-0" textClassName={cnTitle(bright)}>
            See Recall in action
          </ScrollReveal>
          <p
            className={cn(
              'mx-auto mt-5 max-w-2xl text-lg leading-relaxed',
              bright ? 'text-product-800/70' : 'text-white/55'
            )}
          >
            Six minutes with Margaret and Susan — Clara voice, med verification, ACSE scoring, Comfort Mode, and Recall
            AI.
          </p>
        </FadeContent>

        <div
          className={cn(
            'relative mt-12 overflow-hidden rounded-2xl border shadow-2xl shadow-recall-blue/15 md:rounded-3xl',
            bright ? 'border-product-200' : 'border-white/10'
          )}
        >
          <div
            className={cn(
              'border-b px-4 py-2 text-center text-[10px] uppercase tracking-[0.2em]',
              bright ? 'border-product-200 bg-product-100/80 text-product-800/50' : 'border-white/10 bg-ink-100/80 text-white/35'
            )}
          >
            Embedded walkthrough
          </div>
          <div className="relative aspect-video w-full bg-black">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&playsinline=1`}
              title="Recall — AI-native cognitive care demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <p className={cn('mt-4 text-center text-sm md:text-base', bright ? 'text-product-800/55' : 'text-white/45')}>
          Want hands-on demo access?{' '}
          <a
            href={gmailComposeUrl(CONTACT_EMAIL, {
              subject: 'Recall — Request demo access',
              body: 'Hi — I would like private credentials for the Recall live demo.',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('font-medium underline-offset-2 hover:underline', bright ? 'text-recall-blue' : 'text-recall-sky')}
          >
            Email us
          </a>{' '}
          and we&apos;ll send access details directly.
        </p>
      </div>
    </section>
  );
}

function cnTitle(bright: boolean) {
  return bright
    ? 'font-display !text-4xl !text-product-950 md:!text-5xl'
    : 'font-display !text-4xl text-white md:!text-5xl';
}
