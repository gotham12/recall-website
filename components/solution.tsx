'use client';

import { ArrowRight, Brain, Heart, Shield, Sparkles, Zap } from 'lucide-react';
import { FadeUp, GlowOrb, SectionHeader } from './primitives';

const pillars = [
  {
    icon: Heart,
    tag: 'Patient experience',
    title: 'Clara for Margaret',
    desc: 'A warm voice companion who knows her meds, her people, and her photos. Voice-first — no menus, no shame. Daily Word puzzles, routine checklists, and Safety Circle calls.',
    bullets: ['ElevenLabs voice with on-device context', 'Memory Photo Recap on loneliness', 'Apple Health sleep & heart rate'],
    gradient: 'from-recall-mint/20 to-recall-blue/5',
  },
  {
    icon: Shield,
    tag: 'Caregiver experience',
    title: 'Recall AI for Susan',
    desc: 'A specialist care advisor with live ACSE, med verification logs, Clara transcripts, and appointment prep — in plain English, not clinical jargon.',
    bullets: ['Morning briefings with pending meds', 'Cognitive weather forecast', 'Comfort Mode from anywhere'],
    gradient: 'from-recall-violet/20 to-recall-blue/5',
  },
  {
    icon: Brain,
    tag: 'Shared intelligence',
    title: 'One brain, two lenses',
    desc: 'Patient and supervisor share the same Dexie database offline-first. When Margaret verifies Tylenol, Susan sees it. When ACSE drops, both experiences respond.',
    bullets: ['ACSE Engine scores stability live', 'Vision med verification on-device', 'Storm Radar predicts sundowning risk'],
    gradient: 'from-recall-coral/15 to-recall-violet/5',
  },
];

export function SolutionSection() {
  return (
    <section id="solution" className="relative overflow-hidden border-y border-white/5 bg-ink-50/40 py-24 md:py-32">
      <GlowOrb className="right-0 top-0 h-[500px] w-[500px] bg-recall-blue/15" />
      <GlowOrb className="bottom-0 left-0 h-80 w-80 bg-recall-violet/10" />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeUp>
          <SectionHeader
            label="The solution"
            title={
              <>
                Recall closes the gap
                <span className="block text-gradient-accent italic">before crisis.</span>
              </>
            }
            description="Recall is an AI-native cognitive care platform — not another pill reminder. It listens, scores, verifies, and de-escalates across two purpose-built experiences linked by one real-time care graph."
          />
        </FadeUp>

        <FadeUp delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
          {['Offline-first', 'Edge AI on Cloudflare', 'Apple Health', 'Comfort Mode', 'Recall Cascade™'].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60"
            >
              <Sparkles className="h-3 w-3 text-recall-blue" />
              {tag}
            </span>
          ))}
        </FadeUp>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <FadeUp key={p.title} delay={0.08 * i}>
              <div className={`glass-strong group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${p.gradient} p-8`}>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-widest text-white/50">
                  {p.tag}
                </div>
                <p.icon className="mb-4 h-7 w-7 text-recall-blue" strokeWidth={1.5} />
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
                <ul className="mt-6 space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/50">
                      <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-recall-blue" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-16">
          <div className="gradient-border rounded-3xl p-[1px]">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink-100/80 p-8 md:flex-row md:items-center md:p-10">
              <div className="max-w-xl">
                <p className="section-label mb-2">The Recall difference</p>
                <h3 className="font-display text-2xl md:text-3xl">
                  Prevention, not paperwork.
                </h3>
                <p className="mt-3 text-white/55">
                  Most tools track tasks. Recall tracks cognitive stability — then acts. ACSE below 50 triggers Comfort Mode. Clara detects loneliness and opens family photos. Susan gets the briefing before she even asks.
                </p>
              </div>
              <a
                href="#demo"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
              >
                Watch the demo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
