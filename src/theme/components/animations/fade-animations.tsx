import React from 'react';
import { motion } from 'framer-motion';

import { useIsMobile } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface FadeSlideInProps {
  children: React.ReactNode;
  direction?: 'right' | 'bottom' | 'left' | 'top';
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeSlideIn: React.FC<FadeSlideInProps> = ({
  children,
  direction = 'right',
  distance = 16,
  duration = 0.4,
  delay = 0,
  className = '',
}) => {
  const isMobile = useIsMobile();
  const { shouldReduceMotion } = useReducedMotion();

  // Adjust distance for mobile if needed
  const adjustedDistance = isMobile ? Math.min(distance, 10) : distance;

  const getInitialPosition = () => {
    // If reduced motion is enabled, start at final position
    if (shouldReduceMotion) {
      return { opacity: 1, x: 0, y: 0 };
    }

    switch (direction) {
      case 'right':
        return { opacity: 0, x: adjustedDistance, y: 0 };
      case 'left':
        return { opacity: 0, x: -adjustedDistance, y: 0 };
      case 'bottom':
        return { opacity: 0, x: 0, y: adjustedDistance };
      case 'top':
        return { opacity: 0, x: 0, y: -adjustedDistance };
      default:
        return { opacity: 0, x: adjustedDistance, y: 0 };
    }
  };

  const getTransition = () => {
    if (shouldReduceMotion) {
      return {
        duration: 0,
        delay: 0,
      };
    }

    return {
      duration,
      delay,
      ease: 'easeOut' as const,
      type: 'tween' as const,
    };
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{
        opacity: 0,
        x: direction === 'right' ? -adjustedDistance : adjustedDistance,
        y: 0,
      }} // Add exit animation
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
};

export interface FadeUpProps {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  distance = 20,
  duration = 0.5,
  delay = 0,
  className = '',
}) => {
  const { shouldReduceMotion } = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) {
      return { opacity: 1, y: 0 };
    }
    return { opacity: 0, y: distance };
  };

  const getTransition = () => {
    if (shouldReduceMotion) {
      return { duration: 0, delay: 0 };
    }
    return {
      duration,
      delay,
      ease: 'easeOut' as const,
      // Add staggered timing to prevent conflicts
      type: 'tween' as const,
    };
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }} // Add exit animation
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
};

export interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 0.3,
  delay = 0,
  className = '',
}) => {
  const { shouldReduceMotion } = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) {
      return { opacity: 1 };
    }
    return { opacity: 0 };
  };

  const getTransition = () => {
    if (shouldReduceMotion) {
      return { duration: 0, delay: 0 };
    }
    return {
      duration,
      delay,
      ease: 'easeOut' as const,
    };
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Add exit animation
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
};

export const SlideLeft: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {children}
    </motion.div>
  );
};

const FadeAnimations = { FadeSlideIn, FadeUp, FadeIn, SlideLeft };
export default FadeAnimations;
