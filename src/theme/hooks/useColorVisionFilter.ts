import { ThemeMode } from '../theme';
import { useAppTheme } from './useAppTheme';

interface ColorVisionFilter {
  filter: string;
}

export const useColorVisionFilter = (
  skipDarkModeFilter?: boolean
): ColorVisionFilter => {
  const { themeMode, theme } = useAppTheme();

  const getFilter = (mode: ThemeMode): string => {
    const darkModeBrightness =
      theme.themeMode === 'dark'
        ? 'brightness(90%)'
        : theme.themeMode === 'grayscale-dark'
          ? 'brightness(100%)'
          : 'brightness(105%)';
    const darkModeContrast =
      theme.themeMode === 'grayscale-dark'
        ? 'contrast(105%)'
        : 'contrast(100%)';

    switch (mode) {
      case 'grayscale':
      case 'grayscale-dark':
        // Enhanced grayscale with better contrast and brightness
        return `grayscale(100%) ${darkModeContrast} ${darkModeBrightness}`;
      case 'protanopia':
        // Simulate red-colorblindness by:
        // - Lower saturation to reduce overall color intensity
        // - Shifting hue further towards blue spectrum
        // - Reduced sepia to minimize red/brown tints
        // - Adjusted contrast for clarity
        return `saturate(65%) ${darkModeContrast} hue-rotate(-45deg) sepia(10%) ${darkModeBrightness}`;
      case 'deuteranopia':
        // Simulate green-colorblindness by:
        // - Heavy desaturation to remove green perception
        // - Strong shift towards yellow/blue spectrum
        // - Increased sepia to push greens towards browns
        return `saturate(50%) ${darkModeContrast} hue-rotate(165deg) sepia(10%) ${darkModeBrightness}`;

      case 'tritanopia':
        return `saturate(105%) ${darkModeContrast} hue-rotate(90deg) ${darkModeBrightness}`;
      default:
        // Skip dark mode filter if explicitly requested (e.g., for Fluxline dark logo)
        if (skipDarkModeFilter && theme.isInverted) {
          return 'none';
        }
        return theme.isInverted ? 'brightness(85%)' : 'none';
    }
  };

  return {
    filter: getFilter(themeMode),
  };
};
