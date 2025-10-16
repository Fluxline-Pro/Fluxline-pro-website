import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppTheme } from '../hooks/useAppTheme';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  useDeviceOrientation,
  useIsLargeDesktop,
  useIsTablet,
  useIsPortrait,
  useIsMobile,
} from '../hooks/useMediaQuery';
import { useLayoutConfig } from '../hooks/useLayoutConfig';
import { useContentScrollable } from '../hooks/useContentScrollable';
import { BackgroundLayer } from './BackgroundLayer';
import { ContentArea } from './ContentArea';
import { LayoutGrid } from './LayoutGrid';

interface ViewportGridProps {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  className?: string;
  reversed?: boolean;
  imagePosition?: 'left' | 'right' | 'top' | 'bottom';
  respectLayoutPreference?: boolean;
  placeItemsLeft?: 'start' | 'center' | 'end' | 'normal';
  placeItemsRight?: 'start' | 'center' | 'end' | 'normal';
  columns?: {
    left?: number;
    right?: number;
  };
  layout?: string;
  fullscreen?: boolean;
  nested?: boolean;
  rightMaxWidth?: string | number;
  isHomePage?: boolean;
  backgroundImage?: 'one' | 'two';
  backgroundLoaded?: boolean;
}

export const ViewportGrid: React.FC<ViewportGridProps> = ({
  leftChildren,
  rightChildren,
  className = '',
  reversed = false,
  imagePosition = 'left',
  respectLayoutPreference = true,
  placeItemsLeft = 'center',
  placeItemsRight = 'center',
  columns,
  rightMaxWidth,
  fullscreen = false,
  nested = false,
  isHomePage = false,
  backgroundImage = 'one',
  backgroundLoaded,
}) => {
  const { layoutPreference, readingDirection, theme, themeMode } =
    useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const [isEntering, setIsEntering] = React.useState(false);
  const orientation = useDeviceOrientation();
  const isXLScreen = useIsLargeDesktop();
  const isTablet = useIsTablet();
  const isPortrait = useIsPortrait();
  const isMobile = useIsMobile();
  const location = useLocation();
  const homePage = location.pathname === '/';

  // Create ref for right content area to detect scrollability
  const rightContentRef = React.useRef<HTMLDivElement>(null);
  const isRightContentScrollable = useContentScrollable(rightContentRef);

  // console.log('ViewportGrid Props:', {
  //   isHomePage,
  //   backgroundImage,
  //   orientation,
  //   layoutPreference,
  //   respectLayoutPreference,
  // });

  // Handle route changes
  React.useEffect(() => {
    // console.log('ViewportGrid Route Change:', {
    //   isHomePage,
    //   backgroundImage,
    //   orientation,
    // });
    setIsEntering(true);
    const timer = setTimeout(
      () => setIsEntering(false),
      shouldReduceMotion ? 1 : 200
    );
    return () => clearTimeout(timer);
  }, [isHomePage, backgroundImage, orientation, shouldReduceMotion]);

  // Auto-scroll to top on navigation if not already at top
  React.useEffect(() => {
    const scrollToTop = () => {
      // Check if the page is not at the top (with small tolerance for precision)
      if (window.scrollY > 5) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }
    };

    // Small delay to ensure the route has fully changed
    const timer = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.hash, shouldReduceMotion]);

  // Handle scroll behavior
  React.useEffect(() => {
    const shouldAllowScroll = orientation === 'portrait' && !isHomePage;
    document.documentElement.classList.toggle(
      'allow-scroll',
      shouldAllowScroll
    );
    document.body.classList.toggle('allow-scroll', shouldAllowScroll);

    return () => {
      document.documentElement.classList.remove('allow-scroll');
      document.body.classList.remove('allow-scroll');
    };
  }, [orientation, isHomePage]);

  // Get layout configuration
  const { gridTemplateColumns, containerStyle } = useLayoutConfig(
    orientation,
    isHomePage,
    backgroundImage,
    isXLScreen,
    nested,
    theme,
    layoutPreference
  );

  // console.log('Layout Config:', {
  //   gridTemplateColumns,
  //   containerStyle,
  //   orientation,
  //   isHomePage,
  //   backgroundImage,
  // });

  // Determine which children to show based on layout
  const shouldShowLeftChildren = React.useMemo(() => {
    if (!isHomePage) return true;
    if (orientation === 'portrait') return false;

    if (respectLayoutPreference) {
      return layoutPreference === 'right-handed'
        ? backgroundImage === 'one'
        : backgroundImage === 'two';
    }

    return backgroundImage === 'one';
  }, [
    isHomePage,
    orientation,
    backgroundImage,
    layoutPreference,
    respectLayoutPreference,
  ]);

  const shouldShowRightChildren = React.useMemo(() => {
    if (!isHomePage) return true;
    if (orientation === 'portrait') return true;

    if (respectLayoutPreference) {
      return layoutPreference === 'right-handed'
        ? backgroundImage === 'two'
        : backgroundImage === 'one';
    }

    return backgroundImage === 'two';
  }, [
    isHomePage,
    orientation,
    backgroundImage,
    layoutPreference,
    respectLayoutPreference,
  ]);

  // Build class names
  const classes = React.useMemo(() => {
    const baseClasses = ['viewport-grid'];
    if (className) baseClasses.push(className);
    if (reversed) baseClasses.push('reversed');
    if (imagePosition === 'top' || imagePosition === 'bottom')
      baseClasses.push('stacked');
    if (imagePosition === 'bottom' || imagePosition === 'right')
      baseClasses.push('flipped');
    if (fullscreen) baseClasses.push('fullscreen');
    if (nested) baseClasses.push('nested');
    return baseClasses.join(' ');
  }, [className, reversed, imagePosition, fullscreen, nested]);

  // Calculate placeItems for right content based on device orientation and scrollability
  const rightPlaceItems = React.useMemo(() => {
    // Only apply scrollability logic to non-mobile-portrait devices
    // Mobile portrait devices work correctly with the original placeItemsRight prop
    if (orientation === 'portrait') {
      return placeItemsRight;
    }

    // For all other devices (tablet-portrait, large-portrait, mobile-landscape,
    // ultrawide, square, landscape), use scrollability-based logic:
    // - 'start' if content is scrollable (prevents content cutoff at top)
    // - 'center' if content is not scrollable (provides better visual centering)
    return isRightContentScrollable ? 'start' : 'center';
  }, [orientation, isRightContentScrollable, placeItemsRight]);

  return (
    <LayoutGrid
      className={classes}
      templateColumns={gridTemplateColumns}
      fullWidth={fullscreen}
      direction={isHomePage ? 'ltr' : readingDirection}
      display='grid'
      gap={orientation === 'portrait' ? '1rem' : undefined}
      style={{
        ...containerStyle,
        overflow: nested ? 'hidden' : 'visible',
        height: nested ? '100%' : 'auto',
        paddingTop:
          fullscreen && orientation === 'mobile-landscape' ? '3rem' : '0px',
      }}
    >
      <BackgroundLayer
        isHomePage={isHomePage}
        backgroundImage={backgroundImage}
        orientation={orientation}
        themeMode={themeMode}
        theme={theme}
        layoutPreference={layoutPreference}
        backgroundLoaded={backgroundLoaded}
      />

      {shouldShowLeftChildren && leftChildren && (
        <ContentArea
          position='left'
          orientation={orientation}
          isHomePage={isHomePage}
          readingDirection={readingDirection}
          layoutPreference={layoutPreference}
          isEntering={isEntering}
          nested={nested}
          style={{
            gridColumn: !rightChildren
              ? '1 / -1'
              : orientation === 'portrait'
                ? '1 / -1'
                : // : orientation === 'mobile-landscape' &&
                  //     layoutPreference === 'left-handed'
                  //   ? '2 / -1' // Move to right side in mobile landscape + left-handed
                  '1 / 2', // Default position
            placeItems: placeItemsLeft,
            // Ensure left content doesn't overflow on mobile
            overflow: 'hidden',
            maxWidth: '100%',
            width: '100%',
            boxSizing: 'border-box',
            // Add top padding on mobile for fixed header, but not when it interferes with image card title positioning
            paddingTop: isMobile && !homePage ? '7rem' : '0',
          }}
        >
          {leftChildren}
        </ContentArea>
      )}

      {shouldShowRightChildren && rightChildren && (
        <ContentArea
          ref={rightContentRef}
          position='right'
          orientation={orientation}
          isHomePage={isHomePage}
          readingDirection={readingDirection}
          layoutPreference={layoutPreference}
          isEntering={isEntering}
          nested={nested}
          style={{
            maxWidth: rightMaxWidth || '100%',
            gridColumn:
              orientation === 'portrait'
                ? '1 / -1' // Use full width for portrait mode
                : // : orientation === 'mobile-landscape' &&
                  //     layoutPreference === 'left-handed'
                  //   ? '1 / 2' // Move to left side in mobile landscape + left-handed
                  '2 / -1', // Default position
            placeItems: rightPlaceItems, // Use calculated placeItems based on device orientation and scrollability
            marginTop: isTablet ? '3rem' : '0', // adjusts marginTop for tablet only
            paddingLeft: isTablet ? '1.5rem' : '0', // adjusts paddingLeft for tablet only
            paddingRight:
              isTablet || orientation === 'tablet-portrait' ? '1.125rem' : '0', // Increased right padding to prevent scrollbar overlap
          }}
        >
          {rightChildren}
        </ContentArea>
      )}
    </LayoutGrid>
  );
};
