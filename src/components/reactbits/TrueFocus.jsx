import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * TrueFocus - React Bits Component
 * Interactive focus box with glowing animated corners that snap to words.
 */
export default function TrueFocus({
  sentence = "Clean Architecture Performance Scale",
  separator = " ",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#3b82f6",
  glowColor = "rgba(59, 130, 246, 0.4)",
  animationDuration = 0.4,
  pauseBetweenAnimations = 1.2,
}) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex]);

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap gap-2.5 items-center justify-center p-2 rounded-xl"
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative cursor-pointer text-xs sm:text-sm font-semibold px-2.5 py-1 text-slate-800 dark:text-slate-200 transition-colors"
            style={{
              filter: manualMode
                ? isActive
                  ? `blur(0px)`
                  : `blur(${blurAmount}px)`
                : isActive
                ? `blur(0px)`
                : `blur(${blurAmount * 0.4}px)`,
              opacity: isActive ? 1 : 0.65,
              transition: `filter ${animationDuration}s ease, opacity ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      {/* Dynamic Animated Focus Box with Corner Accents */}
      <motion.div
        className="pointer-events-none absolute box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span
          className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 rounded-tl-[2px]"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 rounded-tr-[2px]"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
        <span
          className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 rounded-bl-[2px]"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
        <span
          className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 rounded-br-[2px]"
          style={{ borderColor, filter: `drop-shadow(0 0 4px ${glowColor})` }}
        />
      </motion.div>
    </div>
  );
}

