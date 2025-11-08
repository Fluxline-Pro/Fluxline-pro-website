import { useDeviceOrientation } from '../../../theme/hooks/useMediaQuery';

/**
 * Custom hook for consistent mobile detection across components
 */
export const useMobileDetection = () => {
  const orientation = useDeviceOrientation();

  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  const isMobileLandscape = orientation === 'mobile-landscape';

  const isTablet = orientation === 'tablet-portrait';

  return {
    isMobile,
    isMobileLandscape,
    isTablet,
    orientation,
    // Commonly used combined checks
    isMobileOrLandscape: isMobile || isMobileLandscape,
    isSmallScreen: isMobile || isMobileLandscape || isTablet,
  };
};
