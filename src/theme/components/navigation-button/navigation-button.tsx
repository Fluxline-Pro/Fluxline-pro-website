import React from 'react';
import { IStyle } from '@fluentui/merge-styles';

import { FluentIcon } from '../fluent-icon/fluent-icon';
import { useDeviceOrientation } from '../../hooks/useMediaQuery';
import { useAppTheme } from '../../hooks/useAppTheme';

interface NavigationButtonProps {
  iconName: string;
  altIconName?: string;
  iconSize: 'small' | 'medium' | 'large' | 'xLarge';
  color: string;
  onClick: () => void;
  getThemeButtonColor: () => string;
  tooltip: string;
  isMobile?: boolean;
  isHovered?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  hoverProps?: any;
  isHomePage?: boolean;
  iconStyle?: IStyle;
  altIconStyle?: IStyle;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  iconName,
  altIconName,
  iconSize,
  color,
  onClick,
  getThemeButtonColor,
  tooltip,
  isHomePage = false,
  isMobile = false,
  isHovered = false,
  disabled = false,
  style,
  hoverProps,
  iconStyle = {},
  altIconStyle = {},
}) => {
  const { theme } = useAppTheme();
  const isMobileLandscape = useDeviceOrientation() === 'mobile-landscape';

  const menuStyles = {
    menuButtonWithText: {
      backgroundColor: 'transparent',
      border: 'none',
      position: 'relative' as const,
      width: '40px',
      height: '40px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: theme.spacing.s,
      color:
          theme.themeMode === 'high-contrast' || isHomePage || isMobileLandscape
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
      fontSize: isMobile ? '1.5rem' : '2rem',
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
      top: '95%',
      left: '50%',
      transform: 'translateX(-50%)',
      opacity: 0,
      width: '100px', // manual width to prevent wrapping
      textAlign: 'center' as const,
      visibility: 'hidden',
      transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
      fontSize: '0.9rem',
      fontFamily: theme.typography.fontFamilies.base,
      lineHeight: '1.2',
      letterSpacing: theme.typography.letterSpacing.tight,
      fontWeight: theme.typography.fontWeights.semiBold,
      color: getThemeButtonColor(),
      textTransform: 'capitalize' as const,
      backgroundColor: 'transparent',
      padding: theme.themeMode === 'high-contrast' ? '4px 8px' : '0',
    },
  };

  return (
    <button
      type='button'
      style={{ ...menuStyles.menuButtonWithText, ...style }}
      onClick={onClick}
      disabled={disabled}
      {...hoverProps}
    >
      <FluentIcon
        iconName={iconName}
        size={iconSize}
        color={color}
        style={Object.assign({}, menuStyles.menuIcon, iconStyle)}
      />
      {altIconName && (
        <FluentIcon
          iconName={altIconName}
          size={iconSize}
          color={color}
          style={Object.assign({}, menuStyles.menuIcon, altIconStyle)}
        />
      )}
      <span
        style={{
          ...menuStyles.tooltip,
          opacity: isHovered ? 1 : 0,
          visibility: isHovered ? 'visible' : 'hidden',
          fontSize: '0.85rem',
          lineHeight: '1.1',
          pointerEvents: 'none',
          // ...add more tooltip styles as needed
        }}
      >
        {tooltip}
      </span>
    </button>
  );
};
