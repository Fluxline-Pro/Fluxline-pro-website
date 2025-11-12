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

  const cardStyle = (): React.CSSProperties => ({
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
    borderRadius: theme.borderRadius.container.small,
    padding: variant === 'compact' ? '1rem' : '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    opacity: isHovered ? 1 : 0.85,
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? theme.shadows.s : 'none',
    height: variant === 'compact' ? '100%' : 'auto',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '180px',
  });

  return (
    <div
      key={whitePage.id}
      style={cardStyle()}
      onClick={() => onClick(whitePage)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <Typography
          variant='h3'
          color={theme.palette.neutralPrimary}
          marginBottom='0.5rem'
          fontSize={theme.typography.fontSizes.clamp4}
        >
          {whitePage.title}
        </Typography>
        <Typography
          variant='p'
          color={theme.palette.neutralSecondary}
          fontSize='0.9rem'
          marginBottom='0.5rem'
        >
          {whitePage.description}
        </Typography>
      </div>
      {actionText && (
        <Typography
          variant='h6'
          color={theme.palette.themeSecondary}
          fontSize='1rem'
          marginTop='1rem'
          fontWeight={700}
          style={{
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.3s ease',
          }}
        >
          📄 {actionText} ➤
        </Typography>
      )}
    </div>
  );
};

export default WhitePageCard;
