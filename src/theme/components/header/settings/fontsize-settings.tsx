// src/theme/components/navigation/settings/FontSizeSettings.tsx
import React, { CSSProperties } from 'react';

import { FluentSlider } from '../../form-elements/slider/slider';
import { IExtendedTheme } from '../../../theme';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceType } from '../../../hooks/useMediaQuery';

export const createTypographyStyles = (theme: IExtendedTheme) => ({
  pageTitle: {
    color: theme.isInverted ? theme.palette.white : theme.palette.black,
    fontFamily: theme.typography.fonts.h2.fontFamily,
    fontSize: 'clamp(2rem, 3vh, 3rem)',
    fontWeight: theme.typography.fontWeights.bold,
    fontVariationSettings: "'wght' 300, 'wdth' 100, 'slnt' 0",
    letterSpacing: theme.typography.fonts.h2.letterSpacing,
    lineHeight: theme.typography.lineHeights.tight,
    textTransform: 'uppercase' as const,
    textShadow: theme.isInverted
      ? theme.typography.textShadows.cardImage
      : '1px 1px 2px rgba(0, 0, 0, 0.5)',
  } as CSSProperties,

  modalTitle: {
    color: theme.palette.themePrimary,
    fontFamily: 'proxima-nova, sans-serif', // Use proxima-nova consistently
    fontSize: 'clamp(2rem, 3vh, 3rem)',
    fontWeight: theme.typography.fontWeights.thin,
    letterSpacing: theme.typography.fonts.h2.letterSpacing,
    lineHeight: theme.typography.lineHeights.tight,
    textTransform: 'uppercase' as const,
    textShadow: 'none',
  } as CSSProperties,

  menuTitle: {
    fontSize: 'clamp(2rem, 4vh, 2rem)',
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: theme.typography.fontWeights.medium,
    letterSpacing: '-1.5px',
    lineHeight: theme.typography.lineHeights.tight,
    textTransform: 'capitalize' as const,
    textShadow: 'none',
  },

  cardImageText: {
    fontSize: '3rem', // set to manual value due to absolute positioning which clamp doesn't handle well
    fontWeight: theme.typography.fontWeights.thin,
    textTransform: 'uppercase' as const,
    fontVariationSettings: "'wght' 200, 'wdth' 100, 'slnt' 0",
    fontFamily: 'proxima-nova, sans-serif', // Use proxima-nova consistently
    letterSpacing: theme.typography.fonts.h3.letterSpacing,
    lineHeight: theme.typography.lineHeights.tight,
    textShadow: theme.typography.textShadows.cardImage, // Keep shadow for card image text for readability
  } as CSSProperties,

  menuText: {
    fontSize: 'clamp(0.875rem, 1vh, 1rem)',
    letterSpacing: theme.typography.letterSpacing.tight,
    fontWeight: theme.typography.fontWeights.semiBold,
    margin: '0',
    textTransform: 'uppercase' as const,
  } as CSSProperties,

  sectionTitle: {
    fontFamily: 'proxima-nova, sans-serif', // Use proxima-nova consistently
    fontSize: 'clamp(1.5rem, 2vh, 2rem)',
    fontWeight: theme.typography.fontWeights.semiBold,
    letterSpacing: theme.typography.fonts.h3.letterSpacing,
    lineHeight: theme.typography.lineHeights.tight,
    textShadow: 'none',
    textTransform: 'uppercase' as const, // Add uppercase for consistency
  } as CSSProperties,
});

export const FontSizeSettings: React.FC<{ isOnboarding?: boolean }> = ({
  isOnboarding = false,
}) => {
  const { fontScale, setFontScale } = useAppTheme();
  const minFontScale = 0.8;
  const maxFontScale = 1.5;
  const fontSizePercentage = Math.round((fontScale || 1) * 100);
  const minFontSizePercentage = Math.round(minFontScale * 100);
  const maxFontSizePercentage = Math.round(maxFontScale * 100);
  const { isMobile } = useDeviceType();

  const handleFontSizeChange = (newPercentage: number) => {
    if (typeof newPercentage !== 'number' || isNaN(newPercentage)) {
      console.error('Invalid font size percentage:', newPercentage);
      return;
    }
    const newScale = newPercentage / 100;
    if (newScale < 0.1 || newScale > 10) {
      console.warn('Font scale is outside reasonable bounds:', newScale);
      return;
    }
    const clampedScale = Math.min(
      Math.max(newScale, minFontScale),
      maxFontScale
    );
    setFontScale(clampedScale);
  };

  return (
    <>
      <FluentSlider
        label={`Font Size (${fontSizePercentage}%)`}
        min={minFontSizePercentage}
        max={maxFontSizePercentage}
        step={5}
        value={fontSizePercentage}
        onChange={handleFontSizeChange}
        styles={{ root: { width: isOnboarding && !isMobile ? '50%' : '100%' } }}
      />
    </>
  );
};
