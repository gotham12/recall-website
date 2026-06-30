'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import SpotlightCard from '@/components/SpotlightCard';
import AnimatedButton from '@/components/ui/animated-button';
import { GlowBorderCard } from '@/components/ui/glow-border-card';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Shield } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    tag: 'Patient experience',
    title: 'Clara for Margaret',
    desc: 'A warm voice companion who knows her meds, her people, and her photos. Voice-first — no menus, no shame.',
    bullets: ['ElevenLabs voice with on-device context', 'Memory Photo Recap on loneliness', 'Apple Health sleep & heart rate'],
  },
  {
    icon: Shield,
    tag: 'Caregiver experience',
    title: 'Recall AI for Susan',
    desc: 'A specialist care advisor with live ACSE, med verification logs, Clara transcripts, and appointment prep.',
    bullets: ['Morning briefings with pending meds', 'Cognitive weather forecast', 'Comfort Mode from anywhere'],
  },
  {
    icon: Brain,
    tag: 'Shared intelligence',
    title: 'One brain, two lenses',
    desc: 'Patient and supervisor share the same Dexie database offline-first. When Margaret verifies Tylenol, Susan sees it.',
    bullets: ['ACSE Engine scores stability live', 'Vision med verification on-device', 'Storm Radar predicts sundowning risk'],
  },
];

const tags = ['Offline-first', 'Edge AI on Cloudflare', 'Apple Health', 'Comfort Mode', 'Recall Cascade™'];

export function SolutionSection() {
  return (
    <section id="solution" className="relative overflow-hidden border-y border-white/5 bg-ink-50/40 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeContent blur className="max-w-2xl">
          <p className="section-label mb-4">The solution</p>
          <ScrollReveal containerClassName="!my-0" textClassName="font-display !text-4xl !leading-[1.08] text-white md:!text-5xl">
            Recall closes the gap before crisis.
          </ScrollReveal>
          <p className="mt-5 text-lg leading-relaxed text-white/55">
            Recall is an AI-native cognitive care platform — not another pill reminder. It listens, scores, verifies,
            and de-escalates across two purpose-built experiences linked by one real-time care graph.
          </p>
        </FadeContent>

        <FadeContent blur className="mt-12 flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/10 bg-white/5 text-white/60">
              {tag}
            </Badge>
          ))}
        </FadeContent>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <FadeContent key={p.title} blur threshold={0.12}>
              <SpotlightCard
                className="h-full border-white/10 bg-ink-100/70 p-8"
                spotlightColor="rgba(79, 140, 255, 0.2)"
              >
                <Badge variant="outline" className="mb-4 border-white/10 bg-black/20 text-[10px] uppercase tracking-widest text-white/50">
                  {p.tag}
                </Badge>
                <p.icon className="mb-4 h-7 w-7 text-recall-blue" strokeWidth={1.5} />
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
                <ul className="mt-6 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-sm text-white/50">
                      {b}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>

        <FadeContent blur className="mt-16">
          <GlowBorderCard
            width="100%"
            aspectRatio="auto"
            borderRadius="1.5rem"
            colorPreset="aurora"
            className="min-h-[220px] border-white/10 bg-ink-100/80"
          >
            <div className="flex w-full flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
              <div className="max-w-xl text-left">
                <p className="section-label mb-2">The Recall difference</p>
                <h3 className="font-display text-2xl md:text-3xl">Prevention, not paperwork.</h3>
                <p className="mt-3 text-white/55">
                  Most tools track tasks. Recall tracks cognitive stability — then acts. ACSE below 50 triggers Comfort
                  Mode. Clara detects loneliness and opens family photos. Susan gets the briefing before she even asks.
                </p>
              </div>
              <button type="button" onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}>
                <AnimatedButton className="rounded-full bg-white text-ink dark:bg-white dark:text-ink">
                  Watch the demo
                </AnimatedButton>
              </button>
            </div>
          </GlowBorderCard>
        </FadeContent>
      </div>
    </section>
  );
}
