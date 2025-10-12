// src/theme/components/navigation/NavigationItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppTheme } from '../../hooks/useAppTheme';

interface NavigationItemProps {
  isHovered: boolean;
  getHoverProps: (path: string) => any;
  onClick: () => void;
  route: any;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  isHovered,
  getHoverProps,
  onClick,
  route,
}) => {
  const { theme, layoutPreference } = useAppTheme();
  const isLeftHanded = layoutPreference === 'left-handed';

  const styles = {
    navItem: {
      textDecoration:
        theme.themeMode === 'high-contrast' ? 'underline' : 'none',
      textDecorationColor: theme.palette.themePrimary,
      textDecorationThickness: '4px',
      textUnderlineOffset: '4px',
      textAlign: isLeftHanded
        ? 'left'
        : ('right' as React.CSSProperties['textAlign']),
      fontFamily: theme.typography.fonts.medium.fontFamily,
      fontSize: theme.typography.fonts.homeH3.fontSize,
      fontWeight: isHovered ? 600 : 200,
      fontVariationSettings:
        theme.typography.fonts.medium.fontVariationSettings,
      letterSpacing: theme.typography.fonts.medium.letterSpacing,
      width: '95%',
      cursor: 'pointer',
      maxWidth: '400px',
      borderBottom: `1px solid ${theme.palette.themeSecondary}`,
      paddingBlock: 'clamp(0.5rem, 1.5vh, 1rem)',
      display: 'flex',
      justifyContent: isLeftHanded ? 'flex-start' : 'flex-end',
      borderWidth: isHovered ? '2px' : '1px',
      transition: 'all 0.2s ease-in-out',
    },
    navTooltip: {
      ...theme.typography.fonts.h2,
      fontSize: 'clamp(2rem, 4vh, 2rem)',
      fontWeight: theme.typography.fontWeights.medium,
      letterSpacing: '-1.5px',
      textTransform: 'capitalize' as const,
      textShadow: 'none',
      color: theme.palette.themePrimary,
      fontVariationSettings: isHovered ? '"wght" 600' : '"wght" 200',
      transform: `translateX(${isHovered ? (isLeftHanded ? '6px' : '-6px') : '0'}) scale(${isHovered ? 1.07 : 1})`,
      transition: `${theme.themeMode === 'high-contrast' ? 'none' : 'font-variation-settings 0.2s ease-in-out, all 0.2s ease-in-out'}`,
    },
  };

  return (
    <div
      onClick={onClick}
      {...getHoverProps(route.path)}
      style={styles.navItem}
    >
      <Link to={route.path === '' ? '/' : `/${route.path}`}>
        <h2 style={styles.navTooltip}>{route.name}</h2>
      </Link>
    </div>
  );
};
