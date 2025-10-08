import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import {
  useIndividualPathStore,
  type AvailableTime,
  type CommitmentLevel,
} from '../../../store/store-specs/individualPathStore';
import { TextField } from '@fluentui/react';

const timeOptions: { value: AvailableTime; label: string; emoji: string }[] = [
  { value: 'limited', label: 'Limited (1-2 hrs/week)', emoji: '⏱️' },
  { value: 'moderate', label: 'Moderate (3-5 hrs/week)', emoji: '⏰' },
  { value: 'flexible', label: 'Flexible (5+ hrs/week)', emoji: '🕐' },
];

const commitmentOptions: {
  value: CommitmentLevel;
  label: string;
  emoji: string;
}[] = [
  { value: 'light', label: 'Light - Taking it slow', emoji: '🌱' },
  { value: 'moderate', label: 'Moderate - Steady progress', emoji: '🌿' },
  { value: 'intensive', label: 'Intensive - Full commitment', emoji: '🔥' },
];

const QuestionnaireCommitment: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, setAnswer, nextStep, previousStep } =
    useIndividualPathStore();

  const selectedTime = answers.availableTime;
  const selectedCommitment = answers.commitmentLevel;
  const obstacles = answers.obstacles || '';
  const lifestyleNotes = answers.lifestyleNotes || '';
  const supportSystem = answers.supportSystem || '';

  const handleNext = () => {
    if (selectedTime && selectedCommitment) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='Your Commitment & Lifestyle 🎯' />
      <H3styles
        text='Help us understand what works best for you'
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
        <h3
          style={{
            fontSize: theme.typography.fonts.h4.fontSize,
            fontFamily: theme.typography.fonts.h4.fontFamily,
            marginBottom: '1.5rem',
            color: theme.palette.neutralPrimary,
          }}
        >
          How much time can you dedicate?
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {timeOptions.map((option) => {
            const isSelected = selectedTime === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('availableTime', option.value)}
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
          What's your commitment level?
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {commitmentOptions.map((option) => {
            const isSelected = selectedCommitment === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('commitmentLevel', option.value)}
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
            marginBottom: '1rem',
            color: theme.palette.neutralPrimary,
          }}
        >
          Additional Information (Optional)
        </h3>

        <div style={{ marginBottom: '1.5rem' }}>
          <TextField
            label='What obstacles might prevent you from reaching your goals?'
            multiline
            rows={3}
            value={obstacles}
            onChange={(_, newValue) => setAnswer('obstacles', newValue || '')}
            styles={{
              root: { width: '100%' },
              field: {
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
              },
              fieldGroup: {
                borderColor: theme.palette.neutralLight,
              },
            }}
            placeholder='Time constraints, budget, family commitments...'
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <TextField
            label='Tell us about your current lifestyle'
            multiline
            rows={3}
            value={lifestyleNotes}
            onChange={(_, newValue) =>
              setAnswer('lifestyleNotes', newValue || '')
            }
            styles={{
              root: { width: '100%' },
              field: {
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
              },
              fieldGroup: {
                borderColor: theme.palette.neutralLight,
              },
            }}
            placeholder='Work schedule, family life, hobbies, routines...'
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <TextField
            label='Do you have a support system?'
            multiline
            rows={2}
            value={supportSystem}
            onChange={(_, newValue) =>
              setAnswer('supportSystem', newValue || '')
            }
            styles={{
              root: { width: '100%' },
              field: {
                fontSize: theme.typography.fonts.h5.fontSize,
                fontFamily: theme.typography.fonts.h5.fontFamily,
              },
              fieldGroup: {
                borderColor: theme.palette.neutralLight,
              },
            }}
            placeholder='Family, friends, mentors, community...'
          />
        </div>
      </div>

      <ButtonArray
        backButtonText='Services'
        nextButtonText='Continue'
        nextDisabled={!selectedTime || !selectedCommitment}
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-commitment'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireCommitment;
