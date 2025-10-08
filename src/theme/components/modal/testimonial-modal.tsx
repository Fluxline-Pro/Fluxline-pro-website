import React, { useEffect } from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../typography/typography';
import { Container } from '../../layouts/Container';
import { useIsMobile } from '../../hooks/useMediaQuery';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    title: string; // Client name
    imageUrl?: string;
    imageAlt?: string;
    company?: string;
    jobTitle?: string;
    services?: string;
    quote?: string;
    fullText?: string;
    rating?: number;
  };
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  testimonial,
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

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: isMobile ? '1rem' : '2rem',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <div
        style={{
          position: 'relative',
          maxWidth: isMobile ? '100%' : '800px',
          maxHeight: '90vh',
          width: '100%',
          backgroundColor: theme.palette.white,
          borderRadius: theme.borderRadius.container.card,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          animation: 'fadeIn 0.3s ease-in-out',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: isMobile ? '1rem' : '1.5rem',
            right: isMobile ? '1rem' : '1.5rem',
            background: theme.palette.neutralLighter,
            color: theme.palette.neutralPrimary,
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.palette.neutralLight;
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.palette.neutralLighter;
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ✕
        </button>

        {/* Modal content */}
        <Container
          display="flex"
          flexDirection="column"
          gap={theme.spacing.l}
          padding={isMobile ? theme.spacing.l : theme.spacing.xl}
        >
          {/* Header with avatar and client info */}
          <Container
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'center' : 'flex-start'}
            gap={theme.spacing.m}
          >
            {testimonial.imageUrl && (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.imageAlt || `${testimonial.title} photo`}
                style={{
                  width: isMobile ? '120px' : '150px',
                  height: isMobile ? '120px' : '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${theme.palette.themePrimary}`,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            )}
            <Container
              display="flex"
              flexDirection="column"
              gap={theme.spacing.s1}
              alignItems={isMobile ? 'center' : 'flex-start'}
              style={{ flex: 1 }}
            >
              <Typography
                variant="h2"
                fontSize={isMobile ? theme.typography.fontSizes.clamp6 : theme.typography.fontSizes.clamp7}
                color={theme.palette.neutralPrimary}
                textAlign={isMobile ? 'center' : 'left'}
              >
                {testimonial.title}
              </Typography>
              {testimonial.jobTitle && (
                <Typography
                  variant="p"
                  fontSize={theme.typography.fontSizes.clamp4}
                  color={theme.palette.neutralSecondary}
                  fontWeight={600}
                  textAlign={isMobile ? 'center' : 'left'}
                >
                  {testimonial.jobTitle}
                </Typography>
              )}
              {testimonial.company && (
                <Typography
                  variant="p"
                  fontSize={theme.typography.fontSizes.clamp3}
                  color={theme.palette.neutralTertiary}
                  textAlign={isMobile ? 'center' : 'left'}
                >
                  {testimonial.company}
                </Typography>
              )}
              {testimonial.services && (
                <Typography
                  variant="caption"
                  fontSize={theme.typography.fontSizes.clamp2}
                  color={theme.palette.themePrimary}
                  textAlign={isMobile ? 'center' : 'left'}
                  style={{
                    marginTop: theme.spacing.s1,
                  }}
                >
                  Services: {testimonial.services}
                </Typography>
              )}
            </Container>
          </Container>

          {/* Testimonial quote */}
          {testimonial.quote && (
            <Container
              padding={theme.spacing.m}
              style={{
                backgroundColor: theme.palette.neutralLighterAlt,
                borderLeft: `4px solid ${theme.palette.themePrimary}`,
                borderRadius: theme.borderRadius.container.button,
              }}
            >
              <Typography
                variant="p"
                fontSize={theme.typography.fontSizes.clamp4}
                color={theme.palette.neutralPrimary}
                lineHeight="1.6"
                style={{ fontStyle: 'italic' }}
              >
                "{testimonial.quote}"
              </Typography>
            </Container>
          )}

          {/* Full testimonial text */}
          {testimonial.fullText && (
            <Container>
              <Typography
                variant="p"
                fontSize={theme.typography.fontSizes.clamp3}
                color={theme.palette.neutralPrimary}
                lineHeight="1.8"
              >
                {testimonial.fullText}
              </Typography>
            </Container>
          )}

          {/* Rating display */}
          {testimonial.rating && (
            <Container
              display="flex"
              alignItems="center"
              justifyContent={isMobile ? 'center' : 'flex-start'}
              gap={theme.spacing.s1}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '1.5rem',
                    color:
                      index < testimonial.rating!
                        ? theme.palette.themePrimary
                        : theme.palette.neutralLight,
                  }}
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
              <Typography
                variant="caption"
                fontSize={theme.typography.fontSizes.clamp2}
                color={theme.palette.neutralSecondary}
                style={{ marginLeft: theme.spacing.s1 }}
              >
                {testimonial.rating}/5
              </Typography>
            </Container>
          )}
        </Container>
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
