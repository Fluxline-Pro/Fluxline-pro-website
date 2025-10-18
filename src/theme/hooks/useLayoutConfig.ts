import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { IExtendedTheme } from '../theme';

interface LayoutConfig {
  gridTemplateColumns: string;
  defaultColumns: {
    left: number;
    right: number;
  };
  containerStyle: React.CSSProperties;
}

export const useLayoutConfig = (
  orientation:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'ultrawide'
    | 'large-portrait',
  isHomePage: boolean,
  backgroundImage: 'one' | 'two',
  isXLScreen: boolean,
  nested: boolean,
  theme: IExtendedTheme,
  layoutPreference: 'left-handed' | 'right-handed'
): LayoutConfig => {
  const location = useLocation();
  const isOnboardingPage =
    location.pathname.startsWith('/onboarding') ||
    location.pathname.includes('/onboarding/');
  const isLeftHanded = layoutPreference === 'left-handed';
  const defaultColumns = useMemo(() => {
    if (isHomePage) {
      switch (orientation) {
        case 'portrait':
          return { left: 12, right: 12 };
        case 'square':
          return {
            left: 6,
            right: 6,
          };
        case 'tablet-portrait':
          return isLeftHanded
            ? {
                left: backgroundImage === 'one' ? 2 : 10,
                right: backgroundImage === 'one' ? 10 : 2,
              }
            : {
                left: backgroundImage === 'one' ? 10 : 2,
                right: backgroundImage === 'one' ? 2 : 10,
              };
        case 'landscape':
        case 'large-portrait':
        case 'ultrawide':
          if (isLeftHanded) {
            return {
              left: 6,
              right: 6,
            };
          }
          return {
            left: backgroundImage === 'one' ? 8 : 4,
            right: backgroundImage === 'one' ? 4 : 8,
          };
        case 'mobile-landscape':
          // Swap columns if in left-handed mode
          if (isLeftHanded) {
            return {
              left: backgroundImage === 'one' ? 4 : 9,
              right: backgroundImage === 'one' ? 8 : 3,
            };
          }
          return {
            left: backgroundImage === 'one' ? 8 : 3,
            right: backgroundImage === 'one' ? 4 : 9,
          };
        default:
          return { left: 6, right: 6 };
      }
    }

    // Regular pages
    switch (orientation) {
      case 'portrait':
        return { left: 12, right: 12 };
      case 'square':
        return { left: 4, right: 8 };
      case 'tablet-portrait':
        return { left: 5, right: 7 };
      case 'large-portrait':
        return { left: 4, right: 8 };
      case 'landscape':
      case 'ultrawide':
        return {
          left: 4,
          right: 8,
        };
      case 'mobile-landscape':
        // For left-handed mode, swap the column sizes to match the position swap
        return layoutPreference === 'left-handed'
          ? { left: 8, right: 4 } // Swap: content goes to left (gets 8), image goes to right (gets 4)
          : { left: 4, right: 8 };
      default:
        return { left: 6, right: 6 };
    }
  }, [orientation, backgroundImage, isHomePage, isLeftHanded]);

  const gridTemplateColumns = useMemo(() => {
    if (orientation === 'portrait') return '1fr';

    // Special handling for home page in mobile landscape
    if (isHomePage && orientation === 'mobile-landscape') {
      if (layoutPreference === 'left-handed') {
        return backgroundImage === 'one' ? '1fr 2fr' : '2fr 1fr';
      }
      return backgroundImage === 'one' ? '2fr 1fr' : '1fr 2fr';
    }

    // special handling for mobile landscape on non-home pages when in left-handed mode
    // so the content is scrollable on the left side
    if (
      orientation === 'mobile-landscape' &&
      !isHomePage &&
      layoutPreference === 'left-handed'
    ) {
      return '8fr 4fr'; // Content on left gets 8fr, image on right gets 4fr
    }

    return `${defaultColumns.left}fr ${defaultColumns.right}fr`;
  }, [
    orientation,
    defaultColumns,
    isHomePage,
    backgroundImage,
    layoutPreference,
  ]);

  const containerStyle: React.CSSProperties = {
    alignItems: 'anchor-center',
    WebkitAlignItems: 'center',
    justifyContent: 'center',
    WebkitJustifyContent: 'center',
    position: 'relative',
    minHeight: isHomePage
      ? '100vh'
      : orientation === 'mobile-landscape'
        ? 'min(100vh, 800px)'
        : '100vh',
    maxHeight:
      (orientation === 'landscape' || orientation === 'ultrawide') &&
      !isHomePage
        ? '100vh'
        : undefined,
    width: '100%',
    padding: nested
      ? undefined
      : orientation === 'portrait' ||
          orientation === 'tablet-portrait' ||
          orientation === 'mobile-landscape'
        ? theme.spacing.m
        : theme.spacing.l,
    gap:
      orientation === 'portrait' ||
      orientation === 'mobile-landscape' ||
      orientation === 'tablet-portrait'
        ? '0'
        : theme.spacing.l,
    gridTemplateRows:
      orientation === 'portrait' && !isHomePage ? 'auto auto' : '1fr',
    overflow: isHomePage
      ? orientation === 'portrait'
        ? 'clip'
        : orientation === 'mobile-landscape'
          ? 'visible'
          : 'clip'
      : orientation === 'mobile-landscape'
        ? 'hidden'
        : 'clip',
    display: 'grid',
    placeItems:
      isHomePage && orientation === 'portrait' ? 'end center' : 'center',
    placeSelf: 'center',
    placeContent:
      orientation === 'portrait'
        ? isOnboardingPage
          ? 'center'
          : 'start'
        : 'center',
    backgroundColor: theme.semanticColors.bodyBackground,
    backdropFilter: 'blur(8px)',
    zIndex: 1,
    isolation: 'isolate',
    boxShadow: nested
      ? 'none'
      : `0 0 0 1px ${theme.semanticColors.bodyDivider}`,
  } as React.CSSProperties;

  return {
    gridTemplateColumns,
    defaultColumns,
    containerStyle,
  };
};
