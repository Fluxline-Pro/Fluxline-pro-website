import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CaseStudy } from '../../store/store-specs/caseStudiesStore';
import { ViewportGrid } from '../../theme/layouts/ViewportGrid';
import { Container } from '../../theme/layouts/Container';
import { Typography } from '../../theme/components/typography/typography';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { useIsMobile, useDeviceOrientation } from '../../theme/hooks/useMediaQuery';
import { FadeUp, FadeSlideIn } from '../../theme/components/animations/fade-animations';
import FluentButton from '../../theme/components/button/button';
import { LayoutGrid } from '../../theme/layouts/LayoutGrid';
import { BaseCard } from '../../theme/components/card/base-card/base-card';

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  caseStudy,
}) => {
  const navigate = useNavigate();
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const orientation = useDeviceOrientation();

  const handleBackToList = () => {
    navigate('/case-studies');
  };

  const handleContactClick = () => {
    navigate('/contact-me');
  };

  const handleViewServices = () => {
    navigate('/services');
  };

  // Styles
  const sectionStyle = {
    marginBottom: '3rem',
  };

  const headingStyle = {
    color: theme.palette.themePrimary,
    marginBottom: '1rem',
    fontSize: theme.typography.fontSizes.clamp6,
    fontVariationSettings: 'wght 400,wdth 300,slnt 0',
  };

  const textStyle = {
    color: theme.palette.neutralPrimary,
    lineHeight: '1.8',
    marginBottom: '1rem',
  };

  const labelStyle = {
    color: theme.palette.themePrimary,
    fontWeight: 600,
    marginBottom: '0.5rem',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '1.5rem',
    color: theme.palette.neutralPrimary,
  };

  const imageElement = caseStudy.imageUrl ? (
    <FadeSlideIn direction='left' delay={0.2}>
      <Container
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={caseStudy.imageUrl}
          alt={`${caseStudy.title} case study`}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '600px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </Container>
    </FadeSlideIn>
  ) : null;

  const contentElement = (
    <FadeUp delay={0.3}>
      <Container
        style={{
          padding: isMobile ? '1rem' : '2rem',
          maxWidth: '900px',
        }}
      >
        {/* Back Button */}
        <Container style={{ marginBottom: '2rem' }}>
          <FluentButton
            text='← Back to Case Studies'
            onClick={handleBackToList}
            variant='secondary'
            isOutlined={true}
          />
        </Container>

        {/* Header */}
        <Container style={sectionStyle}>
          <Typography variant='h1' style={headingStyle}>
            {caseStudy.title}
          </Typography>
          <Typography
            variant='h3'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: '1rem',
            }}
          >
            {caseStudy.client}
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontStyle: 'italic',
            }}
          >
            {caseStudy.category}
          </Typography>
        </Container>

        {/* Overview */}
        <Container style={sectionStyle}>
          <Typography variant='p' style={textStyle}>
            {caseStudy.description}
          </Typography>
        </Container>

        {/* Services & Technologies */}
        <LayoutGrid
          columns={isMobile ? 1 : 2}
          gap='2rem'
          style={sectionStyle}
        >
          <Container>
            <Typography variant='h3' style={labelStyle}>
              Services Provided
            </Typography>
            <ul style={listStyle}>
              {caseStudy.services.map((service, index) => (
                <li key={index}>
                  <Typography variant='p' style={textStyle}>
                    {service}
                  </Typography>
                </li>
              ))}
            </ul>
          </Container>

          <Container>
            <Typography variant='h3' style={labelStyle}>
              Technologies & Practices
            </Typography>
            <ul style={listStyle}>
              {caseStudy.technologies.map((tech, index) => (
                <li key={index}>
                  <Typography variant='p' style={textStyle}>
                    {tech}
                  </Typography>
                </li>
              ))}
            </ul>
          </Container>
        </LayoutGrid>

        {/* Challenge */}
        <Container style={sectionStyle}>
          <Typography variant='h2' style={headingStyle}>
            The Challenge
          </Typography>
          <Typography variant='p' style={textStyle}>
            {caseStudy.challengeDescription}
          </Typography>
        </Container>

        {/* Solution */}
        <Container style={sectionStyle}>
          <Typography variant='h2' style={headingStyle}>
            Our Solution
          </Typography>
          <Typography variant='p' style={textStyle}>
            {caseStudy.solutionDescription}
          </Typography>
        </Container>

        {/* Results */}
        <Container style={sectionStyle}>
          <Typography variant='h2' style={headingStyle}>
            Results & Impact
          </Typography>
          <BaseCard
            style={{
              backgroundColor: theme.palette.themeLighter,
              padding: '1.5rem',
              borderRadius: '8px',
              border: `2px solid ${theme.palette.themePrimary}`,
            }}
          >
            <Typography
              variant='p'
              style={{
                ...textStyle,
                color: theme.palette.neutralPrimary,
                fontWeight: 500,
              }}
            >
              {caseStudy.results}
            </Typography>
          </BaseCard>
        </Container>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <Container style={sectionStyle}>
            <Typography variant='h2' style={headingStyle}>
              Client Testimonial
            </Typography>
            <BaseCard
              style={{
                backgroundColor: theme.palette.neutralLighter,
                padding: '2rem',
                borderRadius: '8px',
                borderLeft: `4px solid ${theme.palette.themePrimary}`,
              }}
            >
              <Typography
                variant='p'
                style={{
                  ...textStyle,
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  marginBottom: '1.5rem',
                }}
              >
                "{caseStudy.testimonial.quote}"
              </Typography>
              <Container>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralPrimary,
                    fontWeight: 600,
                  }}
                >
                  {caseStudy.testimonial.author}
                </Typography>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.9rem',
                  }}
                >
                  {caseStudy.testimonial.position}
                </Typography>
              </Container>
            </BaseCard>
          </Container>
        )}

        {/* Call to Action */}
        <Container
          style={{
            display: 'flex',
            gap: '1rem',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <FluentButton
            text='View Our Services'
            onClick={handleViewServices}
            variant='primary'
            size='large'
          />
          <FluentButton
            text='Start Your Transformation'
            onClick={handleContactClick}
            variant='secondary'
            size='large'
          />
        </Container>
      </Container>
    </FadeUp>
  );

  // Use ViewportGrid for desktop left-image/right-text layout
  // Mobile will automatically stack image on top, content below
  if (!isMobile && caseStudy.imageUrl) {
    return (
      <ViewportGrid
        leftChildren={imageElement}
        rightChildren={contentElement}
        imagePosition='left'
        columns={{ left: 5, right: 7 }}
        placeItemsLeft='center'
        placeItemsRight='start'
      />
    );
  }

  // Mobile or no image: Simple stacked layout
  return (
    <Container>
      {imageElement}
      {contentElement}
    </Container>
  );
};
