// src/theme/components/navigation/settings/ColorblindSettings.tsx
import React from 'react';
import { IDropdownOption, IDropdownStyles } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import FluentDropdown from '../../form-elements/dropdown/dropdown';
import { ThemeMode } from '../../../theme';

export const ColorblindSettings: React.FC<{ isOnboarding?: boolean }> = ({
  isOnboarding = false,
}) => {
  const { theme, themeMode, setThemeMode } = useAppTheme();
  const isMobile = useIsMobile();

  const colorblindOptions: IDropdownOption[] = [
    { key: 'none', text: 'None' },
    { key: 'grayscale', text: 'Grayscale (Light Mode)' },
    { key: 'grayscale-dark', text: 'Grayscale (Dark Mode)' },
    { key: 'protanopia', text: 'Protanopia (Red-Colorblind)' },
    { key: 'deuteranopia', text: 'Deuteranopia (Green-Colorblind)' },
    { key: 'tritanopia', text: 'Tritanopia (Blue-Colorblind)' },
  ];

  const handleColorblindChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    if (!option) return;
    const mode = option.key as ThemeMode | 'none';
    setThemeMode(mode === 'none' ? 'light' : (mode as ThemeMode));
  };

  const colorBlindStyles: Partial<IDropdownStyles> = {
    root: {
      width: '75%',
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
    },
    label: {
      root: {
        fontSize: theme.typography.fontSizes.clamp4,
        color: theme.palette.themePrimary,
        textTransform: 'lowercase',
        fontFamily: theme.typography.fonts.body.fontFamily,
        fontVariationSettings:
          theme.typography.fonts.body.fontVariationSettings,
        marginTop: theme.spacing.s,
      },
    },
  };

  // Compute styles based on current context
  const computeStyles = (): Partial<IDropdownStyles> => {
    // Base styles that apply in all contexts
    const baseStyles: Partial<IDropdownStyles> = {
      ...colorBlindStyles,
    };

    // Add onboarding-specific styles if needed
    if (isOnboarding) {
      return {
        ...baseStyles,
        root: {
          // Use optional chaining and ensure we're dealing with an object
          ...(colorBlindStyles.root && typeof colorBlindStyles.root === 'object'
            ? colorBlindStyles.root
            : {}),
          width: isMobile ? '100%' : '50%', // Responsive width for onboarding
        },
      };
    }

    return baseStyles;
  };

  return (
    <FluentDropdown
      label='Colorblindness Mode'
      options={colorblindOptions}
      disabledTooltip='Colorblindness mode is only available in light mode at this time.'
      defaultSelectedKey={
        themeMode === 'light' || themeMode === 'dark' ? 'none' : themeMode
      }
      onChange={handleColorblindChange}
      disabled={theme.themeMode === 'high-contrast'}
      styles={computeStyles()}
    />
  );
};
