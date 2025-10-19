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
  const [gestureProgress, setGestureProgress] = React.useState(0); // 0-100% progress
  const [showBounceHint, setShowBounceHint] = React.useState(false);

  // Track scroll attempts at bottom for pull-to-refresh gesture
  const scrollAttemptRef = React.useRef(0);
  const lastScrollTopRef = React.useRef(0);
  const gestureTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const gestureStartTimeRef = React.useRef<number | null>(null);

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

    // Pull-to-refresh gesture detection - MUCH MORE CONSERVATIVE
    if (isBottom && hasScrollableContent) {
      // If user is trying to scroll down while already at bottom
      if (
        scrollTop <= lastScrollTop &&
        scrollTop >= scrollHeight - clientHeight - 5
      ) {
        const currentTime = Date.now();

        // Start timing the gesture on first attempt
        if (scrollAttemptRef.current === 0) {
          gestureStartTimeRef.current = currentTime;
        }

        scrollAttemptRef.current += 1;

        // Clear any existing timeout
        if (gestureTimeoutRef.current) {
          clearTimeout(gestureTimeoutRef.current);
        }

        // CONSERVATIVE REQUIREMENTS:
        // - Need at least 12 sustained scroll attempts (doubled from 6)
        // - Must be sustained for at least 2 seconds
        // - Must be a continuous gesture (not sporadic)
        const gestureTime = gestureStartTimeRef.current
          ? currentTime - gestureStartTimeRef.current
          : 0;

        const minScrollAttempts = 12;
        const minGestureTime = 2000; // 2 seconds

        // Calculate progress (0-100%)
        const scrollProgress = Math.min(
          (scrollAttemptRef.current / minScrollAttempts) * 100,
          100
        );
        const timeProgress = Math.min(
          (gestureTime / minGestureTime) * 100,
          100
        );
        const overallProgress = Math.min(scrollProgress, timeProgress);

        setGestureProgress(overallProgress);

        // Show bounce hint when user is making progress (>25%)
        const shouldShowBounce = overallProgress > 25 && overallProgress < 100;
        setShowBounceHint(shouldShowBounce);

        if (
          scrollAttemptRef.current >= minScrollAttempts &&
          gestureTime >= minGestureTime
        ) {
          setPullToRefreshTriggered(true);
          setCanNavigateForward(true);
          setGestureProgress(100);
          setShowBounceHint(false);

          // Reset after triggering
          scrollAttemptRef.current = 0;
          gestureStartTimeRef.current = null;

          // Auto-reset the trigger after a short delay
          gestureTimeoutRef.current = setTimeout(() => {
            setPullToRefreshTriggered(false);
            setCanNavigateForward(false);
            setGestureProgress(0);
          }, 500);
        } else {
          // Reset counter if no scroll attempts for 2 seconds (increased from 1)
          gestureTimeoutRef.current = setTimeout(() => {
            scrollAttemptRef.current = 0;
            gestureStartTimeRef.current = null;
            setGestureProgress(0);
            setShowBounceHint(false);
          }, 2000);
        }
      }
    } else {
      // Reset when not at bottom
      scrollAttemptRef.current = 0;
      gestureStartTimeRef.current = null;
      setPullToRefreshTriggered(false);
      setCanNavigateForward(false);
      setGestureProgress(0);
      setShowBounceHint(false);
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
    gestureProgress,
    showBounceHint,
  };
};
