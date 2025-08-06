import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { FadeUp } from '../../animations';

export interface BaseCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  elevation?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  padding?: string;
  margin?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
  isMobile?: boolean; // Optional prop to handle mobile-specific styles
  isTablet?: boolean; // Optional prop to handle tablet-specific styles
  selected?: boolean;
  delay?: number;
}

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  onClick,
  className = '',
  style,
  elevation = 'medium',
  interactive = true,
  padding,
  margin,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  width,
  height,
  isMobile,
  isTablet,
  fullWidth = true,
  selected = false,
  delay = 0,
}) => {
  const { theme } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();

  const getElevation = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return theme.effects.elevation4;
      case 'medium':
        return theme.effects.elevation8;
      case 'high':
        return theme.effects.elevation16;
      default:
        return theme.effects.elevation8;
    }
  };

  const baseCardClass = mergeStyles({
    backgroundColor: theme.semanticColors.bodyBackground,
    borderRadius: 0, // Hard edges as requested
    boxShadow: getElevation(elevation),
    border: selected ? `2px solid ${theme.palette.themePrimary}` : 'none',
    overflow: 'hidden',
    position: 'relative',
    padding: padding || '0', // Default to no padding for content cards
    margin: margin || '0', // Default to no margin for content cards
    maxWidth: fullWidth ? '100%' : maxWidth,
    maxHeight: maxHeight,
    minWidth: minWidth,
    minHeight: minHeight,
    width: width || '100%',
    height: height || 'auto',
    overflowY: 'auto',
    overflowX: 'hidden',
    cursor: interactive && onClick ? 'pointer' : 'default',
    transition: shouldReduceMotion ? 'none' : 'all 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    selectors: {
      '&:hover':
        interactive && onClick && !shouldReduceMotion
          ? {
              boxShadow: theme.effects.elevation16,
              transform: 'translateY(-2px)',
            }
          : {},
      '&:active':
        interactive && onClick && !shouldReduceMotion
          ? {
              transform: 'translateY(0)',
              boxShadow: getElevation(elevation),
            }
          : {},
    },
  });

  const combinedClassName = `${baseCardClass} ${className}`;

  return (
    <FadeUp duration={0.4} distance={16} delay={delay}>
      <div
        className={combinedClassName}
        onClick={onClick}
        style={style}
        {...(onClick && { role: 'button' })}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
      >
        {children}
      </div>
    </FadeUp>
  );
};

export default BaseCard;
