import React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../typography/typography';
import { Container } from '../../layouts/Container';
import { useIsMobile } from '../../hooks/useMediaQuery';
import FluentButton from '../button/button';

export interface FeaturedTestimonialProps {
  testimonial: {
    title: string; // Client name
    imageUrl?: string;
    imageAlt?: string;
    company?: string;
    jobTitle?: string;
    quote?: string;
    rating?: number;
  };
  onViewFull?: () => void;
}

export const FeaturedTestimonial: React.FC<FeaturedTestimonialProps> = ({
  testimonial,
  onViewFull,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  return (
    <Container
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      alignItems="center"
      gap={isMobile ? theme.spacing.m : theme.spacing.xl}
      padding={isMobile ? theme.spacing.l : theme.spacing.xxl}
      style={{
        backgroundColor: theme.palette.neutralLighterAlt,
        borderRadius: theme.borderRadius.container.card,
        border: `2px solid ${theme.palette.themePrimary}`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: `linear-gradient(90deg, ${theme.palette.themePrimary} 0%, ${theme.palette.themeSecondary} 100%)`,
        }}
      />

      {/* Avatar */}
      {testimonial.imageUrl && (
        <Container
          style={{
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <img
            src={testimonial.imageUrl}
            alt={testimonial.imageAlt || `${testimonial.title} photo`}
            style={{
              width: isMobile ? '120px' : '180px',
              height: isMobile ? '120px' : '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `4px solid ${theme.palette.themePrimary}`,
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            }}
          />
          {/* Featured badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
            aria-label="Featured"
          >
            ★
          </div>
        </Container>
      )}

      {/* Content */}
      <Container
        display="flex"
        flexDirection="column"
        gap={theme.spacing.m}
        alignItems={isMobile ? 'center' : 'flex-start'}
        style={{ flex: 1 }}
      >
        {/* Quote */}
        {testimonial.quote && (
          <Container
            padding={theme.spacing.m}
            style={{
              backgroundColor: theme.palette.white,
              borderLeft: `4px solid ${theme.palette.themePrimary}`,
              borderRadius: theme.borderRadius.container.button,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography
              variant="p"
              fontSize={isMobile ? theme.typography.fontSizes.clamp4 : theme.typography.fontSizes.clamp5}
              color={theme.palette.neutralPrimary}
              lineHeight="1.6"
              textAlign={isMobile ? 'center' : 'left'}
              style={{ fontStyle: 'italic' }}
            >
              "{testimonial.quote}"
            </Typography>
          </Container>
        )}

        {/* Client info */}
        <Container
          display="flex"
          flexDirection="column"
          gap={theme.spacing.s1}
          alignItems={isMobile ? 'center' : 'flex-start'}
        >
          <Typography
            variant="h3"
            fontSize={theme.typography.fontSizes.clamp5}
            color={theme.palette.neutralPrimary}
            fontWeight={700}
            textAlign={isMobile ? 'center' : 'left'}
          >
            {testimonial.title}
          </Typography>
          {testimonial.jobTitle && (
            <Typography
              variant="p"
              fontSize={theme.typography.fontSizes.clamp3}
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

          {/* Rating */}
          {testimonial.rating && (
            <Container
              display="flex"
              alignItems="center"
              gap={theme.spacing.s1}
              marginTop={theme.spacing.s1}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: '1.25rem',
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
            </Container>
          )}
        </Container>

        {/* CTA Button */}
        {onViewFull && (
          <FluentButton
            text="View Full Testimonial"
            onClick={onViewFull}
            iconProps={{ iconName: 'ChevronRight' }}
            styles={{
              root: {
                marginTop: theme.spacing.s2,
              },
            }}
          />
        )}
      </Container>
    </Container>
  );
};
