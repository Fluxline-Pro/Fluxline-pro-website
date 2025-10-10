import React, { useState } from 'react';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { Typography } from '../../theme/components/typography/typography';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import PageWrapper from '../page-wrapper/page-wrapper';
import WHITE_PAGES, { WhitePageItem } from './white-pages-constants';

const styles = {
  sectionContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '3rem',
  },
  cardContainer: (isMobile: boolean) => ({
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  }),
  card: (theme: any, isHovered: boolean) => ({
    backgroundColor: theme.palette.neutralLight,
    borderRadius: theme.borderRadius.container.button,
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `2px solid ${isHovered ? theme.palette.themePrimary : 'transparent'}`,
    boxShadow: isHovered ? theme.shadows.xl : theme.shadows.card,
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
  }),
  h2Title: (theme: any) => ({
    color: theme.palette.themePrimary,
    margin: '1rem 0 0.5rem 0',
    fontSize: theme.typography.fontSizes.clamp7,
    fontVariationSettings: 'wght 400,wdth 300,slnt 0',
  }),
};

export const WhitePagesView: React.FC = () => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  const [selectedPdf, setSelectedPdf] = useState<WhitePageItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  const handleCardClick = (whitePage: WhitePageItem) => {
    setSelectedPdf(whitePage);
  };

  const handleCloseModal = () => {
    setSelectedPdf(null);
  };

  return (
    <PageWrapper showImageTitle={true}>
      <FadeUp delay={0}>
        <div>
          <div style={styles.sectionContainer}>
            <Typography
              variant='h2'
              style={styles.h2Title(theme)}
              textAlign='center'
              margin='0 0 1.5rem 0'
            >
              Services White Pages
            </Typography>
            <Typography
              variant='p'
              textAlign='center'
              color={theme.palette.neutralPrimary}
              marginBottom='2rem'
              noHyphens
            >
              Explore detailed information about each of our services. Click on any
              service below to view the complete white paper.
            </Typography>

            <div style={styles.cardContainer(isMobile)}>
              {WHITE_PAGES.map((whitePage) => (
                <div
                  key={whitePage.id}
                  style={styles.card(theme, hoveredCard === whitePage.id)}
                  onClick={() => handleCardClick(whitePage)}
                  onMouseEnter={() => setHoveredCard(whitePage.id)}
                  onMouseLeave={() => setHoveredCard(null)}
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
                  >
                    {whitePage.description}
                  </Typography>
                  <Typography
                    variant='p'
                    color={theme.palette.themePrimary}
                    marginTop='1rem'
                    fontWeight='600'
                    fontSize='0.9rem'
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span role="img" aria-label="Document">📄</span> View White Paper
                  </Typography>
                </div>
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
