import React, { useEffect, useRef, useState } from 'react';

/**
 * CountUp - React Bits Component
 * Smooth animated counter with easing that triggers when visible in the viewport.
 */
export default function CountUp({
  to = 100,
  from = 0,
  duration = 2,
  separator = '',
  decimals = 0,
  decimal = '.',
  prefix = '',
  suffix = '',
  className = '',
  onEnd,
  onStart
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          if (onStart) onStart();

          let startTime = null;
          const startVal = from;
          const endVal = to;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Ease out quad
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = startVal + (endVal - startVal) * easeOut;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(endVal);
              if (onEnd) onEnd();
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [to, from, duration, hasStarted]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

