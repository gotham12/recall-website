import { FOUNDERS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function FoundersCredit({
  className,
  bright = false,
  variant = 'line',
}: {
  className?: string;
  bright?: boolean;
  variant?: 'line' | 'short';
}) {
  const text = variant === 'short' ? `${FOUNDERS.title}: ${FOUNDERS.names}` : FOUNDERS.creditLine;

  return (
    <p
      className={cn(
        'text-sm md:text-base',
        bright ? 'text-product-800/55' : 'text-white/45',
        className
      )}
    >
      {text}
    </p>
  );
}
