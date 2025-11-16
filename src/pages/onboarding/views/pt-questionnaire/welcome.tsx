/**
 * PT Questionnaire Welcome Screen
 * Entry point for the Personal Training questionnaire
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../../../component/typography';
import FluentButton from '../../../../../theme/components/button/button';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';
import { useAppTheme } from '../../../../../theme/hooks/useAppTheme';
import { usePersonalTrainingStore } from '../../../../../store/store-specs/personalTrainingStore';

const PTQuestionnaireWelcome: React.FC = () => {
  const { isMobile } = useDeviceType();
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  const { resetQuestionnaire } = usePersonalTrainingStore();

  const handleStart = () => {
    // Reset any previous questionnaire data
    resetQuestionnaire();
    navigate('/onboarding/pt-questionnaire/fitness-journey');
  };

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      width='100%'
      maxWidth='900px'
      margin='0 auto'
      padding={isMobile ? '2rem 1rem' : '4rem 2rem'}
      minHeight='80vh'
    >
      <H1styles text='Personal Training Questionnaire' />
      <H3styles 
        text='Let us create the perfect fitness program for you' 
        marginBottom='2rem' 
      />

      <Container
        width='100%'
        marginBottom='3rem'
        style={{
          padding: '2rem',
          backgroundColor: `${theme.palette.themePrimary}10`,
          borderRadius: '12px',
          border: `2px solid ${theme.palette.themePrimary}`,
        }}
      >
        <H5styles text='What to expect:' marginBottom='1.5rem' />
        
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '1rem', 
            marginBottom: '1rem' 
          }}>
            <span style={{ fontSize: '1.5rem' }}>📋</span>
            <div>
              <strong style={{ color: theme.palette.neutralPrimary }}>5-7 minutes</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: theme.palette.neutralSecondary }}>
                Quick questions about your fitness journey and goals
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '1rem', 
            marginBottom: '1rem' 
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎯</span>
            <div>
              <strong style={{ color: theme.palette.neutralPrimary }}>Personalized recommendations</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: theme.palette.neutralSecondary }}>
                We'll match you with the best training program for your needs
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '1rem', 
            marginBottom: '1rem' 
          }}>
            <span style={{ fontSize: '1.5rem' }}>🤝</span>
            <div>
              <strong style={{ color: theme.palette.neutralPrimary }}>Expert guidance</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: theme.palette.neutralSecondary }}>
                Terence will personally review your responses and reach out within 24 hours
              </p>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '1rem' 
          }}>
            <span style={{ fontSize: '1.5rem' }}>🎁</span>
            <div>
              <strong style={{ color: theme.palette.neutralPrimary }}>Special offer</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: theme.palette.neutralSecondary }}>
                Your first consultation is free, and first 2 sessions are on us!
              </p>
            </div>
          </div>
        </div>
      </Container>

      <FluentButton
        variant='primary'
        size='large'
        onClick={handleStart}
        style={{
          minWidth: '300px',
          fontSize: '1.1rem',
          padding: '1rem 2rem',
        }}
      >
        Start Your Journey
      </FluentButton>

      <H5styles 
        text='🔒 Your information is secure and will only be used to contact you about your fitness journey' 
        marginTop='2rem'
      />
    </Container>
  );
};

export default PTQuestionnaireWelcome;
