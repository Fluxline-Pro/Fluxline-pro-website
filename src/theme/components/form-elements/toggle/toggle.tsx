import React from 'react';
import { Toggle, IToggleStyles, TooltipHost } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  displayAsRow?: boolean;
  disabled?: boolean;
  disabledTooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success';
}

export const FluentToggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  displayAsRow = false,
  disabled,
  disabledTooltip,
  className,
  style,
  variant = 'default',
}) => {
  const { theme, readingDirection } = useAppTheme();
  const { getThemedBackgroundColor, getThemedTextColor } = useThemeColor();

  const getHoverBackgroundColor = () => {
    if (theme.themeMode === 'high-contrast') {
      return checked
        ? getThemedBackgroundColor()
        : theme.palette.neutralTertiaryAlt;
    }

    // Special handling for colorblind modes
    if (
      ['protanopia', 'deuteranopia', 'tritanopia'].includes(theme.themeMode)
    ) {
      return checked
        ? theme.palette.neutralQuaternary // Use much lighter shade for checked state
        : theme.palette.neutralTertiaryAlt; // Light gray for unchecked
    }

    if (checked) {
      return theme.isInverted
        ? theme.palette.themeDarker // Darker in dark mode
        : theme.palette.themeDark; // Darker in light mode for better contrast
    }

    return theme.isInverted
      ? theme.palette.neutralQuaternary // Darker gray in dark mode
      : theme.palette.neutralQuaternaryAlt; // Darker gray in light mode
  };

  const toggleStyles: Partial<IToggleStyles> = {
    root: {
      backgroundColor: 'transparent',
      ...(displayAsRow
        ? {
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
          }
        : {}),
    },
    label: {
      color: theme.palette.neutralPrimary,
      textTransform: 'lowercase' as const,
      fontSize: theme.typography.fonts.medium.fontSize,
      fontWeight: theme.typography.fonts.medium.fontWeight,
      letterSpacing: theme.typography.fonts.medium.letterSpacing,
      fontFamily: theme.typography.fonts.medium.fontFamily,
      ...(displayAsRow ? { marginLeft: '0.5em' } : {}),
      ...((readingDirection === 'rtl' && displayAsRow)
        ? { marginRight: '0.5em' }
        : {}),
    },
    pill: {
      backgroundColor: checked
        ? getThemedBackgroundColor()
        : theme.isInverted
          ? theme.palette.black
          : theme.palette.neutralLight,
      selectors: {
        ':hover': {
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: disabled
            ? theme.palette.neutralTertiary
            : getHoverBackgroundColor(),
        },
        ':disabled': {
          backgroundColor: theme.palette.neutralTertiary,
          cursor: 'not-allowed',
        },
      },
    },
    thumb: {
      backgroundColor:
        theme.themeMode === 'high-contrast'
          ? theme.palette.white
          : theme.isInverted
            ? theme.palette.white
            : checked
              ? theme.palette.white
              : theme.palette.black,
      selectors: {
        '.ms-Toggle.is-disabled &': {
          backgroundColor:
            theme.themeMode === 'high-contrast'
              ? theme.palette.black
              : theme.palette.neutralSecondary,
        },
        ':hover': {
          backgroundColor:
            theme.themeMode === 'high-contrast'
              ? theme.palette.white
              : theme.isInverted
                ? theme.palette.white
                : checked
                  ? theme.palette.white
                  : theme.palette.black,
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', minWidth: '317px' }}>
      {disabledTooltip ? (
        <TooltipHost content={disabledTooltip}>
          <Toggle
            label={label}
            checked={checked}
            onChange={(ev, checked) => onChange(checked!)}
            disabled={disabled}
            className={className}
            color={getThemedTextColor()}
            styles={{ ...toggleStyles, ...style }}
          />
        </TooltipHost>
      ) : (
        <Toggle
          label={label}
          checked={checked}
          onChange={(ev, checked) => onChange(checked!)}
          disabled={disabled}
          className={className}
          color={getThemedTextColor()}
          styles={{ ...toggleStyles, ...style }}
        />
      )}
    </div>
  );
};

export default FluentToggle;
