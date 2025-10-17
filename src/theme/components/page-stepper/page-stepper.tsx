import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';
import { usePageScrollNavigation } from '../../hooks/usePageScrollNavigation';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import { Container } from '../../layouts/Container';
import { ROUTES } from '../../../routing/constants';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface PageStepperProps {
  autoNavigateOnScroll?: boolean;
  showOnHomePage?: boolean;
  className?: string;
}

/**
 * PageStepper Component
 *
 * Provides bottom-centered navigation chevrons that appear based on scroll position
 * Automatically navigates between pages when scrolled to bottom/top
 * Follows the navigation flow: Home → About Us → Services → Contact
 */
export const PageStepper: React.FC<PageStepperProps> = ({
  autoNavigateOnScroll = true,
  showOnHomePage = false,
  className = '',
}) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { canNavigateForward, pullToRefreshTriggered } =
    usePageScrollNavigation();
  const isHomePage = location.pathname === '/';
  const stepperColor = isHomePage
    ? theme.palette.white
    : theme.palette.themePrimary;
  const isMobile = useIsMobile();

  // Consolidated styles - moved outside conditional to fix React Hooks rule
  const styles = React.useMemo(
    () => ({
      chevronButton: {
        background: 'transparent',
        border: 'none',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        cursor: 'pointer',
        transition: `all ${theme.animations.durations.normal} ${theme.animations.easing.primary}`,
        outline: 'none',
        transform: 'translateY(0px)',
      },
      chevronButtonHover: {
        transform: 'translateY(-4px)',
      },
      pageNameText: {
        fontFamily: theme.typography.fonts.h3.fontFamily,
        color: stepperColor,
        fontSize: theme.typography.fontSizes.clamp6,
        fontWeight: 300,
        textTransform: 'capitalize' as const,
        letterSpacing: '0.15em',
        textAlign: 'center' as const,
        margin: 0,
        cursor: 'pointer',
        transition: `all ${theme.animations.durations.normal} ${theme.animations.easing.primary}`,
        transform: 'translateY(0px)',
      },
      pageNameTextHover: {
        fontWeight: 600,
        letterSpacing: '0.12em',
        transform: 'translateY(-4px)',
      },
    }),
    [stepperColor, theme]
  );

  // Define the main navigation flow
  const getNavigationFlow = React.useMemo(() => {
    const mainRoutes = ROUTES.filter((route) => route.isMenuItem).map(
      (route) => ({
        path: route.path === '' ? '/' : `/${route.path}`,
        name: route.name,
      })
    );

    // Ensure proper order: Home → About Us → Services → Contact
    const orderedRoutes = [
      mainRoutes.find((r) => r.path === '/') || { path: '/', name: 'home' },
      mainRoutes.find((r) => r.name === 'about us') || {
        path: '/about',
        name: 'about us',
      },
      mainRoutes.find((r) => r.name === 'services') || {
        path: '/services',
        name: 'services',
      },
      mainRoutes.find((r) => r.name === "let's connect") || {
        path: '/contact-me',
        name: "let's connect",
      },
    ].filter(Boolean);

    return orderedRoutes;
  }, []);

  const getCurrentRouteIndex = React.useCallback(() => {
    const currentPath = location.pathname === '/' ? '/' : location.pathname;
    return getNavigationFlow.findIndex((route) => route.path === currentPath);
  }, [location.pathname, getNavigationFlow]);

  const getNextRoute = React.useCallback(() => {
    const currentIndex = getCurrentRouteIndex();

    // Special case: Legal page should navigate to About
    if (location.pathname.startsWith('/legal')) {
      return { path: '/about', name: 'about us' };
    }

    if (currentIndex === -1 || currentIndex >= getNavigationFlow.length - 1)
      return null;
    return getNavigationFlow[currentIndex + 1];
  }, [getCurrentRouteIndex, getNavigationFlow, location.pathname]);

  const navigateToNext = React.useCallback(() => {
    const nextRoute = getNextRoute();
    if (nextRoute) {
      navigate(nextRoute.path);
    }
  }, [getNextRoute, navigate]);

  // Auto-navigation when pull-to-refresh gesture is detected
  React.useEffect(() => {
    if (!autoNavigateOnScroll) return;

    if (pullToRefreshTriggered && canNavigateForward) {
      // Immediate navigation since gesture detection already includes intentionality
      navigateToNext();
    }
  }, [
    pullToRefreshTriggered,
    canNavigateForward,
    navigateToNext,
    autoNavigateOnScroll,
  ]);

  // Don't show on home page unless explicitly requested
  if (location.pathname === '/' && !showOnHomePage) {
    return null;
  }

  const nextRoute = getNextRoute();

  // Always show forward navigation if there's a next route available
  // Scroll detection only affects auto-navigation, not button visibility
  const showForwardChevron = !!nextRoute;

  // Don't render if no forward navigation available
  if (!showForwardChevron) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };
  return (
    <Container
      className={className}
      position='fixed'
      bottom={isMobile ? theme.spacing.m : theme.spacing.xl}
      left='50%'
      style={{
        transform: 'translateX(-50%)',
        zIndex: theme.zIndices.overlay,
        pointerEvents: 'none',
      }}
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      gap={theme.spacing.xs}
    >
      {/* Only show forward navigation with page name */}
      {showForwardChevron && (
        <Container
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap={theme.spacing.xs}
          style={{
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: `all ${theme.animations.durations.normal} ${theme.animations.easing.primary}`,
          }}
          onClick={navigateToNext}
          onKeyDown={(e: React.KeyboardEvent) =>
            handleKeyDown(e, navigateToNext)
          }
          onMouseEnter={(e) => {
            const chevronContainer = e.currentTarget.querySelector(
              '[data-chevron]'
            ) as HTMLElement;
            const textContainer = e.currentTarget.querySelector(
              '[data-page-name]'
            ) as HTMLElement;

            if (chevronContainer) {
              Object.assign(chevronContainer.style, {
                ...styles.chevronButton,
                ...styles.chevronButtonHover,
              });
            }

            if (textContainer) {
              Object.assign(textContainer.style, {
                ...styles.pageNameText,
                ...styles.pageNameTextHover,
              });
            }
          }}
          onMouseLeave={(e) => {
            const chevronContainer = e.currentTarget.querySelector(
              '[data-chevron]'
            ) as HTMLElement;
            const textContainer = e.currentTarget.querySelector(
              '[data-page-name]'
            ) as HTMLElement;

            if (chevronContainer) {
              Object.assign(chevronContainer.style, styles.chevronButton);
            }

            if (textContainer) {
              Object.assign(textContainer.style, styles.pageNameText);
            }
          }}
          tabIndex={0}
          role='button'
          aria-label={`Navigate to next page: ${nextRoute?.name}`}
        >
          <div data-page-name style={styles.pageNameText}>
            {nextRoute?.name}
          </div>
          <div data-chevron style={styles.chevronButton}>
            <FluentIcon
              iconName='ChevronDown'
              color={stepperColor}
              size='medium'
            />
          </div>
        </Container>
      )}
    </Container>
  );
};

export default PageStepper;
