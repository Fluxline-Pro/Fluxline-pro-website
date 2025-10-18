// src/theme/components/navigation/NavigationBar.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useMobileScroll } from '../../hooks/useMobileScroll';
import { NavigationButtons } from './navigation-buttons';
import { LayoutGrid } from '../../layouts/LayoutGrid';
import { useDeviceOrientation, useIsMobile } from '../../hooks/useMediaQuery';
import useGetPageTitle from './hooks/useGetPageTitle';
import { Typography } from '../typography/typography';

interface NavigationBarProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
  onThemeClick: () => void;
  isMenuOpen?: boolean;
  isSettingsOpen?: boolean;
  isPdfModalOpen?: boolean; // Add prop to detect PDF modal state
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onSettingsClick,
  onMenuClick,
  onThemeClick,
  isMenuOpen = false,
  isSettingsOpen = false,
  isPdfModalOpen = false, // Add default value
}) => {
  const { theme, readingDirection, layoutPreference } = useAppTheme();
  const [fadeStage, setFadeStage] = React.useState<'in' | 'out'>('in');
  const [pendingLayout, setPendingLayout] = React.useState(layoutPreference);
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const isLeftHanded = pendingLayout === 'left-handed';
  const isMobileLandscape = useDeviceOrientation() === 'mobile-landscape';
  const isPortrait = useDeviceOrientation() === 'portrait';
  const isScrolledPast = useMobileScroll();
  const isMobile = useIsMobile();
  const currentView = useLocation().pathname;
  const isHomePage = currentView === '/';
  const title = useGetPageTitle();

  // Check for image modal state
  React.useEffect(() => {
    const checkModalState = () => {
      const isModalOpen = document.body.hasAttribute('data-image-modal-open');
      setIsImageModalOpen(isModalOpen);
    };

    // Check immediately
    checkModalState();

    // Set up observer for body attribute changes
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-image-modal-open'],
    });

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (layoutPreference !== pendingLayout) {
      setFadeStage('out');
      const timeout = setTimeout(() => {
        setPendingLayout(layoutPreference);
        setFadeStage('in');
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [layoutPreference, pendingLayout]);

  const shouldShowBackdrop =
    (isScrolledPast && !isMenuOpen && !isSettingsOpen) || isMobile;

  const pageTitleStyles = {
    ...theme.typography.fonts.h2,
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', // Override with viewport-based sizing for navigation
    color: theme.isInverted ? theme.palette.white : theme.palette.black,
    textShadow: 'none',
    textAlign: readingDirection === 'rtl' ? 'right' : 'left',
    opacity: isScrolledPast && !isMenuOpen && !isSettingsOpen ? 1 : 0,
    transition: theme.animations.transitions.fade.enter,
    visibility:
      (isScrolledPast && !isMenuOpen && !isSettingsOpen) || isMobile
        ? 'visible'
        : 'hidden',
    pointerEvents: 'auto',
  } as React.CSSProperties;

  return (
    <LayoutGrid
      display='flex'
      flexDirection={isLeftHanded ? 'row-reverse' : 'row'}
      justifyContent='space-between' // Always use space-between for consistent layout
      alignItems='center'
      position='fixed'
      gap={isMobile || isMobileLandscape ? '0.25rem' : '1rem'}
      top={0}
      right={isLeftHanded ? 'auto' : 0}
      left={isLeftHanded ? 0 : 'auto'}
      padding={
        isMobileLandscape
          ? '1.5rem 1rem 1rem 1.5rem'
          : isPortrait
            ? '2rem 1rem 1rem 2rem'
            : '2.5rem 2rem 2rem 2rem'
      }
      width='100%'
      style={{
        zIndex: theme.zIndices.menu + 1,
        backgroundColor:
          shouldShowBackdrop && isScrolledPast
            ? theme.isInverted
              ? 'rgba(37, 37, 37, 0.9)'
              : 'rgba(255, 255, 255, 0.8)'
            : 'transparent',
        backdropFilter: shouldShowBackdrop ? 'blur(10px)' : 'none',
        transition: 'all 0.2s ease-in-out',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      }}
    >
      <Typography variant='h2' style={pageTitleStyles}>
        {title || 'terence'}
      </Typography>
      {!(currentView === 'onboarding' && isMobileLandscape) &&
        !isImageModalOpen && (
          <NavigationButtons
            onSettingsClick={onSettingsClick}
            onMenuClick={onMenuClick}
            onThemeClick={onThemeClick}
            isHomePage={isHomePage}
            isMenuOpen={isMenuOpen}
            isMobileLandscape={isMobileLandscape}
            isSettingsOpen={isSettingsOpen}
            isScrolledPast={isScrolledPast}
            fadeStage={fadeStage}
            pendingLayout={pendingLayout}
            isPdfModalOpen={isPdfModalOpen}
            style={{ pointerEvents: 'auto' }}
          />
        )}
    </LayoutGrid>
  );
};
