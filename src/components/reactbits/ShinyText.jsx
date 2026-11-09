import React from 'react';

/**
 * ShinyText - React Bits Component
 * Smooth shimmering metallic sheen sweeping across text.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = '',
  shimmerWidth = 100
}) {
  return (
    <span
      className={`inline-block text-transparent bg-clip-text ${
        disabled
          ? 'text-slate-400'
          : 'bg-gradient-to-r from-slate-400 via-white to-slate-400 dark:from-slate-400 dark:via-white dark:to-slate-400'
      } ${className}`}
      style={{
        backgroundImage: disabled
          ? 'none'
          : 'linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 70%)',
        backgroundSize: '200% 100%',
        animation: disabled ? 'none' : `shinyText ${speed}s linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes shinyText {
          0% { background-position: 150% 0; }
          100% { background-position: -50% 0; }
        }
      `}</style>
    </span>
  );
}

