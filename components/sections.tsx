'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Heart, Mic, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

const DEMO_URL = 'https://almightytamer.github.io/recall/';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=Xh_k-GUBmmA';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-recall-blue to-recall-violet shadow-lg shadow-recall-blue/20">
            <Brain className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
          <span className="font-display text-xl tracking-tight text-white">Recall</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#cascade" className="transition hover:text-white">How it works</a>
          <a href="#screens" className="transition hover:text-white">Product</a>
          <a href="#stack" className="transition hover:text-white">Technology</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm text-white/55 transition hover:text-white sm:inline"
          >
            Watch demo
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white/90"
          >
            Live app
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade grid-bg opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-recall-blue" />
            AI-native cognitive care · Built for families
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-5xl leading-[1.05] tracking-tight md:text-7xl"
          >
            Catch decline
            <span className="block text-gradient-accent italic">before crisis.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Recall extends caregivers with Clara — a warm voice companion for Margaret — and Recall AI — a clinical advisor for Susan. One offline-first platform. Real-time cognitive signal. Automatic de-escalation.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-recall-blue to-recall-violet px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-recall-blue/25 transition hover:brightness-110"
            >
              Try the live demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5"
            >
              Watch 6-min walkthrough
            </a>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
            {[
              { value: '30s', label: 'Someone in the US develops Alzheimer\'s' },
              { value: '2', label: 'Experiences — patient & caregiver' },
              { value: '1', label: 'Source of truth for both' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-white md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-xs leading-snug text-white/45">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="border-y border-white/5 bg-ink-50/50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label mb-4">The problem</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              The hardest moments aren&apos;t the diagnosis —
              <span className="text-white/50"> they&apos;re the quiet afternoons.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/55">
              When Mom asks the same question three times, nobody knows until it&apos;s already a crisis. Medication mistakes kill over 100,000 Americans every year. Sundowning turns a normal evening into an ER visit.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/55">
              Recall listens continuously — scoring cognitive stability, verifying meds on-device, and activating Comfort Mode before panic sets in.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Heart, title: 'For Margaret', desc: 'Voice-first companion who knows her name, her meds, and her family photos.' },
              { icon: Shield, title: 'For Susan', desc: 'Supervisor dashboard with live ACSE, med logs, Clara conversations, and Recall AI briefings.' },
              { icon: Mic, title: 'Clara', desc: 'Warm ElevenLabs voice. Detects loneliness & confusion. Triggers memory photo shuffle automatically.' },
              { icon: Brain, title: 'Recall AI', desc: 'Care advisor with full patient context — meds, trends, alerts — in plain English.' },
            ].map((card) => (
              <div key={card.title} className="glass group rounded-2xl p-5 transition hover:border-white/20 hover:bg-white/[0.06]">
                <card.icon className="mb-3 h-5 w-5 text-recall-blue" strokeWidth={1.75} />
                <h3 className="font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
