import React from 'react';

import { useIsMobile, useIsTablet } from '../../../hooks/useMediaQuery';
import { LayoutGrid } from '../../../layouts/LayoutGrid';

export interface UnifiedCardContainerProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  viewType: 'grid' | 'small' | 'large';
}

export const UnifiedCardContainer: React.FC<UnifiedCardContainerProps> = ({
  children,
  className = '',
  gap = '1rem',
  viewType,
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const getGridConfig = () => {
    switch (viewType) {
      case 'grid':
        const columns = isMobile ? 2 : isTablet ? 3 : 4;
        return {
          display: 'grid' as const,
          templateColumns: `repeat(${columns}, 1fr)`,
          gap,
        };
      case 'small':
        return {
          display: 'grid' as const,
          templateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap,
        };
      case 'large':
        return {
          display: 'flex' as const,
          flexDirection: 'column' as const,
          gap,
        };
      default:
        return getGridConfig(); // fallback to grid
    }
  };

  const config = getGridConfig();

  if (viewType === 'large') {
    return (
      <div
        className={className}
        style={{
          display: config.display,
          flexDirection: config.flexDirection,
          gap: config.gap,
          width: '100%',
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <LayoutGrid
      display={config.display}
      templateColumns={config.templateColumns}
      gap={config.gap}
      className={className}
      fullWidth
    >
      {children}
    </LayoutGrid>
  );
};

export default UnifiedCardContainer;
