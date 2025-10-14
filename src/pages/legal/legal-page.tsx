import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { Typography } from '../../theme/components/typography/typography';
import { Container } from '../../theme/layouts/Container';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import PageWrapper from '../page-wrapper/page-wrapper';
import NavigationArrow from '../../theme/components/navigation-arrow/navigation-arrow';
import FluentSpinner from '../../theme/components/loading-spinner/loading-spinner';
import { WhitePageCard } from '../../theme/components/card/white-page-card/white-page-card';
import { LEGAL_PAGES, LegalPageItem } from './legal-constants';
import { WhitePageItem } from '../white-pages/white-pages-constants';
import { basicMarkdownToHtml } from '../../theme/hooks/useBasicMarkdownToHtml';

// Helper function to convert LegalPageItem to WhitePageItem format
const convertLegalToWhitePage = (legalItem: LegalPageItem): WhitePageItem => ({
  id: legalItem.id,
  title: legalItem.title,
  description: legalItem.description,
  pdfPath: legalItem.path,
  displayName: legalItem.title,
  category: 'legal' as any, // Legal doesn't map to existing categories, but we need this for the interface
});

export const LegalPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const orientation = useDeviceOrientation();
  const isMobile =
    orientation === 'portrait' ||
    orientation === 'tablet-portrait' ||
    orientation === 'large-portrait';

  const [selectedDoc, setSelectedDoc] = useState<LegalPageItem | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Load document when id changes
  useEffect(() => {
    if (id) {
      const doc = LEGAL_PAGES.find((page) => page.id === id);
      if (doc) {
        setSelectedDoc(doc);
        if (!doc.isPdf) {
          loadMarkdownContent(doc.path);
        }
      }
    } else {
      setSelectedDoc(null);
      setDocumentContent('');
    }
  }, [id]);

  const loadMarkdownContent = async (path: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(path);
      const text = await response.text();
      setDocumentContent(text);
    } catch (error) {
      console.error('Error loading markdown:', error);
      setDocumentContent('# Error\n\nUnable to load document content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (whitePage: WhitePageItem) => {
    // Find the original legal document
    const legalDoc = LEGAL_PAGES.find((doc) => doc.id === whitePage.id);
    if (legalDoc) {
      if (legalDoc.isPdf) {
        setSelectedDoc(legalDoc);
        setPdfModalOpen(true);
      } else {
        navigate(`/legal/${legalDoc.id}`);
      }
    }
  };

  const handleClosePdfModal = () => {
    setPdfModalOpen(false);
  };

  const handleBackToList = () => {
    navigate('/legal');
  };

  // Reusable style objects matching services.tsx about view
  const styles = {
    sectionContainer: {
      maxWidth: '900px',
      margin: '0 auto',
      marginBottom: '3rem',
    },
    h2Title: {
      color: theme.palette.themePrimary,
      fontSize: theme.typography.fontSizes.clamp7,
      fontFamily: theme.typography.fonts.h2.fontFamily,
      fontWeight: theme.typography.fonts.h2.fontWeight,
      fontVariationSettings: theme.typography.fonts.h2.fontVariationSettings,
      textTransform: theme.typography.fonts.h2
        .textTransform as React.CSSProperties['textTransform'],
      letterSpacing: theme.typography.fonts.h2.letterSpacing,
      lineHeight: theme.typography.fonts.h2.lineHeight,
      margin: 0,
    },
    textContent: {
      textAlign: 'left' as const,
      maxWidth: '800px',
      margin: '0 auto',
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginTop: theme.spacing.xl,
    },
    contentContainer: {
      backgroundColor: theme.semanticColors.bodyBackground,
      borderRadius: theme.effects.roundedCorner4,
      padding: isMobile ? theme.spacing.m : theme.spacing.xxl,
      marginTop: theme.spacing.l,
    },
  };

  return (
    <PageWrapper showImageTitle={true}>
      {/* Render document list view */}
      {!id || !selectedDoc ? (
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
            <NavigationArrow
              direction='backward'
              navigate={() => navigate('/about')}
              size={isMobile ? 'large' : 'medium'}
              showBackground={false}
            />
            <Typography variant='h2' style={styles.h2Title}>
              Legal & Reference
            </Typography>
          </Container>

          <Typography
            variant='p'
            textAlign='left'
            color={theme.palette.neutralPrimary}
            marginBottom='2rem'
            noHyphens
            style={styles.textContent}
          >
            Access important legal documents and reference materials for the
            Fluxline Resonance Group. These documents outline our policies,
            terms, and core definitions.
          </Typography>

          <div style={styles.cardContainer}>
            {LEGAL_PAGES.map((doc) => {
              const whitePageItem = convertLegalToWhitePage(doc);
              return (
                <WhitePageCard
                  key={doc.id}
                  whitePage={whitePageItem}
                  isHovered={hoveredCard === doc.id}
                  onClick={handleCardClick}
                  onMouseEnter={() => setHoveredCard(doc.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  variant='compact'
                  isPdf={doc.isPdf}
                  context='legal'
                />
              );
            })}
          </div>

          {/* PDF Modal */}
          {selectedDoc?.isPdf && (
            <PdfModal
              isOpen={pdfModalOpen}
              onClose={handleClosePdfModal}
              pdfSrc={selectedDoc.path}
              pdfTitle={selectedDoc.title}
            />
          )}
        </div>
      ) : (
        /* Render individual document view */
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
            <NavigationArrow
              direction='backward'
              navigate={handleBackToList}
              size={isMobile ? 'large' : 'medium'}
              showBackground={false}
            />
            <Typography variant='h2' style={styles.h2Title}>
              {selectedDoc.title}
            </Typography>
          </Container>

          {isLoading ? (
            <Container
              display='flex'
              justifyContent='center'
              alignItems='center'
              padding='4rem'
            >
              <FluentSpinner label='Loading document...' showLabel={true} />
            </Container>
          ) : (
            <div style={styles.contentContainer}>
              <style>{`
                .legal-document-content {
                  line-height: 1.8;
                  max-width: 800px;
                  margin: 0 auto;
                  text-align: left;
                }

                .legal-document-content h1 {
                  font-size: ${theme.typography.fontSizes.clamp7};
                  margin: 0;
                  line-height: ${theme.typography.fonts.h1.lineHeight};
                  color: ${theme.palette.themePrimary};
                  font-family: ${theme.typography.fonts.h1.fontFamily};
                  font-weight: ${theme.typography.fonts.h1.fontWeight};
                  font-variation-settings: ${theme.typography.fonts.h1.fontVariationSettings};
                  text-transform: ${theme.typography.fonts.h1.textTransform};
                  letter-spacing: ${theme.typography.fonts.h1.letterSpacing};
                }

                .legal-document-content h2 {
                  font-size: ${theme.typography.fontSizes.clamp6};
                  margin: ${theme.spacing.l} 0 0;
                  line-height: ${theme.typography.fonts.h2.lineHeight};
                  color: ${theme.palette.themePrimary};
                  font-family: ${theme.typography.fonts.h2.fontFamily};
                  font-weight: ${theme.typography.fonts.h2.fontWeight};
                  font-variation-settings: ${theme.typography.fonts.h2.fontVariationSettings};
                  text-transform: ${theme.typography.fonts.h2.textTransform};
                  letter-spacing: ${theme.typography.fonts.h2.letterSpacing};
                }

                .legal-document-content h3 {
                  font-size: ${theme.typography.fontSizes.clamp5};
                  margin: ${theme.spacing.m} 0 0;
                  line-height: ${theme.typography.fonts.h3.lineHeight};
                  color: ${theme.palette.themePrimary};
                  font-family: ${theme.typography.fonts.h3.fontFamily};
                  font-weight: ${theme.typography.fonts.h3.fontWeight};
                  font-variation-settings: ${theme.typography.fonts.h3.fontVariationSettings};
                  text-transform: ${theme.typography.fonts.h3.textTransform};
                  letter-spacing: ${theme.typography.fonts.h3.letterSpacing};
                }

                .legal-document-content p {
                  margin-bottom: ${theme.spacing.l};
                  text-align: left;
                  padding-left: ${theme.spacing.l};
                  font-family: ${theme.typography.fonts.body.fontFamily};
                  font-size: ${theme.typography.fontSizes.clamp4};
                  line-height: 1.8;
                  color: ${theme.palette.neutralPrimary};
                  display: block;
                }

                /* Enhanced spacing for text blocks separated by br tags */
                .legal-document-content br + br {
                  display: block;
                  margin: ${theme.spacing.m} 0;
                  height: ${theme.spacing.s};
                }

                /* Ensure text blocks have proper paragraph-like spacing */
                .legal-document-content {
                  text-align: left;
                }

                .legal-document-content > * + * {
                  margin-top: ${theme.spacing.m};
                }

                .legal-document-content p:last-child {
                  margin-bottom: 0;
                }

                .legal-document-content ul {
                  margin: 0 !important;
                  padding-left: ${theme.spacing.xl};
                  list-style-type: disc;
                }

                .legal-document-content li:last-of-type, .legal-document-content ul li:last-child {
                  margin-bottom: 0;
                }

                .legal-document-content ul li {
                  line-height: 1.6;
                  font-family: ${theme.typography.fonts.body.fontFamily};
                  font-size: ${theme.typography.fontSizes.clamp4};
                  color: ${theme.palette.neutralPrimary};
                  margin-bottom: ${theme.spacing.xs};
                }

                .legal-document-content a {
                  color: ${theme.palette.themePrimary};
                  text-decoration: none;
                  border-bottom: 1px solid transparent;
                  transition: border-bottom-color 0.2s ease;
                }

                .legal-document-content a:hover {
                  border-bottom-color: ${theme.palette.themePrimary};
                }

                .legal-document-content strong {
                  font-weight: 600;
                  color: ${theme.palette.neutralPrimary};
                }

                .legal-document-content em {
                  font-style: italic;
                }

                .legal-document-content hr {
                  border: none;
                  border-top: 1px solid ${theme.palette.neutralSecondary};
                  margin: ${theme.spacing.m} 0 0;
                  opacity: 0.3;
                }

                /* Hidden spacer elements for text separation */
                .legal-document-content hr.text-spacer {
                  border: none;
                  width: 5%;
                  height: 0.25rem;
                  margin: 0.25rem !important;
                  visibility: hidden;
                  opacity: 0;
                }

                /* Remove excessive spacing and ensure consistent gaps */
                .legal-document-content br + br {
                  display: none;
                }

                /* Ensure first paragraph after headings has no top margin */
                .legal-document-content h1 + p,
                .legal-document-content h2 + p,
                .legal-document-content h3 + p {
                  margin-top: 0;
                }

                /* Mobile responsive adjustments matching services.tsx */
                @media (max-width: 768px) {
                  .legal-document-content {
                    font-size: 0.95rem;
                  }

                  .legal-document-content h1 {
                    margin: 0 0 1rem 0;
                  }

                  .legal-document-content h2 {
                    margin: ${theme.spacing.l} 0 0;
                  }

                  .legal-document-content h3 {
                    margin-top: ${theme.spacing.l};
                  }

                  .legal-document-content ul {
                    padding-left: ${theme.spacing.s};
                  }

                  .legal-document-content p {
                    margin-bottom: 0.75rem;
                  }
                }
              `}</style>
              <div
                dangerouslySetInnerHTML={{
                  __html: basicMarkdownToHtml(
                    documentContent,
                    selectedDoc.title
                  ),
                }}
                style={{
                  fontFamily: theme.typography.fonts.body.fontFamily,
                  fontSize: theme.typography.fontSizes.clamp4,
                  lineHeight: '1.8',
                  color: theme.palette.neutralPrimary,
                }}
                className='legal-document-content'
              />
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default LegalPage;
