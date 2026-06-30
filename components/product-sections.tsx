'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import {
  Activity,
  Camera,
  Cloud,
  Database,
  Heart,
  ImageIcon,
  LineChart,
  MessageCircle,
  Mic,
  Shield,
  Sparkles,
  Wind,
} from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: 'Clara Voice Companion',
    desc: 'Margaret talks to Clara like family — not a manual. Edge AI on Cloudflare Workers with ElevenLabs Jessica voice. Context refreshed before every reply.',
    accent: 'from-recall-blue/20 to-recall-violet/10',
    span: 'lg:col-span-2',
  },
  {
    icon: MessageCircle,
    title: 'Recall AI',
    desc: 'Susan asks "Explain Margaret\'s ACSE score today" and gets a live briefing — meds, alerts, Clara logs, checkup prep.',
    accent: 'from-recall-violet/20 to-recall-blue/10',
    span: '',
  },
  {
    icon: Activity,
    title: 'ACSE Engine',
    desc: 'Agentic Cognitive Stability Engine scores repeat questions, missed meds, and disorientation in real time. Drops below 50 → Comfort Mode.',
    accent: 'from-recall-coral/20 to-recall-violet/10',
    span: '',
  },
  {
    icon: Camera,
    title: 'Vision Med Verification',
    desc: 'Camera reads pill bottles on the edge. Tylenol verifies live. Donepezil blocks double-dose with gentle messaging.',
    accent: 'from-recall-mint/15 to-recall-blue/10',
    span: '',
  },
  {
    icon: Wind,
    title: 'Comfort Mode',
    desc: 'Supervisor-triggered or automatic. Grounding voice, breathing cycles, nature scenes, and Tibetan bells — before sundowning becomes crisis.',
    accent: 'from-recall-sky/15 to-recall-violet/10',
    span: '',
  },
  {
    icon: ImageIcon,
    title: 'Memory Photo Recap',
    desc: 'When Margaret feels alone, Clara opens a shuffled album of family moments — garden dinners, birthdays, Susan and Robert — with warm narration.',
    accent: 'from-recall-blue/15 to-recall-coral/10',
    span: 'lg:col-span-2',
  },
];

export function FeaturesBento() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="section-label mb-4">Platform</p>
          <h2 className="font-display text-4xl md:text-5xl">Two lenses. One brain.</h2>
          <p className="mt-4 text-lg text-white/55">
            Patient and caregiver experiences share the same Dexie database — meds, routines, vitals, events, and Clara activity. No stale copies.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className={`glass-strong group relative overflow-hidden rounded-3xl p-6 ${f.span}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 transition group-hover:opacity-100`} />
              <f.icon className="relative mb-4 h-6 w-6 text-recall-blue" strokeWidth={1.75} />
              <h3 className="relative text-lg font-semibold">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-white/55">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const cascadeSteps = [
  { step: '01', title: 'Signal', desc: 'Margaret repeats a question or says she feels alone.' },
  { step: '02', title: 'Score', desc: 'ACSE deducts points. Supervisor sees the trend live.' },
  { step: '03', title: 'Intervene', desc: 'Clara responds warmly — then opens photos or Comfort Mode.' },
  { step: '04', title: 'Alert', desc: 'Susan\'s dashboard lights up. Recall AI briefs her in plain English.' },
];

export function CascadeSection() {
  return (
    <section id="cascade" className="border-y border-white/5 bg-ink-50/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="section-label mb-4">The Recall Cascade™</p>
          <h2 className="font-display text-4xl md:text-5xl">Signal → Score → Intervention → Caregiver</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/55">Automatically. Before crisis.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {cascadeSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative glass rounded-2xl p-6"
            >
              <div className="font-display text-4xl text-white/15">{s.step}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/50">{s.desc}</p>
              {i < cascadeSteps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-gradient-to-r from-recall-blue/50 to-transparent md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type ScreenItem = {
  src: string;
  alt: string;
  tag: 'Patient' | 'Supervisor';
  title: string;
};

const screens: ScreenItem[] = [
  { src: '/screenshots/patient-today.png', alt: 'Today dashboard', tag: 'Patient', title: 'Today' },
  { src: '/screenshots/patient-clara.png', alt: 'Clara voice companion', tag: 'Patient', title: 'Clara' },
  { src: '/screenshots/patient-meds.png', alt: 'Medication verification', tag: 'Patient', title: 'Meds' },
  { src: '/screenshots/patient-people.png', alt: 'Safety circle', tag: 'Patient', title: 'People' },
  { src: '/screenshots/patient-routine.png', alt: 'Daily routine', tag: 'Patient', title: 'Routine' },
  { src: '/screenshots/supervisor-overview.png', alt: 'Supervisor overview', tag: 'Supervisor', title: 'Overview' },
  { src: '/screenshots/supervisor-recall-ai.png', alt: 'Recall AI briefing', tag: 'Supervisor', title: 'Recall AI' },
  { src: '/screenshots/supervisor-insights.png', alt: 'Insights analytics', tag: 'Supervisor', title: 'Insights' },
];

function PhoneMockup({ item }: { item: ScreenItem }) {
  return (
    <div className="phone-frame mx-auto w-[260px]">
      <div className="phone-notch" />
      <div className="relative aspect-[9/19.5] w-full bg-ink-200">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover object-top"
          sizes="260px"
        />
      </div>
    </div>
  );
}

export function ScreenshotsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="screens" ref={ref} className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">Product</p>
            <h2 className="font-display text-4xl md:text-5xl">Designed for dignity.</h2>
            <p className="mt-4 max-w-lg text-white/55">
              Large touch targets. Warm typography. Voice-first for Margaret. Data-rich for Susan.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full border border-recall-blue/30 bg-recall-blue/10 px-3 py-1 text-xs font-medium text-recall-blue">Patient</span>
            <span className="rounded-full border border-recall-violet/30 bg-recall-violet/10 px-3 py-1 text-xs font-medium text-recall-violet">Supervisor</span>
          </div>
        </div>

        <motion.div style={{ y }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {screens.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
              className="group"
            >
              <PhoneMockup item={item} />
              <div className="mt-4 text-center">
                <span className={`text-[10px] font-semibold uppercase tracking-widest ${item.tag === 'Patient' ? 'text-recall-blue' : 'text-recall-violet'}`}>
                  {item.tag}
                </span>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const stack = [
  { icon: Sparkles, name: 'React + TypeScript', detail: 'Vite · Capacitor iOS' },
  { icon: Database, name: 'Dexie (IndexedDB)', detail: 'Offline-first local DB' },
  { icon: Cloud, name: 'Cloudflare Workers', detail: 'LLM · TTS · Vision at edge' },
  { icon: LineChart, name: 'ACSE + Insights', detail: 'Real-time cognitive scoring' },
  { icon: Shield, name: 'Human-in-the-loop', detail: 'Manual confirm fallbacks' },
  { icon: Heart, name: 'ElevenLabs + Groq', detail: 'Jessica voice · fast inference' },
];

export function StackSection() {
  return (
    <section id="stack" className="border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="section-label mb-4">Technology</p>
            <h2 className="font-display text-4xl md:text-5xl">Production-deployed today.</h2>
            <p className="mt-4 text-lg text-white/55">
              React and TypeScript on the client. Zustand for state. Dexie for offline storage. Cloudflare Workers for LLM, TTS, and vision — deployed on GitHub Pages with an edge API.
            </p>
            <p className="mt-4 text-sm text-white/40">
              Demo patient: Margaret Chen · Supervisor password: <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/70">care</code>
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((s) => (
              <div key={s.name} className="glass flex items-start gap-3 rounded-2xl p-4">
                <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-recall-blue" strokeWidth={1.75} />
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-white/45">{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-recall-blue/20 via-ink-100 to-recall-violet/20 p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 shimmer-border opacity-30" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl md:text-5xl">
              Margaret keeps her dignity.
              <span className="block text-white/60">Susan keeps her sanity.</span>
            </h2>
            <p className="mt-4 text-lg text-white/55">
              Recall doesn&apos;t replace caregivers — it extends them. Early signal. Automatic de-escalation. AI that knows the whole person.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://almightytamer.github.io/recall/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition hover:bg-white/90"
              >
                Open live demo
              </a>
              <a
                href="https://www.youtube.com/watch?v=Xh_k-GUBmmA"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/80 transition hover:bg-white/5"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-recall-blue to-recall-violet">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-lg">Recall</span>
        </div>
        <p className="text-center text-sm text-white/40">
          Built by Advaith & Param · AI-native cognitive care
        </p>
        <div className="flex gap-6 text-sm text-white/45">
          <a href="https://github.com/AlmightyTamer/recall" target="_blank" rel="noopener noreferrer" className="hover:text-white">App repo</a>
          <a href="https://almightytamer.github.io/recall/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Live demo</a>
        </div>
      </div>
    </footer>
  );
}
