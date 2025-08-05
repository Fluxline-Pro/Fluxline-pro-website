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
 * • Humble tone: Work Sans for body text creates approachable, readable content
 * • Accent highlights: Roboto Mono for code emphasizes technical precision
 * • Engineered motion: cubic-bezier(0.4, 0, 0.2, 1) for fluid, intentional animations
 * 
 * TEXT TRANSFORM PROGRESSION:
 * ---------------------------
 * H1-H2: UPPERCASE → Bold structure and commanding presence
 * H3-H4: Title Case → Balanced hierarchy and readability  
 * H5: lowercase → Humble, approachable tone
 * H6: none → Accent highlights for growth cues
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
  cardImage: '4px 4px 8px rgba(0,0,0,0.7',
};

/**
 * Fluxline Pro Gradients - Engineered Visual Depth
 * 
 * Dark mode optimized with '#010101' base for focused aesthetic
 * Light mode with clean, minimal gradients for clarity
 */
const baseGradients = {
  dark: {
    // Base backgrounds with Fluxline deep black
    solid: '#010101', // Deep black base layout tone
    background:
      '#010101 radial-gradient(circle at 20% 50%, #1A1A1A 0%, #0F0F0F 30%, #050505 70%, #010101 100%)',
    menu: '#010101 radial-gradient(circle at 80% 50%, #151515 0%, #0D0D0D 30%, #080808 70%, #010101 100%)',
    radial:
      '#010101 radial-gradient(circle at center, #1A1A1A 0%, #0F0F0F 30%, #050505 70%, #010101 100%)',
    vignette: 'radial-gradient(circle at center, transparent 0%, #010101 100%)',
    linear:
      'linear-gradient(90deg, #010101 0%, #0A0A0A 50%, #010101 100%) no-repeat center',
  },
  light: {
    // Clean light gradients
    solid: '#FFFFFF',
    background:
      '#FFFFFF radial-gradient(circle at 20% 50%, #FEFEFE 0%, #F8F8F8 30%, #F2F2F2 70%, #ECECEC 100%)',
    menu: '#FFFFFF radial-gradient(circle at center, #FFFFFF 0%, #F0F0F0 30%, #E8E8E8 70%, #E0E0E0 100%)',
    radial:
      '#FFFFFF radial-gradient(circle at center, #FFFFFF 0%, #F0F0F0 30%, #E8E8E8 70%, #E0E0E0 100%)',
    vignette: 'radial-gradient(circle at center, transparent 0%, #F0F0F0 100%)',
    linear:
      'linear-gradient(90deg, #F8F8F8 0%, #FFFFFF 50%, #F8F8F8 100%) no-repeat center',
  },
  components: {
    card: {
      dark: 'linear-gradient(135deg, #151515 0%, #010101 100%)',
      light: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
    },
    button: {
      dark: 'linear-gradient(90deg, #1A1A1A 0%, #010101 100%)',
      light: 'linear-gradient(90deg, #FFFFFF 0%, #F8F8F8 100%)',
    },
    modal: {
      dark: '#010101 radial-gradient(circle at center, #1A1A1A 0%, #0F0F0F 30%, #010101 100%)',
      light:
        '#FFFFFF radial-gradient(circle at center, #FFFFFF 0%, #F8F8F8 30%, #F5F5F5 100%)',
    },
  },
};

/**
 * Typography Configuration - Fluxline Pro Brand System
 * 
 * Philosophy: Bold structure, humble tone, and accent highlights for growth
 * Text Transform Progression: uppercase → title-case → lowercase → accent
 * 
 * Fonts:
 * - Inter: Clean, modern sans-serif for headings (bold structure)
 * - Work Sans: Friendly, approachable for body text (humble tone)  
 * - Roboto Mono: Technical precision for code (accent highlights)
 */
export const typography = {
  fontFamilies: {
    // Fluxline Pro font stack - Inter for headings, Work Sans for body, Roboto Mono for code
    base: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    mono: 'Roboto Mono, "SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    headingH3: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    headingLight: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h2: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h3: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h4: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h5: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h6: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    p: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  },
  // Font sizes with modular scale - base 1rem unit for rhythm
  fontSizes: {
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
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.25rem, 0.5cqi, 0.25rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      lineHeight: '1.6',
    },
    xSmall: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.5rem, 1cqi, 0.5rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    small: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    medium: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    mediumPlus: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    large: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.5rem, 3cqi, 1.5rem)',
      fontWeight: '600' as '600',
      fontVariationSettings: '"wght" 600, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    xLarge: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2rem, 4cqi, 2rem)',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    xxLarge: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(3rem, 6cqi, 3rem)',
      fontWeight: '800' as '800',
      fontVariationSettings: '"wght" 800, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    // Heading hierarchy with text transform progression
    h1: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(8cqi, min(10cqi, 10cqh), min(14cqi, 14cqh))',
      fontWeight: '700' as '700',
      fontVariationSettings: '"wght" 700, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-textBig)',
      textTransform: 'uppercase' as const, // Bold structure
      lineHeight: '1.6',
    },
    h2: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(2cqi, min(5cqi, 5cqh), min(7cqi, 7cqh))',
      fontWeight: '600' as '600',
      fontVariationSettings: '"wght" 600, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'none',
      textTransform: 'uppercase' as const, // Bold structure
      lineHeight: '1.6',
    },
    h3: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 3cqi, 2rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'none',
      textTransform: 'capitalize' as const, // Title-case transition
      lineHeight: '1.6',
    },
    h4: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-h4)',
      textTransform: 'capitalize' as const, // Title-case
      lineHeight: '1.6',
    },
    h5: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-h5)',
      textTransform: 'lowercase' as const, // Humble tone
      lineHeight: '1.6',
    },
    h6: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: '600' as '600',
      fontVariationSettings: '"wght" 600, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      textShadow: 'var(--text-shadow-h6)',
      textTransform: 'none' as const, // Accent highlights
      lineHeight: '1.6',
    },
    body: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: '1rem',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6', // Readable flow
    },
    bodySmall: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    homeH3: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(3cqi, min(6cqi, 6cqh), min(8cqi, 8cqh))',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 125, "slnt" 0',
      textTransform: 'lowercase' as const, // Humble tone
      lineHeight: '1.6',
    },
    label: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '500' as '500',
      fontVariationSettings: '"wght" 500, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    quote: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(1.25rem, 2.5cqi, 1.25rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    pre: {
      fontFamily: 'Roboto Mono, "SF Mono", "Monaco", "Cascadia Code", Consolas, "Courier New", monospace',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    code: {
      fontFamily: 'Roboto Mono, "SF Mono", "Monaco", "Cascadia Code", Consolas, "Courier New", monospace',
      fontSize: 'clamp(0.875rem, 1.75cqi, 0.875rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
      lineHeight: '1.6',
    },
    caption: {
      fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      fontSize: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
      fontWeight: '400' as '400',
      fontVariationSettings: '"wght" 400, "wdth" 100, "slnt" 0',
      letterSpacing: '0.1px',
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
 * Philosophy: Clarity meets transformation
 * Style: Clean precision with subtle warmth
 * 
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Complementary blue-green for balance  
 * - Accent: Vibrant highlight for growth and interaction
 * - Neutral: Carefully calibrated grays for hierarchy
 */
export const lightTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      // Fluxline Pro Primary Palette - Deep blues for structure
      themePrimary: '#2A5F8F', // Primary interactive blue (darker for light mode)
      themeSecondary: '#357ABD', // Secondary blue
      themeTertiary: '#4A90E2', // Tertiary blue (lighter variant)
      themeLight: '#E8F4FD', // Light blue tint
      themeDark: '#1E3A52', // Dark blue
      themeDarker: '#0F1C2E', // Darkest blue
      themeLighter: '#F0F8FF', // Lightest blue
      themeLighterAlt: '#FAFCFF', // Alternative light blue
      
      // Neutral Palette - Optimized for light mode readability
      neutralPrimary: '#1A1A1A', // Primary text - dark gray
      neutralSecondary: '#404040', // Secondary text - medium gray
      neutralTertiary: '#707070', // Tertiary text - lighter gray
      neutralTertiaryAlt: '#8F8F8F', // Alternative tertiary
      neutralQuaternary: '#E0E0E0', // Quaternary - light gray
      neutralQuaternaryAlt: '#F0F0F0', // Alternative quaternary
      neutralDark: '#000000', // Dark elements
      neutralLight: '#FFFFFF', // Light elements
      
      // Fluxline Accent - Vibrant highlight for growth
      accent: '#00A896', // Slightly darker green-blue accent for light mode
      black: '#000000', // Pure black
      white: '#FFFFFF', // Pure white
    },
    semanticColors: {
      // Body and Background - Clean light aesthetic
      bodyText: '#1A1A1A', // Dark gray for readability
      bodyBackground: '#FFFFFF', // Pure white background
      
      // State Colors - Optimized for light mode
      errorText: '#D32F2F', // Strong red for errors
      errorBackground: '#FFEBEE', // Light red background
      successText: '#00796B', // Teal-green for success
      successBackground: '#E0F2F1', // Light green background
      messageText: '#F57C00', // Orange for messages
      warningText: '#F57C00', // Warning orange
      warningBackground: '#FFF8E1', // Light orange background
      
      // Interactive Elements
      link: '#2A5F8F', // Primary blue for links
      linkHovered: '#1E3A52', // Darker blue for hover
    },
    isInverted: false,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'light' as ThemeMode,
  }
);

/**
 * Fluxline Pro Dark Theme - Default Theme
 * 
 * Philosophy: Clarity meets transformation
 * Style: Minimalist precision with animated warmth
 * Background: Deep black (#010101) for focused aesthetic
 * 
 * Color Roles:
 * - Primary: Deep blue for structure and trust
 * - Secondary: Complementary blue-green for balance
 * - Accent: Vibrant highlight for growth and interaction
 * - Neutral: Carefully calibrated grays for hierarchy
 */
export const darkTheme: IExtendedTheme = createExtendedTheme(
  createTheme({
    palette: {
      // Fluxline Pro Primary Palette - Deep blues for structure
      themePrimary: '#4A90E2', // Primary interactive blue
      themeSecondary: '#357ABD', // Secondary blue
      themeTertiary: '#2A5F8F', // Tertiary blue (close to primary on color wheel)
      themeLight: '#E8F4FD', // Light blue tint
      themeDark: '#1E3A52', // Dark blue
      themeDarker: '#0F1C2E', // Darkest blue
      themeLighter: '#F0F8FF', // Lightest blue
      themeLighterAlt: '#FAFCFF', // Alternative light blue
      
      // Neutral Palette - Optimized for dark mode vibrancy
      neutralPrimary: '#FFFFFF', // Primary text - pure white for contrast
      neutralSecondary: '#E1E1E1', // Secondary text - light gray
      neutralTertiary: '#B8B8B8', // Tertiary text - medium gray
      neutralTertiaryAlt: '#8F8F8F', // Alternative tertiary
      neutralQuaternary: '#404040', // Quaternary - dark gray
      neutralQuaternaryAlt: '#2E2E2E', // Alternative quaternary
      neutralDark: '#1A1A1A', // Dark elements
      neutralLight: '#262626', // Light elements in dark mode
      
      // Fluxline Accent - Vibrant highlight for growth
      accent: '#00D4AA', // Green-blue accent for growth and interaction
      black: '#010101', // Deep black base
      white: '#FFFFFF', // Pure white
    },
    semanticColors: {
      // Body and Background - Fluxline Pro dark aesthetic
      bodyText: '#FFFFFF', // Pure white for maximum readability
      bodyBackground: '#010101', // Deep black base layout tone
      
      // State Colors - Optimized for dark mode
      errorText: '#FF6B6B', // Soft red for errors
      errorBackground: '#2D1617', // Dark red background
      successText: '#4ECDC4', // Teal-green for success
      successBackground: '#1A2D2A', // Dark green background
      successIcon: '#4ECDC4', // Success icon color
      messageText: '#FFE66D', // Warm yellow for messages
      warningText: '#FFE66D', // Warning yellow
      warningBackground: '#2D2A17', // Dark yellow background
      
      // Interactive Elements
      link: '#4A90E2', // Primary blue for links
      linkHovered: '#357ABD', // Secondary blue for hover
    },
    isInverted: true,
  }),
  {
    ...baseExtendedProps,
    themeMode: 'dark' as ThemeMode,
  }
);

// High Contrast Theme
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
      errorBackground: '#A91B16', // Light teal background
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
    themeMode: 'protanopia' as ThemeMode,
  }
);

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
    themeMode: 'deuteranopia' as ThemeMode,
  }
);

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
    themeMode: 'grayscale' as ThemeMode,
  }
);

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
