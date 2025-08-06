import React from 'react';

export const useComponentFadeInOut = (
  isVisible: boolean,
  duration: number = 800,
  onFadeOutComplete?: () => void
) => {
  const [fadeStage, setFadeStage] = React.useState<'in' | 'out' | 'pending-in'>(
    'in'
  );

  React.useEffect(() => {
    if (isVisible) {
      if (fadeStage === 'out') {
        setFadeStage('pending-in');
      } else if (fadeStage !== 'in') {
        setFadeStage('in');
      }
    } else {
      setFadeStage('out');
      const timeout = setTimeout(() => {
        if (onFadeOutComplete) onFadeOutComplete();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration, onFadeOutComplete, fadeStage]);

  React.useEffect(() => {
    if (fadeStage === 'pending-in') {
      const timeout = setTimeout(() => {
        setFadeStage('in');
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [fadeStage]);

  const style = {
    opacity: fadeStage === 'in' ? 1 : 0,
    transition: `opacity ${duration}ms`,
  };

  return { fadeStage, style };
};
