import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * LayoutGrid is a specialized component for creating grid and flex layouts.
 * Use this component when you need:
 * - Complex grid layouts with specific column configurations
 * - Container queries for responsive design
 * - Advanced layout positioning and alignment
 *
 * @example
 * <LayoutGrid
 *   display="grid"
 *   templateColumns="repeat(12, 1fr)"
 *   gap="1rem"
 *   containerType="inline-size"
 * >
 *   <div>Content</div>
 * </LayoutGrid>
 */
export interface LayoutGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number | string;
  gap?: string;
  fullWidth?: boolean;
  templateColumns?: string;
  direction?: 'ltr' | 'rtl';
  position?: React.CSSProperties['position'];
  top?: number | string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  padding?: number | string;
  margin?: number | string;
  display?: 'grid' | 'flex';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  flexWrap?: React.CSSProperties['flexWrap'];
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  containerType?: 'inline-size' | 'size' | 'normal';
  containerName?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  containerQuery?: {
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
  };
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({
  children,
  className = '',
  columns = 12,
  gap = '1rem',
  fullWidth = false,
  templateColumns,
  direction,
  position,
  top,
  right,
  left,
  bottom,
  height,
  width,
  style,
  padding,
  margin,
  display = 'grid',
  flexDirection = 'row',
  alignItems = 'stretch',
  justifyContent = 'center',
  flexWrap = 'nowrap',
  flexGrow,
  flexShrink,
  flexBasis,
  containerType = 'inline-size',
  containerName = 'grid',
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  size,
  containerQuery,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const location = useLocation();

  // Auto-scroll to top on navigation if not already at top
  React.useEffect(() => {
    const scrollToTop = () => {
      // Check if the page is not at the top (with small tolerance for precision)
      if (window.scrollY > 5) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    };

    // Small delay to ensure the route has fully changed
    const timer = setTimeout(scrollToTop, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);
  const containerStyle: React.CSSProperties = {
    display,
    gap,
    containerType,
    containerName,
    minWidth: containerQuery?.minWidth || minWidth,
    maxWidth: containerQuery?.maxWidth || maxWidth,
    minHeight: containerQuery?.minHeight || minHeight,
    maxHeight: containerQuery?.maxHeight || maxHeight,
    position: position as React.CSSProperties['position'],
    top,
    right,
    left,
    bottom,
    height,
    width: fullWidth ? '100%' : width,
    margin,
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    flexGrow,
    flexShrink,
    flexBasis,
    boxSizing: 'border-box',
    ...(position === 'fixed' && {
      overflow: 'hidden',
      maxHeight: '100vh',
      maxWidth: '100vw',
      boxSizing: 'border-box',
    }),
    ...style,
  };

  // Handle padding separately to avoid conflicts with style object
  if (
    padding &&
    !style?.paddingTop &&
    !style?.paddingRight &&
    !style?.paddingBottom &&
    !style?.paddingLeft
  ) {
    containerStyle.padding = padding;
  }

  if (size) {
    containerStyle.minWidth = `clamp(10cqi, 20cqi, 30cqi)`;
    switch (size) {
      case 'xs':
        containerStyle.minWidth = `clamp(10cqi, 20cqi, 30cqi)`;
        break;
      case 'sm':
        containerStyle.minWidth = `clamp(20cqi, 30cqi, 40cqi)`;
        break;
      case 'md':
        containerStyle.minWidth = `clamp(30cqi, 40cqi, 50cqi)`;
        break;
      case 'lg':
        containerStyle.minWidth = `clamp(40cqi, 50cqi, 60cqi)`;
        break;
      case 'xl':
        containerStyle.minWidth = `clamp(50cqi, 60cqi, 70cqi)`;
        break;
      case 'xxl':
        containerStyle.minWidth = `clamp(60cqi, 70cqi, 80cqi)`;
        break;
    }
  }

  if (display === 'grid') {
    // Grid-specific styles
    if (templateColumns) {
      containerStyle.gridTemplateColumns = templateColumns;
    } else if (typeof columns === 'number') {
      containerStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    } else {
      containerStyle.gridTemplateColumns = columns;
    }
  } else {
    // Flex-specific styles
    containerStyle.flexDirection = flexDirection;
    containerStyle.alignItems = alignItems;
    containerStyle.justifyContent = justifyContent;
    containerStyle.flexWrap = flexWrap;
    containerStyle.position = position as React.CSSProperties['position'];
    if (flexGrow !== undefined) containerStyle.flexGrow = flexGrow;
    if (flexShrink !== undefined) containerStyle.flexShrink = flexShrink;
    if (flexBasis !== undefined) containerStyle.flexBasis = flexBasis;
  }

  return (
    <div
      className={`layout-grid ${className}`}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
