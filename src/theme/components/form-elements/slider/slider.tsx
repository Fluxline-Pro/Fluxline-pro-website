import React from 'react';
import { ISliderStyles, Slider } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  styles?: Partial<ISliderStyles>;
}

export const FluentSlider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  styles,
}) => {
  const { theme, readingDirection } = useAppTheme();
  const { getThemedBackgroundColor, getThemedTextColor } = useThemeColor();
  const isRTL = readingDirection === 'rtl';

  const getSliderBackgroundColor = () => {
    if (theme.themeMode === 'high-contrast') {
      return theme.palette.themePrimary;
    }

    // Special handling for colorblind modes
    if (
      ['protanopia', 'deuteranopia', 'tritanopia'].includes(theme.themeMode)
    ) {
      return theme.palette.themePrimary;
    }

    return getThemedBackgroundColor();
  };

  const activeBackgroundColor =
    theme.themeMode === 'grayscale'
      ? theme.palette.neutralPrimary
      : getSliderBackgroundColor();

  const inactiveBackgroundColor =
    theme.themeMode === 'high-contrast'
      ? theme.palette.white
      : theme.palette.neutralTertiaryAlt;

  const sliderStyles: Partial<ISliderStyles> = {
    root: {
      backgroundColor: 'transparent',
      userSelect: 'none',
      fontFamily: theme.typography.fonts.body.fontFamily,
    },
    titleLabel: {
      color: theme.palette.neutralPrimary,
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontSize: theme.typography.fontSizes.clamp4,
      fontWeight: theme.typography.fontWeights.regular as 400,
      letterSpacing: theme.typography.letterSpacing.normal,
      lineHeight: theme.typography.lineHeights.normal,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.s,
      textTransform: 'lowercase' as const,
    },
    valueLabel: {
      display: 'none',
    },
    container: {
      backgroundColor: 'transparent',
      userSelect: 'none',
      direction: isRTL ? 'rtl' : 'ltr',
    },
    slideBox: {
      userSelect: 'none',
      paddingLeft: 0,
      paddingRight: 0,
    },
    line: {
      height: 4,
      borderRadius: 4,
      selectors: {
        '&:hover': {
          cursor: 'pointer',
        },
        '.ms-Slider-active': {
          backgroundColor: `${theme.themeMode === 'high-contrast' ? theme.palette.themePrimary : activeBackgroundColor} !important`,
          '&:hover': {
            backgroundColor: `${getSliderBackgroundColor()} !important`,
          },
          '&:active': {
            backgroundColor: `${getSliderBackgroundColor()} !important`,
          },
        },
        '.ms-Slider-inactive': {
          backgroundColor: `${inactiveBackgroundColor} !important`,
          '&:hover': {
            backgroundColor: `${theme.palette.neutralTertiaryAlt} !important`,
          },
          '&:active': {
            backgroundColor: `${theme.palette.neutralTertiaryAlt} !important`,
          },
        },
        '.ms-Slider-thumb': {
          backgroundColor: `${getThemedBackgroundColor()} !important`,
          borderColor: `${getThemedBackgroundColor()} !important`,
        },
      },
    },
    thumb: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: getThemedTextColor(),
      backgroundColor: theme.isInverted
        ? theme.palette.white
        : theme.palette.black,
      width: 20,
      height: 20,
      zIndex: 4,
      borderRadius: '50%',
      cursor: 'grab',
      transition: 'all 0.2s ease-in-out',
      selectors: {
        ':hover': {
          borderColor: getThemedTextColor(),
          backgroundColor: theme.isInverted
            ? theme.palette.white
            : theme.palette.black,
        },
        ':active': {
          cursor: 'grabbing',
          borderColor: getThemedTextColor(),
          backgroundColor: theme.isInverted
            ? theme.palette.white
            : theme.palette.black,
        },
        ':focus': {
          borderColor: getThemedTextColor(),
          boxShadow: `0 0 0 2px ${theme.palette.themeLighter}`,
          outline: 'none',
        },
      },
    },
    activeSection: {
      backgroundColor: `${isRTL ? inactiveBackgroundColor : activeBackgroundColor} !important`,
      transition: 'background-color 0.2s ease-in-out',
    },
    inactiveSection: {
      backgroundColor: `${isRTL ? activeBackgroundColor : inactiveBackgroundColor} !important`,
      transition: 'background-color 0.2s ease-in-out',
    },
  };

  // Reverse the active and inactive sections for RTL
  if (isRTL) {
    const temp = sliderStyles.activeSection;
    sliderStyles.activeSection = sliderStyles.inactiveSection;
    sliderStyles.inactiveSection = temp;
  }

  return (
    <Slider
      label={label}
      min={min}
      max={max}
      step={step}
      value={isRTL ? max - value + min : value}
      onChange={(newValue) => onChange(isRTL ? max - newValue + min : newValue)}
      styles={{ ...sliderStyles, ...styles }}
    />
  );
};

export default FluentSlider;
