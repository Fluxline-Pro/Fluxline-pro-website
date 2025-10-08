import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import {
  useIndividualPathStore,
  type ServicePreference,
  type Format,
  type Frequency,
} from '../../../store/store-specs/individualPathStore';

const serviceOptions: { value: ServicePreference; label: string; emoji: string }[] = [
  { value: 'life-coaching', label: 'Life Coaching', emoji: '🎯' },
  { value: 'branding', label: 'Personal Branding', emoji: '✨' },
  { value: 'fitness', label: 'Personal Training', emoji: '💪' },
  { value: 'identity-management', label: 'Identity Management', emoji: '🔐' },
];

const formatOptions: { value: Format; label: string }[] = [
  { value: 'hybrid', label: 'Hybrid (Mix of both)' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'online', label: 'Online/Virtual' },
  { value: 'flexible', label: 'Flexible' },
];

const frequencyOptions: { value: Frequency; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'flexible', label: 'Flexible' },
];

const QuestionnaireServicePreferences: React.FC = () => {
  const { theme } = useAppTheme();
  const {
    answers,
    addService,
    removeService,
    setAnswer,
    nextStep,
    previousStep,
  } = useIndividualPathStore();

  const selectedServices = answers.preferredServices || [];
  const selectedFormat = answers.preferredFormat;
  const selectedFrequency = answers.sessionFrequency;

  const handleToggleService = (service: ServicePreference) => {
    if (selectedServices.includes(service)) {
      removeService(service);
    } else {
      addService(service);
    }
  };

  const handleNext = () => {
    if (selectedServices.length > 0 && selectedFormat && selectedFrequency) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='What services interest you? 💼' />
      <H3styles
        text='Help us understand your preferences'
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '3rem' }}>
        <h3
          style={{
            fontSize: theme.typography.fonts.h4.fontSize,
            fontFamily: theme.typography.fonts.h4.fontFamily,
            marginBottom: '1.5rem',
            color: theme.palette.neutralPrimary,
          }}
        >
          Preferred Services (select all that apply)
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {serviceOptions.map((option) => {
            const isSelected = selectedServices.includes(option.value);

            return (
              <div
                key={option.value}
                onClick={() => handleToggleService(option.value)}
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
          Preferred Format
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {formatOptions.map((option) => {
            const isSelected = selectedFormat === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('preferredFormat', option.value)}
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
            marginBottom: '1.5rem',
            color: theme.palette.neutralPrimary,
          }}
        >
          Session Frequency
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
          }}
        >
          {frequencyOptions.map((option) => {
            const isSelected = selectedFrequency === option.value;

            return (
              <div
                key={option.value}
                onClick={() => setAnswer('sessionFrequency', option.value)}
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
      </div>

      <ButtonArray
        backButtonText='Assessment'
        nextButtonText='Continue'
        nextDisabled={
          selectedServices.length === 0 || !selectedFormat || !selectedFrequency
        }
        onNext={handleNext}
        onBack={previousStep}
        currentView='questionnaire-services'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireServicePreferences;
