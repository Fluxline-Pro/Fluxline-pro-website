// src/theme/components/navigation/NavigationBar.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useMobileScroll } from '../../hooks/useMobileScroll';
import { NavigationButtons } from './navigation-buttons';
import { createTypographyStyles } from './settings/fontsize-settings';
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
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onSettingsClick,
  onMenuClick,
  onThemeClick,
  isMenuOpen = false,
  isSettingsOpen = false,
}) => {
  const { theme, readingDirection, layoutPreference } = useAppTheme();
  const [fadeStage, setFadeStage] = React.useState<'in' | 'out'>('in');
  const [pendingLayout, setPendingLayout] = React.useState(layoutPreference);
  const isLeftHanded = pendingLayout === 'left-handed';
  const isMobileLandscape = useDeviceOrientation() === 'mobile-landscape';
  const isPortrait = useDeviceOrientation() === 'portrait';
  const isScrolledPast = useMobileScroll();
  const isMobile = useIsMobile();
  const typographyStyles = createTypographyStyles(theme);
  const currentView = useLocation().pathname;
  const isHomePage = currentView === '/';
  const title = useGetPageTitle();

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

  const shouldShowBackdrop = isScrolledPast && !isMenuOpen && !isSettingsOpen;

  const pageTitleStyles = {
    ...typographyStyles.pageTitle,
    textAlign: readingDirection === 'rtl' ? 'right' : 'left',
    transform: `translateY(${isScrolledPast ? '0' : '20px'})`,
    opacity: isScrolledPast && !isMenuOpen && !isSettingsOpen ? 1 : 0,
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    visibility: isScrolledPast && !isMenuOpen && !isSettingsOpen ? 'visible' : 'hidden',
    pointerEvents: 'auto',
  } as React.CSSProperties;

  return (
    <LayoutGrid
      display='flex'
      flexDirection={isLeftHanded || isMobileLandscape ? 'row-reverse' : 'row'}
      justifyContent={isScrolledPast ? 'space-between' : 'flex-end'}
      alignItems='center'
      position='fixed'
      gap={isMobile || isMobileLandscape ? '0.25rem' : '1rem'}
      top={0}
      right={isLeftHanded || isMobileLandscape ? 'auto' : 0}
      left={isLeftHanded || isMobileLandscape ? 0 : 'auto'}
      padding={
        isMobileLandscape
          ? '3rem 1.5rem 1.5rem 3rem'
          : isPortrait
            ? '2rem 1rem 1rem 2rem'
            : '2.5rem 2rem 2rem 2rem'
      }
      width='100%'
      style={{
        zIndex: theme.zIndices.menu + 1,
        backgroundColor:
          shouldShowBackdrop
            ? theme.isInverted
              ? 'rgba(37, 37, 37, 0.9)'
              : 'rgba(255, 255, 255, 0.8)'
            : 'transparent',
        backdropFilter:
          shouldShowBackdrop
            ? 'blur(10px)'
            : 'none',
        transition: 'all 0.2s ease-in-out',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      }}
    >
      <Typography variant='h2' style={pageTitleStyles}>{title || 'terence'}</Typography>
      {!(currentView === 'onboarding' && isMobileLandscape) && (
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
          style={{ pointerEvents: 'auto' }}
        />
      )}
    </LayoutGrid>
  );
};
