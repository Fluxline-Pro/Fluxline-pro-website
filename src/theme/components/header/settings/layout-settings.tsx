// src/theme/components/navigation/settings/LayoutSettings.tsx
import React from 'react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { FluentToggle } from '../../form-elements/toggle/toggle';
import { Container } from '../../../layouts/Container';

interface LayoutSettingsProps {
  isOnboarding?: boolean;
  handleLayoutChange?: (changeType: 'layout' | 'readingDirection') => void;
}

export const LayoutSettings: React.FC<LayoutSettingsProps> = ({
  isOnboarding = false,
  handleLayoutChange,
}) => {
  const {
    layoutPreference,
    readingDirection,
    toggleLayoutPreference,
    toggleReadingDirection,
  } = useAppTheme();

  return (
    <Container
      display='flex'
      flexDirection='column'
      justifyContent='start'
      alignItems={isOnboarding ? 'center' : 'start'}
      paddingLeft='0'
      paddingRight='0'
      gap='1rem'
    >
      <FluentToggle
        label='Display content for left-handed people'
        disabledTooltip='Display content best suited for a left-handed person.'
        displayAsRow={isOnboarding}
        checked={layoutPreference === 'left-handed'}
        onChange={() =>
          isOnboarding
            ? handleLayoutChange?.('layout')
            : toggleLayoutPreference()
        }
      />
      <FluentToggle
        label='Show content read right-to-left'
        displayAsRow={isOnboarding}
        disabledTooltip='Languages read right-to-left should have this setting auto-enabled; languages like English should not use this setting but can be enabled manually.'
        checked={readingDirection === 'rtl'}
        onChange={() =>
          isOnboarding
            ? handleLayoutChange?.('readingDirection')
            : toggleReadingDirection()
        }
      />
    </Container>
  );
};
