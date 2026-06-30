'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { FadeUp, GlowOrb, SectionHeader } from './primitives';

const VIDEO_ID = 'Xh_k-GUBmmA';

export function DemoVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo" className="relative overflow-hidden py-24 md:py-32">
      <GlowOrb className="left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-recall-violet/10" />

      <div className="relative mx-auto max-w-5xl px-6">
        <FadeUp>
          <SectionHeader
            align="center"
            label="Product demo"
            title="See Recall in action"
            description="Six minutes with Margaret and Susan — Clara voice, med verification, ACSE scoring, Comfort Mode, and Recall AI. No new tab required."
          />
        </FadeUp>

        <FadeUp delay={0.12} className="mt-12">
          <div className="video-shell relative overflow-hidden rounded-3xl border border-white/10 bg-ink-200 shadow-2xl shadow-recall-blue/10">
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
          </div>
          <p className="mt-4 text-center text-xs text-white/35">
            Margaret Chen demo · No password · Supervisor password: <span className="font-mono text-white/50">care</span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
