import React from 'react';

import { useDeviceOrientation } from '../hooks/useMediaQuery';
import { LayoutGrid } from './LayoutGrid';

interface DisplayGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    portrait?: number;
    landscape?: number;
    square?: number;
    mobileLandscape?: number;
  };
  gridTemplateColumns?: {
    portrait?: string;
    landscape?: string;
    square?: string;
    mobileLandscape?: string;
  };
  gap?: {
    portrait?: string;
    landscape?: string;
    square?: string;
    mobileLandscape?: string;
  };
  padding?: {
    portrait?: string;
    landscape?: string;
    square?: string;
    mobileLandscape?: string;
  };
  fullWidth?: boolean;
  nested?: boolean;
  style?: React.CSSProperties;
}

export const DisplayGrid: React.FC<DisplayGridProps> = ({
  children,
  className = '',
  columns = {
    portrait: 1,
    landscape: 12,
    square: 6,
    mobileLandscape: 8,
  },
  gridTemplateColumns = {
    portrait: undefined,
    landscape: undefined,
    square: undefined,
    mobileLandscape: undefined,
  },
  gap = {
    portrait: '1rem',
    landscape: '2rem',
    square: '1.5rem',
    mobileLandscape: '1rem',
  },
  padding = {
    portrait: '1rem',
    landscape: '2rem',
    square: '1.5rem',
    mobileLandscape: '1rem',
  },
  fullWidth = false,
  nested = false,
  style = {},
}) => {
  const orientation = useDeviceOrientation();

  // Get grid configuration based on orientation
  const gridConfig = React.useMemo(() => {
    const baseConfig = {
      display: 'grid' as const,
      width: fullWidth ? '100%' : 'auto',
      position: 'relative' as const,
    };

    switch (orientation) {
      case 'portrait': {
        // Use custom grid template if provided, otherwise use columns count
        const columnsTemplate =
          gridTemplateColumns?.portrait || `repeat(${columns.portrait}, 1fr)`;

        return {
          ...baseConfig,
          gridTemplateColumns: columnsTemplate,
          gap: gap.portrait,
          padding: nested ? '0' : padding.portrait,
          gridAutoRows: 'auto',
        };
      }
      case 'landscape':
      case 'ultrawide': {
        // Use custom grid template if provided, otherwise use columns count
        const columnsTemplate =
          gridTemplateColumns?.landscape || `repeat(${columns.landscape}, 1fr)`;

        return {
          ...baseConfig,
          gridTemplateColumns: columnsTemplate,
          gap: gap.landscape,
          padding: nested ? '0' : padding.landscape,
          gridAutoRows: 'auto',
        };
      }
      case 'square': {
        // Use custom grid template if provided, otherwise use columns count
        const columnsTemplate =
          gridTemplateColumns?.square || `repeat(${columns.square}, 1fr)`;

        return {
          ...baseConfig,
          gridTemplateColumns: columnsTemplate,
          gap: gap.square,
          padding: nested ? '0' : padding.square,
          gridAutoRows: 'auto',
        };
      }
      case 'mobile-landscape': {
        // Use custom grid template if provided, otherwise use columns count
        const columnsTemplate =
          gridTemplateColumns?.mobileLandscape ||
          `repeat(${columns.mobileLandscape}, 1fr)`;

        return {
          ...baseConfig,
          gridTemplateColumns: columnsTemplate,
          gap: gap.mobileLandscape,
          padding: nested ? '0' : padding.mobileLandscape,
          gridAutoRows: 'auto',
        };
      }
      default:
        return baseConfig;
    }
  }, [
    orientation,
    columns,
    gridTemplateColumns,
    gap,
    padding,
    fullWidth,
    nested,
  ]);

  // Build class names
  const classes = React.useMemo(() => {
    const baseClasses = ['display-grid', `display-grid-${orientation}`];
    if (className) baseClasses.push(className);
    if (nested) baseClasses.push('nested');
    return baseClasses.join(' ');
  }, [className, orientation, nested]);

  return (
    <LayoutGrid
      className={classes}
      style={{ ...gridConfig, ...style }}
      containerType='inline-size'
      containerName='display-grid'
    >
      {children}
    </LayoutGrid>
  );
};

// Grid Item component for consistent sizing and spacing
interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: {
    portrait?: number;
    landscape?: number;
    square?: number;
    mobileLandscape?: number;
  };
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'stretch';
  order?: number;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  className = '',
  span = {
    portrait: 1,
    landscape: 1,
    square: 1,
    mobileLandscape: 1,
  },
  align = 'stretch',
  justify = 'stretch',
  order = 0,
}) => {
  const orientation = useDeviceOrientation();

  const itemStyle = React.useMemo(() => {
    const baseStyle = {
      display: 'grid',
      alignItems: align,
      justifyContent: justify,
      order,
    };

    switch (orientation) {
      case 'portrait':
        return {
          ...baseStyle,
          gridColumn: `span ${span.portrait}`,
        };
      case 'landscape':
      case 'ultrawide':
        return {
          ...baseStyle,
          gridColumn: `span ${span.landscape}`,
        };
      case 'square':
        return {
          ...baseStyle,
          gridColumn: `span ${span.square}`,
        };
      case 'mobile-landscape':
        return {
          ...baseStyle,
          gridColumn: `span ${span.mobileLandscape}`,
        };
      default:
        return baseStyle;
    }
  }, [orientation, span, align, justify, order]);

  const classes = React.useMemo(() => {
    const baseClasses = ['grid-item', `grid-item-${orientation}`];
    if (className) baseClasses.push(className);
    return baseClasses.join(' ');
  }, [className, orientation]);

  return (
    <div className={classes} style={itemStyle}>
      {children}
    </div>
  );
};

// Example usage:
/*
// Example 1: Using columns count
<DisplayGrid
  columns={{
    portrait: 1,
    landscape: 12,
    square: 6,
    mobileLandscape: 8,
  }}
  gap={{
    portrait: '1rem',
    landscape: '2rem',
    square: '1.5rem',
    mobileLandscape: '1rem',
  }}
>
  <GridItem
    span={{
      portrait: 1,
      landscape: 4,
      square: 3,
      mobileLandscape: 4,
    }}
  >
    Content 1
  </GridItem>
  <GridItem
    span={{
      portrait: 1,
      landscape: 8,
      square: 3,
      mobileLandscape: 4,
    }}
  >
    Content 2
  </GridItem>
</DisplayGrid>

// Example 2: Using custom gridTemplateColumns
<DisplayGrid
  gridTemplateColumns={{
    portrait: '1fr',
    landscape: '2fr 1fr 3fr',
    square: 'repeat(3, 1fr)',
    mobileLandscape: 'minmax(100px, 1fr) 2fr',
  }}
  gap={{
    portrait: '1rem',
    landscape: '2rem',
    square: '1.5rem',
    mobileLandscape: '1rem',
  }}
>
  <GridItem>Content 1</GridItem>
  <GridItem>Content 2</GridItem>
  <GridItem>Content 3</GridItem>
</DisplayGrid>
*/
