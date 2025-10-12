import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { Typography } from '../../theme/components/typography/typography';
import { Container } from '../../theme/layouts/Container';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import PageWrapper from '../page-wrapper/page-wrapper';
import NavigationArrow from '../../theme/components/navigation-arrow/navigation-arrow';
import FluentSpinner from '../../theme/components/loading-spinner/loading-spinner';
import { WhitePageCard } from '../../theme/components/card/white-page-card/white-page-card';
import { LEGAL_PAGES, LegalPageItem } from './legal-constants';
import { WhitePageItem } from '../white-pages/white-pages-constants';

// Helper function to convert markdown to HTML
const basicMarkdownToHtml = (markdown: string): string => {
  let html = markdown;

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Convert lists
  html = html.replace(/^- (.+)$/gim, '<li>$1</li>');
  // Wrap consecutive <li> elements in a single <ul>
  html = html.replace(/((?:<li>[\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br/>');

  // Wrap in paragraph tags
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p><h/g, '<h');
  html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
  html = html.replace(/<p><ul>/g, '<ul>');
  html = html.replace(/<\/ul><\/p>/g, '</ul>');

  return html;
};

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

  // Render document list view
  if (!id || !selectedDoc) {
    return (
      <PageWrapper showImageTitle={true}>
        <FadeUp delay={0}>
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
                navigate={() => navigate('/')}
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
        </FadeUp>
      </PageWrapper>
    );
  }

  // Render individual document view
  return (
    <PageWrapper showImageTitle={true}>
      <FadeUp delay={0}>
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
                }

                .legal-document-content h1 {
                  font-size: ${theme.typography.fontSizes.clamp7};
                  margin-top: 0;
                  margin-bottom: ${theme.spacing.xl};
                  line-height: 1.3;
                  color: ${theme.palette.themePrimary};
                  font-family: ${theme.typography.fonts.h1.fontFamily};
                  font-weight: ${theme.typography.fonts.h1.fontWeight};
                }

                .legal-document-content h2 {
                  font-size: ${theme.typography.fontSizes.clamp6};
                  margin-top: ${theme.spacing.xxl};
                  margin-bottom: ${theme.spacing.l};
                  line-height: 1.4;
                  color: ${theme.palette.themePrimary};
                  font-family: ${theme.typography.fonts.h2.fontFamily};
                  font-weight: ${theme.typography.fonts.h2.fontWeight};
                }

                .legal-document-content h3 {
                  font-size: ${theme.typography.fontSizes.clamp5};
                  margin-top: ${theme.spacing.xl};
                  margin-bottom: ${theme.spacing.m};
                  line-height: 1.4;
                  color: ${theme.palette.themePrimary};
                  font-family: ${theme.typography.fonts.h3.fontFamily};
                  font-weight: ${theme.typography.fonts.h3.fontWeight};
                }

                .legal-document-content p {
                  margin-bottom: ${theme.spacing.l};
                  text-align: left;
                }

                .legal-document-content ul {
                  margin: ${theme.spacing.l} 0;
                  padding-left: ${theme.spacing.xl};
                  list-style-type: disc;
                }

                .legal-document-content ul li {
                  margin-bottom: ${theme.spacing.s};
                  line-height: 1.6;
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
                  border-top: 1px solid ${theme.palette.neutralQuaternary};
                  margin: ${theme.spacing.xl} 0;
                }

                @media (max-width: 768px) {
                  .legal-document-content {
                    font-size: 0.95rem;
                  }

                  .legal-document-content h1 {
                    margin-top: 0;
                  }

                  .legal-document-content h2 {
                    margin-top: ${theme.spacing.xl};
                  }

                  .legal-document-content h3 {
                    margin-top: ${theme.spacing.l};
                  }

                  .legal-document-content ul {
                    padding-left: ${theme.spacing.l};
                  }
                }
              `}</style>
              <div
                dangerouslySetInnerHTML={{
                  __html: basicMarkdownToHtml(documentContent),
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
      </FadeUp>
    </PageWrapper>
  );
};

export default LegalPage;
