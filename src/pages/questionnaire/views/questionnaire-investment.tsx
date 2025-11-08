import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import {
  useIndividualPathStore,
  type Budget,
  type Timeline,
  type DecisionUrgency,
} from '../../../store/store-specs/individualPathStore';

const budgetOptions: { value: Budget; label: string }[] = [
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-3k', label: '$1,000 - $3,000' },
  { value: '3k-5k', label: '$3,000 - $5,000' },
  { value: 'over-5k', label: 'Over $5,000' },
];

const timelineOptions: { value: Timeline; label: string; emoji: string }[] = [
  { value: 'now', label: 'Start Now', emoji: '🚀' },
  { value: 'next-month', label: 'Next Month', emoji: '📅' },
  { value: 'next-quarter', label: 'Next Quarter', emoji: '📆' },
  { value: 'exploring', label: 'Just Exploring', emoji: '🔍' },
];

const urgencyOptions: { value: DecisionUrgency; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Within a Week' },
  { value: 'month', label: 'Within a Month' },
  { value: 'exploring', label: 'Just Exploring' },
];

const QuestionnaireInvestment: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, setAnswer, nextStep, previousStep } = useIndividualPathStore();

  const selectedBudget = answers.budget;
  const selectedTimeline = answers.timeline;
  const selectedUrgency = answers.decisionUrgency;
  const roiExpectation = answers.roiExpectation || '';

  const handleNext = () => {
    if (selectedBudget && selectedTimeline && selectedUrgency) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='Investment & Timeline 💰' />
      <H3styles
        text='Help us recommend the right package for you'
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
          What's your investment budget?
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {budgetOptions.map((option) => {
            const isSelected = selectedBudget === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('budget', option.value)}
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
          When would you like to start?
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {timelineOptions.map((option) => {
            const isSelected = selectedTimeline === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('timeline', option.value)}
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
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
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
          Decision urgency
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {urgencyOptions.map((option) => {
            const isSelected = selectedUrgency === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('decisionUrgency', option.value)}
                style={{
                  padding: '1rem',
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
          What would success look like for you? (Optional)
        </h3>

        <textarea
          value={roiExpectation}
          onChange={(e) => setAnswer('roiExpectation', e.target.value)}
          placeholder='Share your expectations and what you hope to achieve...'
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '1rem',
            fontSize: theme.typography.fonts.h5.fontSize,
            fontFamily: theme.typography.fonts.h5.fontFamily,
            border: `1px solid ${theme.palette.neutralLight}`,
            borderRadius: '8px',
            resize: 'vertical',
            color: theme.palette.neutralPrimary,
            backgroundColor: 'transparent',
          }}
        />
      </div>

      <ButtonArray
        backButtonText='Commitment'
        nextButtonText='Continue'
        nextDisabled={!selectedBudget || !selectedTimeline || !selectedUrgency}
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-investment'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireInvestment;
