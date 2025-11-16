import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppTheme } from '../hooks/useAppTheme';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  useDeviceOrientation,
  useIsLargeDesktop,
  useIsTablet,
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
  contentRef?: React.RefObject<HTMLDivElement | null>;
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
  contentRef,
}) => {
  const { layoutPreference, readingDirection, theme, themeMode } =
    useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const [isEntering, setIsEntering] = React.useState(false);
  const orientation = useDeviceOrientation();
  const isXLScreen = useIsLargeDesktop();
  const isTablet = useIsTablet();
  const location = useLocation();

  // Create ref for right content area to detect scrollability
  // Use external contentRef if provided, otherwise use internal ref
  const internalRef = React.useRef<HTMLDivElement>(null);
  const rightContentRef = contentRef || internalRef;
  const isRightContentScrollable = useContentScrollable(rightContentRef);

  // Re-evaluate scrollability when route changes or content mutates
  React.useEffect(() => {
    // Small delay to allow content to render
    const timer = setTimeout(() => {
      if (rightContentRef?.current) {
        const event = new Event('resize', { bubbles: true });
        window.dispatchEvent(event);
      }
    }, 200); // Increased delay for legal pages content loading

    return () => clearTimeout(timer);
  }, [location.pathname, rightContentRef]);

  // Add mutation observer for legal pages that load content dynamically
  React.useEffect(() => {
    if (!rightContentRef?.current) return;

    const observer = new MutationObserver(() => {
      // Re-check scrollability when content changes (e.g., markdown loading)
      const timer = setTimeout(() => {
        if (rightContentRef?.current) {
          const event = new Event('resize', { bubbles: true });
          window.dispatchEvent(event);
        }
      }, 50);

      return () => clearTimeout(timer);
    });

    observer.observe(rightContentRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [rightContentRef]); // console.log('ViewportGrid Props:', {
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
  // Scrollability-based positioning is now handled via rightPlaceItems below
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
    // Mobile portrait uses the original placeItemsRight prop (works correctly)
    if (orientation === 'portrait') {
      return placeItemsRight;
    }

    // For non-mobile viewports, use scrollability-based positioning:
    // This ensures scrollable content is positioned at the top to allow full access,
    // while non-scrollable content remains centered for better visual presentation
    if (isRightContentScrollable) {
      return 'start'; // Position scrollable content at top
    } else {
      return 'center'; // Center non-scrollable content
    }
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

      {/* Render content areas in different DOM order for left-handed mobile-landscape */}
      {orientation === 'mobile-landscape' &&
      layoutPreference === 'left-handed' ? (
        <>
          {/* Render right content first (will appear on left visually) */}
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
                gridColumn: '1 / 2', // Move to left side in mobile landscape + left-handed
                placeItems: rightPlaceItems, // Use calculated placeItems based on device orientation and scrollability
                marginTop:
                  isTablet && orientation !== 'mobile-landscape' ? '3rem' : '0', // Remove margin entirely for cleaner positioning with flex-end justification
                paddingLeft: isTablet ? '1.5rem' : '0',
                paddingRight: isTablet ? '1.125rem' : '0',
                paddingBottom: '0', // Remove padding entirely for cleaner positioning with flex-end justification
              }}
            >
              {rightChildren}
            </ContentArea>
          )}
          {/* Render left content second (will appear on right visually) */}
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
                gridColumn: !rightChildren ? '1 / -1' : '2 / -1', // Move to right side in mobile landscape + left-handed
                placeItems: placeItemsLeft,
                overflow:
                  isHomePage && orientation === 'mobile-landscape'
                    ? 'visible'
                    : 'hidden',
                overflowX:
                  isHomePage && orientation === 'mobile-landscape'
                    ? 'visible'
                    : 'hidden',
                maxWidth: '100%',
                width: '100%',
                boxSizing: 'border-box',
                paddingTop: '0', // Remove padding entirely for cleaner positioning with flex-end justification
                // Don't add margin/padding to images (leftChildren) - they should fill their space naturally
              }}
            >
              {leftChildren}
            </ContentArea>
          )}
        </>
      ) : (
        <>
          {/* Normal DOM order for all other cases */}
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
                    : '1 / 2', // Default position
                placeItems: placeItemsLeft,
                overflow:
                  isHomePage && orientation === 'mobile-landscape'
                    ? 'visible'
                    : 'hidden',
                overflowX:
                  isHomePage && orientation === 'mobile-landscape'
                    ? 'visible'
                    : 'hidden',
                maxWidth: '100%',
                width: '100%',
                boxSizing: 'border-box',
                paddingTop: '0', // Remove padding entirely for cleaner positioning with flex-end justification
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
                gridColumn: orientation === 'portrait' ? '1 / -1' : '2 / -1', // Default position
                placeItems: rightPlaceItems,
                marginTop:
                  isTablet && orientation !== 'mobile-landscape' ? '3rem' : '0',
                paddingLeft: isTablet ? '1.5rem' : '0',
                paddingRight:
                  isTablet || orientation === 'tablet-portrait'
                    ? '1.125rem'
                    : '0',
              }}
            >
              {rightChildren}
            </ContentArea>
          )}
        </>
      )}
    </LayoutGrid>
  );
};
