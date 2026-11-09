import React, { useRef, useState } from 'react';

/**
 * SpotlightCard - React Bits Component (Ultra-Optimized)
 * Interactive card with smooth radial spotlight illumination tracking the cursor.
 * Renders children directly without intervening wrapper divs to preserve flex/grid styling.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.15)',
  borderColor = 'rgba(59, 130, 246, 0.3)',
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-obsidian-900 transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic spotlight layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* Render children directly to preserve flex/grid layouts on the card */}
      {children}
    </div>
  );
}
