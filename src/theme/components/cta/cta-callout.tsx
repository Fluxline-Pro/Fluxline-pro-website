import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../typography/typography';
import { Container } from '../../layouts/Container';
import { useIsMobile, useDeviceOrientation } from '../../hooks/useMediaQuery';

export interface CTACalloutProps {
  variant: 'services' | 'legal' | 'consultation' | 'getStarted';
  currentView?: string;
  showOnlyFor?: string[]; // Which views to show this CTA on
  hideBottomHR?: boolean; // Option to hide the bottom HR when stacking CTAs
}

export const CTACallout: React.FC<CTACalloutProps> = ({
  variant,
  currentView,
  showOnlyFor = ['about'],
  hideBottomHR = false,
}) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const orientation = useDeviceOrientation();
  // Only show for specified views
  if (showOnlyFor.length > 0 && !showOnlyFor.includes(currentView || '')) {
    return null;
  }

  // CTA configuration consts
  const ARROW_ICON = '➤';
  const BOOKINGS_URL = 'https://outlook.office.com/book/Bookings@terencewaters.com';

  // Configuration based on variant
  const config = {
    services: {
      title: 'Explore Our Services',
      description:
        'Discover how we can help transform your vision into reality',
      icon: ARROW_ICON,
      route: '/services',
      isExternal: false,
    },
    legal: {
      title: 'Legal & Reference Documents',
      description: 'Access our policies, terms, and important legal documents',
      icon: ARROW_ICON,
      route: '/legal',
      isExternal: false,
    },
    consultation: {
      title: "Let's Make Your Vision Happen!",
      description:
        'Book a free consultation to discuss your project estimates, training, consulting, or development needs',
      icon: ARROW_ICON,
      route: BOOKINGS_URL,
      isExternal: true,
    },
    getStarted: {
      title: 'Ready to Get Started?',
      description:
        "We'd love to help you with your next project! Click this button to book a free, no obligation consultation with us to discuss your vision and needs.",
      icon: ARROW_ICON,
      route: BOOKINGS_URL,
      isExternal: true,
    },
  };

  const currentConfig = config[variant];

  const hrStyles = {
    margin:
      isMobile || orientation === 'mobile-landscape' ? '1.5rem 0' : '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };

  const ctaContainerStyle = {
    textAlign: 'center' as const,
    background:
      theme.themeMode === 'high-contrast'
        ? theme.palette.neutralDark
        : theme.palette.neutralLight,
    borderRadius: '8px',
    borderLeft: `6px solid ${theme.semanticColors.messageText}`, // Mythic Gold color
    maxWidth: '800px',
    margin:
      isMobile || orientation === 'mobile-landscape' ? '1rem auto' : '2rem auto',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? theme.shadows.xl : theme.shadows.card,
  };

  const iconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? '36px' : '52px',
    height: isMobile ? '36px' : '48px',
    backgroundColor: theme.palette.themePrimary,
    borderRadius: '50%',
    marginRight: isMobile ? undefined : '1rem',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
  };

  const handleClick = () => {
    if (currentConfig.isExternal) {
      window.open(currentConfig.route, '_blank', 'noopener,noreferrer');
    } else {
      navigate(currentConfig.route);
    }
  };

  return (
    <>
      <hr style={hrStyles} />
      <Container
        padding={isMobile || orientation === 'mobile-landscape' ? '1.5rem 1rem' : '2rem 1rem'}
        marginBottom='3rem'
        style={ctaContainerStyle}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Container
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Container
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            paddingRight={isMobile ? '1rem' : '3rem'}
          >
            <Typography
              variant='h3'
              color={theme.palette.themePrimary}
              fontSize={theme.typography.fontSizes.clamp6}
              textAlign='left'
              style={{
                textTransform: 'none',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {currentConfig.title}
            </Typography>
            <Typography
              variant='p'
              color={theme.palette.neutralPrimary}
              marginTop='0.5rem'
              textAlign='left'
              fontSize={theme.typography.fontSizes.clamp4}
              style={{
                opacity: 0.8,
              }}
            >
              {currentConfig.description}
            </Typography>
          </Container>
          <Container style={iconStyle}>
            <span
              style={{
                color: theme.palette.neutralLight,
                fontSize: isMobile ? '1.25rem' : '1.75rem',
              }}
            >
              {currentConfig.icon}
            </span>
          </Container>
        </Container>
      </Container>
      {!hideBottomHR && <hr style={hrStyles} />}
    </>
  );
};

export default CTACallout;
