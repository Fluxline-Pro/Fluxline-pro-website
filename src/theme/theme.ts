/**
 * FLUXLINE PRO THEME SYSTEM
 * ========================
 *
 * Philosophy: "Clarity meets transformation"
 * Style: "Minimalist precision with animated warmth"
 *
 * DESIGN PRINCIPLES:
 * ------------------
 * • Bold structure: Inter font family for headings provides clear hierarchy
 * • Unified voice: Inter for all text creates consistency and brand recognition
 * • Accent highlights: Roboto Mono for code emphasizes technical precision
 * • Engineered motion: cubic-bezier(0.4, 0, 0.2, 1) for fluid, intentional animations
 *
 * TEXT TRANSFORM PROGRESSION:
 * ---------------------------
 * H1-H2: UPPERCASE → Bold structure and commanding presence
 * H3-H4: Title Case → Balanced hierarchy and readability
 * H5: lowercase → Humble, approachable tone
 * H6: UPPERCASE → Accent highlights for growth cues
 *
 * COLOR PHILOSOPHY:
 * -----------------
 * • Dark Mode (Default): Deep black (#010101) base for focused, calm aesthetic
 * • Primary: Deep blues (#4A90E2, #2A5F8F) for structure and trust
 * • Secondary: Complementary blue variations for visual harmony
 * • Accent: Vibrant teal-green (#00D4AA, #00A896) for growth and interaction
 * • Neutrals: Carefully calibrated grays optimized for each mode
 *
 * RHYTHM & SPACING:
 * ------------------
 * • Base unit: 1rem for consistent rhythm
 * • Line height: 1.6 for optimal readability
 * • Generous spacing creates breathing room
 * • Modular elevation system for visual depth
 *
 * ACCESSIBILITY:
 * --------------
 * • High contrast ratios tested in both light and dark modes
 * • Color harmony: Tertiary & Accent hues positioned close on color wheel
 * • Multiple theme variants for visual accessibility needs
 * • Semantic color roles clearly defined for consistent usage
 *
 * USAGE:
 * ------
 * This theme system is designed to be modular and compatible with:
 * • Tailwind CSS utilities
 * • Styled Components
 * • FluentUI components
 * • CSS-in-JS solutions
 *
 * Default export prioritizes dark mode for the Fluxline Pro brand experience.
 *
 * @version 2.0.0 - Fluxline Pro Specifications
 * @author Fluxline Pro Design System
 */

import { createTheme, ITheme, ISpacing } from '@fluentui/react';

export interface IExtendedTheme extends ITheme {
  spacing: IExtendedSpacing;
  animations: typeof animations;
  borderRadius: typeof borderRadius;
  zIndices: typeof zIndices;
  shadows: typeof shadows;
  gradients: typeof baseGradients;
  breakpoints: typeof breakpoints;
  mediaQueries: typeof mediaQueries;
  typography: typeof typography;
  themeMode: ThemeMode;
}

export interface IExtendedSpacing extends ISpacing {
  none: string;
  xxs: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
  xxxxl: string;
  menuButton: string;
}

// Base font size for rem calculations (16px)
export const BASE_FONT_SIZE = 16;

// Breakpoints in pixels
export const breakpoints = {
  xs: 0, // mobile
  sm: 576, // small tablet
  md: 768, // tablet
  lg: 1024, // small desktop / iPad Pro
  xl: 1366, // large desktop
  xxl: 1920, // high-resolutiondesktop
};

// Media queries
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm - 1}px)`,
  sm: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  md: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  lg: `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
  xl: `(min-width: ${breakpoints.xl}px) and (max-width: ${breakpoints.xxl - 1}px)`,
  xxl: `(min-width: ${breakpoints.xxl}px)`,
};

/**
 * Fluxline Pro Spacing System - Generous Rhythm
 *
 * Base unit: 1rem for consistent rhythm throughout the design
 * Philosophy: Generous spacing creates breathing room and clarity
 */
export const spacing: IExtendedSpacing = {
  // Required ISpacing properties (FluentUI compatibility)
  s2: '0.125rem',
  s1: '0.25rem',
  m: '1rem', // Base rhythm unit
  l1: '1.25rem',
  l2: '2rem',

  // Fluxline Pro custom spacing system - 1rem base unit
  none: '0',
  xxs: '0.25rem',
  xs: '0.5rem',
  s: '0.75rem',
  l: '1.5rem',
  xl: '2rem',
  xxl: '2.5rem',
  xxxl: '3rem',
  xxxxl: '4rem',
  menuButton: '0.5rem 1rem 0 0',
};

// Z-index system
export const zIndices = {
  hide: -1,
  auto: 0,
  base: 1,
  above: 2,
  dropdown: 3,
  menu: 4,
  tooltip: 5,
  popover: 6,
  modal: 10,
  overlay: 11,
  toast: 16,
  max: 999,
};

// Border radius system
export const borderRadius = {
  none: '0',
  s: '0.25rem',
  m: '0.5rem',
  l: '1rem',
  xl: '2rem',

  container: {
    tiny: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    small: 'clamp(0.5rem, 1cqi, 0.5rem)',
    medium: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
    large: 'clamp(1rem, 2cqi, 1rem)',
    xlarge: 'clamp(1.5rem, 3cqi, 1.5rem)',
    xxlarge: 'clamp(2rem, 4cqi, 2rem)',
    huge: 'clamp(3rem, 6cqi, 3rem)',
    xhuge: 'clamp(4rem, 8cqi, 4rem)',

    // Use-case specific
    card: 'clamp(0.5rem, 1cqi, 0.5rem)',
    button: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    input: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    tooltip: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    tooltipArrow: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    hero: 'clamp(1.5rem, 3cqi, 1.5rem)',
    modal: 'clamp(2rem, 4cqi, 2rem)',
    toast: 'clamp(0.5rem, 1cqi, 0.5rem)',
    toastArrow: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
    overlay: 'clamp(1rem, 2cqi, 1rem)',
    searchBox: 'clamp(0.5rem, 1cqi, 0.5rem)',
    searchBoxIcon: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
  },
};

// Shadows
export const shadows = {
  none: 'none',
  s: '0 1px 3px rgba(0, 0, 0, 0.12)',
  m: '0 2px 6px rgba(0, 0, 0, 0.15)',
  l: '0 4px 12px rgba(0, 0, 0, 0.18)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.24)',

  // Use-case specific
  card: '0 1px 3px rgba(0, 0, 0, 0.12)',
  button: '0 2px 6px rgba(0, 0, 0, 0.15)',
  input: '0 4px 12px rgba(0, 0, 0, 0.18)',
  tooltip: '0 8px 24px rgba(0, 0, 0, 0.24)',
  hero: '0 16px 48px rgba(0, 0, 0, 0.32)',
  modal: '0 32px 96px rgba(0, 0, 0, 0.4)',
  toast: '0 16px 48px rgba(0, 0, 0, 0.32)',
  menu: '0 0 20px rgba(0, 0, 0, 0.15)',
  cardImage: '4px 4px 8px rgba(0,0,0,0.7)',
  glyph: '0 0 12px rgba(245, 200, 92, 0.5)', // Mythic Gold glow
  resonance: '0 0 24px rgba(58, 186, 180, 0.4)', // Fluxline Teal pulse
};

/**
 * Fluxline Pro Gradients - Engineered Visual Depth
 *
 * Dark mode optimized with '#010101' base for focused aesthetic
 * Light mode with clean, minimal gradients for clarity
 */
export const baseGradients = {
  dark: {
    solid: '#010101',
    background:
      'radial-gradient(ellipse at left, #2E2E3A 0%, #1A1A1A 40%, #010101 100%)',
    menu: 'linear-gradient(135deg, #1A1A1A 0%, #010101 100%)',
    radial:
      'radial-gradient(ellipse at left, #2E2E3A 0%, #1A1A1A 40%, #010101 100%)',
    vignette: 'radial-gradient(circle at center, transparent 0%, #010101 100%)',
    linear: 'linear-gradient(90deg, #2E2E3A 0%, #010101 100%)',
  },
  light: {
    solid: '#FFFFFF',
    background:
      'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',
    menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
    radial:
      'radial-gradient(ellipse at left, #F8FAFC 0%, #F5F5F5 40%, #F0F0F0 100%)',
    vignette: 'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
    linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
  },
  components: {
    card: {
      dark: 'linear-gradient(135deg, #2E2E3A 0%, #010101 100%)',
      light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
    },
    button: {
      dark: 'linear-gradient(90deg, #4A9B96 0%, #2E2E3A 100%)',
      light: 'linear-gradient(90deg, #F5C85C 0%, #FFFFFF 100%)',
    },
    modal: {
      dark: 'radial-gradient(circle at center, #2E2E3A 0%, #010101 100%)',
      light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
    },
  },
  symbolic: {
    fluxlineAscension:
      'linear-gradient(135deg, #274770 0%, #5A7CA0 50%, #F5C85C 100%)',
    mythicHorizon:
      'linear-gradient(90deg, #F5C85C 0%, #EAD68F 50%, #274770 100%)',
    glyphGateFade: 'linear-gradient(to bottom, #F5C85C 0%, #1F1F1F 100%)',
  },
};

/**
 * Typography Configuration - Fluxline Pro Brand System
 *
 * Philosophy: Bold structure, humble tone, and accent highlights for growth
 * Text Transform Progression: uppercase → title-case → lowercase → accent
 *
 * Fonts:
 * - Inter: Clean, modern sans-serif for all text (bold structure and humble tone)
 * - Roboto Mono: Technical precision for code (accent highlights)
 */

export const fontFamily = {
  text: '"Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  mono: '"Courier Prime", "Roboto Mono", "SF Mono", "Monaco", "Cascadia Code", Consolas, "Courier New", monospace',
};

export const fontSizes = {
  xs: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
  sm: 'clamp(0.5rem, 1cqi, 0.5rem)',
  md: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
  base: '1rem', // Base rhythm unit
  lg: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
  xl: 'clamp(1.5rem, 3cqi, 1.5rem)',
  xxl: 'clamp(2rem, 4cqi, 2rem)',
  xxxl: 'clamp(3rem, 6cqi, 3rem)',
  xxxxl: 'clamp(4rem, 8cqi, 4rem)',
  clamp: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
  clamp2: 'clamp(0.5rem, 1cqi, 0.5rem)',
  clamp3: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
  clamp4: '1rem', // Base unit
  clamp5: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
  clamp6: 'clamp(1.5rem, 3cqi, 1.5rem)',
  clamp7: 'clamp(2rem, 4cqi, 2rem)',
  clamp8: 'clamp(3rem, 6cqi, 3rem)',
};

export const typography = {
  fontFamilies: {
    // Fluxline Pro font stack - Inter for all text, Courier Prime for code
    base: fontFamily.text,
    mono: fontFamily.mono,
    heading: fontFamily.text,
    headingH3: fontFamily.text,
    headingLight: fontFamily.text,
    h1: fontFamily.text,
    h2: fontFamily.text,
    h3: fontFamily.text,
    h4: fontFamily.text,
    h5: fontFamily.text,
    h6: fontFamily.text,
    p: fontFamily.text,
  },
  // Font sizes with modular scale - base 1rem unit for rhythm
  fontSizes: {
    xs: fontSizes.xs,
    sm: fontSizes.sm,
    md: fontSizes.md,
    base: fontSizes.base, // Base rhythm unit
    lg: fontSizes.lg,
    xl: fontSizes.xl,
    xxl: fontSizes.xxl,
    xxxl: fontSizes.xxxl,
    xxxxl: fontSizes.xxxxl,
    clamp: fontSizes.clamp,
    clamp2: fontSizes.clamp2,
    clamp3: fontSizes.clamp3,
    clamp4: fontSizes.clamp4,
    clamp5: fontSizes.clamp5,
    clamp6: fontSizes.clamp6,
    clamp7: fontSizes.clamp7,
    clamp8: fontSizes.clamp8,
  },
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  fontWidths: {
    ultraCondensed: 25,
    extraCondensed: 50,
    condensed: 75,
    semiCondensed: 87.5,
    normal: 100,
    semiExpanded: 112.5,
    expanded: 125,
  },
  fontSlants: {
    normal: 0,
    italic: -10,
  },
  fontFeatures: {
    thin: { fontFeatureSettings: 'wght 200,wdth 100,slnt 0' },
    condensed: { fontFeatureSettings: 'wght 500,wdth 100,slnt 0' },
    expanded: { fontFeatureSettings: 'wght 500,wdth 125,slnt 0' },
    italic: { fontFeatureSettings: 'wght 500,wdth 100,slnt 10' },
  },
  // Font definitions with Fluxline Pro philosophy
  fonts: {
    tiny: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
      fontWeight: '500' as '500', // Inter Medium
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      lineHeight: '1.6',
    },
    xSmall: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.5rem, 1cqi, 0.5rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    small: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    medium: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    mediumPlus: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    large: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.5rem, 3cqi, 1.5rem)',
      fontWeight: '700' as '700', // Inter Bold
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    xLarge: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2rem, 4cqi, 2rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    xxLarge: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(3rem, 6cqi, 3rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.3',
    },

    // Headings
    h1: {
      fontFamily:
        'Inter Variable, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(8cqi, min(10cqi, 10cqh), min(14cqi, 14cqh))',
      fontWeight: '800' as '800',
      fontVariationSettings: '"wght" 800, "wdth" 200, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-textBig)',
      textTransform: 'uppercase' as const,
      lineHeight: '1.6',
    },
    h2: {
      fontFamily:
        'Inter Variable, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2cqi, min(5cqi, 5cqh), min(7cqi, 7cqh))',
      fontWeight: '800' as '800',
      fontVariationSettings: '"wght" 800, "wdth" 200, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'none !important',
      textTransform: 'uppercase' as const,
      lineHeight: '1.3',
    },
    h3: {
      fontFamily:
        'Inter Variable, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.4rem, 2.5cqi, 1.5rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'none',
      textTransform: 'capitalize' as const,
      lineHeight: '1.2',
    },
    h4: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1rem, 1.75cqi, 1.125rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-h4)',
      textTransform: 'capitalize' as const,
      lineHeight: '1.3',
    },
    h5: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.125rem, 1.5cqi, 1.375rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-h5)',
      textTransform: 'capitalize' as const,
      lineHeight: '1.3',
    },
    h6: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1rem, 1.25cqi, 1.25rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-h6)',
      textTransform: 'uppercase' as const,
      lineHeight: '1.6',
    },

    // Body and utility text
    body: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1.1rem', // rising just a tad
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    bodySmall: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    homeH3: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(3cqi, min(6cqi, 6cqh), min(8cqi, 8cqh))',
      fontWeight: '500' as '500', // Inter Medium
      fontVariationSettings: '"wght" 500, "wdth" 125, "slnt" 0',
      lineHeight: '1.6',
    },
    paragraph: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },

    label: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    quote: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    pre: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    code: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    caption: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    mono: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    ritual: {
      fontFamily: 'Courier Prime, "Courier New", Courier, monospace',
      fontSize: 'clamp(0.875rem, 2.5cqi, 1.125rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
      textTransform: 'none' as const,
    },
    glyphTag: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1.5cqi, 0.875rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const,
      lineHeight: '1.3',
    },
    emotionalCue: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 2cqi, 1rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.25px',
      textTransform: 'capitalize' as const,
      lineHeight: '1.6',
    },
  },
  // Line heights for readable flow - 1.6 base
  lineHeights: {
    tight: 1.2,
    normal: 1.6, // Base readable flow
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0.1px',
    wide: '0.025em',
    wider: '2px',
    widest: '0.375rem',
  },
  textShadows: {
    h1: '2px 4px 4px rgba(0, 0, 0, 0.5)',
    h2: '1px 2px 3px rgba(0, 0, 0, 0.5)',
    h3: '1px 2px 2px rgba(0, 0, 0, 0.4)',
    h4: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    h5: '1px 1px 1px rgba(0, 0, 0, 0.2)',
    h6: '0px 1px 1px rgba(0, 0, 0, 0.1)',
    light: '0px 3px 6px rgba(0, 0, 0, 0.5)',
    dark: '0px 3px 6px rgba(243, 243, 243, 0.5)',
    textLight: '1px 2px 3px rgba(0, 0, 0, 0.5)',
    text: '1px 2px 3px rgba(0, 0, 0, 0.9)',
    textBig: '2px 4px 4px rgba(0, 0, 0, 0.5)',
    card: '0px 3px 3px 0px rgba(0, 0, 0, 0.5)',
    cardImage: '2px 2px rgba(0, 0, 0, 0.9)',
  },
};

export const getFontVariationSettings = (
  weight: number = 400,
  width: number = 125,
  slant: number = 0
) => {
  return {
    fontVariationSettings: `'wght' ${weight}, 'wdth' ${width}, 'slnt' ${slant}`,
  };
};

// Font widths
export const fontWidths = {
  ultraCondensed: 25,
  extraCondensed: 50,
  condensed: 75,
  semiCondensed: 87.5,
  normal: 100,
  semiExpanded: 112.5,
  expanded: 125,
};

/**
 * Animation System - Fluxline Pro Motion Philosophy
 *
 * Engineered fluidity with calm, focused aesthetic
 * Primary motion curve: cubic-bezier(0.4, 0, 0.2, 1) for engineered warmth
 */
export const animations = {
  // Easing functions - Fluxline Pro motion curve as primary
  easing: {
    linear: 'linear',
    easeInOut: 'ease',
    easeOut: 'ease-in',
    easeIn: 'ease-out',
    sharp: 'ease-in-out',

    // Fluxline Pro primary motion curve - engineered fluidity
    primary: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)', // Use Fluxline curve as smooth
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Durations
  durations: {
    instant: '0ms',
    faster: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },

  // Timing functions - Fluxline Pro engineered motion
  timingFunctions: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', // Primary Fluxline curve
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    primary: 'cubic-bezier(0.4, 0, 0.2, 1)', // Fluxline primary
  },

  // Common animations with Fluxline motion curve
  transitions: {
    fade: {
      enter: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    slide: {
      enter: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    scale: {
      enter: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    rotate: {
      enter: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      exit: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // custom component transitions with Fluxline curve
    button: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    card: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    modal: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
    toast: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    tooltip: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Keyframe animations
  keyframes: {
    spin: '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }',
    pulse:
      '@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }',
    bounce:
      '@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }',
    fadeIn: '@keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }',
    fadeOut: '@keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }',
    slideUp:
      '@keyframes slideUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }',
    slideDown:
      '@keyframes slideDown { 0% { transform: translateY(0); } 100% { transform: translateY(100%); } }',
    slideLeft:
      '@keyframes slideLeft { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }',
    slideRight:
      '@keyframes slideRight { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }',
    slideIn:
      '@keyframes slideIn { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }',
    slideOut:
      '@keyframes slideOut { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }',
    slideInUp:
      '@keyframes slideInUp { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }',
  },
};

// Helper function to use spacing in styles
export const useSpacing = (size: keyof typeof spacing) => spacing[size];

// Utility function for responsive values
export const responsiveValue = (
  theme: IExtendedTheme,
  values: {
    xs?: keyof typeof spacing;
    sm?: keyof typeof spacing;
    md?: keyof typeof spacing;
    lg?: keyof typeof spacing;
    xl?: keyof typeof spacing;
    xxl?: keyof typeof spacing;
  }
) => {
  const styles: any = {};

  if (values.xs) styles.xs = theme.spacing[values.xs];
  if (values.sm) styles.sm = theme.spacing[values.sm];
  if (values.md) styles.md = theme.spacing[values.md];
  if (values.lg) styles.lg = theme.spacing[values.lg];
  if (values.xl) styles.xl = theme.spacing[values.xl];
  if (values.xxl) styles.xxl = theme.spacing[values.xxl];

  return styles;
};

// Helper function to create typography styles with variants
export const getTypographyStyle = (
  scale: keyof typeof typography.fonts,
  variant: keyof typeof typography.fonts,
  options?: {
    features?: Array<keyof typeof typography.fontFeatures>;
    width?: keyof typeof typography.fontWidths;
    weight?: keyof typeof typography.fontWeights;
    responsive?: ResponsiveTypographyProps;
  }
) => {
  const baseStyle = typography.fonts[scale];
  const selectedFeatures =
    options?.features
      ?.map((feature) => typography.fontFeatures[feature].fontFeatureSettings)
      .join(', ') || '';

  return {
    ...baseStyle,
    ...(options?.width && {
      fontStretch: typography.fontWidths[options.width],
      fontVariationSettings: getFontVariationSettings(
        typography.fontWeights[options.weight ?? 'regular'],
        typography.fontWidths[options.width ?? 'normal'],
        0
      ),
    }),
    ...(options?.weight && {
      fontWeight: typography.fontWeights[options.weight],
    }),
    ...(selectedFeatures && { fontFeatureSettings: selectedFeatures }),
    ...(options?.responsive && getResponsiveTypography(options.responsive)),
  };
};

// Helper function to merge FluentUI theme with our extended properties
const createExtendedTheme = (
  fluentTheme: ReturnType<typeof createTheme>,
  extendedProps: Omit<IExtendedTheme, keyof ReturnType<typeof createTheme>>
): IExtendedTheme => {
  return {
    ...fluentTheme,
    ...extendedProps,
    spacing: spacing as IExtendedSpacing,
  };
};

// Base Theme with shared properties
const baseExtendedProps = {
  spacing: spacing as IExtendedSpacing,
  zIndices,
  shadows,
  gradients: baseGradients,
  borderRadius: borderRadius,
  breakpoints,
  mediaQueries,
  typography,
  animations,
  getTypographyStyle,
  responsiveValue,
} as const;

/**
 * Fluxline Pro Light Theme
 *
 * Philosophy: Mythic clarity meets emotional resonance
 * Style: Clean precision with luminous breath
 *
 * Color Roles:
 * - Primary: Slate blue for structure, sovereignty, and trust
 * - Secondary: Fluxline teal for flow, balance, and intuitive clarity
 * - Accent: Mythic gold for illumination, growth, and curriculum ignition
 * - Neutral: Calibrated grays for hierarchy, silence, and sacred whitespace
 */
export const lightTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      // Fluxline Pro Light Primary Palette – Mythic clarity
      themePrimary: '#274770', // Deep slate blue – anchors brand
      themeSecondary: '#5A7CA0', // Cooler contrast
      themeTertiary: '#7B9BB8', // UI layering
      themeLight: '#F8FAFC', // Clean and airy
      themeDark: '#2E2E3A', // Resonance Core – grounding
      themeDarker: '#1F1F1F', // Deep charcoal
      themeLighter: '#FFFFFF', // Ritual White
      themeLighterAlt: '#F5F5F5', // Breath whitespace

      // Neutral Palette – Optimized for light mode readability
      neutralPrimary: '#2E2E2E', // Primary text
      neutralSecondary: '#4A4A4A', // Secondary text
      neutralTertiary: '#707070', // Tertiary text
      neutralTertiaryAlt: '#8F8F8F',
      neutralQuaternary: '#E0E0E0',
      neutralQuaternaryAlt: '#F0F0F0',
      neutralDark: '#000000',
      neutralLight: '#FFFFFF',

      // Fluxline Accent – Emotional resonance
      accent: '#4A9B96', // Fluxline Teal – flow, clarity
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      // Body and Background – Clean light aesthetic
      bodyText: '#2E2E2E',
      bodyBackground: '#FFFFFF',

      // State Colors – Emotional clarity
      errorText: '#B0303C', // Refined red
      errorBackground: '#FFEBEE',
      successText: '#107C10', // Microsoft green
      successBackground: '#E0F2F1',
      messageText: '#F5C85C', // Mythic Gold – illumination
      warningText: '#C19C00', // Deep gold
      warningBackground: '#FFF8E1',

      // Interactive Elements
      link: '#274770', // Primary blue
      linkHovered: '#1F1F1F', // Resonance Core
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'light' as ThemeMode,
  }
);

/**
 * Fluxline Pro Dark Theme – Default Mode
 *
 * Philosophy: Mythic clarity meets emotional depth
 * Style: Minimalist precision with symbolic warmth
 * Background: Deep black (#010101) for focused transmission
 *
 * Color Roles:
 * - Primary: Slate blue for structure, sovereignty, and trust
 * - Secondary: Fluxline teal for flow, balance, and intuitive clarity
 * - Accent: Mythic gold for illumination, growth, and curriculum ignition
 * - Neutral: Calibrated grays for hierarchy, silence, and sacred contrast
 */
export const darkTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      // Fluxline Pro Dark Primary Palette – Resonance Core
      themePrimary: '#AFCAFC', // Slate blue – sovereign structure
      themeSecondary: '#4A9B96', // Fluxline teal – intuitive clarity (accessible)
      themeTertiary: '#5A7CA0', // UI layering
      themeLight: '#F8FAFC', // Light overlay for contrast
      themeDark: '#1F1F1F', // Resonance Core
      themeDarker: '#010101', // Deep black base
      themeLighter: '#2E2E3A', // Soft slate
      themeLighterAlt: '#3A3A4A', // UI hover zones

      // Neutral Palette – Optimized for dark mode vibrancy
      neutralPrimary: '#FFFFFF',
      neutralSecondary: '#E1E1E1',
      neutralTertiary: '#B8B8B8',
      neutralTertiaryAlt: '#8F8F8F',
      neutralQuaternary: '#404040',
      neutralQuaternaryAlt: '#2E2E2E',
      neutralDark: '#1A1A1A',
      neutralLight: '#262626',

      // Fluxline Accent – Emotional resonance
      accent: '#F5C85C', // Mythic gold – illumination and growth
      black: '#010101',
      white: '#FFFFFF',
    },
    semanticColors: {
      // Body and Background – Fluxline Pro dark aesthetic
      bodyText: '#FFFFFF',
      bodyBackground: '#010101',

      // State Colors – Emotional clarity
      errorText: '#B0303C', // Somatic rose – soft red
      errorBackground: '#2D1617',
      successText: '#4A9B96', // Fluxline teal
      successBackground: '#1A2D2A',
      successIcon: '#4A9B96',
      messageText: '#F5C85C', // Mythic gold
      warningText: '#F5C85C',
      warningBackground: '#2D2A17',

      // Interactive Elements
      link: '#274770',
      linkHovered: '#5A7CA0',
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'dark' as ThemeMode,
  }
);

// High Contrast Theme
/**
 * Fluxline Pro High Contrast Theme
 *
 * Philosophy: Maximum legibility with zero ambiguity
 * Style: Stark contrast with simplified structure
 * Background: Deep charcoal (#121212) for focused clarity
 *
 * Color Roles:
 * - Primary: Bright blue for interaction and visibility
 * - Secondary: Pure white and light gray for contrast
 * - Accent: High-contrast blue for emphasis and links
 * - Neutral: Simplified grayscale for hierarchy and accessibility
 */
export const highContrastTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#3399FF',
      themeSecondary: '#F8F8F8',
      themeTertiary: '#CCCCCC',
      themeLight: '#F8F8F8',
      themeDark: '#000000',
      themeDarker: '#000000',
      themeLighter: '#F8F8F8',
      themeLighterAlt: '#F8F8F8',
      neutralPrimary: '#FFFFFF',
      neutralSecondary: '#F8F8F8',
      neutralTertiary: '#CCCCCC',
      neutralTertiaryAlt: '#F8F8F8',
      neutralQuaternary: '#F8F8F8',
      neutralQuaternaryAlt: '#F8F8F8',
      accent: '#3399FF',
      black: '#121212',
      white: '#F8F8F8',
      neutralLight: '#F8F8F8',
      neutralLighter: '#F8F8F8',
      neutralLighterAlt: '#F8F8F8',
    },
    semanticColors: {
      bodyText: '#F8F8F8',
      bodyBackground: '#121212',
      errorText: '#FF0000',
      errorBackground: '#FF0000',
      successText: '#00FF00',
      successBackground: '#121212',
      successIcon: '#00FF00',
      messageText: '#FFFF00',
      warningText: '#FFFF00',
      warningBackground: '#121212',
      link: '#0000FF',
      linkHovered: '#CCCCCC',
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'high-contrast' as ThemeMode,
    gradients: {
      // neutralize gradients on high contrast & colorblind modes
      dark: {
        solid: '#121212',
        background: '#121212',
        menu: '#121212',
        radial: '#121212',
        vignette: '#121212',
        linear: '#121212',
      },
      light: {
        solid: '#121212',
        background: '#121212',
        menu: '#121212',
        radial: '#121212',
        vignette: '#121212',
        linear: '#121212',
      },
      symbolic: {
        fluxlineAscension: '#121212',
        glyphGateFade: '#121212',
        mythicHorizon: '#121212',
      },
      components: {
        card: {
          dark: '#121212',
          light: '#121212',
        },
        button: {
          dark: '#121212',
          light: '#121212',
        },
        modal: {
          dark: '#121212',
          light: '#121212',
        },
      },
    },
  }
);

/**
 * Fluxline Pro Protanopia Theme
 *
 * Philosophy: Inclusive clarity for red-blind vision
 * Style: Cool tones with teal and blue emphasis
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Teal and green for success and balance
 * - Accent: Soft blue for interaction and emphasis
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Protanopia Theme
export const protanopiaTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#0078D4',
      themeSecondary: '#2B88D8',
      themeTertiary: '#71AFE5',
      themeLight: '#C7E0F4',
      themeDark: '#005A9E',
      themeDarker: '#004578',
      themeLighter: '#DEECF9',
      themeLighterAlt: '#EFF6FC',
      neutralPrimary: '#333333',
      neutralSecondary: '#666666',
      neutralTertiary: '#a6a6a6',
      neutralTertiaryAlt: '#c8c8c8',
      neutralQuaternary: '#0E8C77', // Dark teal for error states
      neutralQuaternaryAlt: '#1B5E20', // Dark green for success states
      neutralDark: '#004578',
      neutralLight: '#f3f2f1',
      accent: '#A5C0E1',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#333333',
      bodyBackground: '#ffffff',
      errorText: '#B34C4C', // Dark teal for error states
      errorBackground: '#FDE7E7', // Light red background
      successText: '#1B5E20', // Dark green for success states
      successBackground: '#E8F5E9', // Light green background
      messageText: '#FFB900',
      warningText: '#FFB900',
      warningBackground: '#FFF4CE',
      link: '#0078D4',
      linkHovered: '#004578',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #0078D4 0%, #005A9E 50%, #FFB900 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #FFB900 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #FFB900 0%, #0078D4 50%, #005A9E 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #0078D4 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #FFB900 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'protanopia' as ThemeMode,
  }
);

/**
 * Fluxline Pro Deuteranopia Theme
 *
 * Philosophy: Inclusive clarity for green-blind vision
 * Style: Muted blues and yellows for emotional accessibility
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Muted yellow for emphasis and alerts
 * - Accent: Soft blue for interaction and success
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Deuteranopia Theme
export const deuteranopiaTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#0063B1',
      themeSecondary: '#4894FE',
      themeTertiary: '#FFB900',
      themeLight: '#C7E0F4',
      themeDark: '#004578',
      themeDarker: '#002850',
      themeLighter: '#DEECF9',
      themeLighterAlt: '#EFF6FC',
      neutralPrimary: '#333333',
      neutralSecondary: '#666666',
      neutralTertiary: '#a6a6a6',
      neutralTertiaryAlt: '#c8c8c8',
      neutralQuaternary: '#E6B800', // Muted yellow
      neutralQuaternaryAlt: '#4894FE',
      neutralDark: '#004578',
      neutralLight: '#f3f2f1',
      accent: '#4894FE',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#333333',
      bodyBackground: '#ffffff',
      errorText: '#E81123',
      errorBackground: '#FDE7E7',
      successText: '#4894FE',
      successBackground: '#EFF6FC',
      messageText: '#E6B800', // Muted yellow
      warningText: '#E6B800', // Muted yellow
      warningBackground: '#FFF4CE',
      link: '#0063B1',
      linkHovered: '#004578',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #0063B1 0%, #4894FE 50%, #E6B800 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #E6B800 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #E6B800 0%, #0063B1 50%, #4894FE 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #0063B1 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #E6B800 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'deuteranopia' as ThemeMode,
  }
);

/**
 * Fluxline Pro Tritanopia Theme
 *
 * Philosophy: Inclusive clarity for blue-blind vision
 * Style: Warm tones with orange and green emphasis
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Warm red for structure and alerts
 * - Secondary: Orange for emphasis and interaction
 * - Accent: Green for success and balance
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Tritanopia Theme
export const tritanopiaTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#D13438',
      themeSecondary: '#FF8C00',
      themeTertiary: '#107C10',
      themeLight: '#E8A3A3',
      themeDark: '#A4262C',
      themeDarker: '#761721',
      themeLighter: '#FDE7E7',
      themeLighterAlt: '#FEF4F4',
      neutralPrimary: '#333333',
      neutralSecondary: '#666666',
      neutralTertiary: '#a6a6a6',
      neutralTertiaryAlt: '#c8c8c8',
      neutralQuaternary: '#FF8C00', // Orange for error states
      neutralQuaternaryAlt: '#107C10', // Green for success states
      neutralDark: '#A4262C',
      neutralLight: '#f3f2f1',
      accent: '#107C10',
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#333333',
      bodyBackground: '#ffffff',
      errorText: '#FF8C00', // Orange for error states
      errorBackground: '#FFF3E0', // Light orange background
      successText: '#107C10', // Green for success states
      successBackground: '#E8F5E9', // Light green background
      messageText: '#FF8C00',
      warningText: '#FF8C00',
      warningBackground: '#FFF4CE',
      link: '#D13438',
      linkHovered: '#A4262C',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #D13438 0%, #FF8C00 50%, #107C10 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #FF8C00 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #FF8C00 0%, #D13438 50%, #107C10 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #D13438 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #FF8C00 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'tritanopia' as ThemeMode,
  }
);

// Grayscale Light Theme
export const grayscaleTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#404040', // Primary interactive elements
      themeSecondary: '#666666', // Secondary interactive elements
      themeTertiary: '#808080', // Tertiary elements
      themeLight: '#E0E0E0', // Light backgrounds
      themeDark: '#333333', // Dark text and borders
      themeDarker: '#1A1A1A', // Darkest elements
      themeLighter: '#F0F0F0', // Lighter backgrounds
      themeLighterAlt: '#F8F8F8', // Lightest backgrounds
      neutralPrimary: '#000000', // Primary text
      neutralSecondary: '#666666', // Secondary text
      neutralTertiary: '#A6A6A6', // Disabled text
      neutralTertiaryAlt: '#C8C8C8', // Borders
      neutralQuaternary: '#D9D9D9', // Light borders
      neutralQuaternaryAlt: '#E6E6E6', // Light backgrounds
      neutralDark: '#1A1A1A', // Dark text
      neutralLight: '#FFFFFF', // Light text
      accent: '#666666', // Accent elements
      black: '#000000',
      white: '#FFFFFF',
    },
    semanticColors: {
      bodyText: '#000000',
      bodyBackground: '#FFFFFF',
      errorText: '#888888', // Dark red in grayscale
      errorBackground: '#999999',
      successText: '#1A1A1A', // Dark gray for success
      successBackground: '#E6E6E6',
      messageText: '#4D4D4D', // Mid gray for messages
      warningText: '#4D4D4D',
      warningBackground: '#F2F2F2',
      link: '#404040',
      linkHovered: '#1A1A1A',
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    gradients: {
      dark: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      light: {
        solid: '#ffffff',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
        menu: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        radial: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #F5F5F5 100%)',
        linear: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      symbolic: {
        fluxlineAscension:
          'linear-gradient(135deg, #404040 0%, #666666 50%, #808080 100%)',
        glyphGateFade: 'linear-gradient(to bottom, #666666 0%, #F5F5F5 100%)',
        mythicHorizon:
          'linear-gradient(90deg, #666666 0%, #404040 50%, #808080 100%)',
      },
      components: {
        card: {
          dark: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
        },
        button: {
          dark: 'linear-gradient(90deg, #404040 0%, #FFFFFF 100%)',
          light: 'linear-gradient(90deg, #666666 0%, #FFFFFF 100%)',
        },
        modal: {
          dark: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
          light: 'radial-gradient(circle at center, #F8FAFC 0%, #FFFFFF 100%)',
        },
      },
    },
    themeMode: 'grayscale' as ThemeMode,
  }
);

/**
 * Fluxline Pro Protanopia Theme
 *
 * Philosophy: Inclusive clarity for red-blind vision
 * Style: Cool tones with teal and blue emphasis
 * Background: Clean white with softened contrast
 *
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Teal and green for success and balance
 * - Accent: Soft blue for interaction and emphasis
 * - Neutral: Calibrated grays for hierarchy and legibility
 */
// Grayscale Dark Theme
export const grayscaleDarkTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      themePrimary: '#bfbfbf', // Lighter gray for primary interactive elements
      themeSecondary: '#a6a6a6', // Lighter gray for secondary
      themeTertiary: '#808080', // Mid gray for tertiary
      themeLight: '#1a1a1a', // Dark backgrounds
      themeDark: '#e0e0e0', // Light text and borders
      themeDarker: '#f0f0f0', // Lightest elements
      themeLighter: '#333333', // Darker backgrounds
      themeLighterAlt: '#000000', // Black
      neutralPrimary: '#ffffff', // Primary text (white)
      neutralSecondary: '#bfbfbf', // Secondary text (light gray)
      neutralTertiary: '#666666', // Disabled text (mid gray)
      neutralTertiaryAlt: '#404040', // Borders (darker gray)
      neutralQuaternary: '#262626', // Very dark borders
      neutralQuaternaryAlt: '#1a1a1a', // Very dark backgrounds
      neutralDark: '#f0f0f0', // Light text
      neutralLight: '#000000', // Black
      accent: '#666666', // Accent elements (light gray)
      black: '#000000', // White
      white: '#ffffff', // Black
    },
    semanticColors: {
      bodyText: '#ffffff',
      bodyBackground: '#1a1a1a',
      errorText: '#bbbbbb', // Light gray for error
      errorBackground: '#222222',
      successText: '#f0f0f0', // Light gray for success
      successBackground: '#262626',
      messageText: '#bfbfbf', // Light gray for messages
      warningText: '#bfbfbf',
      warningBackground: '#222222',
      link: '#bfbfbf',
      linkHovered: '#f0f0f0',
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'grayscale-dark' as ThemeMode,
    gradients: {
      light: {
        solid: '#1F1F1F',
        background: '#1F1F1F',
        menu: '#1F1F1F',
        radial: '#1F1F1F',
        vignette: '#1F1F1F',
        linear: '#1F1F1F',
      },
      dark: {
        solid: '#1F1F1F',
        background:
          '#1F1F1F radial-gradient(circle at 20% 50%, #2A2A2A 0%, #2E2E2E 30%, #1C1C1C 70%, #171717 100%)',
        menu: '#1F1F1F radial-gradient(circle at 80% 50%, #252525 0%, #2A2A2A 30%, #242424 70%, #1A1A1A 100%)',
        radial:
          '#1F1F1F radial-gradient(circle at center, #2A2A2A 0%, #242424 30%, #1F1F1F 70%, #1A1A1A 100%)',
        vignette:
          'radial-gradient(circle at center, transparent 0%, #1A1A1A 100%)',
        linear:
          'linear-gradient(90deg, #1F1F1F 0%, #242424 50%, #1F1F1F 100%) no-repeat center',
      },
      symbolic: {
        fluxlineAscension: '#1F1F1F',
        glyphGateFade: '#1F1F1F',
        mythicHorizon: '#1F1F1F',
      },
      components: {
        card: {
          light: '#1F1F1F',
          dark: '#1F1F1F',
        },
        button: {
          light: '#1F1F1F',
          dark: '#1F1F1F',
        },
        modal: {
          light: '#1F1F1F',
          dark: '#1F1F1F',
        },
      },
    },
  }
);

// Theme validation type
export type ThemeValidation = {
  isValid: boolean;
  missingProperties: string[];
  invalidProperties: string[];
};

// Theme validation function
export const validateTheme = (theme: IExtendedTheme): ThemeValidation => {
  const requiredProperties = [
    'palette',
    'semanticColors',
    'spacing',
    'typography',
    'animations',
    'shadows',
    'gradients',
    'breakpoints',
    'mediaQueries',
  ];

  const missingProperties = requiredProperties.filter(
    (prop) => !(prop in theme)
  );

  const invalidProperties = requiredProperties.filter(
    (prop) => prop in theme && !theme[prop as keyof IExtendedTheme]
  );

  return {
    isValid: missingProperties.length === 0 && invalidProperties.length === 0,
    missingProperties,
    invalidProperties,
  };
};

// Theme switching utility
export const switchTheme = (
  currentTheme: IExtendedTheme,
  newTheme: IExtendedTheme
): IExtendedTheme => {
  const validation = validateTheme(newTheme);
  if (!validation.isValid) {
    console.warn('Invalid theme:', validation);
    return currentTheme;
  }
  return newTheme;
};

export const containerStyles = {
  containerType: 'inline-size',
  containerName: 'font-container',
} as const;

// Additional semantic color mappings for UI components
export const componentColors = {
  button: {
    primary: {
      background: 'var(--primary)',
      text: 'var(--neutral-primary)',
      hover: 'var(--neutral-light)',
      active: 'var(--neutral-lighter)',
    },
    secondary: {
      background: 'var(--secondary)',
      text: 'var(--neutral-primary)',
      hover: 'var(--neutral-light)',
      active: 'var(--neutral-lighter)',
    },
  },
  input: {
    background: 'var(--neutral-light)',
    text: 'var(--neutral-primary)',
    border: 'var(--neutral-tertiary)',
    focus: 'var(--primary)',
    placeholder: 'var(--neutral-tertiary)',
  },
  card: {
    background: 'var(--neutral-light)',
    border: 'var(--neutral-tertiary)',
    shadow: 'var(--shadow)',
  },
  modal: {
    background: 'var(--neutral-light)',
    overlay: 'var(--neutral-dark)',
    border: 'var(--neutral-tertiary)',
  },
  toast: {
    success: {
      background: 'var(--success)',
      text: 'var(--neutral-primary)',
    },
    error: {
      background: 'var(--error)',
      text: 'var(--neutral-primary)',
    },
    warning: {
      background: 'var(--warning)',
      text: 'var(--neutral-primary)',
    },
  },
};

// Example usage in styles
// export const getResponsiveStyles = (theme: IExtendedTheme, styles: any) => {
//   root: {
//     padding: responsiveValue(theme, {
//       padding: theme.spacing.m
//     }),
//   },
// };

// Theme types
export type ThemeMode =
  | 'light'
  | 'dark'
  | 'high-contrast'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'grayscale'
  | 'grayscale-dark';

export type ReadingDirection = 'ltr' | 'rtl';
export type LayoutPreference = 'right-handed' | 'left-handed';

export type ThemeContextType = {
  theme: IExtendedTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setAccessibilityTheme: (mode: ThemeMode) => void;
  // New reading direction and layout preferences
  readingDirection: ReadingDirection;
  layoutPreference: LayoutPreference;
  setReadingDirection: (direction: ReadingDirection) => void;
  setLayoutPreference: (preference: LayoutPreference) => void;
  toggleReadingDirection: () => void;
  toggleLayoutPreference: () => void;
};

// Theme mapping
export const themeMap: Record<ThemeMode, IExtendedTheme> = {
  light: lightTheme,
  dark: darkTheme,
  'high-contrast': highContrastTheme,
  protanopia: protanopiaTheme,
  deuteranopia: deuteranopiaTheme,
  tritanopia: tritanopiaTheme,
  grayscale: grayscaleTheme,
  'grayscale-dark': grayscaleDarkTheme,
};

// Theme persistence key
export const THEME_STORAGE_KEY = 'app-theme-mode';

/**
 * Fluxline Pro Theme Utilities
 *
 * Default theme mode is 'dark' to prioritize the focused aesthetic
 * with deep black (#010101) background for calm, engineered experience
 */
export const getInitialThemeMode = (): ThemeMode => {
  return 'dark'; // Fluxline Pro defaults to dark mode

  // Optional: Uncomment to respect user system preferences
  // if (typeof window === 'undefined') return 'dark';

  // // Check localStorage for saved preference
  // const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
  // if (savedTheme && themeMap[savedTheme]) return savedTheme;

  // // Check system preference - defaults to dark if no preference
  // if (
  //   window.matchMedia &&
  //   window.matchMedia('(prefers-color-scheme: light)').matches
  // ) {
  //   return 'light';
  // }

  // return 'dark'; // Fluxline Pro dark mode default
};

export const applyThemeToDocument = (themeMode: ThemeMode) => {
  const root = document.documentElement;
  const theme = themeMap[themeMode];

  // Add transition properties to root element
  root.style.setProperty(
    'transition',
    'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out'
  );

  // Apply CSS variables with transitions
  Object.entries(theme.palette).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Apply semantic colors with transitions
  Object.entries(theme.semanticColors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Store theme preference
  localStorage.setItem(THEME_STORAGE_KEY, themeMode);
};

export type ResponsiveTypographyProps = {
  xs?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  sm?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  md?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  lg?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  xl?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
  xxl?:
    | 'clamp'
    | 'clamp2'
    | 'clamp3'
    | 'clamp4'
    | 'clamp5'
    | 'clamp6'
    | 'clamp7'
    | 'clamp8';
};

export const getResponsiveTypography = ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
}: ResponsiveTypographyProps) => {
  const styles: { [key: string]: any } = {};

  if (xs) {
    styles['@media (min-width: 0)'] = {
      fontSize: typography.fontSizes[xs],
    };
  }
  if (sm) {
    styles['@media (min-width: 576px)'] = {
      fontSize: typography.fontSizes[sm],
    };
  }
  if (md) {
    styles['@media (min-width: 768px)'] = {
      fontSize: typography.fontSizes[md],
    };
  }
  if (lg) {
    styles['@media (min-width: 1024px)'] = {
      fontSize: typography.fontSizes[lg],
    };
  }
  if (xl) {
    styles['@media (min-width: 1366px)'] = {
      fontSize: typography.fontSizes[xl],
    };
  }
  if (xxl) {
    styles['@media (min-width: 1920px)'] = {
      fontSize: typography.fontSizes[xxl],
    };
  }

  return styles;
};

/**
 * DEFAULT EXPORT - Fluxline Pro Dark Theme
 * ========================================
 *
 * Exports dark theme as default to prioritize the Fluxline Pro
 * focused aesthetic with deep black (#010101) background.
 *
 * This ensures all components using the default theme export
 * will render with the intended dark mode experience.
 */
export default darkTheme;
