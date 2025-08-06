import React from 'react';

import { breakpoints } from '../theme';

type MediaQueryComparison =
  | 'less-than'
  | 'greater-than'
  | 'greater-than-or-equal'
  | 'less-than-or-equal'
  | 'equal';
type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const getMediaQuery = (
  screen: ScreenSize,
  comparison: MediaQueryComparison
): string => {
  const breakpoint = breakpoints[screen];

  switch (comparison) {
    case 'less-than':
      return `(max-width: ${breakpoint - 1}px)`;
    case 'greater-than':
      return `(min-width: ${breakpoint + 1}px)`;
    case 'greater-than-or-equal':
      return `(min-width: ${breakpoint}px)`;
    case 'less-than-or-equal':
      return `(max-width: ${breakpoint}px)`;
    case 'equal':
      if (screen === 'xs') {
        return `(max-width: ${breakpoints.sm - 1}px)`;
      }
      const nextBreakpoint = Object.entries(breakpoints).find(
        ([key]) => key === screen
      )?.[1];
      return `(min-width: ${breakpoint}px) and (max-width: ${nextBreakpoint ?? breakpoint - 1}px)`;
    default:
      return `(min-width: ${breakpoint}px)`;
  }
};

export const useMediaQuery = (
  query: ScreenSize | string,
  comparison: MediaQueryComparison = 'greater-than-or-equal'
): boolean => {
  const [matches, setMatches] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mediaQueryString =
      typeof query === 'string' ? query : getMediaQuery(query, comparison);
    const mediaQuery = window.matchMedia(mediaQueryString);

    const updateMatches = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    // Set initial value
    updateMatches(mediaQuery);

    // Add listener
    mediaQuery.addEventListener('change', updateMatches);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query, comparison]);

  return matches;
};

export const useWindowSize = () => {
  const [windowHeight, setWindowHeight] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowHeight, windowWidth };
};

export const useIsMobile = () => {
  return useMediaQuery(`(max-width: ${breakpoints.sm - 1}px)`);
};

export const useIsTablet = () => {
  return useMediaQuery(
    `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.lg - 1}px)`
  );
};

export const useIsDesktop = () => {
  return useMediaQuery(`(min-width: ${breakpoints.lg}px)`);
};

export const useIsLargeDesktop = () => {
  return useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
};

export const useIsLandscape = () => {
  const { windowHeight, windowWidth } = useWindowSize();
  return windowWidth > windowHeight;
};

export const useIsPortrait = () => {
  const { windowHeight, windowWidth } = useWindowSize();
  return windowWidth < windowHeight;
};

export const useIsMobileLandscape = () => {
  const isMobile = useIsMobile();
  const isLandscape = useIsLandscape();
  return isMobile && isLandscape;
};

type DeviceOrientation =
  | 'landscape'
  | 'portrait'
  | 'square'
  | 'mobile-landscape'
  | 'tablet-portrait'
  | 'ultrawide'
  | 'large-portrait';

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] =
    React.useState<DeviceOrientation>('landscape');

  React.useEffect(() => {
    const handleOrientationChange = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const LANDSCAPE_THRESHOLD = 1.25; // More common 5:4 ratio
      const SQUARE_THRESHOLD = 1.15; // Slightly wider than square

      if (aspectRatio >= LANDSCAPE_THRESHOLD) {
        if (
          window.innerWidth <= breakpoints.lg &&
          window.innerHeight < window.innerWidth
        ) {
          setOrientation('mobile-landscape');
        } else {
          setOrientation('landscape');
        }
      } else if (aspectRatio <= 1 / SQUARE_THRESHOLD) {
        // Detect large vertical monitors first (width >= 1024px is desktop+)
        if (window.innerWidth >= breakpoints.lg) {
          setOrientation('large-portrait');
        } else if (window.innerWidth >= breakpoints.sm) {
          setOrientation('tablet-portrait');
        } else if (window.innerWidth >= breakpoints.md) {
          setOrientation('large-portrait');
        } else {
          setOrientation('portrait');
        }
      } else if (
        window.innerWidth >= breakpoints.xxl &&
        window.innerHeight < window.innerWidth &&
        window.innerWidth / window.innerHeight >= 2.0 // Optional aspect ratio check
      ) {
        setOrientation('ultrawide');
      } else {
        setOrientation('square');
      }
    };

    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange(); // Set initial value

    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
};

// Additional helper for more precise detection
export const useDeviceType = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isLargeDesktop = useIsLargeDesktop();
  const { windowHeight, windowWidth } = useWindowSize();
  const isLandscape = useIsLandscape();
  const isPortrait = useIsPortrait();
  const orientation = useDeviceOrientation();
  const isMobileLandscape = useIsMobileLandscape();

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    deviceType: isMobile
      ? 'mobile'
      : isTablet
        ? 'tablet'
        : isDesktop
          ? 'desktop'
          : 'large-desktop',
    windowHeight,
    windowWidth,
    isLandscape,
    isPortrait,
    orientation,
    isMobileLandscape,
  } as const;
};

export default useMediaQuery;
