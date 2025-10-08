import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles, H5styles } from '../../onboarding/component/typography';
import {
  useIndividualPathStore,
  type Goal,
} from '../../../store/store-specs/individualPathStore';

const goalOptions: { value: Goal; label: string; emoji: string }[] = [
  { value: 'physical-wellness', label: 'Physical Wellness', emoji: '💪' },
  { value: 'leadership', label: 'Leadership Skills', emoji: '🎯' },
  { value: 'career-growth', label: 'Career Growth', emoji: '📈' },
  { value: 'mindset', label: 'Mindset & Confidence', emoji: '🧠' },
  { value: 'relationships', label: 'Relationships', emoji: '❤️' },
  { value: 'life-balance', label: 'Life Balance', emoji: '⚖️' },
];

const QuestionnaireGoals: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, addGoal, removeGoal, nextStep, previousStep } =
    useIndividualPathStore();
  const selectedGoals = answers.goals || [];

  const handleToggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      removeGoal(goal);
    } else {
      addGoal(goal);
    }
  };

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='What are your primary goals? 🎯' />
      <H3styles
        text='Select up to 3 goals that matter most to you'
        marginBottom='clamp(1rem, 2vh, 1.5rem)'
      />
      <H5styles
        text={`Selected: ${selectedGoals.length} of 3`}
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          width: '100%',
          maxWidth: '900px',
          marginBottom: '2rem',
        }}
      >
        {goalOptions.map((option) => {
          const isSelected = selectedGoals.includes(option.value);
          const isDisabled =
            selectedGoals.length >= 3 && !isSelected;

          return (
            <div
              key={option.value}
              onClick={() => !isDisabled && handleToggleGoal(option.value)}
              style={{
                padding: '1.5rem',
                border: `2px solid ${
                  isSelected
                    ? theme.palette.themePrimary
                    : theme.palette.neutralLight
                }`,
                borderRadius: '8px',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                backgroundColor: isSelected
                  ? theme.palette.themeLighterAlt
                  : 'transparent',
                opacity: isDisabled ? 0.5 : 1,
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

      <ButtonArray
        backButtonText='Client Type'
        nextButtonText='Continue'
        nextDisabled={selectedGoals.length === 0}
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-goals'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireGoals;
