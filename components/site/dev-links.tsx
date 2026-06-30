'use client';

import { GITHUB_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

export function DevLinksSection({ bright = false }: { bright?: boolean }) {
  return (
    <section id="developers" className={cn('relative border-t py-12', bright ? 'border-product-200/80' : 'border-white/5')}>
      <div className="mx-auto max-w-6xl px-6">
        <p className={cn('section-label mb-4', bright ? 'text-product-800/50' : 'text-white/35')}>
          For developers
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          <a
            href={GITHUB_LINKS.website}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 text-sm transition hover:opacity-80 md:text-base',
              bright ? 'text-product-800 hover:text-recall-blue' : 'text-white/50 hover:text-white'
            )}
          >
            Website repository
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={GITHUB_LINKS.app}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 text-sm transition hover:opacity-80 md:text-base',
              bright ? 'text-product-800 hover:text-recall-blue' : 'text-white/50 hover:text-white'
            )}
          >
            Recall app repository
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
