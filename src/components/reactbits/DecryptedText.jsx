import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText - React Bits Component
 * High-tech scrambled / matrix glyph decoding animation effect.
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+~|}{[]:;?><',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover', // 'hover' | 'view'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const revealedIndices = useRef(new Set());
  const intervalRef = useRef(null);

  const triggerAnimation = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    revealedIndices.current.clear();

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (revealedIndices.current.has(i)) return char;

            if (iteration >= (sequential ? i * 2 : maxIterations)) {
              revealedIndices.current.add(i);
              return char;
            }

            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration++;

      if (revealedIndices.current.size >= text.replace(/\s/g, '').length || iteration > maxIterations * 3) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'view') {
      triggerAnimation();
    }
    return () => clearInterval(intervalRef.current);
  }, [text, animateOn]);

  return (
    <span
      className={`inline-block cursor-default ${parentClassName}`}
      onMouseEnter={() => {
        setIsHovering(true);
        if (animateOn === 'hover') triggerAnimation();
      }}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}

