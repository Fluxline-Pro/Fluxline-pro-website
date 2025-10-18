import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useHoverState } from '../../hooks/useHoverState';
import { ROUTES } from '../../../routing/constants';
import { useDeviceType, useDeviceOrientation } from '../../hooks/useMediaQuery';
import { NavigationButton } from '../navigation-button/navigation-button';
import { BookingsButton } from '../button/bookings-button/bookings-button';
interface NavigationButtonsProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
  onThemeClick: () => void;
  isMenuOpen?: boolean;
  isSettingsOpen?: boolean;
  isMobileLandscape?: boolean;
  isHomePage?: boolean;
  isScrolledPast?: boolean;
  pendingLayout?: 'left-handed' | 'right-handed';
  style?: React.CSSProperties;
  fadeStage?: 'in' | 'out';
  isPdfModalOpen?: boolean; // Add prop to detect PDF modal state
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onSettingsClick,
  onMenuClick,
  onThemeClick,
  isMenuOpen = false,
  isSettingsOpen = false,
  isMobileLandscape = false,
  isHomePage = false,
  isScrolledPast = true,
  pendingLayout = 'right-handed',
  style,
  fadeStage = 'in',
  isPdfModalOpen = false, // Add default value for PDF modal state
}) => {
  const { theme, themeMode } = useAppTheme();
  const location = useLocation().pathname;
  const [isThemeHovered, themeHoverProps] = useHoverState();
  const [isSettingsHovered, settingsHoverProps] = useHoverState();
  const [isMenuHovered, menuHoverProps] = useHoverState();

  const homePath = ROUTES.find((route) => route.name === 'home')?.path;
  const normalizedHomePath = homePath === '' ? '/' : `/${homePath}`;
  const { isMobile, isTablet, isDesktop, isLargeDesktop } = useDeviceType();
  const orientation = useDeviceOrientation();

  const isNotMobile =
    !isMobile ||
    isTablet ||
    orientation === 'square' ||
    orientation === 'landscape' ||
    orientation === 'tablet-portrait' ||
    orientation === 'ultrawide' ||
    orientation === 'large-portrait';

  // Simplified logic for button colors
  const getThemeButtonColor = () => {
    // 1. Onboarding route always uses neutralPrimary
    if (location.includes('onboarding')) {
      return theme.palette.neutralPrimary;
    }

    // 2. For home page with no menus open, use white
    if (isHomePage && !isMenuOpen && !isSettingsOpen) {
      return theme.palette.white;
    }

    // 4. For pages with light logo background (about, services, contact-me) in light mode,
    //    use neutralPrimary to ensure visibility against white logo background
    const lightLogoPages = ['/about', '/services', '/contact-me'];
    const isLightLogoPage = lightLogoPages.some((page) =>
      location.includes(page)
    );

    if (
      !isNotMobile &&
      !isHomePage &&
      !isMenuOpen &&
      !isSettingsOpen &&
      !isScrolledPast &&
      isLightLogoPage &&
      theme.themeMode === 'light'
    ) {
      return theme.palette.neutralPrimary;
    }

    // 5. For standard mobile (non-landscape) on non-home pages without scrolling, use white
    if (
      !isNotMobile &&
      !isHomePage &&
      !isMenuOpen &&
      !isSettingsOpen &&
      !isScrolledPast
    ) {
      return theme.palette.white;
    }

    // 6. Default to neutralPrimary for all other cases
    return theme.palette.neutralPrimary;
  };

  const getIconSize = () => {
    if (isDesktop) {
      return 'large';
    }
    if (isLargeDesktop || orientation === 'large-portrait') {
      return 'xLarge';
    }
    return 'medium';
  };

  const isLeftHanded = pendingLayout === 'left-handed';

  // Determine if hire me button should be shown based on orientation and PDF modal state
  const shouldShowHireMeButton =
    !isPdfModalOpen && // Hide when PDF modal is open
    !isMenuOpen &&
    !isSettingsOpen &&
    (orientation === 'landscape' ||
      orientation === 'large-portrait' ||
      orientation === 'ultrawide');

  const menuStyles = {
    menuButtonWithText: {
      backgroundColor: 'transparent',
      border: 'none',
      position: 'relative' as const,
      width: '48px',
      height: '48px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: theme.spacing.s,
      color:
        theme.themeMode === 'high-contrast' || location === normalizedHomePath
          ? theme.palette.white
          : theme.palette.neutralPrimary,
      margin: '0 4px',
      transition: 'all 0.3s ease-in-out',
      cursor: 'pointer',
      '&:focus': {
        outline: 'none',
      },
    },
    menuIcon: {
      fontSize: '24px',
      transition: 'all 0.3s ease-in-out',
      position: 'absolute' as const,
      transform: 'scale(0.8)',
    },
    menuIconVisible: {
      opacity: 1,
      transform: 'scale(1)',
    },
    tooltip: {
      position: 'absolute' as const,
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: 0,
      visibility: 'hidden',
      transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
      fontSize: '0.9rem',
      lineHeight: '1.2',
      letterSpacing: theme.typography.letterSpacing.tight,
      fontWeight: theme.typography.fontWeights.semiBold,
      color:
        (location === normalizedHomePath && !isMenuOpen && !isSettingsOpen) ||
        theme.themeMode === 'high-contrast'
          ? theme.palette.white
          : theme.palette.themePrimary,
      textTransform: 'lowercase' as const,
      backgroundColor:
        theme.themeMode === 'high-contrast'
          ? theme.palette.black
          : 'transparent',
      padding: theme.themeMode === 'high-contrast' ? '4px 8px' : '0',
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isLeftHanded ? 'row-reverse' : 'row',
        gap: shouldShowHireMeButton || isMobile ? 0 : '1rem',
        pointerEvents: 'auto',
        opacity: fadeStage === 'in' ? 1 : 0,
        transition: 'opacity 0.3s',
        ...style,
      }}
    >
      {/* Hire Me Button - only show on landscape, large-portrait, and ultrawide */}
      {shouldShowHireMeButton && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '8px',
            marginRight: '8px',
          }}
        >
          <BookingsButton isNavigationButton={true} />
        </div>
      )}

      {/* Theme Button */}
      {(themeMode === 'light' || themeMode === 'dark') && (
        <NavigationButton
          iconName={theme.isInverted ? 'Contrast' : 'Light'}
          getThemeButtonColor={getThemeButtonColor}
          iconSize={getIconSize()}
          color={getThemeButtonColor()}
          onClick={onThemeClick}
          tooltip='Theme'
          isHovered={isThemeHovered}
          style={menuStyles.menuButtonWithText}
          hoverProps={themeHoverProps}
          isHomePage={isHomePage}
          iconStyle={{
            ...menuStyles.menuIcon,
            ...menuStyles.menuIconVisible,
            transform: `${isThemeHovered ? 'rotate(180deg)' : 'rotate(0)'}`,
          }}
        />
      )}

      {/* Settings Button */}
      <NavigationButton
        iconName='Settings'
        getThemeButtonColor={getThemeButtonColor}
        altIconName='ChromeClose'
        iconSize={getIconSize()}
        color={getThemeButtonColor()}
        onClick={onSettingsClick}
        tooltip={isSettingsOpen ? 'Close' : 'Settings'}
        isHovered={isSettingsHovered}
        style={menuStyles.menuButtonWithText}
        hoverProps={settingsHoverProps}
        isHomePage={isHomePage}
        iconStyle={{
          ...menuStyles.menuIcon,
          ...menuStyles.menuIconVisible,
          opacity: isSettingsOpen ? 0 : 1,
          transform: `${isSettingsHovered ? 'rotate(90deg)' : 'rotate(0)'} ${isSettingsOpen ? 'rotate(180deg)' : 'rotate(0)'}`,
        }}
        altIconStyle={{
          ...menuStyles.menuIcon,
          ...menuStyles.menuIconVisible,
          opacity: isSettingsOpen ? 1 : 0,
          transform: `${isSettingsHovered ? 'rotate(90deg)' : 'rotate(0)'} ${isSettingsOpen ? 'rotate(0)' : 'rotate(-180deg)'}`,
        }}
      />

      {/* Menu Button */}
      <NavigationButton
        iconName='GlobalNavButton'
        getThemeButtonColor={getThemeButtonColor}
        altIconName='ChromeClose'
        iconSize={getIconSize()}
        color={getThemeButtonColor()}
        onClick={onMenuClick}
        tooltip={isMenuOpen ? 'Close' : 'Menu'}
        isHovered={isMenuHovered}
        style={menuStyles.menuButtonWithText}
        hoverProps={menuHoverProps}
        isMobile={isMobile}
        isHomePage={isHomePage}
        iconStyle={{
          ...menuStyles.menuIcon,
          ...menuStyles.menuIconVisible,
          opacity: isMenuOpen ? 0 : 1,
          transform: `${isMenuHovered ? 'scale(1.3)' : 'scale(1.15)'} ${isMenuOpen ? 'rotate(180deg)' : 'rotate(0)'}`,
        }}
        altIconStyle={{
          ...menuStyles.menuIcon,
          ...menuStyles.menuIconVisible,
          opacity: isMenuOpen ? 1 : 0,
          transform: `${isMenuHovered ? 'scale(1.15)' : 'scale(1)'} ${isMenuOpen ? 'rotate(0)' : 'rotate(-180deg)'}`,
        }}
      />
    </div>
  );
};
