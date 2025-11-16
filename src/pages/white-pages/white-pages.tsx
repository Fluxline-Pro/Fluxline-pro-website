import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { Typography } from '../../theme/components/typography/typography';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import PageWrapper from '../page-wrapper/page-wrapper';
import { getWhitePagesFromServices } from '../services/constants';
import { WhitePageItem } from './white-pages-constants';
import NavigationArrow from '../../theme/components/navigation-arrow/navigation-arrow';
import { Container } from '../../theme/layouts/Container';
import { WhitePageCard } from '../../theme/components/card/white-page-card/white-page-card';

export const WhitePagesView: React.FC = () => {
  const { theme, layoutPreference } = useAppTheme();
  const orientation = useDeviceOrientation();
  const [selectedPdf, setSelectedPdf] = useState<WhitePageItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  // Create ref for scrollability detection
  const contentRef = React.useRef<HTMLDivElement>(null);

  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  // Get white pages data from consolidated services data
  const whitePages = getWhitePagesFromServices();

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

  const handleCloseModal = () => {
    setSelectedPdf(null);
  };

  const styles = {
    sectionContainer: {
      maxWidth: '900px',
      margin: '0 auto',
      marginBottom: '3rem',
    },
    cardContainer: (isMobile: boolean) => ({
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem',
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

  return (
    <PageWrapper showImageTitle={true} contentRef={contentRef}>
      <FadeUp delay={0}>
        <div>
          <div style={styles.sectionContainer}>
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
              <NavigationArrow
                direction='backward'
                navigate={() => navigate('/services')}
                size={isMobile ? 'large' : 'medium'}
                showBackground={false}
              />
              <Typography
                variant='h2'
                style={styles.h2Title(theme)}
                textAlign='center'
              >
                Explore the Scrolls
              </Typography>
            </Container>
            <Typography
              variant='p'
              textAlign='left'
              color={theme.palette.neutralPrimary}
              marginBottom='2rem'
              noHyphens
            >
              Dive deeper into each offering through our white papers—each one a
              curriculum gate into your next transformation.
            </Typography>

            <div style={styles.cardContainer(isMobile)}>
              {whitePages.map((whitePage) => (
                <WhitePageCard
                  key={whitePage.id}
                  whitePage={whitePage}
                  isHovered={hoveredCard === whitePage.id}
                  onClick={handleCardClick}
                  onMouseEnter={() => setHoveredCard(whitePage.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  variant='default'
                  isPdf={true}
                  context='whitepaper'
                />
              ))}
            </div>
          </div>

          {/* PDF Modal */}
          {selectedPdf && (
            <PdfModal
              isOpen={!!selectedPdf}
              onClose={handleCloseModal}
              pdfSrc={selectedPdf.pdfPath}
              pdfTitle={selectedPdf.title}
            />
          )}
        </div>
      </FadeUp>
    </PageWrapper>
  );
};

export default WhitePagesView;
