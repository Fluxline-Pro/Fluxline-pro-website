import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BulletPoint } from '../../theme/components/bullet-point/bullet-point';
import { PercentageBullet } from '../../theme/components/percentage-bullet/percentage-bullet';
import { Container } from '../../theme/layouts/Container';
import { Typography } from '../../theme/components/typography/typography';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { AnimatePresence } from 'framer-motion';

import SERVICES_EXPORTS from './constants';
import {
  useDeviceOrientation,
  useIsMobile,
} from '../../theme/hooks/useMediaQuery';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { NavigationArrow } from '../../theme/components/navigation-arrow/navigation-arrow';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import { WhitePageItem } from '../white-pages/white-pages-constants';
import { WhitePageCard } from '../../theme/components/card/white-page-card/white-page-card';
import { CTACallout } from '../../theme/components/cta';
import theme from '../../theme/theme';

// Reusable style objects
const styles = {
  sectionContainer: (
    orientation?: string,
    layoutPreference?: string,
    view?: string,
    includesArrow?: boolean
  ) => {
    // Define main page titles that should get special left-handed spacing
    const mainTitles = [
      'Business Strategy & Systems Alignment',
      'Brand Identity & Experience Design',
      'Life Coaching & The Resonance Core',
      'Personal Training & Wellness',
      'Coaching, Education & Leadership',
      'Web & Application Development',
    ];

    return {
      margin:
        includesArrow && orientation !== 'mobile-landscape'
          ? '0 auto'
          : orientation === 'mobile-landscape'
            ? layoutPreference === 'left-handed' &&
              view &&
              mainTitles.includes(view)
              ? '0 0 0 14rem'
              : '0 auto 0 1rem'
            : '0 auto',
      marginBottom: orientation === 'mobile-landscape' ? '0rem' : '1.5rem',
      maxWidth:
        orientation === 'mobile-landscape' && view && mainTitles.includes(view)
          ? '400px'
          : '900px',
    };
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
  h2Title: (theme: any, orientation?: string) => ({
    color: theme.palette.themePrimary,
    margin: orientation === 'mobile-landscape' ? '0.5rem 0' : '1rem 0 0.5rem 0',
    fontSize:
      orientation === 'mobile-landscape'
        ? theme.typography.fontSizes.clamp6 // Reduced from clamp7 to clamp6 for mobile-landscape
        : theme.typography.fontSizes.clamp7,
    maxWidth: orientation === 'mobile-landscape' ? '400px' : 'none',
    fontFamily: theme.typography.fonts.h2.fontFamily,
    fontWeight: theme.typography.fonts.h2.fontWeight,
    fontVariationSettings: theme.typography.fonts.h2.fontVariationSettings,
    textTransform: theme.typography.fonts.h2.textTransform,
    letterSpacing: theme.typography.fonts.h2.letterSpacing,
    lineHeight: theme.typography.fonts.h2.lineHeight,
  }),
  hrStyles: {
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  tableHeader: (
    theme: any,
    options?: {
      background?: string;
      borderRadius?: string;
      textAlign?: string;
      position?: string;
      left?: number;
    }
  ) => ({
    background: options?.background || theme.palette.themePrimary,
    color: 'white',
    padding: '1rem',
    textAlign: (options?.textAlign as any) || 'left',
    fontWeight: 'bold',
    borderRadius: options?.borderRadius || '0',
    position: options?.position as any,
    left: options?.left,
  }),
  tableRow: (theme: any, index: number) => ({
    background: index % 2 === 0 ? theme.palette.neutralLight : 'white',
  }),
  tableCell: (
    theme: any,
    options?: {
      textAlign?: string;
      fontWeight?: string;
      color?: string;
      position?: string;
      left?: number;
      background?: string;
      fontSize?: string;
    }
  ) => ({
    padding: '1rem',
    borderBottom: `1px solid ${theme.palette.neutralTertiaryAlt}`,
    textAlign: (options?.textAlign as any) || 'left',
    fontWeight: options?.fontWeight || 'normal',
    color: options?.color || theme.palette.neutralPrimary,
    position: options?.position as any,
    left: options?.left,
    background: options?.background,
    fontSize: options?.fontSize || '1rem',
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
  const orientation = useDeviceOrientation();

  return (
    <Typography
      variant='h2'
      textAlign='left'
      color={theme.palette.themePrimary}
      noHyphens
      style={{ ...styles.h2Title(theme, orientation), ...style }}
    >
      {name}
    </Typography>
  );
};

export const GetStarted: React.FC<{ isServicesPage?: boolean }> = ({
  isServicesPage = false,
}) => {
  return (
    <CTACallout
      variant='getStarted'
      showOnlyFor={[]} // Show on all views
      hideTopHR={true}
      hideBottomHR={true}
    />
  );
};

export const WhitePagesSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme, layoutPreference } = useAppTheme();
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

  const handleCardClick = (whitePage: WhitePageItem) => {
    // Detect Safari/WebKit for mobile PDF fallback
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isWebKit =
      /webkit/i.test(navigator.userAgent) &&
      !/chrome/i.test(navigator.userAgent);
    const isMobileSafari = (isSafari || isWebKit) && isMobile;

    if (isMobileSafari) {
      // Open PDF in new tab for mobile Safari users
      window.open(whitePage.pdfPath, '_blank');
    } else {
      setSelectedPdf(whitePage);
    }
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

  const getServiceName = () => {
    switch (currentView) {
      case 'personal-training':
        return 'Personal Training & Wellness';
      case 'education-training':
        return 'Coaching, Education & Leadership';
      case 'consulting':
        return 'Business Strategy & Systems Alignment';
      case 'resonance-core':
        return 'Life Coaching & The Resonance Core';
      case 'development':
        return 'Web & Application Development';
      case 'design':
        return 'Brand Identity & Experience Design';
      default:
        return 'service';
    }
  };

  const relevantWhitePages = getRelevantWhitePages();

  if (relevantWhitePages.length === 0) {
    return null;
  }

  return (
    <>
      <div
        style={{
          ...styles.sectionContainer(
            orientation,
            layoutPreference,
            'White Pages Section', // Generic name that won't trigger special spacing
            false
          ),
          marginTop: '3rem',
          marginBottom: '3rem',
        }}
      >
        <hr style={styles.hrStyles} />
        <H2Title
          name={
            currentView === 'services' ? 'Services White Pages' : 'White Page'
          }
        />
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
            : `View our detailed white paper below for more information about ${getServiceName()}.`}
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
              onClick={handleCardClick}
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
        <hr style={styles.hrStyles} />
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

// Hero Section Component
export const HeroSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();
  const navigate = useNavigate();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Don't show hero for about page
  if (currentView === 'about') {
    return null;
  }

  const getHeroContent = () => {
    switch (currentView) {
      case 'personal-training':
        return {
          title: 'Personal Training & Wellness',
          subtitle:
            'Modular training for founders and creatives. Align your body, mind, and mission through intentional movement and emotional integration.',
          cta: 'Book a consultation',
        };
      case 'consulting':
        return {
          title: 'Business Strategy & Systems Alignment',
          subtitle:
            'Strategic frameworks for sustainable growth. Transform complexity into clarity through systematic business design.',
          cta: 'Start a project',
        };
      case 'education-training':
        return {
          title: 'Coaching, Education & Leadership',
          subtitle:
            'Leadership development through experiential learning. Build authentic influence and transformational coaching skills.',
          cta: 'Explore programs',
        };
      case 'resonance-core':
        return {
          title: 'Life Coaching & The Resonance Core',
          subtitle:
            'Deep personal transformation through archetypal integration. Align your inner world with your outer mission.',
          cta: 'Begin your journey',
        };
      case 'development':
        return {
          title: 'Web & Application Development',
          subtitle:
            'Digital solutions that embody your vision. Clean, purposeful technology that serves your mission.',
          cta: 'Discuss your project',
        };
      case 'design':
        return {
          title: 'Brand Identity & Experience Design',
          subtitle:
            'Visual identity that resonates with purpose. Create meaningful connections through intentional design.',
          cta: 'Create together',
        };
      default:
        return {
          title: 'Our Services',
          subtitle:
            'Comprehensive solutions for conscious leaders and innovative organizations.',
          cta: 'Explore services',
        };
    }
  };

  const heroContent = getHeroContent();

  return (
    <div
      style={{
        ...styles.sectionContainer(
          orientation,
          layoutPreference,
          heroContent.title,
          currentView !== 'services'
        ),
        marginBottom: '3rem',
      }}
    >
      <Container
        display='flex'
        flexDirection='row'
        justifyContent={
          orientation === 'mobile-landscape' &&
          layoutPreference === 'left-handed'
            ? 'flex-end'
            : 'flex-start'
        }
        alignItems='center'
        paddingLeft='0'
        marginLeft='0'
        marginBottom='2rem'
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
        <H2Title name={heroContent.title} />
      </Container>

      <Container
        marginLeft='auto'
        marginRight='auto'
        padding={
          isMobile || orientation === 'mobile-landscape'
            ? `${theme.spacing.l} ${theme.spacing.m}`
            : theme.spacing.xxl
        }
        maxWidth='1000px'
        style={{
          background:
            theme.themeMode === 'high-contrast'
              ? theme.semanticColors.warningBackground
              : theme.palette.neutralLight,
          borderRadius: theme.borderRadius.container.medium,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
          textAlign: 'center',
        }}
      >
        <Typography
          variant='h3'
          color={theme.palette.neutralPrimary}
          marginBottom='1.5rem'
          fontSize={isMobile ? '1.2rem' : '1.4rem'}
          fontWeight='400'
          style={{ lineHeight: '1.6' }}
        >
          {heroContent.subtitle}
        </Typography>

        <CTACallout
          variant={
            currentView === 'personal-training'
              ? 'personalTraining'
              : 'getStarted'
          }
          currentView={currentView}
          showOnlyFor={[]}
          hideTopHR={true}
          hideBottomHR={true}
        />
      </Container>
    </div>
  );
};

// Program Tier Table Component
const ProgramTierTable: React.FC<{ theme: any; isMobile: boolean }> = ({
  theme,
  isMobile,
}) => {
  const programTiers = [
    {
      tier: 'Single Session',
      idealFor:
        'Clients needing simplified instruction, unsure about performing exercises, not wanting to commit to a monthly cadence',
      rate: '$110/session',
    },
    {
      tier: 'Online PT Only',
      idealFor: 'Remote clients, creatives seeking flexible support',
      rate: 'Starting at $225/month',
      note: '(Varies by term length)',
    },
    {
      tier: 'Hybrid PT',
      idealFor: 'Local clients seeking in-person sessions + remote structure',
      rate: 'Starting at $350/month',
      note: '(Varies by term length)',
    },
    {
      tier: 'Online Hypertrophy',
      idealFor:
        'Remote clients focused on physique, nutrition, and metabolic coaching',
      rate: 'Starting at $275/month',
      note: '(Varies by term length)',
    },
    {
      tier: 'Hybrid Hypertrophy',
      idealFor:
        'Full-spectrum transformation: movement, nutrition, emotional integration',
      rate: 'Starting at $450/month',
      note: '(Varies by term length)',
    },
  ];

  return (
    <div
      style={{
        overflowX: 'auto',
        background: theme.palette.neutralLighter,
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <table
        style={{
          ...styles.table,
          minWidth: isMobile ? '600px' : 'auto',
        }}
      >
        <thead>
          <tr>
            <th
              style={styles.tableHeader(theme, { borderRadius: '4px 0 0 0' })}
            >
              📊 Program Tier
            </th>
            <th style={styles.tableHeader(theme)}>Ideal For</th>
            <th
              style={styles.tableHeader(theme, { borderRadius: '0 4px 0 0' })}
            >
              Monthly Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {programTiers.map((tier, index) => (
            <tr key={tier.tier} style={styles.tableRow(theme, index)}>
              <td
                style={styles.tableCell(theme, {
                  fontWeight: 'bold',
                  color: theme.palette.themePrimary,
                })}
              >
                {tier.tier}
              </td>
              <td style={styles.tableCell(theme)}>{tier.idealFor}</td>
              <td style={styles.tableCell(theme)}>
                <div style={{ fontWeight: 'bold' }}>{tier.rate}</div>
                {tier.note && (
                  <div
                    style={{
                      fontSize: '0.9em',
                      color: '#666',
                      marginTop: '0.25rem',
                    }}
                  >
                    {tier.note}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// What's Included Modal Component
const WhatsIncludedModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  theme: any;
}> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const features = [
    {
      feature: 'Custom Training Plan',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Biweekly Check-Ins',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Discord Access',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Milestone Reviews',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Emotional Integration Coaching',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'PTDistinction Portal Access',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'First 2 Sessions Free',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Cancel Anytime (First 2 Sessions)',
      onlinePT: '✅',
      hybridPT: '✅',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'In-Person Training Sessions',
      onlinePT: '➖',
      hybridPT: '✅',
      onlineHypertrophy: '➖',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Hands-On Form Correction',
      onlinePT: '➖',
      hybridPT: '✅',
      onlineHypertrophy: '➖',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'On-Site Meditation & Breathwork',
      onlinePT: '➖',
      hybridPT: '✅',
      onlineHypertrophy: '➖',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Real-Time Cueing & Adjustments',
      onlinePT: '➖',
      hybridPT: '✅',
      onlineHypertrophy: '➖',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Local Access (Salt Lake & Davis Counties)',
      onlinePT: '➖',
      hybridPT: '✅',
      onlineHypertrophy: '➖',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Nutrition Coaching',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Recipes & Meal Plans',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Cycle Tracking / Fasting Protocols',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Metabolic Phase Mapping',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Hypertrophy-Specific Programming',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Progressive Overload Tracking',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Physique Optimization Strategy',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Supplemental Recovery Rituals',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
    {
      feature: 'Hormonal Phase Integration',
      onlinePT: '➖',
      hybridPT: '➖',
      onlineHypertrophy: '✅',
      hybridHypertrophy: '✅',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: theme.palette.neutralLighter,
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '95vw',
          maxHeight: '95vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: theme.palette.neutralPrimary,
          }}
        >
          ✕
        </button>

        <h2
          style={{
            color: theme.palette.themePrimary,
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.8rem',
          }}
        >
          🧩 What's Included - Program Comparison
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              ...styles.table,
              minWidth: '800px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={styles.tableHeader(theme, {
                    borderRadius: '4px 0 0 0',
                    position: 'sticky',
                    left: 0,
                  })}
                >
                  Feature
                </th>
                <th
                  style={styles.tableHeader(theme, {
                    background: theme.palette.neutralSecondary,
                    textAlign: 'center',
                  })}
                >
                  Online PT Only
                </th>
                <th
                  style={styles.tableHeader(theme, {
                    background: theme.palette.themeSecondary,
                    textAlign: 'center',
                  })}
                >
                  Hybrid PT
                </th>
                <th
                  style={styles.tableHeader(theme, {
                    background: theme.palette.themeTertiary,
                    textAlign: 'center',
                  })}
                >
                  Online Hypertrophy
                </th>
                <th
                  style={styles.tableHeader(theme, {
                    borderRadius: '0 4px 0 0',
                    textAlign: 'center',
                  })}
                >
                  Hybrid Hypertrophy
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <tr key={row.feature} style={styles.tableRow(theme, index)}>
                  <td
                    style={styles.tableCell(theme, {
                      fontWeight: 'bold',
                      position: 'sticky',
                      left: 0,
                      background:
                        index % 2 === 0 ? 'white' : theme.palette.neutralLight,
                    })}
                  >
                    {row.feature}
                  </td>
                  <td
                    style={styles.tableCell(theme, {
                      textAlign: 'center',
                      fontSize: '1.2rem',
                    })}
                  >
                    {row.onlinePT}
                  </td>
                  <td
                    style={styles.tableCell(theme, {
                      textAlign: 'center',
                      fontSize: '1.2rem',
                    })}
                  >
                    {row.hybridPT}
                  </td>
                  <td
                    style={styles.tableCell(theme, {
                      textAlign: 'center',
                      fontSize: '1.2rem',
                    })}
                  >
                    {row.onlineHypertrophy}
                  </td>
                  <td
                    style={styles.tableCell(theme, {
                      textAlign: 'center',
                      fontSize: '1.2rem',
                    })}
                  >
                    {row.hybridHypertrophy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              background: theme.palette.themePrimary,
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Program Tiers Section Component
export const ProgramTiersSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';
  const [showWhatsIncluded, setShowWhatsIncluded] = useState(false);

  // Only show tiers for services that have them (currently just Personal Training)
  if (currentView !== 'personal-training') {
    return null;
  }

  return (
    <Container
      marginLeft='auto'
      marginRight='auto'
      marginBottom='3rem'
      padding={
        isMobile || orientation === 'mobile-landscape'
          ? `${theme.spacing.l} ${theme.spacing.m}`
          : '2.5rem'
      }
      maxWidth='1000px'
    >
      <hr style={styles.hrStyles} />
      <H2Title
        name='Program Tiers Offered'
        style={{ margin: '0 0 2rem 0', textAlign: 'center' }}
      />
      <Typography
        variant='p'
        color={theme.palette.neutralSecondary}
        marginBottom='2rem'
        style={{ textAlign: 'center', fontStyle: 'italic' }}
      >
        Choose your path based on your archetype assessment and personal goals.
      </Typography>

      <ProgramTierTable theme={theme} isMobile={isMobile} />

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={() => setShowWhatsIncluded(true)}
          style={{
            background: theme.palette.themePrimary,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '4px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.palette.themeDark;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.palette.themePrimary;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          View Full Comparison - What's Included in Each Tier?
        </button>
      </div>

      {/* What's Included Modal */}
      {showWhatsIncluded && (
        <WhatsIncludedModal
          isOpen={showWhatsIncluded}
          onClose={() => setShowWhatsIncluded(false)}
          theme={theme}
        />
      )}
    </Container>
  );
};

// Services Offered Section Component
export const ServicesOfferedSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Don't show for about page
  if (currentView === 'about') {
    return null;
  }

  // Get the appropriate bullet points based on current view
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
    <Container
      marginLeft='auto'
      marginRight='auto'
      marginBottom='3rem'
      padding={
        isMobile || orientation === 'mobile-landscape'
          ? `${theme.spacing.l} ${theme.spacing.m}`
          : '2.5rem'
      }
      maxWidth='1000px'
    >
      <hr style={styles.hrStyles} />
      <H2Title name='Services Offered' style={{ margin: '0 0 1.5rem 0' }} />
      <Typography
        variant='p'
        color={theme.palette.neutralSecondary}
        marginBottom='2rem'
        style={{ textAlign: 'center', fontStyle: 'italic' }}
      >
        {currentView === 'personal-training'
          ? 'Scannable list of features and rituals. This is the scroll of invitations.'
          : 'Comprehensive offerings designed for your specific needs.'}
      </Typography>

      <Container
        display='flex'
        flexDirection='column'
        gap={
          orientation === 'mobile-landscape'
            ? theme.spacing.s1
            : theme.spacing.m
        }
        paddingLeft='0'
        paddingRight='0'
        marginLeft='0'
        style={{ width: '100%', padding: '0 !important' }}
      >
        {isMobile || orientation === 'mobile-landscape'
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
                  gap: '0.5rem',
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
    </Container>
  );
};

// Overview Section Component (Program Overview & Archetype Mapping for PT)
export const OverviewSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Apply styles to links within personal training summary
  useEffect(() => {
    if (currentView === 'personal-training') {
      const summaryDiv = document.querySelector('.personal-training-summary');
      if (summaryDiv) {
        const links = summaryDiv.querySelectorAll('a');
        links.forEach((link: HTMLAnchorElement) => {
          link.style.color = theme.palette.themePrimary;
          link.style.textDecoration = 'underline';
        });
      }
    }
  }, [currentView, theme.palette.themePrimary]);

  // Don't show for about page
  if (currentView === 'about') {
    return null;
  }

  const getOverviewTitle = () => {
    switch (currentView) {
      case 'personal-training':
        return 'Program Overview & Archetype Mapping';
      default:
        return 'Overview';
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

  return (
    <Container
      marginLeft='auto'
      marginRight='auto'
      marginBottom='3rem'
      padding={
        isMobile || orientation === 'mobile-landscape'
          ? `${theme.spacing.l} ${theme.spacing.m}`
          : '2.5rem'
      }
      maxWidth='1000px'
      style={{
        background:
          theme.themeMode === 'high-contrast'
            ? theme.semanticColors.warningBackground
            : theme.palette.neutralLight,
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
      }}
    >
      <H2Title name={getOverviewTitle()} style={{ margin: '0 0 1.5rem 0' }} />
      {currentView === 'personal-training' && (
        <Typography
          variant='p'
          color={theme.palette.neutralSecondary}
          marginBottom='1rem'
          style={{ textAlign: 'center', fontStyle: 'italic' }}
        >
          This is the mythic gate. Clients self-identify before choosing a path.
        </Typography>
      )}

      <Typography
        variant='p'
        textAlign='left'
        color={theme.palette.neutralPrimary}
        marginBottom='2rem'
        noHyphens
        style={styles.textContent}
      >
        {currentView === 'personal-training' ? (
          <div
            dangerouslySetInnerHTML={{
              __html: SERVICES_EXPORTS.PERSONAL_TRAINING_SUMMARY,
            }}
            className='personal-training-summary'
          />
        ) : (
          renderSummary(getSummary())
        )}
      </Typography>
    </Container>
  );
};

export const AboutSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme, layoutPreference } = useAppTheme();
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
    <div
      style={styles.sectionContainer(
        orientation,
        layoutPreference,
        'About Fluxline',
        false
      )}
    >
      <Typography
        variant='h2'
        style={styles.h2Title(theme, orientation)}
        margin={isMobile ? '1.5rem 0' : '0 0 1.5rem 0'}
        textAlign={
          orientation === 'mobile-landscape' &&
          layoutPreference === 'left-handed'
            ? 'right'
            : 'left'
        }
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
          gap: isMobile ? '0.5rem' : '1.5rem',
          margin: isMobile ? '2rem auto 0 auto' : '2rem auto',
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
                    padding: '0.25rem 0.75rem',
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
                  <Typography
                    variant='p'
                    color={theme.palette.neutralPrimary}
                    fontSize='1rem'
                    paddingBottom='1rem'
                  >
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
  const { theme, layoutPreference } = useAppTheme();
  const navigate = useNavigate();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';
  const [showWhatsIncluded, setShowWhatsIncluded] = useState(false);

  // Apply styles to links within personal training summary
  useEffect(() => {
    if (currentView === 'personal-training') {
      const summaryDiv = document.querySelector('.personal-training-summary');
      if (summaryDiv) {
        const links = summaryDiv.querySelectorAll('a');
        links.forEach((link: HTMLAnchorElement) => {
          link.style.color = theme.palette.themePrimary;
          link.style.textDecoration = 'underline';
        });
      }
    }
  }, [currentView, theme.palette.themePrimary]);

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
        return 'Personal Training & Wellness';
      case 'education-training':
        return 'Coaching, Education & Leadership';
      case 'consulting':
        return 'Business Strategy & Systems Alignment';
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

  const getOverviewTitle = () => {
    switch (currentView) {
      case 'services':
      case 'consulting':
      case 'education-training':
      case 'resonance-core':
      case 'development':
      case 'design':
        return 'Overview';
      case 'personal-training':
        return 'Program Overview & Archetype Mapping';
      default:
        return 'Overview';
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
      {/* Header Section */}
      <div
        style={styles.sectionContainer(
          orientation,
          layoutPreference,
          getTitle(),
          currentView !== 'services'
        )}
      >
        <Container
          display='flex'
          flexDirection='row'
          justifyContent={
            orientation === 'mobile-landscape' &&
            layoutPreference === 'left-handed'
              ? 'flex-end'
              : 'flex-start'
          }
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
      </div>

      {/* Overview Section */}
      <Container
        marginLeft='auto'
        marginRight='auto'
        marginBottom={
          currentView === 'personal-training' ? '0' : theme.spacing.xl
        }
        padding={
          isMobile || orientation === 'mobile-landscape'
            ? `${theme.spacing.l} ${theme.spacing.m}`
            : currentView === 'personal-training'
              ? '2.5rem 2.5rem 1rem 2.5rem'
              : theme.spacing.xxl
        }
        maxWidth='1000px'
        style={{
          background:
            theme.themeMode === 'high-contrast'
              ? theme.semanticColors.warningBackground
              : theme.palette.neutralLight,
          borderRadius: theme.borderRadius.container.medium,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        }}
      >
        <H2Title name={getOverviewTitle()} style={{ margin: '0 0 1.5rem 0' }} />
        <Typography
          variant='p'
          textAlign='left'
          color={theme.palette.neutralPrimary}
          marginBottom='2rem'
          noHyphens
          style={styles.textContent}
        >
          {currentView === 'personal-training' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: SERVICES_EXPORTS.PERSONAL_TRAINING_SUMMARY,
              }}
              className='personal-training-summary'
            />
          ) : (
            renderSummary(getSummary())
          )}
        </Typography>

        {currentView === 'personal-training' && (
          <CTACallout
            variant='personalTraining'
            currentView={currentView}
            showOnlyFor={[]}
            hideBottomHR={true}
          />
        )}

        {currentView !== 'personal-training' && (
          <>
            <H2Title
              name='Services Offered'
              style={{ margin: '0 0 1.5rem 0' }}
            />
            <Container
              display='flex'
              flexDirection='column'
              gap={
                orientation === 'mobile-landscape'
                  ? theme.spacing.s1
                  : theme.spacing.m
              }
              paddingLeft='0'
              paddingRight='0'
              marginLeft='0'
              style={{ width: '100%', padding: '0 !important' }}
            >
              {isMobile || orientation === 'mobile-landscape'
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
                        gap: '0.5rem',
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
        )}
      </Container>

      {/* Personal Training Services Section */}
      {currentView === 'personal-training' && (
        <Container
          marginLeft='auto'
          marginRight='auto'
          marginBottom={theme.spacing.s1}
          padding={
            isMobile || orientation === 'mobile-landscape'
              ? `${theme.spacing.l} ${theme.spacing.m}`
              : '2.5rem 2.5rem 1rem 2.5rem'
          }
          maxWidth='1000px'
        >
          <H2Title name='Services Offered' style={{ margin: '0 0 1.5rem 0' }} />
          <Container
            display='flex'
            flexDirection='column'
            gap={
              orientation === 'mobile-landscape'
                ? theme.spacing.s1
                : theme.spacing.m
            }
            paddingLeft='0'
            paddingRight='0'
            marginLeft='0'
            style={{ width: '100%', padding: '0 !important' }}
          >
            {isMobile || orientation === 'mobile-landscape'
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
                      gap: '0.5rem',
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

            {/* Program Tier Table */}
            <div style={{ marginTop: '3rem' }}>
              <H2Title
                name='Program Tiers'
                style={{ margin: '0 0 1.5rem 0' }}
              />
              <ProgramTierTable theme={theme} isMobile={isMobile} />
            </div>

            {/* What's Included CTA */}
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowWhatsIncluded(true)}
                style={{
                  background: theme.palette.themePrimary,
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '4px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.palette.themeDark;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme.palette.themePrimary;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                What's Included? View Full Comparison
              </button>
            </div>
          </Container>
        </Container>
      )}

      {/* What's Included Modal */}
      {showWhatsIncluded && (
        <WhatsIncludedModal
          isOpen={showWhatsIncluded}
          onClose={() => setShowWhatsIncluded(false)}
          theme={theme}
        />
      )}
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
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <div
      style={{
        ...styles.sectionContainer(
          orientation,
          layoutPreference,
          'Mission Vision',
          false
        ),
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

// This section is not used in the about page currently, but kept for potential future use
export const FluxlineEthosSection: React.FC<{
  currentView: ServicesProps['currentView'];
}> = ({ currentView }) => {
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <div
      style={{
        ...styles.sectionContainer(
          orientation,
          layoutPreference,
          'Fluxline Ethos',
          false
        ),
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
  const orientation = useDeviceOrientation();

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
        style={styles.h2Title(theme, orientation)}
        textAlign='center'
        margin='0 0 2rem 0'
      >
        Business Expertise
      </Typography>
      <div
        style={{
          ...styles.gridContainer(
            isMobile,
            isMobile
              ? '1fr 1fr'
              : orientation === 'mobile-landscape'
                ? 'repeat(3, 1fr)'
                : 'repeat(auto-fit, minmax(130px, 1fr))'
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
  const orientation = useDeviceOrientation();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  // Get the main guiding principles (pick the most important ones)
  const guidingPrinciples = SERVICES_EXPORTS.ABOUT_PERCENTAGE_POINTS.slice(
    18,
    30
  );

  return (
    <div style={{ ...styles.sectionBox(theme), marginBottom: '4rem' }}>
      <Typography
        variant='h2'
        style={styles.h2Title(theme, orientation)}
        textAlign='center'
        margin='0 0 2rem 0'
      >
        Our Guiding Principles
      </Typography>
      <div
        style={{
          ...styles.gridContainer(
            isMobile,
            isMobile
              ? '1fr 1fr'
              : orientation === 'mobile-landscape'
                ? 'repeat(3, 1fr)'
                : 'repeat(auto-fit, minmax(130px, 1fr))'
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
        style={styles.h2Title(theme, orientation)}
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
        gap={
          orientation === 'mobile-landscape'
            ? theme.spacing.s1
            : theme.spacing.m
        }
        paddingLeft='0'
        paddingRight='0'
        marginLeft='0'
        style={{ width: '100%', padding: '0 !important' }}
      >
        {isMobile || orientation === 'mobile-landscape'
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
  const isMobile = useIsMobile();
  const orientation = useDeviceOrientation();

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  return (
    <>
      <hr style={styles.hrStyles} />
      <div
        style={{
          textAlign: 'center',
          padding: '0',
          borderLeft: `6px solid ${theme.semanticColors.messageText}`,
          maxWidth: '800px',
          marginBottom: orientation === 'mobile-landscape' ? '1rem' : '3rem',
          margin: '2rem auto',
        }}
      >
        <Typography
          variant='h3'
          textAlign='center'
          color={theme.palette.themePrimary}
          margin='1rem 0 0'
          fontSize={
            isMobile
              ? theme.typography.fontSizes.clamp5
              : theme.typography.fontSizes.clamp6
          }
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
          fontSize={
            isMobile
              ? theme.typography.fontSizes.clamp4
              : theme.typography.fontSizes.clamp5
          }
          style={{
            fontStyle: 'italic',
            ...styles.textContent,
            maxWidth: '80%',
          }}
        >
          {SERVICES_EXPORTS.FLUXLINE_SECONDARY_TAGLINE}
        </Typography>
      </div>
      <hr style={styles.hrStyles} />
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
  const { theme } = useAppTheme();

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
            // New hierarchical structure for all service pages
            <>
              {/* 1. Hero Section / Opening Line */}
              <HeroSection currentView={actualView} />

              {/* 2. Program Overview & Archetype Mapping */}
              <OverviewSection currentView={actualView} />

              {/* 3. Services Offered (Bullet Format) */}
              <ServicesOfferedSection currentView={actualView} />

              {/* 4. Program Tiers Offered (Grid or Cards) */}
              <ProgramTiersSection currentView={actualView} />

              {/* 5. White Paper */}
              <WhitePagesSection currentView={actualView} />

              {/* 6. Ready to Get Started? (Final CTA) */}
              <div style={{ margin: '3rem 0 2rem 0' }}>
                <Container
                  marginLeft='auto'
                  marginRight='auto'
                  maxWidth='1000px'
                  style={{ textAlign: 'center' }}
                >
                  <H2Title
                    name='Ready to Get Started?'
                    style={{ margin: '0 0 1.5rem 0', textAlign: 'center' }}
                  />
                  <Typography
                    variant='p'
                    color={theme.palette.neutralSecondary}
                    marginBottom='2rem'
                    style={{
                      textAlign: 'center',
                      fontStyle: 'italic',
                      maxWidth: '600px',
                      margin: '0 auto 2rem auto',
                      display: 'block',
                    }}
                  >
                    {actualView === 'personal-training'
                      ? 'This is the threshold crossing. The ritual begins.'
                      : 'Transform your vision into reality with expert guidance.'}
                  </Typography>
                  <GetStarted isServicesPage />
                </Container>
              </div>
            </>
          )}
        </div>
      </FadeUp>
    </AnimatePresence>
  );
};

export default Services;
