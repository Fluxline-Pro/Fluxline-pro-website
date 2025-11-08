import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import FluentButton from '../../../theme/components/button/button';
import { ProgressBar } from '../../../theme/components/progress-bar/progress-bar';
import {
  useIndividualPathStore,
  type PackageRecommendation,
} from '../../../store/store-specs/individualPathStore';
import { useNavigate } from 'react-router-dom';

const QuestionnaireResults: React.FC = () => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const {
    answers,
    recommendations,
    generateRecommendations,
    submitQuestionnaire,
    isSubmitting,
    submitSuccess,
    error,
  } = useIndividualPathStore();

  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    const processResults = async () => {
      // Generate recommendations
      generateRecommendations();

      // Submit questionnaire to backend
      await submitQuestionnaire();

      // Show results after a delay for better UX
      setTimeout(() => {
        setShowResults(true);
      }, 2000);
    };

    processResults();
  }, []);

  const handleBookConsult = () => {
    // Navigate to contact page or booking page
    navigate('/contact-me');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (!showResults || isSubmitting) {
    return (
      <Container display='flex' flexDirection='column' alignItems='center'>
        <H1styles text='Creating Your Personalized Plan... ✨' />
        <H3styles
          text='Analyzing your answers and matching you with the perfect package'
          marginBottom='clamp(2rem, 3vh, 3rem)'
        />

        <div style={{ width: '100%', maxWidth: '600px' }}>
          <ProgressBar
            label='Processing your responses...'
            description='This will only take a moment'
            autoCenter
          />

          <div
            style={{
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: theme.palette.themeLighterAlt,
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
                color: theme.palette.neutralPrimary,
                marginBottom: '1rem',
              }}
            >
              💡 Did you know?
            </p>
            <p
              style={{
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
                color: theme.palette.neutralSecondary,
              }}
            >
              People who work with a coach or trainer are 3x more likely to
              achieve their goals than those who go it alone.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container display='flex' flexDirection='column' alignItems='center'>
        <H1styles text='Oops! Something went wrong 😕' />
        <H3styles
          text={error}
          marginBottom='clamp(2rem, 3vh, 3rem)'
        />
        <FluentButton
          variant='primary'
          size='large'
          onClick={() => window.location.reload()}
        >
          Try Again
        </FluentButton>
      </Container>
    );
  }

  const featuredPackage = recommendations.find((pkg) => pkg.isFeatured);
  const otherPackages = recommendations.filter((pkg) => !pkg.isFeatured);

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text={`Perfect! Here's Your Match, ${answers.contactInfo?.name.split(' ')[0]} 🎯`} />
      <H3styles
        text='Based on your goals and preferences, we recommend:'
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      {submitSuccess && (
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            marginBottom: '2rem',
            padding: '1rem',
            backgroundColor: theme.palette.greenLight,
            borderRadius: '8px',
            borderLeft: `4px solid ${theme.palette.green}`,
          }}
        >
          <p
            style={{
              fontSize: theme.typography.fonts.h5.fontSize,
              fontFamily: theme.typography.fonts.h5.fontFamily,
              color: theme.palette.neutralPrimary,
              margin: 0,
            }}
          >
            ✅ Your responses have been saved! We'll follow up with you shortly.
          </p>
        </div>
      )}

      <div style={{ width: '100%', maxWidth: '900px' }}>
        {/* Featured Package */}
        {featuredPackage && (
          <div
            style={{
              marginBottom: '2rem',
              padding: '2rem',
              border: `3px solid ${theme.palette.themePrimary}`,
              borderRadius: '12px',
              backgroundColor: theme.palette.themeLighterAlt,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                padding: '0.25rem 1rem',
                backgroundColor: theme.palette.themePrimary,
                color: theme.palette.white,
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              BEST MATCH
            </div>

            <PackageCard package={featuredPackage} theme={theme} featured />

            <div style={{ marginTop: '1.5rem' }}>
              <FluentButton
                variant='primary'
                size='large'
                onClick={handleBookConsult}
                style={{ width: '100%' }}
              >
                Book a Free Consultation
              </FluentButton>
            </div>
          </div>
        )}

        {/* Other Packages */}
        {otherPackages.length > 0 && (
          <>
            <h3
              style={{
                fontSize: theme.typography.fonts.h3.fontSize,
                fontFamily: theme.typography.fonts.h3.fontFamily,
                color: theme.palette.neutralPrimary,
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              Other Options For You
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              {otherPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    padding: '1.5rem',
                    border: `2px solid ${theme.palette.neutralLight}`,
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                  }}
                >
                  <PackageCard package={pkg} theme={theme} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div
          style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: theme.palette.themeLighterAlt,
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: theme.typography.fonts.h3.fontSize,
              fontFamily: theme.typography.fonts.h3.fontFamily,
              color: theme.palette.neutralPrimary,
              marginBottom: '1rem',
            }}
          >
            Ready to Transform Your Life?
          </h3>
          <p
            style={{
              fontSize: theme.typography.fonts.h5.fontSize,
              fontFamily: theme.typography.fonts.h5.fontFamily,
              color: theme.palette.neutralSecondary,
              marginBottom: '1.5rem',
            }}
          >
            Let's schedule a free consultation to discuss your goals and create
            your personalized action plan.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <FluentButton
              variant='primary'
              size='large'
              onClick={handleBookConsult}
            >
              Book Free Consultation
            </FluentButton>
            <FluentButton
              variant='primary'
              isOutlined
              size='large'
              onClick={handleGoHome}
            >
              Back to Home
            </FluentButton>
          </div>
        </div>
      </div>
    </Container>
  );
};

interface PackageCardProps {
  package: PackageRecommendation;
  theme: any;
  featured?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  theme,
  featured = false,
}) => {
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <h2
          style={{
            fontSize: featured
              ? theme.typography.fonts.h2.fontSize
              : theme.typography.fonts.h3.fontSize,
            fontFamily: theme.typography.fonts.h2.fontFamily,
            color: theme.palette.themePrimary,
            marginBottom: '0.5rem',
          }}
        >
          {pkg.name}
        </h2>
        <p
          style={{
            fontSize: theme.typography.fonts.h5.fontSize,
            fontFamily: theme.typography.fonts.h5.fontFamily,
            color: theme.palette.neutralSecondary,
            marginBottom: '1rem',
          }}
        >
          {pkg.description}
        </p>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: featured
            ? theme.palette.white
            : theme.palette.neutralLighter,
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      >
        <p
          style={{
            fontSize: theme.typography.fonts.h5.fontSize,
            fontFamily: theme.typography.fonts.h5.fontFamily,
            color: theme.palette.neutralPrimary,
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Why this matches you:
        </p>
        <p
          style={{
            fontSize: theme.typography.fonts.h5.fontSize,
            fontFamily: theme.typography.fonts.h5.fontFamily,
            color: theme.palette.neutralSecondary,
            margin: 0,
          }}
        >
          {pkg.matchReason}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p
          style={{
            fontSize: theme.typography.fonts.h5.fontSize,
            fontFamily: theme.typography.fonts.h5.fontFamily,
            color: theme.palette.neutralPrimary,
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          What's included:
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {pkg.features.map((feature, index) => (
            <li
              key={index}
              style={{
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
                color: theme.palette.neutralSecondary,
                marginBottom: '0.5rem',
                paddingLeft: '1.5rem',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: theme.palette.themePrimary,
                }}
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '0.875rem',
              fontFamily: theme.typography.fonts.h5.fontFamily,
              color: theme.palette.neutralSecondary,
              margin: 0,
              marginBottom: '0.25rem',
            }}
          >
            Investment
          </p>
          <p
            style={{
              fontSize: theme.typography.fonts.h4.fontSize,
              fontFamily: theme.typography.fonts.h4.fontFamily,
              color: theme.palette.themePrimary,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {pkg.price}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: '0.875rem',
              fontFamily: theme.typography.fonts.h5.fontFamily,
              color: theme.palette.neutralSecondary,
              margin: 0,
              marginBottom: '0.25rem',
            }}
          >
            Duration
          </p>
          <p
            style={{
              fontSize: theme.typography.fonts.h4.fontSize,
              fontFamily: theme.typography.fonts.h4.fontFamily,
              color: theme.palette.neutralPrimary,
              fontWeight: 600,
              margin: 0,
            }}
          >
            {pkg.duration}
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireResults;
