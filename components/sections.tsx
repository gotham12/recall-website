'use client';

import BlurText from '@/components/BlurText';
import GradientText from '@/components/GradientText';
import ShinyText from '@/components/ShinyText';
import CountUp from '@/components/CountUp';
import AnimatedButton from '@/components/ui/animated-button';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { DEMO_URL } from '@/lib/constants';
import { Brain } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#demo', label: 'Demo' },
  { href: '#features', label: 'Platform' },
  { href: '#cascade', label: 'Cascade' },
];

const heroStats = [
  { value: 6.9, suffix: 'M', label: "Americans living with Alzheimer's" },
  { value: 12, suffix: 'M', label: 'Unpaid dementia caregivers' },
  { value: 30, suffix: 's', label: 'Until the next diagnosis' },
  { value: 1, suffix: '', label: 'Platform for both experiences' },
];

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="#" className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-recall-blue to-recall-violet shadow-lg shadow-recall-blue/20">
            <Brain className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
          <span className="font-display text-xl tracking-tight text-white">Recall</span>
        </Link>

        <SpotlightNavbar
          className="hidden flex-1 pt-0 lg:flex"
          items={navItems}
          onItemClick={(item) => scrollToSection(item.href)}
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('#demo')}
            className="hidden text-sm text-white/55 transition hover:text-white sm:inline"
          >
            Watch demo
          </button>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            <AnimatedButton className="rounded-full border-white/15 bg-white text-ink hover:bg-white/90 dark:bg-white dark:text-ink">
              Live app
            </AnimatedButton>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-28">
      <AnimatedRays className="absolute inset-0 min-h-[92vh]">
        <div className="mx-auto flex min-h-[72vh] max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-xs text-white/70 backdrop-blur-md">
            <ShinyText
              text="AI-native cognitive care for neurodegenerative families"
              className="text-xs text-white/80"
            />
          </div>

          <BlurText
            text="The care system families need"
            className="font-display mx-auto max-w-4xl justify-center text-5xl leading-[1.02] tracking-tight text-white md:text-7xl lg:text-[5.25rem]"
            delay={80}
          />

          <div className="mt-4">
            <GradientText
              colors={['#4F8CFF', '#8B5CF6', '#38BDF8', '#4F8CFF']}
              animationSpeed={6}
              className="font-display text-5xl italic md:text-7xl lg:text-[5.25rem]"
            >
              doesn&apos;t exist yet.
            </GradientText>
          </div>

          <BlurText
            text="Recall is the missing layer — Clara for Margaret's daily dignity, Recall AI for Susan's real-time signal. One offline-first platform that catches cognitive decline before crisis."
            animateBy="words"
            className="mx-auto mt-6 max-w-2xl justify-center text-lg leading-relaxed text-white/60 md:text-xl"
            delay={30}
          />

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              <InteractiveHoverButton className="border-white/20 bg-white text-ink hover:bg-white/90">
                Try the live demo
              </InteractiveHoverButton>
            </a>
            <button type="button" onClick={() => scrollToSection('#demo')}>
              <AnimatedButton className="rounded-full border-white/15 bg-transparent text-white dark:bg-transparent dark:text-white">
                Watch 6-min walkthrough
              </AnimatedButton>
            </button>
          </div>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-white md:text-4xl">
                  <CountUp to={stat.value} duration={2.5} separator="," />
                  {stat.suffix}
                </div>
                <div className="mt-1 text-xs leading-snug text-white/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedRays>
    </section>
  );
}
