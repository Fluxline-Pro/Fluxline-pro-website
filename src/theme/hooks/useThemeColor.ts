import { useAppTheme } from './useAppTheme';

export const useThemeColor = () => {
  const { theme } = useAppTheme();

  const getThemedColor = (
    colorType: 'primary' | 'secondary' | 'tertiary' = 'primary'
  ) => {
    if (
      theme.themeMode === 'high-contrast' ||
      theme.themeMode === 'grayscale' ||
      theme.themeMode === 'grayscale-dark'
    ) {
      return theme.palette.themePrimary;
    }

    switch (colorType) {
      case 'primary':
        return theme.isInverted
          ? theme.palette.themeDark
          : theme.palette.themePrimary;
      case 'secondary':
        return theme.palette.themeSecondary;
      case 'tertiary':
        return theme.palette.themeTertiary;
      default:
        return theme.isInverted
          ? theme.palette.themeDark
          : theme.palette.themePrimary;
    }
  };

  const getThemedBackgroundColor = () => {
    if (theme.themeMode === 'high-contrast') {
      return theme.palette.themePrimary;
    } else if (theme.themeMode === 'grayscale') {
      return theme.palette.neutralPrimary;
    }
    return theme.isInverted
      ? theme.palette.themeDark
      : theme.palette.themePrimary;
  };

  const getThemedTextColor = () => {
    // For text and icons, we'll keep using themePrimary for better visibility
    return theme.palette.themePrimary;
  };

  return {
    getThemedColor,
    getThemedBackgroundColor,
    getThemedTextColor,
    theme, // Expose theme for other theme-related properties
  };
};
