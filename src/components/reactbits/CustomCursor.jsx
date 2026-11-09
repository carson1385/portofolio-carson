import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor - React Bits Component (Ultra-Optimized)
 * Directly manipulates transform matrix via requestAnimationFrame without React re-renders.
 * Automatically disabled on touch screens.
 */
export default function CustomCursor({ color = '#3b82f6' }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    // Disable completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseDown = () => { isClicking.current = true; };
    const handleMouseUp = () => { isClicking.current = false; };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        isHovered.current = true;
      } else {
        isHovered.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth render loop (Lerp interpolation)
    const update = () => {
      // Linear interpolation for smooth trailing ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (dotRef.current) {
        const dotScale = isClicking.current ? 0.7 : isHovered.current ? 1.4 : 1;
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = isClicking.current ? 0.8 : isHovered.current ? 1.6 : 1;
        const ringOpacity = isHovered.current ? '0.45' : '0.22';
        ringRef.current.style.opacity = ringOpacity;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        style={{ willChange: 'transform, opacity', borderColor: color }}
        className="absolute w-9 h-9 rounded-full border border-accent bg-accent/5 backdrop-blur-[0.5px] transition-opacity duration-150"
      />

      {/* Main Sharp Center Dot */}
      <div
        ref={dotRef}
        style={{ willChange: 'transform', backgroundColor: color }}
        className="absolute w-2 h-2 rounded-full shadow-sm"
      />
    </div>
  );
}
