import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BulletPoint } from '../../theme/components/bullet-point/bullet-point';
import { PercentageBullet } from '../../theme/components/percentage-bullet/percentage-bullet';
import { Container } from '../../theme/layouts/Container';
import { Typography } from '../../theme/components/typography/typography';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { AnimatePresence } from 'framer-motion';

import SERVICES_EXPORTS from './constants';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { BookingsButton } from '../../theme/components/button/bookings-button/bookings-button';
import { NavigationArrow } from '../../theme/components/navigation-arrow/navigation-arrow';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import { WhitePageItem } from '../white-pages/white-pages-constants';
import { WhitePageCard } from '../../theme/components/card/white-page-card/white-page-card';
import { CTACallout } from '../../theme/components/cta';

// Reusable style objects
const styles = {
  sectionContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '3rem',
  },
  sectionBox: (theme: any) => ({
    background:
      theme.themeMode === 'high-contrast'
        ? theme.semanticColors.warningBackground
        : theme.palette.neutralLight,
    padding: '2rem',
    borderRadius: '4px',
    marginBottom: '4rem',
  }),
  textContent: {
    textAlign: 'left' as const,
    maxWidth: '800px',
    margin: '0 auto',
  },
  gridContainer: (isMobile: boolean, columns?: number | string) => ({
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns:
      typeof columns === 'string'
        ? columns
        : isMobile
          ? '1fr 1fr'
          : `repeat(auto-fit, minmax(${columns ? 900 / columns : 130}px, 1fr))`,
    alignItems: 'start',
    justifyItems: 'stretch',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  }),
  h2Title: (theme: any) => ({
    color: theme.palette.themePrimary,
    margin: '1rem 0 0.5rem 0',
    fontSize: theme.typography.fontSizes.clamp7,
    fontFamily: theme.typography.fonts.h2.fontFamily,
    fontWeight: theme.typography.fonts.h2.fontWeight,
    fontVariationSettings: theme.typography.fonts.h2.fontVariationSettings,
    textTransform: theme.typography.fonts.h2.textTransform,
    letterSpacing: theme.typography.fonts.h2.letterSpacing,
    lineHeight: theme.typography.fonts.h2.lineHeight,
  }),
};
interface ServicesProps {
  currentView?:
    | 'about'
    | 'services'
    | 'education-training'
    | 'personal-training'
    | 'resonance-core'
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
      noHyphens
      style={{ ...styles.h2Title(theme), ...style }}
    >
      {name}
    </Typography>
  );
};

export const GetStarted: React.FC = () => {
  return (
    <CTACallout
      variant='getStarted'
      showOnlyFor={[]} // Show on all views
      hideBottomHR={true}
    />
  );
};

export const WhitePagesSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const navigate = useNavigate();
  const [selectedPdf, setSelectedPdf] = useState<WhitePageItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Only show on services main page and specific service pages
  if (currentView === 'about') {
    return null;
  }

  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';
  
  const hrStyles = {
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };


  // Filter white pages for current view
  const getRelevantWhitePages = () => {
    const whitePages = SERVICES_EXPORTS.getWhitePagesFromServices();
    if (currentView === 'services') {
      return whitePages;
    }
    // For specific service pages, show only the relevant white page
    return whitePages.filter(
      (wp: WhitePageItem) => wp.category === currentView
    );
  };

  const relevantWhitePages = getRelevantWhitePages();

  if (relevantWhitePages.length === 0) {
    return null;
  }

  return (
    <>
      <div
        style={{
          ...styles.sectionContainer,
          marginTop: '3rem',
          marginBottom: '3rem',
        }}
      >
        <hr style={hrStyles} />
        <H2Title name='Services White Pages' />
        <Typography
          variant='p'
          textAlign='left'
          color={theme.palette.neutralPrimary}
          marginBottom='2rem'
          noHyphens
          style={styles.textContent}
        >
          {currentView === 'services'
            ? 'Explore detailed information about each of our services through our white pages.'
            : 'View the detailed white paper for this service.'}
        </Typography>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : currentView === 'services'
                ? 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))'
                : '1fr',
            gap: '1.5rem',
          }}
        >
          {relevantWhitePages.map((whitePage) => (
            <WhitePageCard
              key={whitePage.id}
              whitePage={whitePage}
              isHovered={hoveredCard === whitePage.id}
              onClick={setSelectedPdf}
              onMouseEnter={() => setHoveredCard(whitePage.id)}
              onMouseLeave={() => setHoveredCard(null)}
              variant='compact'
            />
          ))}
        </div>

        {currentView === 'services' && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Typography
              variant='p'
              color={theme.palette.neutralSecondary}
              fontSize='0.9rem'
            >
              Want to see all white pages in one place?{' '}
              <span
                onClick={() => navigate('/white-pages')}
                style={{
                  color: theme.palette.themePrimary,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Visit our White Pages Library
              </span>
            </Typography>
          </div>
        )}
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <PdfModal
          isOpen={!!selectedPdf}
          onClose={() => setSelectedPdf(null)}
          pdfSrc={selectedPdf.pdfPath}
          pdfTitle={selectedPdf.title}
        />
      )}
    </>
  );
};

export const AboutSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <div style={styles.sectionContainer}>
      <Typography
        variant='h2'
        style={styles.h2Title(theme)}
        margin={isMobile ? '1.5rem 0' : '0 0 1.5rem 0'}
      >
        About Fluxline
      </Typography>
      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        marginBottom='2rem'
        noHyphens
        style={styles.textContent}
      >
        <div>
          {SERVICES_EXPORTS.ABOUT_PROFESSIONAL_SUMMARY.map(
            (paragraph, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                style={{
                  marginBottom:
                    index <
                    SERVICES_EXPORTS.ABOUT_PROFESSIONAL_SUMMARY.length - 1
                      ? '2rem'
                      : '0',
                }}
              />
            )
          )}
        </div>
      </Typography>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
          gap: '1.5rem',
          margin: '2rem auto',
        }}
      >
        {SERVICES_EXPORTS.ABOUT_BULLET_POINTS.slice(0, 3).map(
          (point, index) => {
            const categories = [
              'What We Do',
              'What We Deliver',
              'How We Do It',
            ];
            return (
              <div
                key={point.name}
                style={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const subheading = e.currentTarget.querySelector(
                    '[data-subheading]'
                  ) as HTMLElement;
                  const tile = e.currentTarget.querySelector(
                    '[data-tile]'
                  ) as HTMLElement;
                  if (subheading && tile) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    subheading.style.boxShadow =
                      '0 4px 16px rgba(0, 0, 0, 0.12)';
                    tile.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  const subheading = e.currentTarget.querySelector(
                    '[data-subheading]'
                  ) as HTMLElement;
                  const tile = e.currentTarget.querySelector(
                    '[data-tile]'
                  ) as HTMLElement;
                  if (subheading && tile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    subheading.style.boxShadow = 'none';
                    tile.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Categorical Subheading */}
                <div
                  data-subheading
                  style={{
                    background:
                      theme.themeMode === 'high-contrast'
                        ? theme.palette.neutralDark
                        : theme.palette.themeSecondary,
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px 4px 0 0',
                    border: `2px solid ${theme.palette.themeSecondary}`,
                    fontFamily: theme.typography.fontFamilies.base,
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {categories[index]}
                </div>
                {/* Tile Content */}
                <div
                  data-tile
                  style={{
                    padding: '1rem',
                    background:
                      theme.themeMode === 'high-contrast'
                        ? theme.palette.neutralDark
                        : theme.palette.neutralLight,
                    borderRadius: '0 0 4px 4px',
                    height: 'calc(100% - 3.5rem)', // Adjust for subheading height
                    border: `2px solid ${theme.palette.themeSecondary}`,
                    borderTop: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography
                    variant='h4'
                    color={theme.palette.themePrimary}
                    marginBottom='0.5rem'
                  >
                    {point.name}
                  </Typography>
                  <Typography variant='p' color={theme.palette.neutralPrimary}>
                    {point.description}
                  </Typography>
                </div>
              </div>
            );
          }
        )}
      </div>
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

  // Don't show on about page since we have AboutSection now
  if (currentView === 'about') {
    return null;
  }

  // Get the appropriate data based on current view
  const getBulletPoints = () => {
    switch (currentView) {
      case 'services':
        return SERVICES_EXPORTS.SERVICES_BULLET_POINTS;
      case 'personal-training':
        return SERVICES_EXPORTS.PERSONAL_TRAINING_BULLET_POINTS;
      case 'resonance-core':
        return SERVICES_EXPORTS.RESONANCE_CORE_BULLET_POINTS;
      case 'education-training':
        return SERVICES_EXPORTS.EDUCATION_TRAINING_BULLET_POINTS;
      case 'consulting':
        return SERVICES_EXPORTS.CONSULTING_BULLET_POINTS;
      case 'development':
        return SERVICES_EXPORTS.DEVELOPMENT_BULLET_POINTS;
      case 'design':
        return SERVICES_EXPORTS.DESIGN_BULLET_POINTS;
      default:
        return SERVICES_EXPORTS.SERVICES_BULLET_POINTS;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'services':
        return 'Our Services';
      case 'personal-training':
        return 'Personal Training, Health & Wellness';
      case 'education-training':
        return 'Coaching, Education & Leadership';
      case 'consulting':
        return 'IT & Systems Consulting';
      case 'resonance-core':
        return 'Life Coaching & The Resonance Core';
      case 'development':
        return 'Web & Application Development';
      case 'design':
        return 'Brand Identity & Experience Design';
      default:
        return 'Our Services';
    }
  };

  const getSummary = () => {
    switch (currentView) {
      case 'services':
        return SERVICES_EXPORTS.SERVICES_SUMMARY;
      case 'education-training':
        return SERVICES_EXPORTS.EDUCATION_TRAINING_SUMMARY;
      case 'personal-training':
        return SERVICES_EXPORTS.PERSONAL_TRAINING_SUMMARY;
      case 'consulting':
        return SERVICES_EXPORTS.CONSULTING_SUMMARY;
      case 'resonance-core':
        return SERVICES_EXPORTS.RESONANCE_CORE_SUMMARY;
      case 'development':
        return SERVICES_EXPORTS.DEVELOPMENT_SUMMARY;
      case 'design':
        return SERVICES_EXPORTS.DESIGN_SUMMARY;
      default:
        return SERVICES_EXPORTS.SERVICES_SUMMARY;
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
              {index < summary.length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
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
      <div style={styles.sectionContainer}>
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
          {currentView !== 'services' && (
            <NavigationArrow
              direction='backward'
              navigate={() => navigate('/services')}
              size={isMobile ? 'large' : 'medium'}
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
          style={styles.textContent}
        >
          {renderSummary(getSummary())}
        </Typography>
      </div>
      <Container
        display='flex'
        flexDirection='column'
        gap={theme.spacing.m}
        paddingLeft='0'
        paddingRight='0'
        marginLeft='0'
        style={{ width: '100%', padding: '0 !important' }}
      >
        {isMobile
          ? bulletPoints.map((point) => (
              <BulletPoint
                key={point.name}
                name={point.name}
                description={point.description}
                onClick={() => point.route && navigate(point.route)}
                isHoverable={!!point.route}
              />
            ))
          : bulletPairs.map((pair, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  ...styles.gridContainer(false, '1fr 1fr'),
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

export const MissionVisionSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <div
      style={{
        ...styles.sectionContainer,
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        marginBottom: '0',
      }}
    >
      <div>
        <Typography
          variant='h3'
          color={theme.palette.themePrimary}
          marginBottom='1rem'
        >
          Our Mission
        </Typography>
        <Typography
          variant='p'
          color={theme.palette.neutralPrimary}
          noHyphens
          style={styles.textContent}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: SERVICES_EXPORTS.FLUXLINE_MISSION_VISION[0],
            }}
          />
        </Typography>
      </div>

      <div>
        <Typography
          variant='h3'
          color={theme.palette.themePrimary}
          marginBottom='1rem'
        >
          Our Vision
        </Typography>
        <Typography
          variant='p'
          color={theme.palette.neutralPrimary}
          style={{ ...styles.textContent, marginBottom: '1rem' }}
          noHyphens
        >
          <div
            dangerouslySetInnerHTML={{
              __html: SERVICES_EXPORTS.FLUXLINE_MISSION_VISION[1],
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export const FluxlineEthosSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <div
      style={{
        ...styles.sectionContainer,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 0,
      }}
    >
      <Typography
        variant='h3'
        color={theme.palette.themePrimary}
        marginBottom='1rem'
      >
        Fluxline Ethos
      </Typography>
      <Typography
        variant='p'
        textAlign='left'
        color={theme.palette.neutralPrimary}
        marginBottom='2rem'
        noHyphens
        style={styles.textContent}
      >
        {SERVICES_EXPORTS.FLUXLINE_ETHOS.map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < SERVICES_EXPORTS.FLUXLINE_ETHOS.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </Typography>
    </div>
  );
};

export const CorePrinciplesSection: React.FC<PercentageCirclesProps> = ({
  isMobile,
  currentView,
}) => {
  const { theme } = useAppTheme();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  // Filter core principles - first 5 items
  const corePrinciples = SERVICES_EXPORTS.ABOUT_PERCENTAGE_POINTS.slice(0, 5);

  return (
    <>
      <H2Title name='Core Principles' />
      <div
        style={{
          ...styles.gridContainer(
            isMobile,
            isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(150px, 1fr))'
          ),
          gap: theme.spacing.s,
          padding: isMobile ? '0' : `0 ${theme.spacing.l}`,
          gridAutoRows: 'min-content',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {corePrinciples.map((principle, index) => (
          <PercentageBullet
            key={principle.name + index.toString()}
            percentage={principle.percentage}
            name={principle.name}
            isMobile={isMobile}
          />
        ))}
      </div>
    </>
  );
};

export const TechnicalSkillsSection: React.FC<PercentageCirclesProps> = ({
  isMobile,
  currentView,
}) => {
  const { theme } = useAppTheme();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  // Select only the most important technical skills to display (12 instead of all)
  const topSkills = SERVICES_EXPORTS.ABOUT_PERCENTAGE_POINTS.slice(5, 17);

  return (
    <div style={{ ...styles.sectionBox(theme), marginBottom: '4rem' }}>
      <Typography
        variant='h2'
        style={styles.h2Title(theme)}
        textAlign='center'
        margin='0 0 2rem 0'
      >
        Business Expertise
      </Typography>
      <div
        style={{
          ...styles.gridContainer(
            isMobile,
            isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(130px, 1fr))'
          ),
          gap: '1rem',
          padding: '0',
          gridAutoRows: 'min-content',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {topSkills.map((skill, index) => (
          <PercentageBullet
            key={skill.name + index.toString()}
            percentage={skill.percentage}
            name={skill.name}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export const GuidingPrinciplesSection: React.FC<PercentageCirclesProps> = ({
  isMobile,
  currentView,
}) => {
  const { theme } = useAppTheme();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  // Get the main guiding principles (pick the most important ones)
  const guidingPrinciples = SERVICES_EXPORTS.ABOUT_PERCENTAGE_POINTS.slice(
    18,
    28
  );

  return (
    <div style={{ ...styles.sectionBox(theme), marginBottom: '4rem' }}>
      <Typography
        variant='h2'
        style={styles.h2Title(theme)}
        textAlign='center'
        margin='0 0 2rem 0'
      >
        Our Guiding Principles
      </Typography>
      <div
        style={{
          ...styles.gridContainer(
            isMobile,
            isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(130px, 1fr))'
          ),
          gap: '1.5rem',
          padding: '0',
          gridAutoRows: 'min-content',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {guidingPrinciples.map((principle, index) => (
          <PercentageBullet
            key={principle.name + index.toString()}
            percentage={principle.percentage}
            name={principle.name}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  // Group bullet points into pairs for desktop layout
  const createPairs = (
    items: typeof SERVICES_EXPORTS.SERVICES_BULLET_POINTS
  ) => {
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

  return (
    <div
      style={{
        ...styles.sectionBox(theme),
        margin: '2rem -2rem',
      }}
    >
      <Typography
        variant='h2'
        style={styles.h2Title(theme)}
        textAlign='center'
        margin='0 0 1.5rem 0'
      >
        Our Services
      </Typography>
      <Typography
        variant='p'
        color={theme.palette.neutralPrimary}
        marginBottom='2.5rem'
        fontWeight='600'
        noHyphens
        style={styles.textContent}
      >
        {SERVICES_EXPORTS.SERVICES_SUMMARY}
      </Typography>
      <Container
        display='flex'
        flexDirection='column'
        gap={theme.spacing.m}
        paddingLeft='0'
        paddingRight='0'
        marginLeft='0'
        style={{ width: '100%', padding: '0 !important' }}
      >
        {isMobile
          ? SERVICES_EXPORTS.SERVICES_BULLET_POINTS.map((point) => (
              <BulletPoint
                key={point.name}
                name={point.name}
                description={point.description}
                onClick={() => point.route && navigate(point.route)}
                isHoverable={!!point.route}
              />
            ))
          : createPairs(SERVICES_EXPORTS.SERVICES_BULLET_POINTS).map(
              (pair, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    ...styles.gridContainer(false, '1fr 1fr'),
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
              )
            )}
      </Container>
    </div>
  );
};

export const TaglineHeader: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  const hrStyles = {
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };

  return (
    <>
      <hr style={hrStyles} />
      <div
        style={{
          textAlign: 'center',
          padding: '0',
          borderLeft: `6px solid ${theme.semanticColors.messageText}`,
          maxWidth: '800px',
          marginBottom: '3rem',
          margin: '2rem auto',
        }}
      >
        <Typography
          variant='h3'
          textAlign='center'
          color={theme.palette.themePrimary}
          margin='1rem 0 0'
          fontSize={theme.typography.fontSizes.clamp7}
          style={{
            fontStyle: 'italic',
            textTransform: 'none',
            letterSpacing: '-0.02em',
            ...styles.textContent,
          }}
        >
          {SERVICES_EXPORTS.FLUXLINE_TAGLINE}
        </Typography>
        <Typography
          variant='p'
          textAlign='center'
          color={theme.palette.neutralPrimary}
          marginTop='0'
          fontSize={theme.typography.fontSizes.clamp5}
          style={{
            fontStyle: 'italic',
            ...styles.textContent,
            maxWidth: '80%',
          }}
        >
          {SERVICES_EXPORTS.FLUXLINE_SECONDARY_TAGLINE}
        </Typography>
      </div>
      <hr style={hrStyles} />
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
    const pathParts = path.split('/').filter((part: string) => part);

    if (pathParts[0] === 'about') return 'about';
    if (pathParts[0] === 'services' && pathParts[1]) {
      return pathParts[1] as ServicesProps['currentView'];
    }
    if (pathParts[0] === 'services') return 'services';

    return currentView;
  };

  const actualView = getViewFromPath();

  return (
    <AnimatePresence mode='wait'>
      <FadeUp key={actualView} delay={0.1} duration={0.5}>
        <div>
          {actualView === 'about' ? (
            // Optimized About page with improved visual hierarchy and flow
            <>
              <AboutSection currentView={actualView} />
              <TaglineHeader currentView={actualView} />
              <MissionVisionSection currentView={actualView} />
              <TechnicalSkillsSection
                isMobile={orientation === 'portrait'}
                currentView={actualView}
              />
              <GuidingPrinciplesSection
                isMobile={orientation === 'portrait'}
                currentView={actualView}
              />
              <GetStarted />
            </>
          ) : (
            // Original layout for other service pages
            <>
              <ProfessionalSummary currentView={actualView} />
              <WhitePagesSection currentView={actualView} />
              <CTACallout
                variant='legal'
                currentView={actualView}
                showOnlyFor={[]}
                hideBottomHR={true}
              />
              <GetStarted />
            </>
          )}
        </div>
      </FadeUp>
    </AnimatePresence>
  );
};

export default Services;
