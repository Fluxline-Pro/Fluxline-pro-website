import React from 'react';

/**
 * Hook to detect scroll position on the page and provide navigation between pages
 * Tracks both scroll to bottom for forward navigation and scroll to top for backward navigation
 */
export const usePageScrollNavigation = () => {
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [canNavigateForward, setCanNavigateForward] = React.useState(false);
  const [canNavigateBackward, setCanNavigateBackward] = React.useState(false);

  const checkScrollPosition = React.useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Check if at top (within 50px of top)
    const isTop = scrollTop <= 50;
    setIsAtTop(isTop);

    // Check if at bottom (within 100px of bottom)
    const isBottom = scrollHeight - (scrollTop + clientHeight) <= 100;
    setIsAtBottom(isBottom);

    // Set navigation capabilities with some delay to prevent accidental triggers
    setCanNavigateForward(isBottom);
    setCanNavigateBackward(isTop && scrollTop > 0);
  }, []);

  React.useEffect(() => {
    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollPosition);

    // Initial check
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return {
    isAtBottom,
    isAtTop,
    canNavigateForward,
    canNavigateBackward,
  };
};