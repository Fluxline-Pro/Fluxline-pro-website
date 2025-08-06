// src/theme/components/navigation/NavigationSettings.tsx
import React from 'react';

import { useDeviceOrientation } from '../../../hooks/useMediaQuery';
import { useAppTheme } from '../../../hooks/useAppTheme';
import ModalTitle from '../navigation-modal-title';
import { SettingsSection } from './settings-section';
import { ColorblindSettings } from './colorblind-settings';
import { FontSizeSettings } from './fontsize-settings';
import { ThemeSettings } from './theme-settings';
import { LayoutSettings } from './layout-settings';
// import { NavigationSaveResetButtons } from './navigation-save-reset-buttons';

export const NavigationSettings: React.FC = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%',
      overflow: 'hidden',
      border:
        theme.themeMode === 'high-contrast'
          ? `2px solid ${theme.palette.white}`
          : 'none',
    },
    scrollContainer: {
      flex: '1 1 auto',
      overflowY: 'auto' as const,
      paddingInline: '2rem',
      paddingBottom: orientation === 'mobile-landscape' ? '9rem' : '2rem',
    },
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
  };

  return (
    <div style={styles.root}>
      <ModalTitle
        title='Settings'
        isMobileLandscape={orientation === 'mobile-landscape'}
      />
      <div ref={scrollContainerRef} style={styles.scrollContainer}>
        <div style={styles.container}>
          <SettingsSection title='Accessibility'>
            <ColorblindSettings />
            <FontSizeSettings />
            <ThemeSettings />
          </SettingsSection>
          <SettingsSection title='Layout'>
            <LayoutSettings />
          </SettingsSection>
        </div>
      </div>
      {/* <NavigationSaveResetButtons /> **not using **/}
    </div>
  );
};
