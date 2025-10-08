import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useCaseStudiesStore } from '../../store/store-specs/caseStudiesStore';
import { LayoutGrid } from '../../theme/layouts/LayoutGrid';
import { Container } from '../../theme/layouts/Container';
import { Typography } from '../../theme/components/typography/typography';
import { UnifiedCard } from '../../theme/components/card';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useIsMobile, useIsTablet } from '../../theme/hooks/useMediaQuery';
import { FadeUp } from '../../theme/components/animations/fade-animations';
import FluentButton from '../../theme/components/button/button';

export const FeaturedCaseStudies: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const caseStudiesStore = useCaseStudiesStore();

  const featuredStudies = caseStudiesStore.getFeaturedCaseStudies();

  if (featuredStudies.length === 0) {
    return null;
  }

  const handleViewAll = () => {
    navigate('/case-studies');
  };

  const handleCardClick = (slug: string) => {
    navigate(`/case-studies/${slug}`);
  };

  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Container
      style={{
        marginBottom: '3rem',
        padding: isMobile ? '1rem' : '2rem',
      }}
    >
      <FadeUp>
        <Container
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              marginBottom: '0.5rem',
              fontSize: theme.typography.fontSizes.clamp7,
              fontVariationSettings: 'wght 400,wdth 300,slnt 0',
            }}
          >
            Featured Case Studies
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Explore our most impactful client success stories and
            transformations
          </Typography>
        </Container>

        <LayoutGrid
          columns={columns}
          gap='1.5rem'
          margin='0 auto'
          maxWidth='1200px'
        >
          {featuredStudies.map((study, index) => (
            <UnifiedCard
              key={study.slug}
              id={study.slug}
              title={study.title}
              description={study.description}
              imageUrl={study.imageUrl}
              imageAlt={`${study.title} case study`}
              date={study.date}
              category={study.category}
              viewType='grid'
              showTitleOnImage={false}
              delay={index * 0.1}
              onClick={() => handleCardClick(study.slug)}
            />
          ))}
        </LayoutGrid>

        <Container
          style={{
            textAlign: 'center',
            marginTop: '2rem',
          }}
        >
          <FluentButton
            text='View All Case Studies'
            onClick={handleViewAll}
            variant='primary'
            size='large'
          />
        </Container>
      </FadeUp>
    </Container>
  );
};
