import React from 'react';

import { useIsLargeDesktop } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAppTheme } from '../hooks/useAppTheme';
import { injectGlobalScrollbarStyles } from '../utils/scrollbarStyles';

interface ContentAreaProps {
  children: React.ReactNode;
  position: 'left' | 'right';
  orientation:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'ultrawide'
    | 'large-portrait';
  isHomePage: boolean;
  readingDirection: 'ltr' | 'rtl';
  isEntering: boolean;
  layoutPreference: 'left-handed' | 'right-handed';
  nested?: boolean;
  style?: React.CSSProperties;
}

export const ContentArea = React.forwardRef<HTMLDivElement, ContentAreaProps>(
  (
    {
      children,
      position,
      orientation,
      isHomePage,
      readingDirection,
      isEntering,
      layoutPreference,
      nested,
      style,
    },
    ref
  ) => {
    const isLargeDesktop = useIsLargeDesktop();
    const { shouldReduceMotion } = useReducedMotion();
    const { theme } = useAppTheme();

    // Generate unique class name for scrollbar styling
    const scrollbarClassName = `content-area-${position}-scrollbar`;

    // Apply custom scrollbar styles when component mounts or theme changes
    React.useEffect(() => {
      // Only apply scrollbar styles for right content area that will have overflow
      if (position === 'right') {
        injectGlobalScrollbarStyles(theme, scrollbarClassName);
      }

      // Cleanup function to remove styles when component unmounts
      return () => {
        if (position === 'right') {
          const styleId = `scrollbar-styles-${scrollbarClassName}`;
          const existingStyle = document.getElementById(styleId);
          if (existingStyle) {
            existingStyle.remove();
          }
        }
      };
    }, [theme, position, scrollbarClassName]);

    // Check if children contain card with image view type (either old ImageCard or UnifiedCard with viewType='image')
    const hasCardImage = React.Children.toArray(children).some(
      (child) =>
        React.isValidElement(child) &&
        ((child.props as any)?.id === 'imageCard' ||
          (child.props as any)?.viewType === 'image')
    );

    const getPlaceItems = () => {
      if (orientation === 'portrait') {
        return isHomePage ? 'end center' : 'start center';
      }
      if (orientation === 'mobile-landscape' && isHomePage) {
        return 'center';
      }
      return 'center';
    };

    const getTransform = () => {
      if (orientation === 'mobile-landscape' && isHomePage) {
        return position === 'left' ? 'scale(0.9)' : 'scale(0.85)';
      }
      return 'none';
    };

    const getPadding = (): React.CSSProperties => {
      if (orientation === 'tablet-portrait') {
        return { padding: '1rem 0.1rem' };
      }
      if (orientation === 'portrait') {
        return isHomePage
          ? { padding: 0 }
          : position === 'left'
            ? { padding: '0 0 1rem 0' }
            : {
                padding: '0 0 2rem', // Add horizontal padding for text content
                maxWidth: '100%',
                boxSizing: 'border-box' as const,
              };
      }
      return {};
    };

    return (
      <div
        ref={ref}
        className={`viewport-${position} ${position === 'right' ? scrollbarClassName : ''}`}
        style={{
          ...(nested ? { padding: 0 } : {}),
          ...(isEntering && !shouldReduceMotion
            ? {
                animation: 'fadeIn 0.3s ease-in-out',
                animationFillMode: 'forwards',
              }
            : {}),
          textAlign: isHomePage
            ? 'center'
            : readingDirection === 'rtl'
              ? 'right'
              : 'left',
          display: 'grid',
          placeItems: getPlaceItems(),
          maxWidth: isLargeDesktop ? '60dvw' : '100%',
          width: '100%',
          // Ensure content never overflows horizontally
          minWidth: 0, // Allow flex shrinking
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto',
          height:
            orientation === 'portrait'
              ? 'auto'
              : orientation === 'mobile-landscape'
                ? '95dvh'
                : orientation === 'square'
                  ? 'clamp(0px, 90vh, 900px)' // Using clamp instead of min for better cross-environment support
                  : orientation === 'tablet-portrait'
                    ? 'clamp(0px, 100vh, 850px)' // Smaller height to not run into menu buttons on tablet-portrait
                    : orientation === 'ultrawide' || orientation === 'landscape'
                      ? 'clamp(0px, 100vh, 800px)' // Using clamp instead of min for better cross-environment support
                      : orientation === 'large-portrait'
                        ? 'clamp(0px, 100vh, 1200px)'
                        : '100vh',
          overflowY: hasCardImage
            ? 'clip'
            : orientation === 'portrait' ||
                (orientation === 'mobile-landscape' && isHomePage)
              ? 'clip'
              : 'auto',
          overflowX: 'clip',
          transform: getTransform(),
          ...getPadding(),
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
);

ContentArea.displayName = 'ContentArea';
