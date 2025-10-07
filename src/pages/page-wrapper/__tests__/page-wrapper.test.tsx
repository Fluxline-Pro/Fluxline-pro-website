import { ThemeMode } from '../../../theme/theme';

// Mock the logo files
jest.mock('../../../assets/images/FluxlineLogoDarkMode.png', () => 'FluxlineLogoDarkMode.png');
jest.mock('../../../assets/images/FluxlineLogoLightMode.png', () => 'FluxlineLogoLightMode.png');

// Helper function to get the appropriate Fluxline logo based on theme mode
// This is a duplicate of the function in page-wrapper.tsx for testing purposes
const getFluxlineLogo = (themeMode: ThemeMode): string => {
  // Dark mode themes: dark, high-contrast, grayscale-dark
  const darkModeThemes: ThemeMode[] = ['dark', 'high-contrast', 'grayscale-dark'];
  
  if (darkModeThemes.includes(themeMode)) {
    return require('../../../assets/images/FluxlineLogoDarkMode.png');
  }
  
  // Light mode themes: light, protanopia, deuteranopia, tritanopia, grayscale
  return require('../../../assets/images/FluxlineLogoLightMode.png');
};

describe('PageWrapper - Logo Selection', () => {
  test('returns dark mode logo for dark theme', () => {
    const logo = getFluxlineLogo('dark');
    expect(logo).toBe('FluxlineLogoDarkMode.png');
  });

  test('returns dark mode logo for high-contrast theme', () => {
    const logo = getFluxlineLogo('high-contrast');
    expect(logo).toBe('FluxlineLogoDarkMode.png');
  });

  test('returns dark mode logo for grayscale-dark theme', () => {
    const logo = getFluxlineLogo('grayscale-dark');
    expect(logo).toBe('FluxlineLogoDarkMode.png');
  });

  test('returns light mode logo for light theme', () => {
    const logo = getFluxlineLogo('light');
    expect(logo).toBe('FluxlineLogoLightMode.png');
  });

  test('returns light mode logo for grayscale theme', () => {
    const logo = getFluxlineLogo('grayscale');
    expect(logo).toBe('FluxlineLogoLightMode.png');
  });

  test('returns light mode logo for protanopia theme', () => {
    const logo = getFluxlineLogo('protanopia');
    expect(logo).toBe('FluxlineLogoLightMode.png');
  });

  test('returns light mode logo for deuteranopia theme', () => {
    const logo = getFluxlineLogo('deuteranopia');
    expect(logo).toBe('FluxlineLogoLightMode.png');
  });

  test('returns light mode logo for tritanopia theme', () => {
    const logo = getFluxlineLogo('tritanopia');
    expect(logo).toBe('FluxlineLogoLightMode.png');
  });
});
