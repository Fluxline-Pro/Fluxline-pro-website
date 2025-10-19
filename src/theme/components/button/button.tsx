import React from 'react';
import {
  PrimaryButton,
  DefaultButton,
  IconButton,
  IButtonProps,
  IButtonStyles,
  IIconProps,
} from '@fluentui/react';

// Store
import { useAppTheme } from '../../hooks/useAppTheme';

// Styles
import './button.scss';

interface ButtonProps extends Omit<IButtonProps, 'size'> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
  isOutlined?: boolean;
  isAnimated?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  className?: string;
  icon?: string | IIconProps;
  iconPosition?: 'start' | 'end';
  showIconOnly?: boolean;
  rotate?: number;
  text?: string;
  nudged?: boolean;
  fullWidth?: boolean;
}

export const FluentButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isOutlined = false,
  children,
  className,
  icon,
  iconPosition = 'start',
  showIconOnly = false,
  rotate = 0,
  text,
  isAnimated = false,
  isDisabled = false,
  isLoading = false,
  nudged = false,
  fullWidth = false,
  ...props
}) => {
  const { theme } = useAppTheme();
  const [removeNudge, setRemoveNudge] = React.useState(false);

  React.useEffect(() => {
    if (nudged) {
      setTimeout(() => setRemoveNudge(true), 500);
    }
  }, [nudged]);

  const getColorFromVariant = (variant: string) => {
    switch (variant) {
      case 'primary':
        return theme.themeMode === 'high-contrast'
          ? theme.palette.themePrimary
          : theme.themeMode === 'dark'
            ? theme.palette.themeTertiary
            : theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralTertiary
              : theme.palette.themePrimary;
      case 'secondary':
        return theme.palette.themeSecondary;
      case 'tertiary':
        return theme.palette.themeTertiary;
      case 'success':
        return theme.themeMode === 'protanopia'
          ? theme.palette.neutralQuaternaryAlt
          : theme.semanticColors.successText;
      case 'error':
        return theme.themeMode === 'protanopia'
          ? theme.palette.neutralQuaternary
          : theme.themeMode === 'dark'
            ? theme.semanticColors.errorText
            : theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralQuaternaryAlt
              : theme.semanticColors.errorText;
      case 'warning':
        return theme.semanticColors.warningText;
      case 'info':
        return theme.palette.themeTertiary;
      default:
        return theme.isInverted
          ? theme.palette.themeDark
          : theme.palette.themePrimary;
    }
  };

  const getLighterColor = (variant: string) => {
    if (isOutlined) {
      return getColorFromVariant(variant);
    }
    switch (variant) {
      case 'primary':
        return theme.themeMode === 'high-contrast'
          ? theme.palette.themeDarker
          : theme.themeMode === 'dark'
            ? theme.palette.themePrimary // Use primary for consistent hierarchy
            : theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralQuaternary
              : theme.palette.themeDark; // Darker blue for light mode
      case 'secondary':
        if (theme.themeMode === 'protanopia') {
          return theme.palette.themePrimary;
        }
        // Use tertiary as hover state for secondary - creates proper visual progression
        return theme.palette.themeTertiary;
      case 'tertiary':
        return theme.palette.themeSecondary; // Step up to secondary on hover
      case 'success':
        return theme.themeMode === 'protanopia'
          ? theme.palette.neutralQuaternary
          : theme.semanticColors.successText;
      case 'error':
        if (theme.themeMode === 'protanopia') {
          return theme.palette.neutralQuaternary;
        }
        return theme.semanticColors.errorText;
      case 'warning':
        return theme.semanticColors.warningText;
      case 'info':
        return theme.palette.themePrimary;
      default:
        return theme.isInverted
          ? theme.palette.themePrimary
          : theme.palette.themeDark;
    }
  };

  const getBorderStyle = () => {
    if (theme.themeMode === 'high-contrast') {
      return `4px solid ${getColorFromVariant(variant)}`;
    }
    if (isOutlined) {
      return `1px solid ${getColorFromVariant(variant)}`;
    }
    return '1px solid transparent';
  };

  const getBackgroundColor = () => {
    if (isOutlined) return 'transparent';
    if (variant === 'error') {
      if (theme.themeMode === 'protanopia') {
        return theme.palette.neutralQuaternary;
      }
      if (
        theme.themeMode === 'deuteranopia' ||
        theme.themeMode === 'tritanopia'
      ) {
        return theme.semanticColors.errorText;
      }
      return getColorFromVariant(variant);
    }
    return getColorFromVariant(variant);
  };

  const getTextColor = () => {
    if (isOutlined) {
      if (
        (variant === 'primary' || variant === 'secondary') &&
        theme.isInverted
      ) {
        return theme.palette.white;
      }
      if (variant === 'error') {
        return theme.isInverted
          ? theme.palette.white
          : theme.semanticColors.errorText;
      }
      if (theme.themeMode === 'grayscale-dark') {
        return theme.palette.white;
      }
      return getColorFromVariant(variant);
    }
    return theme.palette.white;
  };

  const getFontSize = () => 'clamp(1.25rem, 2.5vw, 1.5rem)';

  const getPadding = () => {
    switch (size) {
      case 'small':
        return '0.25rem 0.5rem';
      case 'large':
        return '10px 20px';
      default:
        return '8px 16px';
    }
  };

  const getShadow = () => {
    if (isOutlined) {
      return '0 0 0 1px rgba(0, 0, 0, 0.2)';
    }
    return '0 2px 4px rgba(0,0,0,0.08)';
  };

  const getTransform = () => {
    if (rotate !== 0) {
      return `rotate(${rotate}deg)`;
    }
    return 'none';
  };

  const getActiveTransform = () => {
    if (theme.themeMode === 'high-contrast') {
      return rotate !== 0 ? `rotate(${rotate}deg)` : 'none';
    }
    return rotate !== 0 ? `rotate(${rotate}deg) scale(0.98)` : 'scale(0.98)';
  };

  const getFontWeight = (): 400 | 500 | 600 => {
    switch (variant) {
      case 'primary':
        return theme.typography.fontWeights.semiBold as 600; // More prominent
      case 'secondary':
      case 'tertiary':
        return theme.typography.fontWeights.medium as 500; // Less prominent
      default:
        return theme.typography.fontWeights.regular as 400; // Default
    }
  };

  const getDisabledStyles = () => ({
    opacity: 0.5,
    backgroundColor: isOutlined
      ? 'transparent'
      : theme.themeMode === 'high-contrast'
        ? theme.palette.neutralTertiary
        : theme.palette.neutralLight,
    color: theme.palette.neutralTertiary,
    border: isOutlined ? `1px solid ${theme.palette.neutralTertiary}` : 'none',
    cursor: 'not-allowed',
  });

  const getHoverColor = (variant: string) => {
    // For outlined buttons, use the base color as background on hover
    if (isOutlined) {
      return getColorFromVariant(variant);
    }
    // For filled buttons, use the lighter color
    return getLighterColor(variant);
  };

  const buttonStyles: IButtonStyles = {
    root: {
      backgroundColor: getBackgroundColor(),
      color: getTextColor(),
      border: getBorderStyle(),
      transition: 'all 0.2s ease-in-out',
      fontFamily: theme.typography.fonts.medium.fontFamily,
      boxShadow: getShadow(),
      width: fullWidth ? '100%' : 'auto',
      fontSize: getFontSize(),
      transform: getTransform(),
      padding: getPadding(),
      animation:
        nudged && !removeNudge ? 'nudgeInKeyframes 0.5s ease-in-out' : 'none',
      selectors: {
        ':hover': isDisabled
          ? { cursor: 'not-allowed' }
          : {
              backgroundColor: getHoverColor(variant),
              color: theme.palette.white,
              border: `1px solid ${getHoverColor(variant)}`,
              animation: 'none',
              transform: 'translateY(-1px)', // Subtle lift effect
              boxShadow: theme.isInverted
                ? '0 4px 8px rgba(255,255,255,0.1)'
                : '0 4px 8px rgba(0,0,0,0.15)',
            },
        ':active': {
          backgroundColor:
            theme.themeMode === 'high-contrast'
              ? theme.palette.white
              : theme.isInverted
                ? theme.palette.themeDark
                : theme.palette.themeDarker,
          transform: getActiveTransform(),
          border:
            theme.themeMode === 'high-contrast'
              ? 'none'
              : `1px solid ${getColorFromVariant(variant)}`,
        },
        ':disabled': getDisabledStyles(),
        '&.ms-Button--primary': {
          backgroundColor: getBackgroundColor(),
          border: getBorderStyle(),
          selectors: {
            ':hover': {
              backgroundColor: `${getHoverColor(variant)} !important`,
              color: `${theme.palette.white} !important`,
              border: `1px solid ${getHoverColor(variant)} !important`,
              transform: 'translateY(-1px)',
              boxShadow: theme.isInverted
                ? '0 4px 8px rgba(255,255,255,0.1)'
                : '0 4px 8px rgba(0,0,0,0.15)',
            },
          },
        },
        '&.ms-Button': {
          selectors: {
            ':hover': {
              backgroundColor: `${getHoverColor(variant)} !important`,
              color: `${theme.palette.white} !important`,
              border: `1px solid ${getHoverColor(variant)} !important`,
              transform: 'translateY(-1px)',
              boxShadow: theme.isInverted
                ? '0 4px 8px rgba(255,255,255,0.1)'
                : '0 4px 8px rgba(0,0,0,0.15)',
            },
          },
        },
      },
    },
    label: {
      fontWeight: getFontWeight(),
      fontSize: 'inherit',
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    icon: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'inherit',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexDirection: iconPosition === 'end' ? 'row-reverse' : 'row',
    },
  };

  const iconProps: IIconProps | undefined =
    typeof icon === 'string' ? { iconName: icon } : icon;

  if (showIconOnly && icon) {
    return (
      <IconButton
        {...props}
        iconProps={iconProps}
        styles={buttonStyles}
        className={className}
      />
    );
  }

  const ButtonComponent = variant === 'primary' ? PrimaryButton : DefaultButton;

  return (
    <ButtonComponent
      {...props}
      iconProps={iconProps}
      styles={buttonStyles}
      className={className}
    >
      {children || text}
    </ButtonComponent>
  );
};

export default FluentButton;
