import React, { useEffect, useCallback } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { FluentButton } from '../button/button';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfSrc: string;
  pdfTitle: string;
}

export const PdfModal: React.FC<PdfModalProps> = ({
  isOpen,
  onClose,
  pdfSrc,
  pdfTitle,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  // Create a stable close handler that dispatches events
  const handleClose = useCallback(() => {
    // Explicitly dispatch close event before calling onClose
    window.dispatchEvent(new Event('pdf-modal-close'));
    onClose();
  }, [onClose]);

  // Notify when PDF modal state changes
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new Event('pdf-modal-open'));
    } else {
      window.dispatchEvent(new Event('pdf-modal-close'));
    }

    // Cleanup function to ensure event is fired when component unmounts
    return () => {
      if (isOpen) {
        window.dispatchEvent(new Event('pdf-modal-close'));
      }
    };
  }, [isOpen]);

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original overflow and position
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const scrollY = window.scrollY;

      // Lock the body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scroll position
        window.scrollTo(0, scrollY);

        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfSrc;
    link.download = pdfTitle;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '0',
        overflow: 'hidden',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative',
          width: isMobile ? '100vw' : '90vw',
          height: isMobile ? '100vh' : '90vh',
          maxWidth: isMobile ? '100vw' : '1200px',
          maxHeight: isMobile ? '100vh' : '90vh',
          animation: 'fadeIn 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          borderRadius: isMobile ? '0' : theme.borderRadius.container.button,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '0.75rem' : '1rem',
            backgroundColor:
              theme.themeMode === 'high-contrast'
                ? theme.semanticColors.warningBackground
                : theme.palette.neutralLight,
            borderRadius: isMobile
              ? '0'
              : `${theme.borderRadius.container.button} ${theme.borderRadius.container.button} 0 0`,
            minHeight: isMobile ? '60px' : 'auto',
            gap: '1rem',
            flexWrap: 'nowrap',
          }}
        >
          <h3
            style={{
              margin: 0,
              color: theme.palette.neutralPrimary,
              fontSize: theme.typography.fontSizes.clamp5,
              fontWeight: 600,
              textTransform: 'capitalize',
              textShadow: 'none',
              fontFamily: theme.typography.fontFamilies.heading,
              flex: '1 1 auto',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {pdfTitle}
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.5rem' : '1rem',
              flexShrink: 0,
              flexWrap: 'nowrap',
            }}
          >
            <FluentButton
              variant='primary'
              onClick={handleDownload}
              icon='Download'
              iconPosition='start'
              size='medium'
              style={{
                fontWeight: '500 !important',
                fontSize: theme.typography.fontSizes.clamp5,
              }}
            >
              Download
            </FluentButton>
            <FluentButton
              variant='error'
              onClick={handleClose}
              icon='Cancel'
              showIconOnly={true}
              size='medium'
              style={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                minWidth: '40px',
                padding: '0',
              }}
            />
          </div>
        </div>

        {/* PDF Viewer */}
        <iframe
          src={`${pdfSrc}#view=FitH&toolbar=1&navpanes=1&scrollbar=1&page=1`}
          title={pdfTitle}
          style={{
            width: '100%',
            height: isMobile ? 'calc(100vh - 60px)' : 'calc(90vh - 80px)',
            border: 'none',
            borderRadius: isMobile
              ? '0'
              : `0 0 ${theme.borderRadius.container.button} ${theme.borderRadius.container.button}`,
            backgroundColor: theme.palette.white,
            flex: 1,
          }}
          allowFullScreen
        />
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `,
        }}
      />
    </div>
  );
};
