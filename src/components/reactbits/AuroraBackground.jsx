import React from 'react';

/**
 * AuroraBackground - React Bits Component
 * Ambient, atmospheric glowing orbs that drift smoothly in the background.
 * Ultra-optimized using hardware-accelerated CSS transforms.
 */
export default function AuroraBackground({ className = '', children }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl animate-pulse-subtle"
        style={{ willChange: 'transform, opacity' }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl animate-float-slow"
        style={{ willChange: 'transform' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-sky-500/10 dark:bg-sky-600/10 blur-3xl animate-float-delayed"
        style={{ willChange: 'transform' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
