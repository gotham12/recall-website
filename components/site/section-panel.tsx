'use client';

import { AssetImage } from '@/components/site/asset-image';
import { cn } from '@/lib/utils';

export type SectionTone = 'dark-sad' | 'dark-neutral' | 'bright-hopeful' | 'bright-warm';

const TONE_OVERLAYS: Record<SectionTone, string> = {
  'dark-sad': 'from-black/80 via-zinc-950/85 to-black/90',
  'dark-neutral': 'from-ink/85 via-ink/75 to-ink/90',
  'bright-hopeful': 'from-white/75 via-product-50/80 to-recall-mint/25',
  'bright-warm': 'from-product-50/85 via-white/78 to-recall-mint/35',
};

type SectionPanelProps = {
  background: string;
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
};

/** Full-viewport section shell with a neuro-related photographic background. */
export function SectionPanel({ background, tone = 'dark-neutral', children, className }: SectionPanelProps) {
  return (
    <div className={cn('relative min-h-[100dvh]', className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <AssetImage
          src={background}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className={cn('absolute inset-0 bg-gradient-to-b', TONE_OVERLAYS[tone])} />
      </div>
      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-center">{children}</div>
    </div>
  );
}
