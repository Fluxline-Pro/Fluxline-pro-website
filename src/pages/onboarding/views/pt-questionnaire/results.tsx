/**
 * PT Questionnaire Screen 7: Results & Recommendations
 * Shows personalized program recommendations based on questionnaire answers
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../../../component/typography';
import FluentButton from '../../../../../theme/components/button/button';
import { ProgressIndicator } from '../../../component/pt-questionnaire/progress-indicator';
import { usePersonalTrainingStore } from '../../../../../store/store-specs/personalTrainingStore';
import { useDeviceType } from '../../../../../theme/hooks/useMediaQuery';
import { useAppTheme } from '../../../../../theme/hooks/useAppTheme';
import { generateRecommendations, ProgramRecommendation } from '../../../../../services/decisionEngine';
import { uploadQuestionnaireToAzure } from '../../../../../services/azureStorage';
import { sendQuestionnaireEmail, sendConfirmationEmail } from '../../../../../services/email';

const ProgramCard: React.FC<{ program: ProgramRecommendation; isTop?: boolean }> = ({ program, isTop = false }) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        border: `2px solid ${isTop ? theme.palette.themePrimary : theme.palette.neutralLight}`,
        borderRadius: '12px',
        padding: '1.5rem',
        backgroundColor: isTop ? `${theme.palette.themePrimary}10` : theme.palette.white,
        marginBottom: '1rem',
      }}
    >
      {isTop && (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.white,
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          ⭐ TOP RECOMMENDATION
        </div>
      )}
      
      <h3
        style={{
          color: theme.palette.themePrimary,
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
        }}
      >
        {program.title}
      </h3>
      
      <p
        style={{
          color: theme.palette.neutralPrimary,
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '1rem',
        }}
      >
        {program.description}
      </p>
      
      <div style={{ marginBottom: '0.75rem' }}>
        <strong style={{ color: theme.palette.neutralSecondary }}>Ideal for:</strong>
        <ul style={{ marginTop: '0.25rem', paddingLeft: '1.5rem' }}>
          {program.idealFor.map((item, idx) => (
            <li key={idx} style={{ color: theme.palette.neutralPrimary }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginBottom: '0.5rem' }}>
        <strong style={{ color: theme.palette.neutralSecondary }}>Format:</strong>{' '}
        <span style={{ color: theme.palette.neutralPrimary }}>{program.format}</span>
      </div>
      
      <div>
        <strong style={{ color: theme.palette.neutralSecondary }}>Price Range:</strong>{' '}
        <span style={{ color: theme.palette.neutralPrimary }}>{program.priceRange}</span>
      </div>
    </div>
  );
};

const PTQuestionnaireResults: React.FC = () => {
  const { isMobile } = useDeviceType();
  const { theme } = useAppTheme();
  const navigate = useNavigate();
  
  const { answers, markAsSubmitted } = usePersonalTrainingStore();
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string>('');
  const [recommendations, setRecommendations] = React.useState<ReturnType<typeof generateRecommendations> | null>(null);

  React.useEffect(() => {
    // Generate recommendations on mount
    const recs = generateRecommendations(answers);
    setRecommendations(recs);

    // Submit data to Azure and send emails
    const submitData = async () => {
      setIsSubmitting(true);
      try {
        // Upload to Azure
        const azureResult = await uploadQuestionnaireToAzure(answers);
        if (!azureResult.success) {
          console.error('Failed to upload to Azure:', azureResult.message);
        }

        // Send email to Terence
        const emailResult = await sendQuestionnaireEmail(answers, 'terence@fluxline.pro');
        if (!emailResult.success) {
          console.error('Failed to send email:', emailResult.message);
        }

        // Send confirmation email to user
        await sendConfirmationEmail(answers.contactName, answers.contactEmail);

        // Mark as submitted in store
        markAsSubmitted();
      } catch (error) {
        console.error('Error submitting questionnaire:', error);
        setSubmitError('There was an issue submitting your questionnaire, but your results are saved locally.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitData();
  }, [answers, markAsSubmitted]);

  if (!recommendations) {
    return (
      <Container
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        width='100%'
        height='100vh'
      >
        <H3styles text='Generating your personalized recommendations...' />
      </Container>
    );
  }

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
      maxWidth='900px'
      margin='0 auto'
      padding={isMobile ? '1rem' : '2rem'}
    >
      <ProgressIndicator
        currentStep={7}
        totalSteps={7}
        stepLabels={['Fitness Journey', 'Goals', 'Lifestyle', 'Support', 'Investment', 'Contact', 'Results']}
      />

      <H1styles text='Your Personalized Fitness Journey' />
      <H3styles text={recommendations.personalizedMessage} marginBottom='2rem' />

      {isSubmitting && (
        <div
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: `${theme.palette.themePrimary}15`,
            borderRadius: '8px',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          <H5styles text='✨ Submitting your results...' marginBottom='0' />
        </div>
      )}

      {submitError && (
        <div
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: `${theme.palette.redDark}15`,
            borderRadius: '8px',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          <H5styles text={submitError} marginBottom='0' />
        </div>
      )}

      {/* Top Recommendation */}
      <Container width='100%' marginBottom='2rem'>
        <ProgramCard program={recommendations.topRecommendation} isTop />
      </Container>

      {/* Alternative Recommendations */}
      {recommendations.alternativeRecommendations.length > 0 && (
        <Container width='100%' marginBottom='2rem'>
          <H3styles text='Other Great Options' marginBottom='1rem' />
          {recommendations.alternativeRecommendations.map((program, idx) => (
            <ProgramCard key={idx} program={program} />
          ))}
        </Container>
      )}

      {/* Next Steps */}
      <Container
        width='100%'
        marginBottom='2rem'
        style={{
          padding: '1.5rem',
          backgroundColor: `${theme.palette.themePrimary}10`,
          borderRadius: '12px',
          border: `2px solid ${theme.palette.themePrimary}`,
        }}
      >
        <H3styles text='Next Steps' marginBottom='1rem' />
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {recommendations.nextSteps.map((step, idx) => (
            <li
              key={idx}
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: '1rem',
                lineHeight: '1.8',
                marginBottom: '0.5rem',
              }}
            >
              {step}
            </li>
          ))}
        </ul>
      </Container>

      {/* Success Message */}
      <div
        style={{
          width: '100%',
          padding: '1.5rem',
          backgroundColor: theme.palette.greenLight,
          color: theme.palette.greenDark,
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <H5styles text='✅ Your results have been saved. Terence will be in touch soon!' marginBottom='0' />
      </div>

      {/* Action Buttons */}
      <Container
        display='grid'
        gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'}
        gap='1rem'
        width='100%'
      >
        <FluentButton
          variant='primary'
          isOutlined
          size='large'
          onClick={() => navigate('/services/personal-training')}
        >
          Learn More About Services
        </FluentButton>
        <FluentButton
          variant='primary'
          size='large'
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </FluentButton>
      </Container>
    </Container>
  );
};

export default PTQuestionnaireResults;
