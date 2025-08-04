import React from 'react';

import { useColorVisionFilter } from '../hooks/useColorVisionFilter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { IExtendedTheme, ThemeMode } from '../theme';
import backgroundImageOneLandscape from '../../assets/images/HomePageCover4kLandscape.jpg';
import backgroundImageOnePortrait from '../../assets/images/HomePageCover4kPortrait.jpeg';
import backgroundImageTwoLandscape from '../../assets/images/HomePageCover4kLandscape2.jpg';
import backgroundImageTwoPortrait from '../../assets/images/HomePageCover4kPortrait2.jpg';

interface BackgroundLayerProps {
  isHomePage: boolean;
  backgroundImage: 'one' | 'two';
  orientation:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'ultrawide'
    | 'large-portrait';
  themeMode: ThemeMode;
  theme: IExtendedTheme;
  layoutPreference: 'left-handed' | 'right-handed';
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  isHomePage,
  backgroundImage,
  orientation,
  themeMode,
  theme,
  layoutPreference,
}) => {
  const { filter } = useColorVisionFilter();
  const { shouldReduceMotion } = useReducedMotion();

  const getBackgroundImage = (
    backgroundImage: 'one' | 'two',
    orientation: string
  ) => {
    const image =
      backgroundImage === 'one'
        ? orientation === 'landscape' || orientation === 'ultrawide'
          ? backgroundImageOneLandscape
          : orientation === 'portrait'
            ? backgroundImageOnePortrait
            : backgroundImageOneLandscape
        : orientation === 'landscape' || orientation === 'ultrawide'
          ? backgroundImageTwoLandscape
          : orientation === 'portrait'
            ? backgroundImageTwoPortrait
            : backgroundImageTwoLandscape;
    return image;
  };

  const getBackgroundPosition = (
    orientation: string,
    backgroundImage: 'one' | 'two'
  ) => {
    if (orientation === 'square') {
      return backgroundImage === 'one' ? '80% center' : '20% center';
    }
    if (orientation === 'portrait') {
      return backgroundImage === 'one' ? 'center' : '33% center';
    }
    if (orientation === 'tablet-portrait') {
      return backgroundImage === 'one' ? '60% center' : '40% center';
    }
    if (orientation === 'large-portrait') {
      return backgroundImage === 'one' ? '55% center' : '45% center';
    }
    if (orientation === 'landscape' || orientation === 'ultrawide') {
      return 'center';
    }
    return 'center';
  };

  const getBackgroundGradient = (
    themeMode: ThemeMode,
    theme: IExtendedTheme
  ) => {
    switch (themeMode) {
      case 'high-contrast':
        return theme.gradients.light.background;
      case 'dark':
        return theme.gradients.dark.background;
      case 'protanopia':
      case 'deuteranopia':
      case 'tritanopia':
      case 'grayscale':
        return theme.gradients.light.background;
      default:
        return theme.gradients.light.background;
    }
  };

  if (!isHomePage) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getBackgroundGradient(themeMode, theme),
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
      />
    );
  }

  const image = getBackgroundImage(backgroundImage, orientation);

  return (
    <div
      // key={`${backgroundImage}-${orientation}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: getBackgroundPosition(orientation, backgroundImage),
        backgroundRepeat: 'no-repeat',
        transform:
          layoutPreference === 'left-handed' && orientation !== 'portrait'
            ? 'scaleX(-1)'
            : 'none',
        filter: filter,
        zIndex: -1,
        transition: shouldReduceMotion ? 'none' : 'all 0.5s ease-in-out',
        opacity: 1,
        willChange: 'background-image, opacity',
      }}
    />
  );
};
