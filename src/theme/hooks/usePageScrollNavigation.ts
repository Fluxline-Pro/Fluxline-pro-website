import React from 'react';

/**
 * Hook to detect scroll position on the page and provide navigation between pages
 * Tracks scroll to bottom and detects pull-to-refresh gesture for forward navigation
 */
export const usePageScrollNavigation = () => {
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const [isAtTop, setIsAtTop] = React.useState(true);
  const [canNavigateForward, setCanNavigateForward] = React.useState(false);
  const [canNavigateBackward, setCanNavigateBackward] = React.useState(false);
  const [pullToRefreshTriggered, setPullToRefreshTriggered] =
    React.useState(false);

  // Track scroll attempts at bottom for pull-to-refresh gesture
  const scrollAttemptRef = React.useRef(0);
  const lastScrollTopRef = React.useRef(0);
  const gestureTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const checkScrollPosition = React.useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const lastScrollTop = lastScrollTopRef.current;

    // Check if at top (within 50px of top)
    const isTop = scrollTop <= 50;
    setIsAtTop(isTop);

    // Check if there's scrollable content (page is taller than viewport)
    const hasScrollableContent = scrollHeight > clientHeight + 10; // 10px buffer for minor differences

    // Check if at bottom (within 50px of bottom) - only if there's scrollable content
    const isBottom =
      hasScrollableContent && scrollHeight - (scrollTop + clientHeight) <= 50;
    setIsAtBottom(isBottom);

    // Pull-to-refresh gesture detection
    if (isBottom && hasScrollableContent) {
      // If user is trying to scroll down while already at bottom
      if (
        scrollTop <= lastScrollTop &&
        scrollTop >= scrollHeight - clientHeight - 5
      ) {
        scrollAttemptRef.current += 1;

        // Clear any existing timeout
        if (gestureTimeoutRef.current) {
          clearTimeout(gestureTimeoutRef.current);
        }

        // Trigger navigation after sustained scroll attempts (5-7 attempts)
        if (scrollAttemptRef.current >= 6) {
          setPullToRefreshTriggered(true);
          setCanNavigateForward(true);

          // Reset after triggering
          scrollAttemptRef.current = 0;

          // Auto-reset the trigger after a short delay
          gestureTimeoutRef.current = setTimeout(() => {
            setPullToRefreshTriggered(false);
            setCanNavigateForward(false);
          }, 500);
        } else {
          // Reset counter if no scroll attempts for 1 second
          gestureTimeoutRef.current = setTimeout(() => {
            scrollAttemptRef.current = 0;
          }, 1000);
        }
      }
    } else {
      // Reset when not at bottom
      scrollAttemptRef.current = 0;
      setPullToRefreshTriggered(false);
      setCanNavigateForward(false);
    }

    // Backward navigation (simple top detection)
    setCanNavigateBackward(isTop);

    // Update last scroll position
    lastScrollTopRef.current = scrollTop;
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

      // Clean up timeout
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current);
      }
    };
  }, [checkScrollPosition]);

  return {
    isAtBottom,
    isAtTop,
    canNavigateForward,
    canNavigateBackward,
    pullToRefreshTriggered,
  };
};
