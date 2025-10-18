import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../hooks/useMediaQuery';

const ModalTitle: React.FC<{ isMobileLandscape?: boolean; title: string }> = ({
  isMobileLandscape = false,
  title,
}) => {
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();

  const modalTitleStyles = {
    root: {
      padding:
        'clamp(1.5rem, 1vh, 2rem) clamp(2rem, 1vh, 2rem) 1rem clamp(2rem, 1vh, 2rem)',
      marginTop:
        orientation === 'mobile-landscape'
          ? '0.5rem' // align the title with the menu buttons
          : 'clamp(1.25rem, 1vh, 5rem)',
      marginBottom: 'clamp(0.5rem, 1vh, 1rem)',
    },
    menuTitle: {
      ...theme.typography.fonts.h2,
      color: theme.palette.themePrimary,
      fontSize: 'clamp(2rem, 3vh, 3rem)',
      fontWeight: theme.typography.fontWeights.thin,
      textShadow: 'none !important',
      textAlign:
        layoutPreference === 'right-handed'
          ? orientation === 'mobile-landscape' // for title placement so they don't run into the menu buttons
            ? 'right'
            : 'left'
          : 'right',
    } as React.CSSProperties,
  };

  return (
    <div style={modalTitleStyles.root}>
      <h2 style={modalTitleStyles.menuTitle}>{title}</h2>
    </div>
  );
};

export default ModalTitle;
