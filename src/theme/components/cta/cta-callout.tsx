import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../typography/typography';
import { Container } from '../../layouts/Container';
import { useIsMobile, useDeviceOrientation } from '../../hooks/useMediaQuery';

export interface CTACalloutProps {
  variant:
    | 'services'
    | 'legal'
    | 'consultation'
    | 'getStarted'
    | 'personalTraining'
    | 'aboutFluxline'
    | 'fluxlineEthos';
  currentView?: string;
  showOnlyFor?: string[]; // Which views to show this CTA on
  hideTopHR?: boolean; // Option to hide the top HR when stacking CTAs
  hideBottomHR?: boolean; // Option to hide the bottom HR when stacking CTAs
}

export const CTACallout: React.FC<CTACalloutProps> = ({
  variant,
  currentView,
  showOnlyFor = ['about'],
  hideTopHR = false,
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
  const BOOKINGS_URL =
    'https://outlook.office.com/book/Bookings@terencewaters.com';

  // Configuration based on variant- Constants for each CTA type
  const config = {
    services: {
      title: '👉 Explore Our Services',
      description:
        'Discover how we can help transform your vision into reality',
      icon: ARROW_ICON,
      route: '/services',
      isExternal: false,
    },
    legal: {
      title: '💼 Legal & Reference Documents',
      description: 'Access our policies, terms, and important legal documents',
      icon: ARROW_ICON,
      route: '/legal',
      isExternal: false,
    },
    aboutFluxline: {
      title: '👉 Explore more about Fluxline',
      description:
        'Discover our mission statement and how it aligns with your goals',
      icon: ARROW_ICON,
      route: '/about',
      isExternal: false,
    },
    fluxlineEthos: {
      title: '🔥 What is the Fluxline Ethos?',
      description:
        'Explore the framework that makes Fluxline stand out as an advocate for your identity and purpose',
      icon: ARROW_ICON,
      route: '/fluxline-ethos',
      isExternal: false,
    },
    personalTraining: {
      title: '💡 Take our Emotional Archetype Assessment',
      description:
        'Discover your emotional archetype to help us better understand your drives and motivations.',
      icon: ARROW_ICON,
      route: 'https://forms.office.com/r/dn7wneDXfr',
      isExternal: true,
    },
    consultation: {
      title: "💡 Let's Make Your Vision Happen!",
      description:
        'Book a free consultation to discuss your project estimates, training, consulting, or development needs',
      icon: ARROW_ICON,
      route: BOOKINGS_URL,
      isExternal: true,
    },
    getStarted: {
      title:
        currentView === 'resonance-core'
          ? '👉 You’ve felt the shift. Now choose your path.'
          : currentView === 'education-training'
            ? '👉 You’re not just leading—you’re transmitting.'
            : currentView === 'consulting'
              ? '👉 Your systems are sacred. Your strategy is a scroll.'
              : '👉 Your vision is calling. Let’s architect it into form.',
      description:
        currentView === 'personal-training'
          ? "Let's get your personalized plan started! Click this button to book a free, no obligation consultation with us to discuss your health and training goals."
          : currentView === 'development'
            ? 'Every build begins with a conversation. Book your free consultation—let’s architect your vision.'
            : currentView === 'resonance-core'
              ? 'Book your free consultation and begin your Resonance Core journey.'
              : currentView === 'education-training'
                ? 'Book your free consultation and let’s architect your coaching or training legacy.'
                : currentView === 'consulting'
                  ? 'Book your free consultation and let’s architect your operational legacy.'
                  : 'Book your free consultation to discuss your project needs and get started today!',
      icon: ARROW_ICON,
      route: BOOKINGS_URL,
      isExternal: true,
    },
  };

  const currentConfig = config[variant];

  const hrStyles = {
    margin:
      isMobile ||
      orientation === 'mobile-landscape' ||
      orientation === 'tablet-portrait'
        ? '1.5rem 0'
        : '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };

  const ctaContainerStyle = {
    textAlign: 'center' as const,
    background:
      theme.themeMode === 'high-contrast' ||
      theme.themeMode === 'dark' ||
      theme.themeMode === 'grayscale-dark'
        ? theme.palette.themeDark
        : theme.palette.themeLight,
    borderRadius: '8px',
    borderLeft: `6px solid ${theme.semanticColors.messageText}`, // Mythic Gold color
    maxWidth: '800px',
    margin:
      isMobile ||
      orientation === 'mobile-landscape' ||
      orientation === 'tablet-portrait'
        ? '1rem auto'
        : '2rem auto',
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
      {!hideTopHR && <hr style={hrStyles} />}
      <Container
        padding={
          isMobile ||
          orientation === 'mobile-landscape' ||
          orientation === 'tablet-portrait'
            ? '1.5rem 1rem'
            : '2rem 1rem'
        }
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
            paddingRight={
              isMobile || orientation === 'tablet-portrait' ? '1rem' : '3rem'
            }
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
