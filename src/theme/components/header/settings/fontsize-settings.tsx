// src/theme/components/navigation/settings/FontSizeSettings.tsx
import React from 'react';

import { FluentSlider } from '../../form-elements/slider/slider';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useDeviceType } from '../../../hooks/useMediaQuery';

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
