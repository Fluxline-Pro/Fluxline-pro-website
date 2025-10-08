import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import ButtonArray from '../../onboarding/component/button-array';
import { H1styles, H3styles } from '../../onboarding/component/typography';
import FluentButton from '../../../theme/components/button/button';
import { useIndividualPathStore } from '../../../store/store-specs/individualPathStore';

const QuestionnaireClientType: React.FC = () => {
  const { theme } = useAppTheme();
  const { answers, setAnswer, nextStep } = useIndividualPathStore();
  const [selected, setSelected] = React.useState<string | null>(
    answers.clientType || null
  );

  const handleSelect = (type: 'individual' | 'organization') => {
    setSelected(type);
    setAnswer('clientType', type);
  };

  const handleNext = () => {
    if (selected) {
      nextStep();
    }
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text='Who is this for? 🤔' />
      <H3styles
        text='Help us understand who will be using our services'
        marginBottom='clamp(2rem, 3vh, 3rem)'
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '800px',
          marginBottom: '2rem',
        }}
      >
        <div
          onClick={() => handleSelect('individual')}
          style={{
            padding: '2rem',
            border: `2px solid ${
              selected === 'individual'
                ? theme.palette.themePrimary
                : theme.palette.neutralLight
            }`,
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor:
              selected === 'individual'
                ? theme.palette.themeLighterAlt
                : 'transparent',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            👤
          </div>
          <h3
            style={{
              fontSize: theme.typography.fonts.h4.fontSize,
              fontFamily: theme.typography.fonts.h4.fontFamily,
              marginBottom: '0.5rem',
              textAlign: 'center',
              color: theme.palette.neutralPrimary,
            }}
          >
            Myself
          </h3>
          <p
            style={{
              fontSize: theme.typography.fonts.h5.fontSize,
              fontFamily: theme.typography.fonts.h5.fontFamily,
              textAlign: 'center',
              color: theme.palette.neutralSecondary,
            }}
          >
            Personal development, coaching, wellness
          </p>
        </div>

        <div
          onClick={() => handleSelect('organization')}
          style={{
            padding: '2rem',
            border: `2px solid ${
              selected === 'organization'
                ? theme.palette.themePrimary
                : theme.palette.neutralLight
            }`,
            borderRadius: '8px',
            cursor: 'pointer',
            backgroundColor:
              selected === 'organization'
                ? theme.palette.themeLighterAlt
                : 'transparent',
            transition: 'all 0.3s ease',
            opacity: 0.6,
          }}
        >
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            🏢
          </div>
          <h3
            style={{
              fontSize: theme.typography.fonts.h4.fontSize,
              fontFamily: theme.typography.fonts.h4.fontFamily,
              marginBottom: '0.5rem',
              textAlign: 'center',
              color: theme.palette.neutralPrimary,
            }}
          >
            My Organization
          </h3>
          <p
            style={{
              fontSize: theme.typography.fonts.h5.fontSize,
              fontFamily: theme.typography.fonts.h5.fontFamily,
              textAlign: 'center',
              color: theme.palette.neutralSecondary,
            }}
          >
            Team training, corporate programs
          </p>
          <p
            style={{
              fontSize: '0.875rem',
              fontStyle: 'italic',
              textAlign: 'center',
              color: theme.palette.neutralTertiary,
              marginTop: '0.5rem',
            }}
          >
            (Coming soon)
          </p>
        </div>
      </div>

      <ButtonArray
        showBackButton={false}
        nextButtonText='Continue'
        nextDisabled={!selected || selected === 'organization'}
        onNext={handleNext}
        currentView='questionnaire-client-type'
        showSkipButton={false}
      />
    </Container>
  );
};

export default QuestionnaireClientType;
