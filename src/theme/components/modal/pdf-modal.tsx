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

  // Detect Safari/WebKit for mobile PDF fallback
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isWebKit =
    /webkit/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
  const isMobileSafari = (isSafari || isWebKit) && isMobile;

  // Safari iOS fallback - open PDF in new tab instead of modal
  useEffect(() => {
    if (isOpen && isMobileSafari) {
      // Open PDF in new tab for mobile Safari users
      window.open(pdfSrc, '_blank');
      // Close the modal immediately since we're opening in new tab
      onClose();
    }
  }, [isOpen, isMobileSafari, pdfSrc, onClose]);

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

  // Lock body scroll when modal is open - simplified approach
  useEffect(() => {
    if (isOpen) {
      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      // Scroll to top when modal opens
      window.scrollTo(0, 0);

      // Prevent scroll event handler
      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      // Apply scroll lock after scroll-to-top completes
      const scrollLockTimeout = setTimeout(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
        document.body.style.position = 'fixed';
        document.body.style.top = '0';
        document.body.style.width = '100%';

        // Add event listeners to prevent scrolling
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, {
          passive: false,
        });
        document.addEventListener('scroll', preventScroll, { passive: false });
      }, 100);

      return () => {
        // Clear timeout if component unmounts before it completes
        clearTimeout(scrollLockTimeout);

        // Remove event listeners
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
        document.removeEventListener('scroll', preventScroll);

        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Don't render modal for mobile Safari - PDF opens in new tab instead
  if (isMobileSafari) return null;

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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '2vh 2vw' : '0',
        overflow: 'hidden',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative',
          width: isMobile ? '96vw' : '90vw',
          height: isMobile ? '96vh' : '90vh',
          maxWidth: isMobile ? '96vw' : '1200px',
          maxHeight: isMobile ? '96vh' : '90vh',
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
            borderRadius: isMobile
              ? '0'
              : `${theme.borderRadius.container.button} ${theme.borderRadius.container.button} 0 0`,
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
            isMobile
              ? `${pdfSrc}#view=FitH&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&page=1`
              : `${pdfSrc}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`
          }
          title={pdfTitle}
          style={{
            width: '100%',
            height: 'calc(100% - 60px)',
            border: 'none',
            borderRadius: isMobile
              ? '0'
              : `0 0 ${theme.borderRadius.container.button} ${theme.borderRadius.container.button}`,
            backgroundColor: theme.palette.white,
            flex: 1,
            overflow: 'hidden',
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
