import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';
import { usePageScrollNavigation } from '../../hooks/usePageScrollNavigation';
import { FluentIcon } from '../fluent-icon/fluent-icon';
import { ROUTES } from '../../../routing/constants';

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
  const {
    isAtBottom,
    isAtTop,
    canNavigateForward,
    canNavigateBackward,
  } = usePageScrollNavigation();

  // Define the main navigation flow
  const getNavigationFlow = React.useMemo(() => {
    const mainRoutes = ROUTES.filter(route => route.isMenuItem).map(route => ({
      path: route.path === '' ? '/' : `/${route.path}`,
      name: route.name,
    }));

    // Ensure proper order: Home → About Us → Services → Contact
    const orderedRoutes = [
      mainRoutes.find(r => r.path === '/') || { path: '/', name: 'home' },
      mainRoutes.find(r => r.name === 'about us') || { path: '/about', name: 'about us' },
      mainRoutes.find(r => r.name === 'services') || { path: '/services', name: 'services' },
      mainRoutes.find(r => r.name === 'collab & connect') || { path: '/contact-me', name: 'collab & connect' },
    ].filter(Boolean);

    return orderedRoutes;
  }, []);

  const getCurrentRouteIndex = React.useCallback(() => {
    const currentPath = location.pathname === '/' ? '/' : location.pathname;
    return getNavigationFlow.findIndex(route => route.path === currentPath);
  }, [location.pathname, getNavigationFlow]);

  const getNextRoute = React.useCallback(() => {
    const currentIndex = getCurrentRouteIndex();
    if (currentIndex === -1 || currentIndex >= getNavigationFlow.length - 1) return null;
    return getNavigationFlow[currentIndex + 1];
  }, [getCurrentRouteIndex, getNavigationFlow]);

  const getPreviousRoute = React.useCallback(() => {
    const currentIndex = getCurrentRouteIndex();
    if (currentIndex <= 0) return null;
    return getNavigationFlow[currentIndex - 1];
  }, [getCurrentRouteIndex, getNavigationFlow]);

  const navigateToNext = React.useCallback(() => {
    const nextRoute = getNextRoute();
    if (nextRoute) {
      navigate(nextRoute.path);
    }
  }, [getNextRoute, navigate]);

  const navigateToPrevious = React.useCallback(() => {
    const previousRoute = getPreviousRoute();
    if (previousRoute) {
      navigate(previousRoute.path);
    }
  }, [getPreviousRoute, navigate]);

  // Auto-navigation when scrolled to bottom/top
  React.useEffect(() => {
    if (!autoNavigateOnScroll) return;

    let timeoutId: NodeJS.Timeout;

    if (canNavigateForward && isAtBottom) {
      // Delay navigation to prevent accidental triggers
      timeoutId = setTimeout(() => {
        navigateToNext();
      }, 1500); // 1.5 second delay
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [canNavigateForward, isAtBottom, navigateToNext, autoNavigateOnScroll]);

  // Don't show on home page unless explicitly requested
  if (location.pathname === '/' && !showOnHomePage) {
    return null;
  }

  const nextRoute = getNextRoute();
  const previousRoute = getPreviousRoute();
  const showForwardChevron = nextRoute && (canNavigateForward || !autoNavigateOnScroll);
  const showBackwardChevron = previousRoute && (canNavigateBackward || !autoNavigateOnScroll);

  // Don't render if no navigation options available
  if (!showForwardChevron && !showBackwardChevron) {
    return null;
  }

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: theme.spacing.xl,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: theme.zIndices.overlay,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.s,
    pointerEvents: 'none', // Allow clicks to pass through the container
  };

  const buttonStyle: React.CSSProperties = {
    background: theme.palette.themePrimary,
    border: `2px solid ${theme.palette.white}`,
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: `all ${theme.animations.durations.fast} ${theme.animations.easing.primary}`,
    boxShadow: theme.shadows.m,
    pointerEvents: 'auto', // Enable clicks on buttons
    position: 'relative',
    outline: 'none',
  };

  const hoverStyle: React.CSSProperties = {
    background: theme.palette.themeDark,
    transform: 'scale(1.1)',
    boxShadow: theme.shadows.l,
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className={className} style={containerStyle}>
      {showBackwardChevron && (
        <button
          style={buttonStyle}
          onClick={navigateToPrevious}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onKeyDown={(e) => handleKeyDown(e, navigateToPrevious)}
          aria-label={`Navigate to previous page: ${previousRoute?.name}`}
          title={`Go to ${previousRoute?.name}`}
          tabIndex={0}
        >
          <FluentIcon
            iconName="ChevronUp"
            color={theme.palette.white}
            size="medium"
          />
        </button>
      )}
      
      {showForwardChevron && (
        <button
          style={buttonStyle}
          onClick={navigateToNext}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onKeyDown={(e) => handleKeyDown(e, navigateToNext)}
          aria-label={`Navigate to next page: ${nextRoute?.name}`}
          title={`Go to ${nextRoute?.name}`}
          tabIndex={0}
        >
          <FluentIcon
            iconName="ChevronDown"
            color={theme.palette.white}
            size="medium"
          />
        </button>
      )}
    </div>
  );
};

export default PageStepper;