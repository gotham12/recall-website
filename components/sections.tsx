'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Sparkles } from 'lucide-react';
import Link from 'next/link';

const DEMO_URL = 'https://almightytamer.github.io/recall/';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const navLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#demo', label: 'Demo' },
  { href: '#features', label: 'Platform' },
  { href: '#cascade', label: 'Cascade' },
];

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
        <nav className="hidden items-center gap-7 text-sm text-white/55 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#demo"
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
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade grid-bg opacity-40" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[480px] w-[480px] rounded-full bg-recall-violet/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-recall-blue/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70"
          >
            <Sparkles className="h-3.5 w-3.5 text-recall-blue" />
            AI-native cognitive care for neurodegenerative families
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-[5.25rem]"
          >
            The care system families need
            <span className="block text-gradient-accent italic">doesn&apos;t exist yet.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Recall is the missing layer — Clara for Margaret&apos;s daily dignity, Recall AI for Susan&apos;s real-time signal. One offline-first platform that catches cognitive decline before crisis.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
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
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5"
            >
              Watch 6-min walkthrough
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4"
          >
            {[
              { value: '6.9M', label: 'Americans living with Alzheimer\'s' },
              { value: '12M', label: 'Unpaid dementia caregivers' },
              { value: '30s', label: 'Until the next diagnosis' },
              { value: '1', label: 'Platform for both experiences' },
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
