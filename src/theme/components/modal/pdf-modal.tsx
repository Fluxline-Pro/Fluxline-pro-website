import React, { useEffect, useCallback } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          animation: 'fadeIn 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
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
            backgroundColor: theme.palette.neutralLighterAlt,
            borderRadius: `${theme.borderRadius.container.button} ${theme.borderRadius.container.button} 0 0`,
          }}
        >
          <h3
            style={{
              margin: 0,
              color: theme.palette.black, // Use black text for better readability in both light and dark modes
              fontSize: theme.typography.fontSizes.clamp5,
              fontWeight: 600,
              textTransform: 'capitalize',
              textShadow: 'none',
            }}
          >
            {pdfTitle}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
j          </div>
        </div>

        {/* PDF Viewer */}
        <iframe
          src={pdfSrc}
          title={pdfTitle}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: `0 0 ${theme.borderRadius.container.button} ${theme.borderRadius.container.button}`,
            backgroundColor: theme.palette.white,
          }}
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
