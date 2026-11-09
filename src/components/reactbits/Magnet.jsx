import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Magnet - React Bits Component
 * Smooth magnetic attraction pulling elements towards the cursor on hover.
 */
export default function Magnet({
  children,
  padding = 60,
  magnetStrength = 0.35,
  activeTransition = 'cubic-bezier(0.16, 1, 0.3, 1)',
  inactiveTransition = 'cubic-bezier(0.16, 1, 0.3, 1)',
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

