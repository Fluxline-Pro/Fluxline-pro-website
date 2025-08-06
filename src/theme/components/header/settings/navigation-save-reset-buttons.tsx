import React from 'react';

import { FluentButton } from '../../button/button';
import { useUserPreferencesStore } from '../../../../store/store-specs/userPreferencesStore';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceOrientation } from '../../../hooks/useMediaQuery';
import { useScrollToBottom } from '../../../hooks/useScrollToBottom';

export const NavigationSaveResetButtons = () => {
  const [isSavingResetting, setIsSavingResetting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { theme } = useAppTheme();
  const { resetPreferences } = useUserPreferencesStore();
  const orientation = useDeviceOrientation();
  const isAtBottom = useScrollToBottom<HTMLDivElement>(scrollContainerRef);

  const styles = {
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      padding: '1rem 2rem',
      borderTop: `1px solid ${theme.palette.themeSecondary}`,
      backgroundColor:
        theme.gradients[theme.isInverted ? 'dark' : 'light'].menu,
      position:
        orientation === 'mobile-landscape'
          ? ('fixed' as const)
          : ('relative' as const),
      bottom: 0,
      left: 0,
      right: 0,
      opacity: orientation === 'mobile-landscape' ? (isAtBottom ? 1 : 0) : 1,
      visibility: (orientation === 'mobile-landscape'
        ? isAtBottom
          ? 'visible'
          : 'hidden'
        : 'visible') as React.CSSProperties['visibility'],
      transform:
        orientation === 'mobile-landscape'
          ? `translateY(${isAtBottom ? '0' : '100%'})`
          : 'none',
      transition:
        'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease',
    },
  };

  const handleResetSettings = () => {
    resetPreferences();
    setIsSavingResetting(true);
    setTimeout(() => {
      setIsSavingResetting(false);
      setShowSuccess(true);
    }, 1000);
  };

  const handleSaveSettings = () => {
    setIsSavingResetting(true);
    setTimeout(() => {
      setIsSavingResetting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div style={styles.buttonsContainer}>
      <FluentButton
        variant='primary'
        onClick={handleSaveSettings}
        disabled={isSavingResetting || showSuccess}
      >
        {isSavingResetting ? 'Saving...' : showSuccess ? 'Saved!' : 'Save Settings'}
      </FluentButton>
      <FluentButton
        variant='error'
        onClick={handleResetSettings}
        disabled={isSavingResetting || showSuccess}
      >
        {isSavingResetting ? 'Resetting...' : showSuccess ? 'Reset!' : 'Reset Settings'}
      </FluentButton>
    </div>
  );
};
