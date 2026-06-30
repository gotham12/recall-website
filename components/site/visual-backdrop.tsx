'use client';

import { AssetImage } from '@/components/site/asset-image';
import { cn } from '@/lib/utils';

type VisualBackdropProps = {
  variant: 'home' | 'problem' | 'product';
  className?: string;
};

const overlays = {
  home: 'from-ink via-ink/80 to-recall-violet/20',
  problem: 'from-problem-950 via-problem-900/95 to-recall-coral/25',
  product: 'from-product-50/90 via-white/70 to-recall-mint/30',
};

const images = {
  home: '/screenshots/recall-neural-care.png',
  problem: '/screenshots/problem-atmosphere.png',
  product: '/screenshots/product-hope.png',
};

export function VisualBackdrop({ variant, className }: VisualBackdropProps) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <AssetImage
        src={images[variant]}
        alt=""
        fill
        priority={variant === 'home'}
        className="object-cover opacity-40 mix-blend-soft-light animate-pulse-soft"
        sizes="100vw"
      />
      <div className={cn('absolute inset-0 bg-gradient-to-b', overlays[variant])} />
      <div className="absolute inset-0 bg-grid-fade grid-bg opacity-30" />
      <div className="animate-float-slow absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-recall-coral/10 blur-[100px]" />
      <div className="animate-float-slow absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-recall-blue/15 blur-[120px] [animation-delay:2s]" />
    </div>
  );
}
