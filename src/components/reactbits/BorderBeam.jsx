import React from 'react';

/**
 * BorderBeam - React Bits Component
 * An animated, luminous laser beam traveling continuously along card boundaries.
 */
export default function BorderBeam({
  className = '',
  size = 180,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = '#3b82f6',
  colorTo = '#60a5fa',
  delay = 0,
}) {
  return (
    <div
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--delay': `-${delay}s`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--border-width': `${borderWidth}px`,
      }}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
    >
      <div
        className="absolute aspect-square w-[calc(var(--size))] animate-border-beam [animation-delay:var(--delay)] [animation-duration:var(--duration)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:calc(var(--size)/2)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)))]"
      />
      <style>{`
        @keyframes border-beam {
          to {
            offset-distance: 100%;
          }
        }
        .animate-border-beam {
          animation: border-beam var(--duration) infinite linear;
        }
      `}</style>
    </div>
  );
}

