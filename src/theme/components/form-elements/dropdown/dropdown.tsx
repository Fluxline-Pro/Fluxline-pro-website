import React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useThemeColor } from '../../../hooks/useThemeColor';
import FluentTooltip from '../tooltip/tooltip';
import './dropdown.module.scss';

interface DropdownProps {
  label: string;
  options: IDropdownOption[];
  defaultSelectedKey: string;
  disabledTooltip?: string;
  onChange: (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => void;
  styles?: Partial<IDropdownStyles>;
  disabled?: boolean;
}

const FluentDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  defaultSelectedKey,
  disabledTooltip,
  onChange,
  styles,
  disabled,
}) => {
  const { theme, readingDirection } = useAppTheme();
  const { getThemedTextColor } = useThemeColor();

  const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
      width: '100%',
      selectors: {
        '.ms-Dropdown-title': {
          borderColor: getThemedTextColor(),
          backgroundColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralLight
              : 'transparent',
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralPrimary
              : theme.palette.neutralPrimary,
          border: `1px solid ${getThemedTextColor()}`,
          borderRadius: theme.spacing.s2,
          padding: theme.spacing.s,
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
        '.ms-Dropdown-caretDownWrapper': {
          left:
            readingDirection === 'rtl'
              ? '0.75rem !important'
              : 'auto !important',
          right:
            readingDirection === 'rtl'
              ? 'auto !important'
              : '0.75rem !important',
          cursor: 'inherit',
        },
        '.ms-Dropdown': {
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.white
              : theme.palette.neutralPrimary,
        },
        '.ms-Dropdown-item': {
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          backgroundColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralLight
              : theme.palette.white,
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.white
              : theme.palette.neutralPrimary,
        },
        '.ms-Dropdown-header': {
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          backgroundColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralLight
              : theme.palette.white,
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.white
              : theme.palette.neutralPrimary,
        },
        '.ms-Dropdown-optionText': {
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.white
              : theme.palette.neutralPrimary,
        },
        '.ms-Dropdown-items': {
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          backgroundColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralLight
              : theme.palette.white,
        },
        '&:hover': {
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
        '&:disabled': {
          cursor: 'not-allowed',
        },
      },
    },
    subComponentStyles: {
      label: {
        root: {
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.white
              : theme.palette.themePrimary,
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          fontSize: theme.typography.fonts.h4.fontSize,
          fontWeight: theme.typography.fonts.medium.fontWeight,
          letterSpacing: theme.typography.letterSpacing.normal,
          lineHeight: theme.typography.lineHeights.tight,
          textTransform: 'lowercase' as const,
          marginTop: theme.spacing.s,
          marginBottom: theme.spacing.s,
        },
      },
      panel: {
        main: {
          backgroundColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralLight
              : theme.palette.white,
          border: `1px solid ${getThemedTextColor()}`,
        },
      },
      multiSelectItem: {},
    },
    dropdown: {
      borderColor: getThemedTextColor(),
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      fontSize: theme.typography.fontSizes.clamp4,
      fontWeight: theme.typography.fonts.medium.fontWeight,
      letterSpacing: theme.typography.letterSpacing.normal,
      selectors: {
        ':hover': {
          borderColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.themePrimary
              : theme.palette.themeDark,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
        ':focus': {
          borderColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.themePrimary
              : theme.palette.themeDarker,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
      },
    },
    title: {
      borderColor: getThemedTextColor(),
      color:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.white
          : theme.palette.neutralPrimary,
      backgroundColor:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.neutralLight
          : 'transparent',
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      fontSize: theme.typography.fontSizes.clamp4,
      fontWeight: theme.typography.fonts.medium.fontWeight,
      letterSpacing: theme.typography.letterSpacing.normal,
      lineHeight: theme.typography.lineHeights.tight,
    },
    caretDown: {
      color:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.white
          : theme.palette.neutralPrimary,
      fontSize: theme.typography.fontSizes.clamp3,
    },
    dropdownItemSelected: {
      backgroundColor:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.themeDark
          : theme.palette.themeLighter,
      color:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.white
          : theme.palette.neutralPrimary,
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      selectors: {
        ':hover': {
          backgroundColor:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.themeDarker
              : theme.palette.themeLight,
        },
      },
    },
    dropdownItem: {
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      fontSize: theme.typography.fontSizes.clamp4,
      fontWeight: theme.typography.fonts.medium.fontWeight,
      letterSpacing: theme.typography.letterSpacing.normal,
      color:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.white
          : theme.palette.neutralPrimary,
      backgroundColor:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.neutralLight
          : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      selectors: {
        ':hover': {
          backgroundColor: disabled
            ? 'transparent'
            : theme.isInverted ||
                theme.themeMode === 'dark' ||
                theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralQuaternary
              : theme.palette.neutralLighter,
          color:
            theme.isInverted ||
            theme.themeMode === 'dark' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.white
              : theme.palette.neutralPrimary,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
      },
    },
    dropdownItemHeader: {
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      fontSize: theme.typography.fontSizes.clamp4,
      fontWeight: theme.typography.fontWeights.semiBold as 600,
      color:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.neutralSecondary
          : theme.palette.neutralSecondary,
      backgroundColor:
        theme.isInverted ||
        theme.themeMode === 'dark' ||
        theme.themeMode === 'grayscale-dark'
          ? theme.palette.neutralLight
          : 'transparent',
    },
    errorMessage: {
      color: theme.semanticColors.errorText,
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      fontSize: theme.typography.fontSizes.clamp3,
    },
  };

  return disabled && disabledTooltip ? (
    <FluentTooltip content={disabledTooltip}>
      <Dropdown
        label={label}
        options={options}
        defaultSelectedKey={defaultSelectedKey}
        onChange={onChange}
        styles={{ ...dropdownStyles, ...styles }}
        disabled={disabled}
      />
    </FluentTooltip>
  ) : (
    <Dropdown
      label={label}
      options={options}
      defaultSelectedKey={defaultSelectedKey}
      onChange={onChange}
      styles={{ ...dropdownStyles, ...styles }}
      disabled={disabled}
    />
  );
};

export default FluentDropdown;
