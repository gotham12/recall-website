'use client';

import FadeContent from '@/components/FadeContent';
import ScrollReveal from '@/components/ScrollReveal';
import { ScreenshotGrid } from '@/components/site/screenshot-grid';
import { AgentBentoGrid } from '@/components/ui/agent-bento-grid';
import AnimatedButton from '@/components/ui/animated-button';
import ExpandableBentoGrid from '@/components/ui/expandable-bento-grid';
import Footer from '@/components/ui/footer';
import { GlowBorderCard } from '@/components/ui/glow-border-card';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import SpotlightCard from '@/components/SpotlightCard';
import { DEMO_URL } from '@/lib/constants';
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

const featureItems = [
  {
    id: 'clara',
    title: 'Clara Voice Companion',
    subtitle: 'She never feels like she failed a test',
    description:
      'Margaret talks to someone who remembers — edge AI voice, refreshed before every reply, gentle orientation when the day blurs.',
    icon: <Mic className="h-6 w-6" />,
    content: (
      <p>
        Margaret talks to Clara like family — not a manual. Edge AI on Cloudflare Workers with ElevenLabs Jessica
        voice. Context refreshed before every reply.
      </p>
    ),
  },
  {
    id: 'recall-ai',
    title: 'Recall AI',
    subtitle: 'Susan gets answers in plain English',
    description:
      'Live briefings on meds, alerts, Clara logs, and checkup prep — so caregivers act on signal, not panic.',
    icon: <MessageCircle className="h-6 w-6" />,
    content: (
      <p>
        Susan asks &quot;Explain Margaret&apos;s ACSE score today&quot; and gets a live briefing — meds, alerts, Clara
        logs, checkup prep.
      </p>
    ),
  },
  {
    id: 'acse',
    title: 'ACSE Engine',
    subtitle: 'Catch drift before crisis',
    description:
      'Scores repeat questions, missed meds, and disorientation in real time — drops below 50 trigger Comfort Mode.',
    icon: <Activity className="h-6 w-6" />,
    content: (
      <p>
        Agentic Cognitive Stability Engine scores repeat questions, missed meds, and disorientation in real time. Drops
        below 50 → Comfort Mode.
      </p>
    ),
  },
  {
    id: 'vision',
    title: 'Vision Med Verification',
    subtitle: 'No more guessing about pills',
    description:
      'The camera reads the bottle and confirms the dose — blocking double-doses with warmth, not alarms.',
    icon: <Camera className="h-6 w-6" />,
    content: <p>Camera reads pill bottles on the edge. Tylenol verifies live. Donepezil blocks double-dose with gentle messaging.</p>,
  },
  {
    id: 'comfort',
    title: 'Comfort Mode',
    subtitle: 'De-escalation before the ER',
    description:
      'Grounding voice, breathing cycles, and nature scenes — before sundowning becomes a crisis call.',
    icon: <Wind className="h-6 w-6" />,
    content: (
      <p>
        Supervisor-triggered or automatic. Grounding voice, breathing cycles, nature scenes, and Tibetan bells — before
        sundowning becomes crisis.
      </p>
    ),
  },
  {
    id: 'photos',
    title: 'Memory Photo Recap',
    subtitle: 'Family moments when she feels alone',
    description:
      'Clara opens a shuffled album of birthdays and garden dinners — with warm narration, not pity.',
    icon: <ImageIcon className="h-6 w-6" />,
    content: (
      <p>
        When Margaret feels alone, Clara opens a shuffled album of family moments — garden dinners, birthdays, Susan and
        Robert — with warm narration.
      </p>
    ),
  },
];

const cascadeSteps = [
  { step: '01', title: 'Signal', desc: 'Margaret repeats a question or says she feels alone.' },
  { step: '02', title: 'Score', desc: 'ACSE deducts points. Supervisor sees the trend live.' },
  { step: '03', title: 'Intervene', desc: 'Clara responds warmly — then opens photos or Comfort Mode.' },
  { step: '04', title: 'Alert', desc: "Susan's dashboard lights up. Recall AI briefs her in plain English." },
];

const stack = [
  { icon: Sparkles, name: 'React + TypeScript', detail: 'Vite · Capacitor iOS' },
  { icon: Database, name: 'Dexie (IndexedDB)', detail: 'Offline-first local DB' },
  { icon: Cloud, name: 'Cloudflare Workers', detail: 'LLM · TTS · Vision at edge' },
  { icon: LineChart, name: 'ACSE + Insights', detail: 'Real-time cognitive scoring' },
  { icon: Shield, name: 'Human-in-the-loop', detail: 'Manual confirm fallbacks' },
  { icon: Heart, name: 'ElevenLabs + Groq', detail: 'Jessica voice · fast inference' },
];

const chromaScreens = [
  { image: '/screenshots/patient-today.png', title: 'Today', subtitle: 'Patient · Dashboard', borderColor: '#4F8CFF' },
  { image: '/screenshots/patient-clara.png', title: 'Clara', subtitle: 'Patient · Voice', borderColor: '#34D399' },
  { image: '/screenshots/patient-meds.png', title: 'Meds', subtitle: 'Patient · Verification', borderColor: '#38BDF8' },
  { image: '/screenshots/supervisor-recall-ai.png', title: 'Recall AI', subtitle: 'Supervisor · Briefing', borderColor: '#8B5CF6' },
  { image: '/screenshots/supervisor-acse.png', title: 'ACSE', subtitle: 'Supervisor · Scoring', borderColor: '#FF6B4A' },
  { image: '/screenshots/supervisor-overview.png', title: 'Overview', subtitle: 'Supervisor · Vitals', borderColor: '#4F8CFF' },
];

export function FeaturesBento() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-12 max-w-2xl">
          <p className="section-label mb-4">Platform</p>
          <ScrollReveal containerClassName="!my-0" textClassName="font-display !text-4xl text-white md:!text-5xl">
            Two lenses. One brain.
          </ScrollReveal>
          <p className="mt-4 text-lg text-white/55">
            Patient and caregiver experiences share the same Dexie database — meds, routines, vitals, events, and Clara
            activity. No stale copies.
          </p>
        </FadeContent>
        <ExpandableBentoGrid items={featureItems} />
      </div>
    </section>
  );
}

export function CascadeSection() {
  return (
    <section id="cascade" className="border-y border-white/5 bg-ink-50/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-12 text-center">
          <p className="section-label mb-4">The Recall Cascade™</p>
          <ScrollReveal
            containerClassName="!my-0 mx-auto max-w-4xl"
            textClassName="font-display !text-3xl text-white md:!text-5xl"
          >
            Signal → Score → Intervention → Caregiver
          </ScrollReveal>
          <p className="mx-auto mt-4 max-w-xl text-white/55">Automatically. Before crisis.</p>
        </FadeContent>
        <div className="grid gap-4 md:grid-cols-4">
          {cascadeSteps.map((s) => (
            <FadeContent key={s.step} blur threshold={0.1}>
              <SpotlightCard className="border-white/10 bg-ink-100/70 p-6" spotlightColor="rgba(79, 140, 255, 0.18)">
                <div className="font-display text-4xl text-white/15">{s.step}</div>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/50">{s.desc}</p>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ScreenshotsSection() {
  return (
    <section id="screens" className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <FadeContent blur className="mb-12 max-w-2xl">
          <p className="section-label mb-4">Product</p>
          <ScrollReveal
            containerClassName="!my-0"
            textClassName="font-display !text-4xl !text-product-950 md:!text-5xl"
          >
            Designed for dignity.
          </ScrollReveal>
          <p className="mt-4 text-product-800/70">
            Large touch targets. Warm typography. Voice-first for Margaret. Data-rich for Susan.
          </p>
        </FadeContent>
        <ScreenshotGrid items={chromaScreens} columns={3} variant="light" />
      </div>
    </section>
  );
}

export function StackSection() {
  return (
    <section id="stack" className="border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeContent blur>
            <p className="section-label mb-4">Technology</p>
            <ScrollReveal containerClassName="!my-0" textClassName="font-display !text-4xl text-white md:!text-5xl">
              Production-deployed today.
            </ScrollReveal>
            <p className="mt-4 text-lg text-white/55">
              React and TypeScript on the client. Zustand for state. Dexie for offline storage. Cloudflare Workers for
              LLM, TTS, and vision — deployed on GitHub Pages with an edge API.
            </p>
          </FadeContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((s) => (
              <FadeContent key={s.name} blur threshold={0.1}>
                <SpotlightCard className="border-white/10 bg-ink-100/60 p-4" spotlightColor="rgba(79, 140, 255, 0.15)">
                  <div className="flex items-start gap-3">
                    <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-recall-blue" strokeWidth={1.75} />
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="text-xs text-white/45">{s.detail}</div>
                    </div>
                  </div>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>
        </div>

        <FadeContent blur className="mt-20">
          <p className="section-label mb-4 text-center">Live agent workspace</p>
          <AgentBentoGrid />
        </FadeContent>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <GlowBorderCard
          width="100%"
          aspectRatio="auto"
          borderRadius="2rem"
          colorPreset="aurora"
          className="min-h-[280px] border-white/10 bg-gradient-to-br from-recall-blue/20 via-ink-100 to-recall-violet/20"
        >
          <div className="relative mx-auto max-w-2xl p-10 text-center md:p-16">
            <h2 className="font-display text-4xl md:text-5xl">
              Margaret keeps her dignity.
              <span className="block text-white/60">Susan keeps her sanity.</span>
            </h2>
            <p className="mt-4 text-lg text-white/55">
              Recall doesn&apos;t replace caregivers — it extends them. Early signal. Automatic de-escalation. AI that
              knows the whole person.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
                <InteractiveHoverButton className="border-white/20 bg-white text-ink">
                  Open live demo
                </InteractiveHoverButton>
              </a>
              <button type="button" onClick={() => document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth' })}>
                <AnimatedButton className="rounded-full border-white/20 bg-transparent text-white dark:bg-transparent">
                  Watch demo video
                </AnimatedButton>
              </button>
            </div>
          </div>
        </GlowBorderCard>
      </div>
    </section>
  );
}

export function SiteFooter({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return <Footer variant={variant} />;
}
