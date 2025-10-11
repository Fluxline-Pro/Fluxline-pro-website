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
            ? theme.semanticColors.errorBackground
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
            ? theme.palette.themeSecondary
            : theme.themeMode === 'grayscale-dark'
              ? theme.palette.neutralQuaternary
            : theme.palette.themeSecondary;
      case 'secondary':
        if (theme.themeMode === 'protanopia') {
          return theme.palette.themePrimary;
        }
        return theme.palette.themeDarker;
      case 'tertiary':
        return theme.palette.themeDarker;
      case 'success':
        return theme.themeMode === 'protanopia'
          ? theme.palette.neutralDark
          : theme.palette.neutralDark;
      case 'error':
        if (theme.themeMode === 'protanopia') {
          return theme.palette.neutralDark;
        }
        if (theme.themeMode === 'light' || theme.themeMode === 'dark') {
          return theme.semanticColors.errorBackground;
        }
        if (theme.themeMode === 'grayscale-dark') {
          return theme.palette.neutralQuaternary;
        }
        return theme.palette.neutralDark;
      case 'warning':
        return theme.palette.neutralDark;
      case 'info':
        return theme.palette.themeDarker;
      default:
        return theme.isInverted
          ? theme.palette.themeDarker
          : theme.palette.themeDarker;
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

  const getStrongHoverColor = (variant: string) => {
    if (
      theme.themeMode === 'deuteranopia' ||
      theme.themeMode === 'protanopia'
    ) {
      if (variant === 'error') return theme.semanticColors.errorText;
      // For navigation/primary, use themePrimary
      return theme.palette.themePrimary;
    }
    return getColorFromVariant(variant);
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
          : isOutlined
            ? {
                backgroundColor: getStrongHoverColor(variant),
                color: theme.palette.white,
                border: `1px solid ${getStrongHoverColor(variant)}`,
                animation: 'none',
              }
            : {
                backgroundColor: getLighterColor(variant),
                color: theme.isInverted
                  ? theme.palette.black
                  : theme.palette.white,
                border: `1px solid ${getLighterColor(variant)}`,
                animation: 'none',
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
            ':hover': isOutlined
              ? {
                  backgroundColor: getStrongHoverColor(variant),
                  color: theme.palette.white,
                  border: `1px solid ${getStrongHoverColor(variant)}`,
                }
              : {
                  backgroundColor: `${getLighterColor(variant)} !important`,
                  color: `${theme.palette.white} !important`,
                  border: `1px solid ${getLighterColor(variant)} !important`,
                },
          },
        },
        '&.ms-Button': {
          selectors: {
            ':hover': isOutlined
              ? {
                  backgroundColor: getColorFromVariant(variant),
                  color:
                    variant === 'warning'
                      ? theme.palette.black
                      : theme.palette.white,
                  border: `1px solid ${getColorFromVariant(variant)}`,
                }
              : {
                  backgroundColor: `${getLighterColor(variant)} !important`,
                  color: `${theme.palette.white} !important`,
                  border: `1px solid ${getLighterColor(variant)} !important`,
                },
          },
        },
      },
    },
    label: {
      fontWeight: theme.typography.fontWeights.regular as 400,
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
      {iconPosition === 'start' && icon && (
        <span
          className='ms-Button-icon'
          style={{ width: '1em', height: '1em' }}
        >
          <i
            className={`ms-Icon ms-Icon--${typeof icon === 'string' ? icon : (icon as IIconProps).iconName}`}
          />
        </span>
      )}
      {children || text}
      {iconPosition === 'end' && icon && (
        <span className='ms-Button-icon'>
          <i
            className={`ms-Icon ms-Icon--${typeof icon === 'string' ? icon : (icon as IIconProps).iconName}`}
            style={{ width: '1em', height: '1em' }}
          />
        </span>
      )}
    </ButtonComponent>
  );
};

export default FluentButton;
