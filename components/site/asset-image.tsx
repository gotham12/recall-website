'use client';

import { assetPath } from '@/lib/asset-path';
import { cn } from '@/lib/utils';

type AssetImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
};

/** Static-export-safe image — always applies GitHub Pages basePath. */
export function AssetImage({ src, alt, className, fill, sizes, priority }: AssetImageProps) {
  const resolved = assetPath(src);

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={cn('absolute inset-0 h-full w-full', className)}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={resolved} alt={alt} className={className} loading={priority ? 'eager' : 'lazy'} decoding="async" />
  );
}
