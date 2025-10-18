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

  // Detect Safari/WebKit
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isWebKit =
    /webkit/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);

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
      const originalWidth = document.body.style.width;
      const scrollY = window.scrollY;

      // For mobile portrait, use a simpler approach to prevent background scrolling
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100dvh';
        document.body.style.touchAction = 'none';
      } else {
        // Desktop/tablet approach with position fixed
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
      }

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.height = '';
        document.body.style.touchAction = '';

        // Only restore scroll position for non-mobile (where we used position fixed)
        if (!isMobile) {
          window.scrollTo(0, scrollY);
        }
      };
    }
  }, [isOpen, isMobile]);

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
        width: isMobile ? '100dvw' : '100vw',
        height: isMobile ? '100dvh' : '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '5dvh 5dvw' : '0',
        overflow: 'hidden',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative',
          width: isMobile ? '90dvw' : '90vw',
          height: isMobile ? '90dvh' : '90vh',
          maxWidth: isMobile ? '90dvw' : '1200px',
          maxHeight: isMobile ? '90dvh' : '90vh',
          animation: 'fadeIn 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.white,
          borderRadius: theme.borderRadius.container.button,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor:
              theme.themeMode === 'high-contrast'
                ? theme.semanticColors.warningBackground
                : theme.palette.neutralLight,
            borderRadius: `${theme.borderRadius.container.button} ${theme.borderRadius.container.button} 0 0`,
            minHeight: '60px',
            gap: '1rem',
            flexWrap: 'nowrap',
            flexShrink: 0,
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
              gap: '1rem',
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
          src={
            isMobile || isSafari || isWebKit
              ? `${pdfSrc}#view=Fit&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&page=1`
              : `${pdfSrc}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`
          }
          title={pdfTitle}
          style={{
            width: '100%',
            height: 'calc(100% - 60px)',
            border: 'none',
            borderRadius: `0 0 ${theme.borderRadius.container.button} ${theme.borderRadius.container.button}`,
            backgroundColor: theme.palette.white,
            flex: 1,
            // Safari-specific styles
            ...(isSafari || isWebKit
              ? {
                  WebkitOverflowScrolling: 'touch',
                  overflow: 'auto',
                }
              : {}),
          }}
          allowFullScreen
          // Safari-specific attributes
          {...(isSafari || isWebKit
            ? {
                'data-pdf-viewer': 'safari',
                sandbox:
                  'allow-same-origin allow-scripts allow-popups allow-forms',
              }
            : {})}
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
