import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../typography/typography';

export interface CTACalloutProps {
  variant: 'services' | 'legal';
  currentView?: string;
  showOnlyFor?: string[]; // Which views to show this CTA on
}

export const CTACallout: React.FC<CTACalloutProps> = ({
  variant,
  currentView,
  showOnlyFor = ['about'],
}) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Only show for specified views
  if (showOnlyFor.length > 0 && !showOnlyFor.includes(currentView || '')) {
    return null;
  }

  // Configuration based on variant
  const config = {
    services: {
      title: 'Explore Our Services',
      description:
        'Discover how we can help transform your vision into reality',
      icon: '➤',
      route: '/services',
    },
    legal: {
      title: 'Legal & Reference Documents',
      description: 'Access our policies, terms, and important legal documents',
      icon: '➤',
      route: '/legal',
    },
  };

  const currentConfig = config[variant];

  const hrStyles = {
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };

  const ctaContainerStyle = {
    textAlign: 'center' as const,
    padding: '2rem',
    background:
      theme.themeMode === 'high-contrast'
        ? theme.palette.neutralDark
        : theme.palette.neutralLight,
    borderRadius: '8px',
    borderLeft: `6px solid ${theme.semanticColors.messageText}`, // Mythic Gold color
    maxWidth: '800px',
    marginBottom: '3rem',
    margin: '2rem auto',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? theme.shadows.xl : theme.shadows.card,
  };

  const iconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: theme.palette.themePrimary,
    borderRadius: '50%',
    marginLeft: '1rem',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
  };

  const handleClick = () => {
    navigate(currentConfig.route);
  };

  return (
    <>
      <hr style={hrStyles} />
      <div
        style={ctaContainerStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='h3'
            color={theme.palette.themePrimary}
            fontSize={theme.typography.fontSizes.clamp6}
            style={{
              fontStyle: 'italic',
              textTransform: 'none',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {currentConfig.title}
          </Typography>
          <div style={iconStyle}>
            <span
              style={{
                color: theme.palette.black,
                fontSize: '24px',
              }}
            >
              {currentConfig.icon}
            </span>
          </div>
        </div>
        <Typography
          variant='p'
          color={theme.palette.neutralPrimary}
          marginTop='0.5rem'
          fontSize={theme.typography.fontSizes.clamp4}
          style={{
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          {currentConfig.description}
        </Typography>
      </div>
      <hr style={hrStyles} />
    </>
  );
};

export default CTACallout;
