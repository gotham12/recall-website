'use client';

import AnimatedButton from '@/components/ui/animated-button';
import { GlowBorderCard } from '@/components/ui/glow-border-card';
import { SpotlightNavbar } from '@/components/ui/spotlight-navbar';
import { CONTACT_EMAIL, DEMO_URL } from '@/lib/constants';
import { gmailComposeUrl } from '@/lib/asset-path';
import { cn } from '@/lib/utils';
import { Brain, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/problem/', label: 'Problem' },
  { href: '/product/', label: 'Product' },
  { href: '/#team', label: 'Team' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar({ tone = 'dark' }: { tone?: 'dark' | 'light' | 'auto' }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProduct = tone === 'light' || pathname.startsWith('/product');
  const isProblem = tone === 'dark' || pathname.startsWith('/problem');

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => {
      if (item.href === '/') return pathname === '/';
      if (item.href.startsWith('/#')) return pathname === '/';
      return pathname.startsWith(item.href.replace(/\/$/, ''));
    })
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl',
        isProduct
          ? 'border-product-200/60 bg-white/70 text-product-950'
          : isProblem
            ? 'border-recall-coral/10 bg-problem-950/80 text-white'
            : 'border-white/5 bg-ink/60 text-white'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-recall-blue to-recall-violet shadow-lg shadow-recall-blue/20 transition group-hover:scale-105">
            <Brain className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
          <span className="font-display text-xl tracking-tight">Recall</span>
        </Link>

        <SpotlightNavbar
          className="hidden flex-1 pt-0 lg:flex"
          items={navItems.map((item) => ({ ...item, href: item.href }))}
          defaultActiveIndex={activeIndex}
          onItemClick={(item) => {
            if (item.href.startsWith('/#')) {
              if (pathname !== '/') {
                router.push(item.href);
                return;
              }
              document.querySelector(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
              return;
            }
            router.push(item.href);
          }}
        />

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={gmailComposeUrl(CONTACT_EMAIL, { subject: 'Recall — Get in touch' })}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden items-center gap-1.5 text-sm transition hover:opacity-80 md:inline-flex',
              isProduct ? 'text-product-700' : 'text-white/55 hover:text-white'
            )}
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            <AnimatedButton
              className={cn(
                'rounded-full text-sm',
                isProduct
                  ? 'border-recall-blue/20 bg-recall-blue text-white'
                  : 'border-white/15 bg-white text-ink dark:bg-white dark:text-ink'
              )}
            >
              Live app
            </AnimatedButton>
          </a>
        </div>
      </div>
    </header>
  );
}

export function PageNavCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Link href="/problem/" className="group block">
        <GlowBorderCard
          width="100%"
          aspectRatio="auto"
          borderRadius="1.5rem"
          colorPreset="custom"
          className="theme-problem min-h-[220px] border-recall-coral/25 bg-problem-900/85 transition group-hover:border-recall-coral/45"
        >
          <div className="p-8 text-left">
            <p className="section-label text-recall-coral/80">Chapter 1</p>
            <h3 className="font-display mt-3 text-3xl text-white">The crisis families face</h3>
            <p className="mt-3 text-sm text-white/50">Dark, urgent statistics and structural gaps in care.</p>
            <span className="mt-6 inline-flex text-sm text-recall-coral group-hover:underline">
              Enter the problem →
            </span>
          </div>
        </GlowBorderCard>
      </Link>
      <Link href="/product/" className="group block">
        <GlowBorderCard
          width="100%"
          aspectRatio="auto"
          borderRadius="1.5rem"
          colorPreset="aurora"
          className="theme-product min-h-[220px] border-recall-mint/30 bg-white/90 shadow-lg shadow-recall-blue/10 transition group-hover:border-recall-blue/40"
        >
          <div className="p-8 text-left">
            <p className="section-label text-recall-blue/80">Chapter 2</p>
            <h3 className="font-display mt-3 text-3xl text-product-950">The product that responds</h3>
            <p className="mt-3 text-sm text-product-800/65">Bright, hopeful platform walkthrough and live demo.</p>
            <span className="mt-6 inline-flex text-sm text-recall-blue group-hover:underline">
              See the solution →
            </span>
          </div>
        </GlowBorderCard>
      </Link>
    </div>
  );
}
