import React, { useState } from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { Container } from '../../../theme/layouts/Container';
import { Typography } from '../../../theme/components/typography/typography';

interface BulletPointProps {
  name: string;
  description: string;
  onClick?: () => void;
  isHoverable?: boolean;
}

export const BulletPoint: React.FC<BulletPointProps> = ({
  name,
  description,
  onClick,
  isHoverable = false,
}) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Generate styles for the bullet point circle
  const bulletStyle = {
    flexShrink: 0,
    marginTop: '0.25rem',
    padding: '0 !important',
    transition: 'transform 0.3s ease-in-out',
    transform:
      (isHovered || isFocused) && isHoverable ? 'scale(1.2)' : 'scale(1)',
  };

  // Generate a right arrow for clickable items
  const renderArrow = () => {
    if (isHoverable) {
      return (
        <div
          style={{
            flexShrink: 0,
            position: 'absolute',
            left: '-24px',
            opacity: isHovered || isFocused ? 0.9 : 0,
            transform:
              isHovered || isFocused ? 'translateX(0)' : 'translateX(-5px)',
            transition:
              'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            pointerEvents: 'none',
            width: '36px',
            height: '36px',
            zIndex: 10,
          }}
        >
          <svg
            width='36'
            height='36'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z'
              fill={theme.palette.themeSecondary}
            />
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'baseline',
        gap: theme.spacing.s,
        paddingLeft: '0',
        paddingRight: '0.75rem',
        cursor: isHoverable ? 'pointer' : 'default',
        padding: `${theme.spacing.s1} ${isHoverable ? theme.spacing.m : '0'} ${theme.spacing.s1} ${isHoverable ? theme.spacing.s : '0'}`,
        borderRadius: isHoverable ? '4px' : '0',
        backgroundColor: 'transparent',
        position: 'relative',
        transform:
          (isHovered || isFocused) && isHoverable
            ? 'translateX(6px)'
            : 'translateX(0)',
        transition:
          'transform 0.3s ease-in-out, background-color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        // Focus outline styles
        outline:
          isFocused && isHoverable
            ? `2px solid ${theme.palette.themePrimary}`
            : 'none',
        outlineOffset: '2px',
      }}
      tabIndex={isHoverable ? 0 : undefined}
      role={isHoverable ? 'button' : undefined}
      aria-label={isHoverable ? `Navigate to ${name}` : undefined}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (isHoverable && onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Render arrow before bullet point only if hoverable */}
      {isHoverable && renderArrow()}

      <div style={bulletStyle}>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            r='12'
            cx='12'
            cy='12'
            style={{
              fill: theme.palette.themePrimary,
              transition: 'fill 0.3s ease-in-out',
              ...((isHovered || isFocused) && isHoverable
                ? { fill: theme.palette.themeSecondary }
                : {}),
            }}
          />
        </svg>
      </div>

      <Container
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        gap={theme.spacing.xs}
        paddingLeft='0'
        paddingRight='0'
        style={{ flexGrow: 1 }}
      >
        <Typography
          variant='h5'
          textAlign='left'
          fontWeight={600}
          fontSize={theme.typography.fontSizes.clamp5}
          noHyphens
          style={{
            textDecoration:
              (isHovered || isFocused) && isHoverable ? 'underline' : 'none',
            textUnderlineOffset: '4px',
            transition:
              'color 0.3s ease-in-out, text-decoration 0.3s ease-in-out',
            color:
              (isHovered || isFocused) && isHoverable
                ? theme.palette.themeSecondary
                : theme.palette.themePrimary,
          }}
        >
          {name}
        </Typography>
        <Typography
          variant='p'
          textAlign='left'
          color={theme.palette.neutralPrimary}
          noHyphens
        >
          {description}
        </Typography>
      </Container>
    </div>
  );
};

export default BulletPoint;
