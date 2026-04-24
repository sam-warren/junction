// src/components/ui/brand-mark.tsx
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  /**
   * - 'static': render the SVG immediately, no animation
   * - 'draw': animate the strokes drawing on mount (one-shot)
   * - 'loop': continuously redraw on a 12s loop (used in Convergence section)
   */
  variant?: 'static' | 'draw' | 'loop';
  className?: string;
  /** Tailwind size classes; default scales for header use. */
  size?: string;
}

const PATHS = [
  'M15,50 L95,50',
  'M15,20 L55,20 L70,50',
  'M15,80 L55,80 L70,50',
];

export function BrandMark({
  variant = 'static',
  className,
  size = 'h-6 w-auto sm:h-7 md:h-8 lg:h-9',
}: BrandMarkProps) {
  const [drawn, setDrawn] = useState(variant !== 'draw');

  useEffect(() => {
    if (variant !== 'draw') return;
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, [variant]);

  const dashLengths = [120, 100, 100];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      className={cn(size, className)}
      aria-label='Junction'
    >
      {PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill='none'
          stroke='currentColor'
          strokeWidth={10}
          strokeLinecap='round'
          strokeDasharray={dashLengths[i]}
          strokeDashoffset={drawn ? 0 : dashLengths[i]}
          style={{
            transition: variant === 'draw' ? 'stroke-dashoffset 1.4s ease 0.1s' : undefined,
            animation:
              variant === 'loop'
                ? `brand-mark-loop 12s ease-in-out infinite ${i * 0.3}s`
                : undefined,
          }}
        />
      ))}
      {variant === 'loop' && (
        <style>{`
          @keyframes brand-mark-loop {
            0% { stroke-dashoffset: ${dashLengths[0]}; }
            30%, 80% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: ${dashLengths[0]}; }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes brand-mark-loop { from, to { stroke-dashoffset: 0; } }
          }
        `}</style>
      )}
    </svg>
  );
}
