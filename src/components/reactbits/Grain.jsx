import React from 'react';

/**
 * Grain - React Bits Component
 * Ultra-subtle film grain overlay rendered via SVG filter.
 * Zero external asset dependencies, zero bandwidth overhead.
 */
export default function Grain({ opacity = 0.035, className = '' }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 select-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

