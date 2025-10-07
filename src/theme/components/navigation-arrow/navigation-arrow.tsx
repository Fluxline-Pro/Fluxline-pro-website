import React, { useState } from 'react';
import { mergeStyles } from '@fluentui/react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface NavigationArrowProps {
  direction: 'forward' | 'backward';
  navigate: () => void;
  size?: 'small' | 'medium' | 'large';
  showBackground?: boolean;
  style?: React.CSSProperties;
}

export const NavigationArrow: React.FC<NavigationArrowProps> = ({
  direction,
  navigate,
  size = 'medium',
  showBackground = false,
  style
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate sizes based on the size prop
  const getSizes = () => {
    switch (size) {
      case 'small':
        return {
          width: '24px',
          height: '24px',
          viewBox: '0 0 24 24',
          containerPadding: theme.spacing.xs,
          translateAmount: direction === 'backward' ? '-4px' : '4px',
          hoverTranslateAmount: direction === 'backward' ? '-8px' : '8px',
        };
      case 'large':
        return {
          width: '48px',
          height: '48px',
          viewBox: '0 0 24 24',
          containerPadding: theme.spacing.s,
          translateAmount: direction === 'backward' ? '-6px' : '6px',
          hoverTranslateAmount: direction === 'backward' ? '-10px' : '10px',
        };
      case 'medium':
      default:
        return {
          width: '36px',
          height: '36px',
          viewBox: '0 0 24 24',
          containerPadding: theme.spacing.xs,
          translateAmount: direction === 'backward' ? '-4px' : '4px',
          hoverTranslateAmount: direction === 'backward' ? '-8px' : '8px',
        };
    }
  };

  const sizes = getSizes();

  // Define styles using Fluent UI's `mergeStyles`
  const arrowClass = mergeStyles({
    cursor: 'pointer',
    transform: `translateX(${sizes.translateAmount})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: showBackground ? sizes.containerPadding : '0',
    borderRadius: '4px',
    paddingLeft: style?.paddingLeft || isMobile ? undefined : '5rem',
    backgroundColor: showBackground
      ? isHovered
        ? theme.palette.neutralLight
        : 'transparent'
      : 'transparent',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
    ':hover': {
      transform: `translateX(${sizes.hoverTranslateAmount})`,
      backgroundColor: showBackground
        ? theme.palette.neutralLight
        : 'transparent',
    },
  });

  // Get path data based on direction
  const getPathData = () => {
    // Original SVG path for forward direction: 'M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z'
    // For backward direction, we'll flip it horizontally
    return direction === 'forward'
      ? 'M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z'
      : 'M12 4L13.41 5.41L7.83 11H20V13H7.83L13.41 18.59L12 20L4 12L12 4Z';
  };

  return (
    <div
      onClick={navigate}
      className={arrowClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role='button'
      aria-label={`${direction === 'forward' ? 'Forward' : 'Back'} navigation arrow`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      }}
    >
      <svg
        width={sizes.width}
        height={sizes.height}
        viewBox={sizes.viewBox}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d={getPathData()}
          fill={
            isHovered
              ? theme.palette.themeSecondary
              : theme.palette.themePrimary
          }
          style={{ transition: 'fill 0.3s ease-in-out' }}
        />
      </svg>
    </div>
  );
};

export default NavigationArrow;
