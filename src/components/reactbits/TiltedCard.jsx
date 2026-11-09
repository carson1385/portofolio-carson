import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * TiltedCard - React Bits Component (Enhanced 3D Parallax Depth)
 * Realistic 3D perspective tilt with mouse tracking, layered Z-depth, and smooth spring physics.
 */
export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.025,
  perspective = 1100,
  showGlare = true,
  ...props
}) {
  const cardRef = useRef(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useSpring(0, { stiffness: 280, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 22 });
  const scaleSpring = useSpring(1, { stiffness: 280, damping: 22 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(rX);
    rotateY.set(rY);
    scaleSpring.set(scale);

    if (showGlare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.16,
      });
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scaleSpring.set(1);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        rotateX,
        rotateY,
        scale: scaleSpring,
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl ${className}`}
      {...props}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
      {showGlare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
