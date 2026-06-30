'use client';

import FadeContent from '@/components/FadeContent';
import { AssetImage } from '@/components/site/asset-image';
import { cn } from '@/lib/utils';

export type ScreenshotItem = {
  image: string;
  title: string;
  subtitle?: string;
  desc?: string;
};

type ScreenshotGridProps = {
  items: readonly ScreenshotItem[];
  columns?: 2 | 3;
  variant?: 'dark' | 'light';
  phone?: boolean;
  className?: string;
};

export function ScreenshotGrid({
  items,
  columns = 3,
  variant = 'dark',
  phone = false,
  className,
}: ScreenshotGridProps) {
  const light = variant === 'light';

  return (
    <div
      className={cn(
        'grid gap-5',
        columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map((item, i) => (
        <FadeContent key={item.title} blur threshold={0.06} delay={i * 0.04}>
          <figure
            className={cn(
              'group overflow-hidden rounded-2xl border transition-shadow duration-500',
              light
                ? 'border-product-200 bg-white shadow-md shadow-recall-blue/5 hover:shadow-xl'
                : 'border-white/10 bg-ink-100/80 hover:shadow-lg hover:shadow-recall-blue/10'
            )}
          >
            <div className={cn(phone ? 'mx-auto w-[220px] p-4' : 'p-0')}>
              {phone ? (
                <div className="phone-frame w-full">
                  <div className="phone-notch" />
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-ink-200">
                    <AssetImage
                      src={item.image}
                      alt={item.desc ? `${item.title} — ${item.desc}` : `${item.title}${item.subtitle ? `, ${item.subtitle}` : ''}`}
                      fill
                      className="object-cover object-top"
                      sizes="220px"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-ink-200">
                  <AssetImage
                    src={item.image}
                    alt={item.desc ? `${item.title} — ${item.desc}` : `${item.title}${item.subtitle ? `, ${item.subtitle}` : ''}`}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 50vw, 320px"
                  />
                </div>
              )}
            </div>
            <figcaption className={cn('px-4 pb-4 pt-3', phone && 'text-center md:text-left')}>
              <p className={cn('text-[10px] uppercase tracking-[0.18em]', light ? 'text-recall-blue/70' : 'text-white/40')}>
                {item.subtitle ?? 'Recall'}
              </p>
              <h4 className={cn('font-display text-lg', light ? 'text-product-950' : 'text-white')}>{item.title}</h4>
              {item.desc ? (
                <p className={cn('mt-1 text-sm', light ? 'text-product-800/65' : 'text-white/50')}>{item.desc}</p>
              ) : null}
            </figcaption>
          </figure>
        </FadeContent>
      ))}
    </div>
  );
}
