import React, { useEffect } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Prevent body scroll when modal is open on mobile
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }

    // Add data attribute to body to indicate modal is open for navigation hiding
    if (isOpen) {
      document.body.setAttribute('data-image-modal-open', 'true');
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll
      if (isMobile) {
        document.body.style.overflow = 'unset';
        document.body.style.position = 'unset';
        document.body.style.width = 'unset';
        document.body.style.height = 'unset';
      }
      // Remove data attribute
      document.body.removeAttribute('data-image-modal-open');
    };
  }, [isOpen, onClose, isMobile]);

  if (!isOpen) return null;

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
        backgroundColor: isMobile ? '#000000' : 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '0' : theme.spacing.l,
        overflow: 'hidden',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: isMobile ? '100vw' : '90%',
          height: isMobile ? '100vh' : '90%',
          maxWidth: isMobile ? '100vw' : '90%',
          maxHeight: isMobile ? '100vh' : '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-in-out',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing modal
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{
            width: isMobile ? '100vw' : 'auto',
            height: isMobile ? '100vh' : 'auto',
            maxWidth: isMobile ? '100vw' : '100%',
            maxHeight: isMobile ? '100vh' : '90vh',
            objectFit: isMobile ? 'contain' : 'contain',
            objectPosition: 'center',
            boxShadow: isMobile ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.5)',
            borderRadius: '0',
          }}
        />
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: isMobile ? theme.spacing.l : '-30px',
            right: isMobile ? theme.spacing.l : '-30px',
            background: isMobile
              ? 'rgba(255, 255, 255, 0.9)'
              : theme.palette.neutralLighterAlt,
            color: isMobile
              ? theme.palette.neutralDark
              : theme.palette.neutralPrimary,
            border: 'none',
            borderRadius: '50%',
            width: isMobile ? '48px' : '40px',
            height: isMobile ? '48px' : '40px',
            fontSize: isMobile ? '24px' : '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isMobile
              ? '0 2px 10px rgba(0, 0, 0, 0.3)'
              : '0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease',
            zIndex: 1001,
          }}
        >
          ✕
        </button>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `,
        }}
      />
    </div>
  );
};
