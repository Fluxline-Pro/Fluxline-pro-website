// src/theme/components/navigation/settings/ThemeSettings.tsx
import React from 'react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { FluentToggle } from '../../form-elements/toggle/toggle';
import { ReducedMotionSettings } from './reduced-motion-settings';

interface ThemeSettingsProps {
  isOnboarding?: boolean;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  isOnboarding = false,
}) => {
  const { themeMode, setThemeMode } = useAppTheme();

  return (
    <div>
      <FluentToggle
        label='Enable dark mode'
        checked={themeMode === 'dark'}
        displayAsRow={isOnboarding}
        onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
        disabledTooltip='Dark mode is disabled when colorblindness or high contrast mode are enabled.'
        disabled={[
          'grayscale',
          'protanopia',
          'deuteranopia',
          'tritanopia',
          'high-contrast',
        ].includes(themeMode)}
      />
      <FluentToggle
        label='Enable high contrast mode'
        displayAsRow={isOnboarding}
        checked={themeMode === 'high-contrast'}
        onChange={(checked) =>
          setThemeMode(checked ? 'high-contrast' : 'light')
        }
        disabledTooltip='High contrast mode is disabled when colorblindness or dark mode are enabled.'
        disabled={[
          'grayscale',
          'protanopia',
          'deuteranopia',
          'tritanopia',
          'dark',
        ].includes(themeMode)}
      />
      <ReducedMotionSettings isOnboarding={isOnboarding} />
    </div>
  );
};
