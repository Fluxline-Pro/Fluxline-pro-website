import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useIsMobile, useIsTablet } from '../../theme/hooks/useMediaQuery';
import { Typography } from '../../theme/components/typography/typography';
import { Container } from '../../theme/layouts/Container';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { PdfModal } from '../../theme/components/modal/pdf-modal';
import PageWrapper from '../page-wrapper/page-wrapper';
import NavigationArrow from '../../theme/components/navigation-arrow/navigation-arrow';
import { BaseCard } from '../../theme/components/card/base-card/base-card';
import FluentSpinner from '../../theme/components/loading-spinner/loading-spinner';
import { LEGAL_PAGES, LegalPageItem, LegalPageType } from './legal-constants';
import './legal-page.css';

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
  html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
  // Wrap consecutive <li> elements in a single <ul>
  html = html.replace(/((?:<li>.*?<\/li>\s*)+)/gs, '<ul>$1</ul>');

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

export const LegalPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [selectedDoc, setSelectedDoc] = useState<LegalPageItem | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);

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

  const handleCardClick = (doc: LegalPageItem) => {
    if (doc.isPdf) {
      setSelectedDoc(doc);
      setPdfModalOpen(true);
    } else {
      navigate(`/legal/${doc.id}`);
    }
  };

  const handleClosePdfModal = () => {
    setPdfModalOpen(false);
  };

  const handleBackToList = () => {
    navigate('/legal');
  };

  const styles = {
    mainContainer: {
      maxWidth: isMobile ? '100%' : isTablet ? '700px' : '900px',
      margin: '0 auto',
      padding: isMobile ? theme.spacing.m : theme.spacing.xl,
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row' as const,
      alignItems: 'center',
      gap: theme.spacing.m,
      marginBottom: theme.spacing.xl,
    },
    h2Title: {
      color: theme.palette.themePrimary,
      fontSize: theme.typography.fontSizes.clamp7,
      fontFamily: theme.typography.fonts.h2.fontFamily,
      fontWeight: theme.typography.fonts.h2.fontWeight,
      fontVariationSettings: theme.typography.fonts.h2.fontVariationSettings,
      textTransform: theme.typography.fonts.h2.textTransform as string,
      letterSpacing: theme.typography.fonts.h2.letterSpacing,
      lineHeight: theme.typography.fonts.h2.lineHeight,
      margin: 0,
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: theme.spacing.l,
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
          <div style={styles.mainContainer}>
            <Container
              display='flex'
              flexDirection='row'
              justifyContent='flex-start'
              alignItems='center'
              marginBottom='1rem'
              gap={theme.spacing.s}
              style={{ padding: 0 }}
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
            >
              Access important legal documents and reference materials for the
              Fluxline Resonance Group. These documents outline our policies,
              terms, and core definitions.
            </Typography>

            <div style={styles.cardGrid}>
              {LEGAL_PAGES.map((doc) => (
                <div
                  key={doc.id}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <BaseCard
                    onClick={() => handleCardClick(doc)}
                  >
                    <Typography
                      variant='h3'
                      fontSize={theme.typography.fontSizes.clamp5}
                      color={theme.palette.themePrimary}
                      marginBottom={theme.spacing.s}
                    >
                      {doc.title}
                    </Typography>
                    <Typography
                      variant='p'
                      fontSize={theme.typography.fontSizes.clamp3}
                      color={theme.palette.neutralPrimary}
                    >
                      {doc.description}
                    </Typography>
                    {doc.isPdf && (
                      <Typography
                        variant='p'
                        fontSize={theme.typography.fontSizes.clamp2}
                        color={theme.palette.themeTertiary}
                        marginTop={theme.spacing.s}
                        style={{ fontStyle: 'italic' }}
                      >
                        PDF Document
                      </Typography>
                    )}
                  </BaseCard>
                </div>
              ))}
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
        <div style={styles.mainContainer}>
          <div style={styles.headerContainer}>
            <NavigationArrow
              direction='backward'
              navigate={handleBackToList}
              size={isMobile ? 'large' : 'medium'}
              showBackground={false}
            />
            <Typography variant='h2' style={styles.h2Title}>
              {selectedDoc.title}
            </Typography>
          </div>

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
              <div
                className='legal-document-content'
                dangerouslySetInnerHTML={{
                  __html: basicMarkdownToHtml(documentContent),
                }}
                style={{
                  fontFamily: theme.typography.fonts.body.fontFamily,
                  fontSize: theme.typography.fontSizes.clamp4,
                  lineHeight: '1.8',
                  color: theme.palette.neutralPrimary,
                }}
              />
            </div>
          )}
        </div>
      </FadeUp>
    </PageWrapper>
  );
};

export default LegalPage;
