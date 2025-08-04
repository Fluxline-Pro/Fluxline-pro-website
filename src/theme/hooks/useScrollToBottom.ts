import React from 'react';

export const useScrollToBottom = <T extends HTMLElement>(
  containerRef: React.RefObject<T | null>
) => {
  const [isAtBottom, setIsAtBottom] = React.useState(false);

  const checkScrollPosition = React.useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Consider "at bottom" when within 20px of the bottom
    const isBottom = scrollHeight - (scrollTop + clientHeight) <= 20;
    setIsAtBottom(isBottom);
  }, [containerRef]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollPosition);
    // Also check on resize as content dimensions might change
    window.addEventListener('resize', checkScrollPosition);

    // Initial check
    checkScrollPosition();

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [containerRef, checkScrollPosition]);

  return isAtBottom;
};
