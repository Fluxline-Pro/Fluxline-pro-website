import React from 'react';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type ContainerType = 'inline-size' | 'size' | 'normal';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  type?: ContainerType;
  display?: React.CSSProperties['display'];
  flexDirection?: React.CSSProperties['flexDirection'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignContent?: React.CSSProperties['alignContent'];
  position?: React.CSSProperties['position'];
  boxSizing?: string;
  gap?: string;
  gridRow?: string;
  gridColumn?: string;
  gridArea?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridTemplate?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  padding?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingTop?: string;
  paddingBottom?: string;
  width?: string | number;
  height?: string | number;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  tabIndex?: number;
  role?: string;
  containerQuery?: {
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
  };
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size,
  type = 'inline-size',
  display = 'block',
  flexDirection = 'row',
  alignItems = 'stretch',
  alignContent = 'normal',
  justifyContent = 'start',
  position,
  boxSizing,
  gap,
  gridRow,
  gridColumn,
  gridArea,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridTemplate,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  top,
  right,
  bottom,
  left,
  fullWidth = false,
  fullHeight = false,
  tabIndex,
  role,
  containerQuery,
  style,
  onClick,
  onKeyDown,
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
    boxSizing: boxSizing as React.CSSProperties['boxSizing'],
    width: fullWidth ? '100%' : width,
    height: fullHeight ? '100%' : height,
    minWidth: containerQuery?.minWidth || minWidth,
    maxWidth: containerQuery?.maxWidth || maxWidth,
    minHeight: containerQuery?.minHeight || minHeight,
    maxHeight: containerQuery?.maxHeight || maxHeight,
    alignContent: alignContent,
    // Apply padding props with higher specificity
    ...(padding && { padding }),
    ...(paddingLeft && { paddingLeft }),
    ...(paddingRight && { paddingRight }),
    ...(paddingTop && { paddingTop }),
    ...(paddingBottom && { paddingBottom }),
    // Apply margin props
    ...(margin && { margin }),
    ...(marginTop && { marginTop }),
    ...(marginBottom && { marginBottom }),
    ...(marginLeft && { marginLeft }),
    ...(marginRight && { marginRight }),
    gap,
    gridRow,
    gridColumn,
    gridArea,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gridTemplate,
    ...getSizeStyles(size),
    // Apply custom styles last to ensure they override everything
    ...style,
  };

  // Add flex-specific styles
  if (display === 'flex') {
    containerStyle.flexDirection = flexDirection;
    containerStyle.alignItems = alignItems;
    containerStyle.justifyContent = justifyContent;
    containerStyle.alignContent = alignContent;
  }

  // Build class names
  const classes = React.useMemo(() => {
    const baseClasses = ['container'];
    if (className) baseClasses.push(className);
    if (size) baseClasses.push(`container-${size}`);
    if (type) baseClasses.push(`container-${type}`);
    if (display) baseClasses.push(`container-${display}`);
    return baseClasses.join(' ');
  }, [className, size, type, display]);

  return (
    <div
      className={classes}
      style={containerStyle}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role={role || undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...(boxSizing ? { boxSizing } : {})}
    >
      {children}
    </div>
  );
};

export default Container;

// Example usage:
/*
<Container
  size="md"
  type="inline-size"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  gap="1rem"
  padding="2rem"
  fullWidth
>
  <div>Content</div>
</Container>
*/
