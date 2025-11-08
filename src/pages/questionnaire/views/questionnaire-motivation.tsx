import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import {
  useIndividualPathStore,
  type Motivation,
  type Experience,
} from '../../../store/store-specs/individualPathStore';

const motivationOptions: { value: Motivation; label: string; emoji: string }[] = [
  { value: 'exploring', label: 'Just Exploring', emoji: '🔍' },
  { value: 'committed', label: 'Ready to Commit', emoji: '💪' },
  { value: 'urgent', label: 'Need Help Now', emoji: '🚀' },
];

const experienceOptions: { value: Experience; label: string; emoji: string }[] = [
  { value: 'none', label: 'No Prior Experience', emoji: '🌱' },
  { value: 'some', label: 'Some Experience', emoji: '🌿' },
  { value: 'experienced', label: 'Experienced', emoji: '🌳' },
];

const QuestionnaireMotivation: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, setAnswer, nextStep, previousStep } = useIndividualPathStore();

  const selectedMotivation = answers.motivation;
  const selectedExperience = answers.priorExperience;

  const handleSelectMotivation = (motivation: Motivation) => {
    setAnswer('motivation', motivation);
  };

  const handleSelectExperience = (experience: Experience) => {
    setAnswer('priorExperience', experience);
  };

  const handleNext = () => {
    if (selectedMotivation && selectedExperience) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='Tell us more about you 📝' />
      <H3styles
        text='This helps us tailor our recommendations'
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '3rem' }}>
        <h3
          style={{
            fontSize: theme.typography.fonts.h4.fontSize,
            fontFamily: theme.typography.fonts.h4.fontFamily,
            marginBottom: '1.5rem',
            color: theme.palette.neutralPrimary,
          }}
        >
          What's your motivation level?
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {motivationOptions.map((option) => {
            const isSelected = selectedMotivation === option.value;

            return (
              <div
                key={option.value}
                onClick={() => handleSelectMotivation(option.value)}
                style={{
                  padding: '1.5rem',
                  border: `2px solid ${
                    isSelected
                      ? theme.palette.themePrimary
                      : theme.palette.neutralLight
                  }`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? theme.palette.themeLighterAlt
                    : 'transparent',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {option.emoji}
                </div>
                <p
                  style={{
                    fontSize: theme.typography.fonts.h5.fontSize,
                    fontFamily: theme.typography.fonts.h5.fontFamily,
                    fontWeight: isSelected ? 600 : 400,
                    color: theme.palette.neutralPrimary,
                    margin: 0,
                  }}
                >
                  {option.label}
                </p>
              </div>
            );
          })}
        </div>

        <h3
          style={{
            fontSize: theme.typography.fonts.h4.fontSize,
            fontFamily: theme.typography.fonts.h4.fontFamily,
            marginBottom: '1.5rem',
            color: theme.palette.neutralPrimary,
          }}
        >
          Any prior coaching or training experience?
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {experienceOptions.map((option) => {
            const isSelected = selectedExperience === option.value;

            return (
              <div
                key={option.value}
                onClick={() => handleSelectExperience(option.value)}
                style={{
                  padding: '1.5rem',
                  border: `2px solid ${
                    isSelected
                      ? theme.palette.themePrimary
                      : theme.palette.neutralLight
                  }`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? theme.palette.themeLighterAlt
                    : 'transparent',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {option.emoji}
                </div>
                <p
                  style={{
                    fontSize: theme.typography.fonts.h5.fontSize,
                    fontFamily: theme.typography.fonts.h5.fontFamily,
                    fontWeight: isSelected ? 600 : 400,
                    color: theme.palette.neutralPrimary,
                    margin: 0,
                  }}
                >
                  {option.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <ButtonArray
        backButtonText='Challenges'
        nextButtonText='Continue'
        nextDisabled={!selectedMotivation || !selectedExperience}
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-motivation'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireMotivation;
