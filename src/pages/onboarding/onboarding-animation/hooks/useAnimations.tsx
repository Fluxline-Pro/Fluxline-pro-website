import React from 'react';
import { useReducedMotion } from '../../../../theme/hooks/useReducedMotion';

const useFadeIn = (text: string, speed: number) => {
  const { shouldReduceMotion } = useReducedMotion();
  const [isFadedIn, setIsFadedIn] = React.useState(shouldReduceMotion);
  const [opacity, setOpacity] = React.useState(shouldReduceMotion ? 1 : 0);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setIsFadedIn(true);
      setOpacity(1);
      return;
    }

    const timeout = setTimeout(() => setIsFadedIn(true), speed);
    const timeoutOpacity = setTimeout(() => setOpacity(1), speed);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutOpacity);
    };
  }, [text, speed, shouldReduceMotion]);

  return { isFadedIn, opacity };
};

const useFadeOut = (text: string, speed: number) => {
  const { shouldReduceMotion } = useReducedMotion();
  const [isFadedOut, setIsFadedOut] = React.useState(shouldReduceMotion);
  const [opacity, setOpacity] = React.useState(shouldReduceMotion ? 0 : 1);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setIsFadedOut(true);
      setOpacity(0);
      return;
    }

    const timeout = setTimeout(() => setIsFadedOut(true), speed);
    const timeoutOpacity = setTimeout(() => setOpacity(0), speed);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutOpacity);
    };
  }, [text, speed, shouldReduceMotion]);

  return { isFadedOut, opacity };
};

const useScrollDown = (text: string, speed: number) => {
  const { shouldReduceMotion } = useReducedMotion();
  const [isScrolledDown, setIsScrolledDown] =
    React.useState(shouldReduceMotion);
  const [scrollPosition, setScrollPosition] = React.useState(
    shouldReduceMotion ? 100 : 0
  );

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setIsScrolledDown(true);
      setScrollPosition(100);
      return;
    }

    const timeout = setTimeout(() => setIsScrolledDown(true), speed);
    const timeoutScrollPosition = setTimeout(
      () => setScrollPosition(100),
      speed
    );

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutScrollPosition);
    };
  }, [text, speed, shouldReduceMotion]);

  return { isScrolledDown, scrollPosition };
};

export { useFadeIn, useFadeOut, useScrollDown };
