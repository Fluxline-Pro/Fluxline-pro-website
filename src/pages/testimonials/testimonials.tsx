import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../page-wrapper/page-wrapper';
import { Container } from '../../theme/layouts/Container';
import { LayoutGrid } from '../../theme/layouts/LayoutGrid';
import { UnifiedCard } from '../../theme/components/card';
import { Typography } from '../../theme/components/typography/typography';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useIsMobile, useIsTablet } from '../../theme/hooks/useMediaQuery';
import { generateMockContent } from '../../utils/contentDataManager';
import { TestimonialModal } from '../../theme/components/modal/testimonial-modal';
import { TestimonialCarousel } from '../../theme/components/carousel/testimonial-carousel';
import { FeaturedTestimonial } from '../../theme/components/featured-testimonial/featured-testimonial';
import { NavigationArrow } from '../../theme/components/navigation-arrow/navigation-arrow';
import { ContentItem } from '../unified-content-page/unified-content-page';

const Testimonials: React.FC = () => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Generate mock testimonials data
  const [testimonials] = useState<ContentItem[]>(() => 
    generateMockContent('testimonials', 12)
  );

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<ContentItem | null>(null);

  // Get featured testimonials (first 2)
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

  // Determine grid columns based on screen size
  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  const handleCardClick = (testimonial: ContentItem) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(null);
  };

  return (
    <PageWrapper
      showImageTitle={false}
    >
      <Container
        display="flex"
        flexDirection="column"
        gap={theme.spacing.xxl}
        paddingBottom={theme.spacing.xxl}
      >
        {/* Page Header */}
        <Container
          display="flex"
          flexDirection="column"
          gap={theme.spacing.m}
          alignItems="center"
        >
          <Container
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={theme.spacing.s}
            style={{ padding: '0', position: 'relative', width: '100%' }}
          >
            <div style={{ position: 'absolute', left: 0 }}>
              <NavigationArrow
                direction='backward'
                navigate={() => navigate('/about')}
                size={isMobile ? 'large' : 'medium'}
                showBackground={false}
              />
            </div>
            <Typography
              variant="h1"
              fontSize={isMobile ? theme.typography.fontSizes.clamp8 : theme.typography.fontSizes.clamp8}
              color={theme.palette.themePrimary}
              fontVariationSettings="wght 600,wdth 300,slnt 0"
              textAlign="center"
            >
              What Our Clients Say
            </Typography>
          </Container>
          <Typography
            variant="p"
            fontSize={theme.typography.fontSizes.clamp4}
            color={theme.palette.neutralSecondary}
            maxWidth="800px"
            textAlign="center"
          >
            Hear from the businesses and individuals we've helped transform through
            strategic consulting, training, and development services.
          </Typography>
        </Container>

        {/* Featured Testimonial Carousel */}
        {featuredTestimonials.length > 0 && (
          <FadeUp>
            <Container
              display="flex"
              flexDirection="column"
              gap={theme.spacing.m}
            >
              <Typography
                variant="h2"
                fontSize={theme.typography.fontSizes.clamp6}
                color={theme.palette.neutralPrimary}
                fontVariationSettings="wght 500,wdth 300,slnt 0"
              >
                Featured Testimonials
              </Typography>
              <TestimonialCarousel
                onItemClick={(index) => handleCardClick(featuredTestimonials[index])}
              >
                {featuredTestimonials.map((testimonial) => (
                  <FeaturedTestimonial
                    key={testimonial.id}
                    testimonial={{
                      title: testimonial.title,
                      imageUrl: testimonial.imageUrl,
                      imageAlt: testimonial.imageAlt,
                      company: testimonial.company,
                      jobTitle: testimonial.jobTitle,
                      quote: testimonial.quote,
                      rating: testimonial.rating,
                    }}
                    onViewFull={() => handleCardClick(testimonial)}
                  />
                ))}
              </TestimonialCarousel>
            </Container>
          </FadeUp>
        )}

        {/* All Testimonials Grid */}
        <FadeUp delay={200}>
          <Container
            display="flex"
            flexDirection="column"
            gap={theme.spacing.m}
          >
            <Typography
              variant="h2"
              fontSize={theme.typography.fontSizes.clamp6}
              color={theme.palette.neutralPrimary}
              fontVariationSettings="wght 500,wdth 300,slnt 0"
            >
              All Testimonials
            </Typography>
            <LayoutGrid columns={columns} gap="1.5rem">
              {regularTestimonials.map((testimonial) => (
                <UnifiedCard
                  key={testimonial.id}
                  id={testimonial.id}
                  title={testimonial.title}
                  description={testimonial.quote || testimonial.description}
                  imageUrl={testimonial.imageUrl}
                  imageAlt={testimonial.imageAlt}
                  viewType="grid"
                  onClick={() => handleCardClick(testimonial)}
                  elevation="medium"
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
            </LayoutGrid>
          </Container>
        </FadeUp>

        {/* Testimonials Carousel Preview (Bottom of page) */}
        <FadeUp delay={400}>
          <Container
            display="flex"
            flexDirection="column"
            gap={theme.spacing.m}
          >
            <Typography
              variant="h2"
              fontSize={theme.typography.fontSizes.clamp6}
              color={theme.palette.neutralPrimary}
              fontVariationSettings="wght 500,wdth 300,slnt 0"
            >
              Browse Testimonials
            </Typography>
            <TestimonialCarousel
              onItemClick={(index) => handleCardClick(testimonials[index])}
            >
              {testimonials.map((testimonial) => (
                <UnifiedCard
                  key={`carousel-${testimonial.id}`}
                  id={testimonial.id}
                  title={testimonial.title}
                  description={testimonial.quote || testimonial.description}
                  imageUrl={testimonial.imageUrl}
                  imageAlt={testimonial.imageAlt}
                  viewType="small"
                  elevation="low"
                />
              ))}
            </TestimonialCarousel>
          </Container>
        </FadeUp>
      </Container>

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <TestimonialModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          testimonial={{
            title: selectedTestimonial.title,
            imageUrl: selectedTestimonial.imageUrl,
            imageAlt: selectedTestimonial.imageAlt,
            company: selectedTestimonial.company,
            jobTitle: selectedTestimonial.jobTitle,
            services: selectedTestimonial.services,
            quote: selectedTestimonial.quote,
            fullText: selectedTestimonial.fullText,
            rating: selectedTestimonial.rating,
          }}
        />
      )}
    </PageWrapper>
  );
};

export default Testimonials;
