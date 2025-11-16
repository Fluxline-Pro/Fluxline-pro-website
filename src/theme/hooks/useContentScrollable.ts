import React from 'react';

/**
 * Hook to detect if an element's content is scrollable
 * @param ref - Reference to the element to check
 * @returns boolean indicating if the content is scrollable
 */
export const useContentScrollable = (
  ref: React.RefObject<HTMLDivElement | null>
): boolean => {
  const [isScrollable, setIsScrollable] = React.useState(false);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkScrollable = () => {
      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Debounce the check to avoid excessive calls during rapid changes
      timeoutId = setTimeout(() => {
        if (!ref.current) {
          setIsScrollable(false);
          return;
        }

        const element = ref.current;
        // Check if content overflows vertically (add small buffer for precision)
        const hasVerticalScroll =
          element.scrollHeight > element.clientHeight + 1;
        setIsScrollable(hasVerticalScroll);
      }, 100); // Increase debounce to 100ms for legal pages that load content dynamically
    };

    // Check immediately (but debounced)
    checkScrollable();

    // Set up ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(checkScrollable);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Also listen for window resize
    window.addEventListener('resize', checkScrollable);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkScrollable);
    };
  }, [ref]);

  return isScrollable;
};
