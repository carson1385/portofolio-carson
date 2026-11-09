import React, { useRef, useState, useEffect } from 'react';

/**
 * VariableProximity - React Bits Component
 * Interactive text where characters dynamically respond to mouse proximity.
 */
export default function VariableProximity({
  label,
  radius = 90,
  maxScale = 1.15,
  className = '',
}) {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const [scales, setScales] = useState([]);

  const letters = label.split('');

  useEffect(() => {
    letterRefs.current = letterRefs.current.slice(0, letters.length);
    setScales(new Array(letters.length).fill(1));
  }, [letters.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const newScales = letterRefs.current.map((el) => {
        if (!el) return 1;
        const rect = el.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;

        const distance = Math.hypot(mouseX - letterX, mouseY - letterY);

        if (distance < radius) {
          const factor = 1 - distance / radius;
          return 1 + (maxScale - 1) * factor;
        }
        return 1;
      });

      setScales(newScales);
    };

    const handleMouseLeave = () => {
      setScales(new Array(letters.length).fill(1));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [radius, maxScale, letters.length]);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {letters.map((char, index) => (
        <span
          key={index}
          ref={(el) => (letterRefs.current[index] = el)}
          style={{
            transform: `scale(${scales[index] || 1})`,
            display: 'inline-block',
            transition: 'transform 0.15s ease-out',
            willChange: 'transform',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

