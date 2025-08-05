import React from 'react';
import { useLocation } from 'react-router-dom';

import { BulletPoint } from '../../theme/components/bullet-point/bullet-point';
import { PercentageBullet } from '../../theme/components/percentage-bullet/percentage-bullet';
import { Container } from '../../theme/layouts/Container';
import { Typography } from '../../theme/components/typography/typography';
import { FadeUp } from '../../theme/components/animations/fade-animations';

import SERVICES_EXPORTS from './constants';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useNavigate } from 'react-router-dom';
import { BookingsButton } from '../../theme/components/button/bookings-button/bookings-button';
import { NavigationArrow } from '../../theme/components/navigation-arrow/navigation-arrow';
interface ServicesProps {
  currentView?:
    | 'about'
    | 'services'
    | 'education-training'
    | 'personal-training'
    | 'business'
    | 'consulting'
    | 'development'
    | 'design';
}

const H2Title = ({
  name,
  style,
}: {
  name: string;
  style?: React.CSSProperties;
}) => {
  const { theme } = useAppTheme();

  return (
    <Typography
      variant='h2'
      textAlign='left'
      color={theme.palette.themePrimary}
      margin='1rem 0 0.5rem 0'
      fontSize={theme.typography.fontSizes.clamp7}
      fontVariationSettings='wght 400,wdth 300,slnt 0'
      style={style}
    >
      {name}
    </Typography>
  );
};

export const GetStarted: React.FC = () => {
  const orientation = useDeviceOrientation();
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        marginTop:
          orientation === 'portrait' || orientation === 'mobile-landscape'
            ? '2rem'
            : '3rem',
      }}
    >
      <H2Title name='ready to get started?' />
      <Typography
        variant='p'
        textAlign='left'
        color={theme.palette.neutralPrimary}
        marginBottom='1rem'
      >
        I'd love to help you with your next project! Book a free consultation
        below.
      </Typography>
      <BookingsButton />
    </div>
  );
};

export const ProfessionalSummary: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Get the appropriate data based on current view
  const getBulletPoints = () => {
    switch (currentView) {
      case 'about':
        return SERVICES_EXPORTS.ABOUT_BULLET_POINTS;
      case 'services':
        return SERVICES_EXPORTS.SERVICES_BULLET_POINTS;
      case 'personal-training':
        return SERVICES_EXPORTS.PERSONAL_TRAINING_BULLET_POINTS;
      case 'business':
        return SERVICES_EXPORTS.BUSINESS_BULLET_POINTS;
      case 'education-training':
        return SERVICES_EXPORTS.EDUCATION_TRAINING_BULLET_POINTS;
      case 'consulting':
        return SERVICES_EXPORTS.CONSULTING_BULLET_POINTS;
      case 'development':
        return SERVICES_EXPORTS.DEVELOPMENT_BULLET_POINTS;
      case 'design':
        return SERVICES_EXPORTS.DESIGN_BULLET_POINTS;
      default:
        return SERVICES_EXPORTS.ABOUT_BULLET_POINTS;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'about':
        return 'Professional Summary';
      case 'services':
        return 'My Services';
      case 'personal-training':
        return 'Personal Training, Health & Wellness';
      case 'education-training':
        return 'Coaching, Education & Leadership';
      case 'consulting':
        return 'IT & Systems Consulting';
      case 'business':
        return 'Strategic Business & Legal Architecture';
      case 'development':
        return 'Web & Application Development';
      case 'design':
        return 'Brand Identity & Experience Design';
      default:
        return 'Professional Summary';
    }
  };

  const getSummary = () => {
    switch (currentView) {
      case 'about':
        return SERVICES_EXPORTS.ABOUT_PROFESSIONAL_SUMMARY;
      case 'services':
        return SERVICES_EXPORTS.SERVICES_SUMMARY;
      case 'education-training':
        return SERVICES_EXPORTS.EDUCATION_TRAINING_SUMMARY;
      case 'personal-training':
        return SERVICES_EXPORTS.PERSONAL_TRAINING_SUMMARY;
      case 'consulting':
        return SERVICES_EXPORTS.CONSULTING_SUMMARY;
      case 'business':
        return SERVICES_EXPORTS.BUSINESS_SUMMARY;
      case 'development':
        return SERVICES_EXPORTS.DEVELOPMENT_SUMMARY;
      case 'design':
        return SERVICES_EXPORTS.DESIGN_SUMMARY;
      default:
        return SERVICES_EXPORTS.ABOUT_PROFESSIONAL_SUMMARY;
    }
  };

  // Helper function to render summary content safely
  const renderSummary = (summary: string | string[]) => {
    if (Array.isArray(summary)) {
      return (
        <>
          {summary.map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {index < summary.length - 1 && <><br /><br /></>}
            </React.Fragment>
          ))}
        </>
      );
    }
    return summary;
  };

  const bulletPoints = getBulletPoints();

  // Group bullet points into pairs for desktop layout
  const createPairs = (items: typeof bulletPoints) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
      if (i + 1 >= items.length) {
        pairs.push([items[i]]);
      } else {
        pairs.push([items[i], items[i + 1]]);
      }
    }
    return pairs;
  };

  const bulletPairs = createPairs(bulletPoints);

  return (
    <>
      {currentView === 'services' ? (
        <>
          <H2Title name={getTitle()} />
          <Typography
            variant='p'
            textAlign='left'
            color={theme.palette.neutralPrimary}
            marginBottom='2rem'
            noHyphens
          >
            {renderSummary(getSummary())}
          </Typography>
        </>
      ) : (
        <>
          <Container
            display='flex'
            flexDirection='row'
            justifyContent='flex-start'
            alignItems='center'
            paddingLeft='0'
            marginLeft='0'
            marginBottom='1rem'
            gap={theme.spacing.s}
            style={{ padding: '0' }}
          >
            {currentView !== 'about' && (
              <NavigationArrow
                direction='backward'
                navigate={() => navigate('/services')}
                size='medium'
                showBackground={false}
              />
            )}
            <H2Title name={getTitle()} />
          </Container>
          <Typography
            variant='p'
            textAlign='left'
            color={theme.palette.neutralPrimary}
            marginBottom='2rem'
            noHyphens
          >
            {renderSummary(getSummary())}
          </Typography>
        </>
      )}
      <Container
        display='flex'
        flexDirection='column'
        gap={theme.spacing.m}
        paddingLeft='0'
        paddingRight='0'
        marginLeft='0'
        style={{ width: '100%', padding: '0 !important' }}
      >
        {currentView === 'about' && (
          <H2Title name='Core Capabilities & Expertise' />
        )}
        {isMobile
          ? bulletPoints.map((point) => (
              <BulletPoint
                key={point.name}
                name={point.name}
                description={point.description}
                onClick={() => point.route && navigate(point.route)}
              />
            ))
          : bulletPairs.map((pair, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: theme.spacing.menuButton,
                  width: '100%',
                  padding: '0 0.5rem',
                }}
              >
                {pair.map((point) => (
                  <BulletPoint
                    key={point.name}
                    name={point.name}
                    description={point.description}
                    onClick={() => point.route && navigate(point.route)}
                    isHoverable={!!point.route}
                  />
                ))}
              </div>
            ))}
      </Container>
    </>
  );
};

interface PercentageCirclesProps {
  isMobile: boolean;
  currentView: ServicesProps['currentView'];
}

export const PercentageCircles: React.FC<PercentageCirclesProps> = ({
  isMobile,
  currentView,
}) => {
  const { theme } = useAppTheme();

  // Only show skills section for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <>
      <H2Title name='Skills' />
      <div
        style={{
          display: 'grid',
          gap: theme.spacing.s,
          padding: isMobile ? '0' : `0 ${theme.spacing.l}`,
          gridTemplateColumns: isMobile
            ? '1fr 1fr'
            : 'repeat(auto-fit, minmax(150px, 1fr))',
          gridAutoRows: 'min-content',
          alignItems: 'start',
          justifyItems: 'center',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {SERVICES_EXPORTS.ABOUT_PERCENTAGE_POINTS.map((skill, index) => (
          <PercentageBullet
            key={skill.name + index.toString()}
            percentage={skill.percentage}
            name={skill.name}
            isMobile={isMobile}
          />
        ))}
      </div>
    </>
  );
};

export const Services: React.FC<ServicesProps> = ({
  currentView = 'services',
}) => {
  const orientation = useDeviceOrientation();
  const location = useLocation();

  // Automatically detect current view from URL if not explicitly provided
  const getViewFromPath = (): ServicesProps['currentView'] => {
    const path = location.pathname;

    // Split path and get the part after /services/
    const pathParts = path.split('/').filter((part) => part);

    if (pathParts[0] === 'about') return 'about';
    if (pathParts[0] === 'services' && pathParts[1]) {
      return pathParts[1] as ServicesProps['currentView'];
    }
    if (pathParts[0] === 'services') return 'services';

    return currentView;
  };

  const actualView = getViewFromPath();

  return (
    <FadeUp key={actualView} delay={0}>
      <div>
        <ProfessionalSummary currentView={actualView} />
        <PercentageCircles
          isMobile={orientation === 'portrait'}
          currentView={actualView}
        />
        <GetStarted />
      </div>
    </FadeUp>
  );
};

export default Services;
