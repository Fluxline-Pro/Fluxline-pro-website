import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { Typography } from '../../theme/components/typography/typography';
import { TestimonialCarousel } from '../../theme/components/carousel/testimonial-carousel';
import { UnifiedCard } from '../../theme/components/card';
import { FluentButton } from '../../theme/components/button/button';
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
                      backgroundColor: theme.themeMode === 'high-contrast'
                        ? theme.palette.neutralDark
                        : theme.palette.neutralLight,
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

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <FluentButton
            variant='primary'
            size='medium'
            onClick={handleViewAll}
            icon='ChevronRight'
            iconPosition='end'
            text='View All Testimonials'
          />
        </div>
      </div>
    </>
  );
};

export default TestimonialsSection;
