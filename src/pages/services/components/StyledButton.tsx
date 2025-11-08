import React from 'react';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

/**
 * Reusable styled button component to reduce inline styling
 */
export const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  style = {},
}) => {
  const { theme } = useAppTheme();

  const getButtonStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: 'bold' as const,
      fontFamily: theme.typography.fonts.body.fontFamily,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const variantStyles = {
      primary: {
        background: theme.palette.themeSecondary,
        color: theme.palette.white,
      },
      secondary: {
        background: theme.palette.themePrimary,
        color: theme.palette.white,
      },
    };

    const sizeStyles = {
      small: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
      },
      medium: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
      },
      large: {
        padding: '1.25rem 2.5rem',
        fontSize: '1.2rem',
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.background =
      variant === 'primary'
        ? theme.palette.themeDark
        : theme.palette.themeDarker;
    button.style.transform = 'translateY(-2px)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.background =
      variant === 'primary'
        ? theme.palette.themeSecondary
        : theme.palette.themePrimary;
    button.style.transform = 'translateY(0)';
  };

  return (
    <button
      style={getButtonStyles()}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};
