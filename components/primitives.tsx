'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowOrb({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      aria-hidden
    />
  );
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
}: {
  label: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p className="section-label mb-4">{label}</p>
      <h2 className="font-display text-4xl leading-[1.08] md:text-5xl lg:text-[3.25rem]">{title}</h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed text-white/55 ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function MetricCard({
  value,
  label,
  source,
  accent = 'blue',
}: {
  value: string;
  label: string;
  source?: string;
  accent?: 'blue' | 'coral' | 'violet' | 'mint';
}) {
  const accents = {
    blue: 'from-recall-blue/25 to-transparent border-recall-blue/20',
    coral: 'from-recall-coral/25 to-transparent border-recall-coral/20',
    violet: 'from-recall-violet/25 to-transparent border-recall-violet/20',
    mint: 'from-recall-mint/20 to-transparent border-recall-mint/20',
  };
  return (
    <div className={`glass-strong relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 ${accents[accent]}`}>
      <div className="font-display text-4xl text-white md:text-5xl">{value}</div>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{label}</p>
      {source && <p className="mt-3 text-[10px] uppercase tracking-widest text-white/30">{source}</p>}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-ink-50/30 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap px-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-12 text-sm text-white/40">
            {item}
            <span className="h-1 w-1 rounded-full bg-recall-blue/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone-frame mx-auto w-[260px] transition duration-500 hover:scale-[1.02] hover:shadow-[0_48px_140px_-24px_rgba(79,140,255,0.35)]">
      <div className="phone-notch" />
      <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-ink-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" loading="lazy" />
      </div>
    </div>
  );
}
