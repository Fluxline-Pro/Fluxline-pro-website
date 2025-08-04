import React from 'react';

export const useFadeInOut = (targetPath: string, duration: number = 800) => {
  const [displayedPath, setDisplayedPath] = React.useState(targetPath);
  const [fadeStage, setFadeStage] = React.useState<'in' | 'out' | 'pending-in'>(
    'in'
  );

  React.useEffect(() => {
    if (targetPath !== displayedPath) {
      setFadeStage('out');
    }
  }, [targetPath, displayedPath]);

  React.useEffect(() => {
    if (fadeStage === 'out') {
      const timeout = setTimeout(() => {
        setDisplayedPath(targetPath);
        setFadeStage('pending-in');
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [fadeStage, targetPath, duration]);

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

  return { style, displayedPath };
};
