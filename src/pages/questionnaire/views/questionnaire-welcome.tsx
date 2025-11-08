import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import FluentButton from '../../../theme/components/button/button';
import { H1styles, H3styles } from '../../onboarding/component/typography';

const QuestionnaireWelcome: React.FC = () => {
  const { theme } = useAppTheme();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questionnaire/client-type');
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100%'
    >
      <div
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌟</div>
        
        <H1styles text='Discover Your Path to Transformation' />
        
        <H3styles
          text='Take our personalized questionnaire to find the perfect program for your goals'
          marginBottom='clamp(2rem, 3vh, 3rem)'
        />

        <div
          style={{
            padding: '2rem',
            backgroundColor: theme.palette.themeLighterAlt,
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'left',
          }}
        >
          <h3
            style={{
              fontSize: theme.typography.fonts.h4.fontSize,
              fontFamily: theme.typography.fonts.h4.fontFamily,
              color: theme.palette.neutralPrimary,
              marginBottom: '1rem',
            }}
          >
            What to expect:
          </h3>
          
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {[
              'Takes only 5-7 minutes to complete',
              'Personalized package recommendations based on your goals',
              'No commitment required',
              'Free consultation with your results',
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  fontSize: theme.typography.fonts.h5.fontSize,
                  fontFamily: theme.typography.fonts.h5.fontFamily,
                  color: theme.palette.neutralSecondary,
                  marginBottom: '0.75rem',
                  paddingLeft: '2rem',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: theme.palette.themePrimary,
                    fontSize: '1.5rem',
                  }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <FluentButton
            variant='primary'
            size='large'
            onClick={handleStart}
            style={{ minWidth: '200px' }}
          >
            Get Started
          </FluentButton>

          <p
            style={{
              fontSize: '0.875rem',
              fontFamily: theme.typography.fonts.h5.fontFamily,
              color: theme.palette.neutralTertiary,
              margin: 0,
            }}
          >
            Your responses are secure and confidential
          </p>
        </div>
      </div>
    </Container>
  );
};

export default QuestionnaireWelcome;
