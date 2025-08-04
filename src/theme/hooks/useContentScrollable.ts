import React from 'react';

/**
 * Hook to detect if an element's content is scrollable
 * @param ref - Reference to the element to check
 * @returns boolean indicating if the content is scrollable
 */
export const useContentScrollable = (ref: React.RefObject<HTMLDivElement | null>): boolean => {
  const [isScrollable, setIsScrollable] = React.useState(false);

  React.useEffect(() => {
    const checkScrollable = () => {
      if (!ref.current) {
        setIsScrollable(false);
        return;
      }

      const element = ref.current;
      // Check if content overflows vertically
      const hasVerticalScroll = element.scrollHeight > element.clientHeight;
      setIsScrollable(hasVerticalScroll);
    };

    // Check immediately
    checkScrollable();

    // Set up ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(checkScrollable);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Also listen for window resize
    window.addEventListener('resize', checkScrollable);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkScrollable);
    };
  }, [ref]);

  return isScrollable;
};