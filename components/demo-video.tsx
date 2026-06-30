'use client';

import { useState } from 'react';
import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import { GlowBorderCard } from '@/components/ui/glow-border-card';
import { Play } from 'lucide-react';
import { VIDEO_ID } from '@/lib/constants';

export function DemoVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo" className="relative overflow-hidden py-24 md:py-32">
      <div className="relative mx-auto max-w-5xl px-6">
        <FadeContent blur className="mx-auto max-w-3xl text-center">
          <p className="section-label mb-4">Product demo</p>
          <ScrollReveal containerClassName="!my-0" textClassName="font-display !text-4xl text-white md:!text-5xl">
            See Recall in action
          </ScrollReveal>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/55">
            Six minutes with Margaret and Susan — Clara voice, med verification, ACSE scoring, Comfort Mode, and Recall
            AI. No new tab required.
          </p>
        </FadeContent>

        <FadeContent blur threshold={0.15} className="mt-12">
          <GlowBorderCard
            width="100%"
            aspectRatio="16/9"
            borderRadius="1.5rem"
            colorPreset="aurora"
            className="overflow-hidden border-white/10 bg-ink-200 shadow-2xl shadow-recall-blue/10"
          >
            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group relative block aspect-video w-full"
                aria-label="Play Recall demo video"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                  alt="Recall demo video thumbnail"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition group-hover:scale-105 group-hover:bg-white">
                    <Play className="ml-1 h-8 w-8 fill-ink text-ink" />
                  </div>
                  <span className="text-sm font-medium text-white/80">Play 6-minute walkthrough</span>
                </div>
              </button>
            ) : (
              <div className="relative aspect-video w-full">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="Recall — AI-native cognitive care demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </GlowBorderCard>
          <p className="mt-4 text-center text-xs text-white/35">
            Margaret Chen demo · No password · Supervisor password:{' '}
            <span className="font-mono text-white/50">care</span>
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
