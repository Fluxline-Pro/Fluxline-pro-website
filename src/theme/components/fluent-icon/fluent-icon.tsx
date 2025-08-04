import React from 'react';
import { Icon } from '@fluentui/react';
import { mergeStyles, IStyle } from '@fluentui/merge-styles';

import { useAppTheme } from '../../hooks/useAppTheme';

export interface FluentIconProps {
  iconName:
    | string
    | React.FC<{
        isDarkMode?: boolean;
        className?: string;
        style?: React.CSSProperties;
      }>;
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
  color?: string;
  className?: string;
  style?: IStyle;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  isDarkMode?: boolean;
}

const sizeMap = {
  xSmall: '12px',
  small: '16px',
  medium: '24px',
  large: '32px',
  xLarge: '48px',
};

export const FluentIcon: React.FC<FluentIconProps> = ({
  iconName,
  size = 'medium',
  color,
  className,
  style,
  variant,
  isDarkMode,
}) => {
  const { theme } = useAppTheme();

  const getVariantColor = () => {
    switch (variant) {
      case 'primary':
        return theme.palette.themePrimary;
      case 'secondary':
        return theme.palette.themeSecondary;
      case 'success':
        return theme.palette.green;
      case 'warning':
        return theme.palette.yellow;
      case 'error':
        return theme.palette.red;
      case 'info':
        return theme.palette.blue;
      default:
        return color;
    }
  };

  const iconStyles: IStyle = Object.assign(
    {
      width: sizeMap[size],
      height: sizeMap[size],
      fontSize: sizeMap[size],
      color: getVariantColor(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    style
  );

  // If iconName is a custom SVG component
  if (typeof iconName === 'function') {
    const CustomIcon = iconName;
    return (
      <CustomIcon
        isDarkMode={isDarkMode}
        className={mergeStyles(iconStyles, className)}
        style={{ width: sizeMap[size], height: sizeMap[size] }}
      />
    );
  }

  // If iconName is a string (Fluent UI icon name)
  return (
    <Icon
      iconName={iconName as string}
      className={mergeStyles(iconStyles, className)}
    />
  );
};
