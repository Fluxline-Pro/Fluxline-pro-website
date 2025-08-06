// src/theme/components/navigation/SettingsFooter.tsx
import React from 'react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { FluentButton } from '../../button/button';
import { FluentIcon } from '../../fluent-icon/fluent-icon';
import { useUserPreferencesStore } from '../../../../store/store-specs/userPreferencesStore';

interface SettingsFooterProps {
  onSave: () => void;
  isSaving: boolean;
  showSuccess: boolean;
}

export const SettingsFooter: React.FC<SettingsFooterProps> = ({
  onSave,
  isSaving,
  showSuccess,
}) => {
  const { theme } = useAppTheme();
  const { resetPreferences } = useUserPreferencesStore();

  const styles = {
    footer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      padding: '1rem 2rem',
      borderTop:
        theme.themeMode === 'high-contrast'
          ? `2px solid ${theme.palette.white}`
          : `1px solid ${theme.palette.themeSecondary}`,
      backgroundColor:
        theme.gradients[theme.isInverted ? 'dark' : 'light'].menu,
    },
    saveButton: {
      position: 'relative' as const,
      minWidth: '150px',
      display: 'flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: '0.5rem',
      transition: theme.animations.transitions.button,
    },
    saveButtonContent: {
      display: 'flex' as const,
      alignItems: 'center' as const,
      gap: '0.5rem',
      opacity: 1,
      transform: 'scale(1)',
      transition: `opacity ${theme.animations.durations.normal} ${theme.animations.easing.smooth}, transform ${theme.animations.durations.normal} ${theme.animations.easing.smooth}`,
    },
    spinAnimation: {
      animation: `1s ${theme.animations.easing.smooth} infinite spin`,
    },
  };

  return (
    <div style={styles.footer}>
      <FluentButton
        variant='primary'
        onClick={onSave}
        disabled={isSaving || showSuccess}
        style={styles.saveButton}
      >
        <div style={styles.saveButtonContent}>
          {isSaving ? (
            <div>
              <FluentIcon
                iconName='ProgressRingDots'
                style={styles.spinAnimation}
              />
              saving...
            </div>
          ) : showSuccess ? (
            <div>
              <FluentIcon iconName='CheckMark' />
              saved!
            </div>
          ) : (
            'save settings'
          )}
        </div>
      </FluentButton>
      <FluentButton variant='error' isOutlined onClick={resetPreferences}>
        reset settings
      </FluentButton>
    </div>
  );
};
