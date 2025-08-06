import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { createTypographyStyles } from './settings/fontsize-settings';
import { useDeviceOrientation } from '../../hooks/useMediaQuery';

const ModalTitle: React.FC<{ isMobileLandscape?: boolean; title: string }> = ({
  isMobileLandscape = false,
  title,
}) => {
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();
  const typographyStyles = createTypographyStyles(theme);

  const modalTitleStyles = {
    root: {
      padding:
        'clamp(1.5rem, 1vh, 2rem) clamp(2rem, 1vh, 2rem) 1rem clamp(2rem, 1vh, 2rem)',
      marginTop:
        orientation === 'mobile-landscape'
          ? '2rem'
          : 'clamp(1.25rem, 1vh, 5rem)',
      marginBottom: 'clamp(0.5rem, 1vh, 1rem)',
    },
    menuTitle: {
      ...typographyStyles.modalTitle,
      textAlign:
          layoutPreference === 'right-handed'
          ? orientation === 'mobile-landscape'
            ? 'right'
            : 'left'
          : 'right',
      // : isMobileLandscape && title === 'Settings'
      //   ? 'right'
      //   : layoutPreference === 'left-handed'
      //   ? title === 'menu' && 'left'
          //   : layoutPreference === 'right-handed' && title === 'menu'
          //     ? 'left'
          //     : readingDirection === 'rtl'
          //       ? title === 'Settings'
          //         ? 'right'
          //       : 'left'
          //     : title === 'Settings'
          //       ? 'left'
          //       : 'right',
    } as React.CSSProperties,
  };

  return (
    <div style={modalTitleStyles.root}>
      <h2 style={modalTitleStyles.menuTitle}>{title}</h2>
    </div>
  );
};

export default ModalTitle;
