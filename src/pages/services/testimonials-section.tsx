import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { Typography } from '../../theme/components/typography/typography';
import { TestimonialCarousel } from '../../theme/components/carousel/testimonial-carousel';
import { UnifiedCard } from '../../theme/components/card';
import { generateMockContent } from '../../utils/contentDataManager';
import { ContentItem } from '../unified-content-page/unified-content-page';

interface TestimonialsSectionProps {
  currentView: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  currentView,
}) => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();

  // Generate testimonials data - get 6 testimonials, show first 3 in carousel
  const [testimonials] = useState<ContentItem[]>(() =>
    generateMockContent('testimonials', 6)
  );

  // Only show for 'about' view
  if (currentView !== 'about') {
    return null;
  }

  const hrStyles = {
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };

  const sectionContainerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '3rem',
  };

  const viewAllButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: theme.palette.themePrimary,
    color: theme.palette.white,
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: theme.typography.fonts.tiny.fontFamily,
    fontSize: theme.typography.fontSizes.clamp3,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    marginTop: '1.5rem',
  };

  const handleViewAll = () => {
    navigate('/testimonials');
  };

  return (
    <>
      <hr style={hrStyles} />
      <div style={sectionContainerStyle}>
        <Typography
          variant='h2'
          fontSize={theme.typography.fontSizes.clamp7}
          color={theme.palette.themePrimary}
          fontVariationSettings='wght 500,wdth 300,slnt 0'
          textAlign='center'
          marginBottom={theme.spacing.m}
        >
          What Our Clients Say
        </Typography>

        <Typography
          variant='p'
          fontSize={theme.typography.fontSizes.clamp4}
          color={theme.palette.neutralSecondary}
          textAlign='center'
          marginBottom={theme.spacing.xl}
          style={{ maxWidth: '700px', margin: '0 auto 2rem auto' }}
        >
          Hear from the businesses and individuals we've helped transform
          through strategic consulting and development services.
        </Typography>

        <TestimonialCarousel>
          {testimonials.slice(0, 3).map((testimonial) => (
            <UnifiedCard
              key={testimonial.id}
              id={testimonial.id}
              title={testimonial.title}
              description={testimonial.quote || testimonial.description}
              imageUrl={testimonial.imageUrl}
              imageAlt={testimonial.imageAlt}
              viewType='grid'
              elevation='medium'
              leftChildren={
                testimonial.imageUrl ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      backgroundColor: theme.palette.neutralLighterAlt,
                      padding: theme.spacing.m,
                    }}
                  >
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.imageAlt || `${testimonial.title} photo`}
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `2px solid ${theme.palette.themePrimary}`,
                        boxShadow: theme.shadows.cardImage,
                      }}
                    />
                  </div>
                ) : undefined
              }
            />
          ))}
        </TestimonialCarousel>

        <div style={{ textAlign: 'center' }}>
          <button
            type='button'
            onClick={handleViewAll}
            style={viewAllButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.palette.themeDark;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = theme.shadows.xl;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.themePrimary;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>View All Testimonials</span>
            <span style={{ fontSize: '1rem' }}>➤</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TestimonialsSection;
