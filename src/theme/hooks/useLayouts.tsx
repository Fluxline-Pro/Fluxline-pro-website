import React from 'react';

import { useAppTheme } from './useAppTheme';
import { IExtendedTheme } from '../theme';

export type GridColumns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type GridLayout = 'standard' | 'reversed' | 'stacked' | 'centered';
export type ViewportSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface LayoutConfig {
  columns: GridColumns;
  layout: GridLayout;
  imagePosition: 'left' | 'right' | 'top' | 'bottom';
  spacing: keyof IExtendedTheme['spacing'];
}

interface UseLayoutOptions {
  defaultLayout?: GridLayout;
  defaultColumns?: GridColumns;
  respectLayoutPreference?: boolean;
}

export const useLayout = (options: UseLayoutOptions = {}) => {
  const { theme, layoutPreference, readingDirection } = useAppTheme();

  const [currentLayout, setCurrentLayout] = React.useState<LayoutConfig>({
    columns: options.defaultColumns || 12,
    layout: options.defaultLayout || 'standard',
    imagePosition: 'left',
    spacing: 'm',
  });

  // Get grid template based on columns
  const getGridTemplate = (columns: GridColumns) => {
    return `repeat(${columns}, minmax(0, 1fr))`;
  };

  // Get component-based size using clamp
  const getComponentSize = (size: ViewportSize) => {
    const sizes = {
      xs: 'clamp(10cqi, 20cqi, 30cqi)',
      sm: 'clamp(20cqi, 30cqi, 40cqi)',
      md: 'clamp(30cqi, 40cqi, 50cqi)',
      lg: 'clamp(40cqi, 50cqi, 60cqi)',
      xl: 'clamp(50cqi, 60cqi, 70cqi)',
      xxl: 'clamp(60cqi, 70cqi, 80cqi)',
    };
    return sizes[size];
  };

  // Get layout styles based on current config
  const getLayoutStyles = () => {
    const baseStyles = {
      display: 'grid',
      gridTemplateColumns: getGridTemplate(currentLayout.columns),
      gap: theme.spacing[currentLayout.spacing],
      width: '100%',
      maxWidth: '100%',
    };

    // Adjust for left-handed layout preference
    if (options.respectLayoutPreference && layoutPreference === 'left-handed') {
      return {
        ...baseStyles,
        direction: readingDirection,
        gridTemplateColumns: getGridTemplate(currentLayout.columns),
        imageContainer: {
          gridColumn:
            currentLayout.imagePosition === 'left' ? '10 / -1' : '1 / 4',
        },
        contentContainer: {
          gridColumn:
            currentLayout.imagePosition === 'left' ? '1 / 10' : '4 / -1',
        },
      };
    }

    // Standard layout styles
    return {
      ...baseStyles,
      direction: readingDirection,
      imageContainer: {
        gridColumn:
          currentLayout.imagePosition === 'left' ? '1 / 4' : '10 / -1',
      },
      contentContainer: {
        gridColumn:
          currentLayout.imagePosition === 'left' ? '4 / -1' : '1 / 10',
      },
    };
  };

  // Get responsive styles for different breakpoints
  const getResponsiveStyles = () => {
    return {
      [`@media screen and (maxWidth: ${theme.breakpoints.md}px)`]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
        imageContainer: {
          gridColumn: '1 / -1',
          gridRow: '1 / 2',
        },
        contentContainer: {
          gridColumn: '1 / -1',
          gridRow: '2 / 3',
        },
      },
    };
  };

  // Component-specific grid system
  const getComponentGrid = (size: ViewportSize) => {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${getComponentSize(size)}, 1fr))`,
      gap: theme.spacing.m,
    };
  };

  return {
    currentLayout,
    setCurrentLayout,
    getLayoutStyles,
    getResponsiveStyles,
    getComponentGrid,
    getComponentSize,
  };
};

// Example usage of layouts
/* import React from 'react';
import { useLayout } from '../theme/layouts/useLayouts';

// Main layout component
export const MainLayout: React.FC<{ 
  children: React.ReactNode;
  image: string;
  title: string;
  reversed?: boolean;
}> = ({ children, image, title, reversed }) => {
  const { getLayoutStyles, getResponsiveStyles } = useLayout({
    defaultColumns: 12,
    respectLayoutPreference: true
  });

  return (
    <div className={`main-layout ${reversed ? 'reversed' : ''}`}>
      <div className="image-container">
        <img src={image} alt={title} />
        <h1 className="title">{title}</h1>
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

// Component grid example
export const ComponentGrid: React.FC<{
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}> = ({ children, size = 'md' }) => {
  return (
    <div className={`component-grid ${size}`}>
      {children}
    </div>
  );
}; */
