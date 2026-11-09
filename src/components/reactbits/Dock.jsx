import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Dock - React Bits Component
 * Interactive floating action dock with smooth magnification physics on hover.
 */
function DockItem({ mouseX, item }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth magnification curve
  const widthSync = useTransform(distance, [-120, 0, 120], [42, 60, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 14 });

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      onClick={item.onClick}
      className="relative flex items-center justify-center rounded-xl bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-accent shadow-md transition-colors cursor-pointer group"
      aria-label={item.label}
    >
      {/* Tooltip */}
      <span className="absolute -top-9 px-2 py-1 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
        {item.label}
      </span>
      <div className="flex items-center justify-center w-5 h-5">
        {item.icon}
      </div>
    </motion.button>
  );
}

export default function Dock({ items = [], className = '' }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-2.5 p-2 rounded-2xl bg-white/60 dark:bg-obsidian-950/60 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-2xl ${className}`}
    >
      {items.map((item, idx) => (
        <DockItem key={idx} mouseX={mouseX} item={item} />
      ))}
    </div>
  );
}

