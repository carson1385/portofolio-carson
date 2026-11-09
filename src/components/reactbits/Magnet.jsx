import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Magnet - React Bits Component
 * Smooth magnetic attraction pulling elements towards the cursor on hover.
 */
export default function Magnet({
  children,
  padding = 60,
  magnetStrength = 0.35,
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = clientX - centerX;
    const distY = clientY - centerY;

    x.set(distX * magnetStrength);
    y.set(distY * magnetStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isBlockOrFlex = className.includes('flex') || className.includes('block') || className.includes('w-full');

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`${isBlockOrFlex ? '' : 'inline-block '}relative ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
