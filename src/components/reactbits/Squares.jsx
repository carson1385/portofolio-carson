import React, { useRef, useEffect } from 'react';

/**
 * Squares - React Bits Component (Ultra-Optimized)
 * Interactive grid of squares that illuminate upon mouse cursor hover and fade softly.
 * Features:
 * - Offscreen auto-pausing via IntersectionObserver
 * - Tab visibility listener (zero CPU when tab is hidden)
 * - Hardware-accelerated canvas 2D rendering
 */
export default function Squares({
  direction = 'right',
  speed = 0.5,
  borderColor = 'rgba(255, 255, 255, 0.05)',
  squareSize = 40,
  hoverFillColor = 'rgba(59, 130, 246, 0.18)',
  className = '',
}) {
  const canvasRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for hover highlight
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const col = Math.floor((x - (gridOffset.current.x % squareSize)) / squareSize);
      const row = Math.floor((y - (gridOffset.current.y % squareSize)) / squareSize);

      hoveredSquare.current = { col, row, alpha: 1.0 };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Visibility & Offscreen optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else {
        isVisible = true;
        if (!animationFrameId) animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Shift grid for subtle drift
      gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
      gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;

      const numCols = Math.ceil(canvas.width / squareSize) + 2;
      const numRows = Math.ceil(canvas.height / squareSize) + 2;

      const startX = (gridOffset.current.x % squareSize) - squareSize;
      const startY = (gridOffset.current.y % squareSize) - squareSize;

      // Draw hovered glow square if active
      if (hoveredSquare.current && hoveredSquare.current.alpha > 0.01) {
        const hx = startX + hoveredSquare.current.col * squareSize;
        const hy = startY + hoveredSquare.current.row * squareSize;

        ctx.fillStyle = hoverFillColor;
        ctx.globalAlpha = hoveredSquare.current.alpha;
        ctx.fillRect(hx, hy, squareSize, squareSize);
        ctx.globalAlpha = 1.0;

        // Soft fade out
        hoveredSquare.current.alpha *= 0.94;
      }

      // Draw grid lines
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < numCols; i++) {
        const x = startX + i * squareSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let j = 0; j < numRows; j++) {
        const y = startY + j * squareSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}

