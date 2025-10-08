import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import {
  useIndividualPathStore,
  type Challenge,
} from '../../../store/store-specs/individualPathStore';

const challengeOptions: { value: Challenge; label: string; emoji: string }[] = [
  { value: 'stress', label: 'Managing Stress', emoji: '😰' },
  { value: 'fitness', label: 'Physical Fitness', emoji: '🏃' },
  { value: 'boundaries', label: 'Setting Boundaries', emoji: '🚧' },
  { value: 'confidence', label: 'Building Confidence', emoji: '✨' },
  { value: 'time-management', label: 'Time Management', emoji: '⏰' },
  { value: 'direction', label: 'Finding Direction', emoji: '🧭' },
];

const QuestionnaireChallenges: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, addChallenge, removeChallenge, nextStep, previousStep } =
    useIndividualPathStore();
  const selectedChallenges = answers.challenges || [];

  const handleToggleChallenge = (challenge: Challenge) => {
    if (selectedChallenges.includes(challenge)) {
      removeChallenge(challenge);
    } else {
      addChallenge(challenge);
    }
  };

  const handleNext = () => {
    if (selectedChallenges.length > 0) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='What challenges are you facing? 💭' />
      <H3styles
        text='Select all that apply - this helps us understand how to support you'
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
        {challengeOptions.map((option) => {
          const isSelected = selectedChallenges.includes(option.value);

          return (
            <div
              key={option.value}
              onClick={() => handleToggleChallenge(option.value)}
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

      <ButtonArray
        backButtonText='Goals'
        nextButtonText='Continue'
        nextDisabled={selectedChallenges.length === 0}
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-challenges'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireChallenges;
