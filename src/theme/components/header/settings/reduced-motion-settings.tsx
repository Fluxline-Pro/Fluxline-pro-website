import React from 'react';

import { useUserPreferencesStore } from '../../../../store/store-specs/userPreferencesStore';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { FluentToggle } from '../../form-elements/toggle/toggle';
import { Container } from '../../../layouts/Container';

interface ReducedMotionSettingsProps {
  isOnboarding?: boolean;
}

export const ReducedMotionSettings: React.FC<ReducedMotionSettingsProps> = ({ isOnboarding }) => {
  const { preferences, setPreference } = useUserPreferencesStore();
  const { theme } = useAppTheme();

  // Check if user has OS-level reduced motion preference
  const prefersReducedMotion = React.useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleToggleChange = React.useCallback(() => {
    setPreference('reducedMotion', !preferences.reducedMotion);
  }, [setPreference, preferences.reducedMotion]);

  const styles = {
    osPreference: {
      fontSize: theme.fonts.xSmall.fontSize,
      color: theme.palette.themePrimary,
      fontStyle: 'italic',
      marginTop: '0.25rem',
    },
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent='start'
      alignItems='start'
      paddingLeft='0'
      paddingRight='0'
      gap='0.5rem'
    >
      <FluentToggle
        displayAsRow={isOnboarding}
        label='Enable reduced motion'
        checked={preferences.reducedMotion}
        onChange={handleToggleChange}
        disabledTooltip='Reduces or disables animations and transitions throughout the site. Helpful for users with vestibular disorders or motion sensitivity.'
      />
      {prefersReducedMotion && (
        <div style={styles.osPreference}>
          ✓ Your system preferences indicate you prefer reduced motion
        </div>
      )}
    </Container>
  );
};
