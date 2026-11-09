import React from 'react';

/**
 * InfiniteMarquee - React Bits Component
 * High-performance horizontal infinite ticker for tech stacks and skills.
 * Features edge fade mask, pause-on-hover, and smooth GPU-accelerated translate.
 */
export default function InfiniteMarquee({
  items = [],
  speed = 30, // seconds per loop
  direction = 'left',
  pauseOnHover = true,
  className = '',
}) {
  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex w-max items-center gap-4 py-3 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite ${
            direction === 'right' ? 'reverse' : 'normal'
          }`,
          willChange: 'transform',
        }}
      >
        {/* Render twice for seamless infinite loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/70 dark:bg-obsidian-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm hover:border-accent hover:text-accent transition-colors cursor-default whitespace-nowrap"
          >
            {item.icon && <span className="text-accent">{item.icon}</span>}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
