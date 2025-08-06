import React, { Children, cloneElement, isValidElement } from 'react';
import { motion } from 'framer-motion';

export interface StaggeredContainerProps {
  children: React.ReactNode;
  stagger?: number;
  initialDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  stagger = 0.1,
  initialDelay = 0,
  className = '',
  style,
}) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className={className} style={style}>
      {childrenArray.map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        // Calculate delay: initial delay + (index * stagger)
        const delay = initialDelay + index * stagger;

        // Check if the child is already an animation component
        const isAnimationComponent =
          child.type &&
          typeof child.type === 'function' &&
          (child.type.name === 'FadeUp' ||
            child.type.name === 'FadeSlideIn' ||
            child.type.name === 'FadeIn');

        if (isAnimationComponent) {
          // If it's already an animation component, clone it with the delay
          return cloneElement(child, {
            key: index,
            delay: delay,
            ...(child.props as any),
          });
        }

        // If it's not an animation component, wrap it in a motion.div with stagger
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: delay,
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export interface StaggeredGridProps {
  children: React.ReactNode;
  stagger?: number;
  initialDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  columns?: number;
  gap?: string;
}

export const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  stagger = 0.1,
  initialDelay = 0,
  className = '',
  style,
  columns = 3,
  gap = '1rem',
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap,
    ...style,
  };

  return (
    <StaggeredContainer
      stagger={stagger}
      initialDelay={initialDelay}
      className={className}
      style={gridStyle}
    >
      {children}
    </StaggeredContainer>
  );
};

export default StaggeredContainer;
