import React from 'react';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { Typography } from '../../typography/typography';
import { WhitePageItem } from '../../../../pages/white-pages/white-pages-constants';

interface WhitePageCardProps {
  whitePage: WhitePageItem;
  isHovered: boolean;
  onClick: (whitePage: WhitePageItem) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  variant?: 'default' | 'compact';
  isPdf?: boolean; // Whether this item links to a PDF
  context?: 'whitepaper' | 'legal'; // Context to determine the display text
}

export const WhitePageCard: React.FC<WhitePageCardProps> = ({
  whitePage,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
  variant = 'default',
  isPdf = true, // Default to true for backward compatibility
  context = 'whitepaper', // Default context
}) => {
  const { theme } = useAppTheme();

  // Determine the action text based on context and PDF status
  const getActionText = () => {
    if (!isPdf) {
      return null; // Don't show action text for non-PDF items
    }

    return context === 'legal' ? 'View PDF' : 'View White Paper';
  };

  const actionText = getActionText();

  const cardStyle = () => ({
    backgroundColor:
      theme.themeMode === 'high-contrast'
        ? theme.palette.neutralDark
        : theme.palette.neutralLight,
    borderRadius: theme.borderRadius.container.button,
    padding: variant === 'compact' ? '1.25rem' : '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `2px solid ${isHovered ? theme.palette.themePrimary : 'transparent'}`,
    boxShadow: isHovered ? theme.shadows.xl : theme.shadows.card,
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    height: variant === 'compact' ? '100%' : 'auto',
  });

  return (
    <div
      key={whitePage.id}
      style={cardStyle()}
      onClick={() => onClick(whitePage)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Typography
        variant='h3'
        color={theme.palette.themePrimary}
        marginBottom='0.5rem'
        fontSize={theme.typography.fontSizes.clamp5}
      >
        {whitePage.title}
      </Typography>
      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        fontSize='0.95rem'
        marginBottom={variant === 'compact' ? '1rem' : '0'}
      >
        {whitePage.description}
      </Typography>
      {actionText && (
        <Typography
          variant='p'
          color={theme.palette.themePrimary}
          marginTop={variant === 'compact' ? '0.5rem' : '1rem'}
          fontWeight='600'
          fontSize='0.9rem'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span role='img' aria-label='Document'>
            📄
          </span>{' '}
          {actionText}
        </Typography>
      )}
    </div>
  );
};

export default WhitePageCard;
