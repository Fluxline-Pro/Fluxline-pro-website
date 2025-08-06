import React from 'react';

/**
 * ContentContainer is a general-purpose container for content wrapping and basic layout.
 * Use this component when you need:
 * - Simple content wrapping
 * - Basic layout with predefined sizes
 * - Consistent spacing and padding
 *
 * @example
 * <ContentContainer
 *   size="md"
 *   padding="2rem"
 *   fullWidth
 * >
 *   <div>Content</div>
 * </ContentContainer>
 */
export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type ContainerType = 'inline-size' | 'size' | 'normal';
export type DisplayType = 'grid' | 'flex';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type AlignItems = 'start' | 'center' | 'end' | 'stretch';
export type JustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  type?: ContainerType;
  display?: DisplayType;
  flexDirection?: FlexDirection;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  gap?: string;
  padding?: string;
  margin?: string;
  width?: string | number;
  height?: string | number;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  position?: React.CSSProperties['position'];
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  containerQuery?: {
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
  };
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className = '',
  size,
  type = 'inline-size',
  display = 'block',
  flexDirection = 'row',
  alignItems = 'stretch',
  justifyContent = 'start',
  gap,
  padding,
  margin,
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  position,
  top,
  right,
  bottom,
  left,
  fullWidth = false,
  fullHeight = false,
  containerQuery,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {

  // Get size-based styles
  const getSizeStyles = (size?: ContainerSize): React.CSSProperties => {
    if (!size) return {};

    const sizeMap: Record<ContainerSize, string> = {
      xs: 'clamp(10cqi, 20cqi, 30cqi)',
      sm: 'clamp(20cqi, 30cqi, 40cqi)',
      md: 'clamp(30cqi, 40cqi, 50cqi)',
      lg: 'clamp(40cqi, 50cqi, 60cqi)',
      xl: 'clamp(50cqi, 60cqi, 70cqi)',
      xxl: 'clamp(60cqi, 70cqi, 80cqi)',
    };

    return {
      minWidth: sizeMap[size],
      maxWidth: sizeMap[size],
    };
  };

  // Build container styles
  const containerStyle: React.CSSProperties = {
    display,
    position,
    top,
    right,
    bottom,
    left,
    width: fullWidth ? '100%' : width,
    height: fullHeight ? '100%' : height,
    minWidth: containerQuery?.minWidth || minWidth,
    maxWidth: containerQuery?.maxWidth || maxWidth,
    minHeight: containerQuery?.minHeight || minHeight,
    maxHeight: containerQuery?.maxHeight || maxHeight,
    padding,
    margin,
    gap,
    ...getSizeStyles(size),
    ...style,
  };

  // Add flex-specific styles
  if (display === 'flex') {
    containerStyle.flexDirection = flexDirection;
    containerStyle.alignItems = alignItems;
    containerStyle.justifyContent = justifyContent;
  }

  // Build class names
  const classes = React.useMemo(() => {
    const baseClasses = ['content-container'];
    if (className) baseClasses.push(className);
    if (size) baseClasses.push(`content-container-${size}`);
    if (type) baseClasses.push(`content-container-${type}`);
    if (display) baseClasses.push(`content-container-${display}`);
    return baseClasses.join(' ');
  }, [className, size, type, display]);

  return (
    <div
      className={classes}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
