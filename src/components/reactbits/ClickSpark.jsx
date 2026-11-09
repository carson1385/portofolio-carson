import React, { useRef, useEffect } from 'react';

/**
 * ClickSpark - React Bits Component (Ultra-Optimized)
 * Automatically halts animation loop when no sparks are active (0% idle CPU).
 */
export default function ClickSpark({
  sparkColor = '#3b82f6',
  sparkSize = 9,
  sparkRadius = 24,
  sparkCount = 7,
  duration = 420,
  extraColors = ['#60a5fa', '#93c5fd', '#38bdf8', '#2563eb'],
  children,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const isRunningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = (currentTime) => {
      if (sparksRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = currentTime - spark.startTime;
        if (elapsed >= spark.life) return false;

        const progress = elapsed / spark.life;
        const opacity = 1 - progress;
        const currentSize = spark.size * (1 - progress * 0.5);

        spark.x += spark.vx;
        spark.y += spark.vy;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleClick = (e) => {
      const now = performance.now();
      const colors = [sparkColor, ...extraColors];

      // Limit max total concurrent sparks to 40 for optimal performance
      if (sparksRef.current.length > 35) {
        sparksRef.current.splice(0, 15);
      }

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const speed = (sparkRadius / (duration / 16)) * (0.8 + Math.random() * 0.5);
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: sparkSize * (0.6 + Math.random() * 0.5),
          color: colors[Math.floor(Math.random() * colors.length)],
          startTime: now,
          life: duration,
        });
      }

      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkCount, sparkRadius, duration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />
      {children}
    </>
  );
}
