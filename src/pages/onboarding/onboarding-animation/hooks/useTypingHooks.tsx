import React from 'react';
import { useReducedMotion } from '../../../../theme/hooks/useReducedMotion';

const useLineByLineTyping = (text: string, speed = 125) => {
  const { shouldReduceMotion } = useReducedMotion();
  const [count, setCount] = React.useState(
    shouldReduceMotion ? text.length : 0
  );

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setCount(text.length);
      return;
    }

    if (count < text.length) {
      const timeout = setTimeout(() => setCount(count + 1), speed);
      return () => clearTimeout(timeout);
    }
  }, [count, text, speed, shouldReduceMotion]);

  return text.slice(0, count);
};

const useTypewriter = (text: string, baseSpeed = 150, minSpeed = 40) => {
  console.log('[useTypewriter] MOUNT');
  const { shouldReduceMotion } = useReducedMotion();
  const [count, setCount] = React.useState(
    shouldReduceMotion ? text.length : 0
  );
  const [speed, setSpeed] = React.useState(baseSpeed);

  // Reset count and speed when text changes
  React.useEffect(() => {
    console.log(
      '[useTypewriter] RESET: text changed to',
      text,
      'baseSpeed:',
      baseSpeed,
      'shouldReduceMotion:',
      shouldReduceMotion
    );
    setCount(shouldReduceMotion ? text.length : 0);
    setSpeed(baseSpeed);
  }, [text, baseSpeed, shouldReduceMotion]);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setCount(text.length);
      return;
    }

    if (count < text.length) {
      const progress = count / text.length;
      // Human typing profile: slow at start, fast in middle, slow at end
      let profileSpeed = baseSpeed;
      if (progress < 0.2) {
        profileSpeed = baseSpeed + 60; // slow at start
      } else if (progress > 0.5) {
        profileSpeed = minSpeed + 40; // slow at end
      } else {
        profileSpeed = minSpeed + 10; // fast in middle
      }
      // Add random jitter (+/- 10ms)
      const jitter = Math.floor(Math.random() * 21) - 10;
      const nextSpeed = Math.max(minSpeed, profileSpeed + jitter);
      console.log('[useTypewriter] Typing:', {
        count,
        char: text[count],
        speed,
        nextSpeed,
        text,
      });
      const timeout = setTimeout(() => {
        setCount(count + 1);
        setSpeed(nextSpeed);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      console.log('[useTypewriter] Done typing:', { count, text });
    }
  }, [count, text, speed, baseSpeed, minSpeed, shouldReduceMotion]);

  console.log('[useTypewriter] RETURN:', {
    count,
    text,
    speed,
    minSpeed,
    baseSpeed,
  });
  console.log('[useTypewriter] END function call');
  return text.slice(0, count);
};

const useBackspace = (text: string, speed = 120) => {
  console.log('[useBackspace] MOUNT');
  const { shouldReduceMotion } = useReducedMotion();
  const [typed, setTyped] = React.useState(text);

  // Reset when text changes
  React.useEffect(() => {
    setTyped(text);
  }, [text]);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setTyped(''); // Instantly clear when reduced motion is enabled
      return;
    }

    console.log('[useBackspace] BACKSPACE', { typed, speed });
    if (typed.length > 0) {
      const timeout = setTimeout(
        () => setTyped(typed.slice(0, typed.length - 1)),
        speed
      );
      return () => clearTimeout(timeout);
    }
  }, [typed, speed, shouldReduceMotion]);

  console.log('[useBackspace] RETURN:', { typed });
  return typed;
};

export { useLineByLineTyping, useTypewriter, useBackspace };
