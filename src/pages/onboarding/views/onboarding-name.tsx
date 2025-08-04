import React from 'react';
import { useNavigate } from 'react-router-dom';

// Theme & Components
import { Container } from '../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../component/typography';
import ButtonArray from '../component/button-array';
import FluentInput from '../../../theme/components/form-elements/input/input';
import { ROUTES } from '../../../routing/constants';

// Store
import {
  useUserPreferencesStore,
  unacceptableWordsRegex,
} from '../../../store/store-specs/userPreferencesStore';
import { useDeviceType } from '../../../theme/hooks/useMediaQuery';

function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const isValidName = (name: string) => {
  const trimmed = name.trim().toLowerCase();
  const allowedPattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ']+(?:[ -][a-zA-ZÀ-ÖØ-öø-ÿ']+)*$/;
  if (trimmed.length < 2) return false;
  const normalized = removeAccents(trimmed);
  return (
    allowedPattern.test(trimmed) && !unacceptableWordsRegex.test(normalized)
  );
};

const OnboardingName: React.FC = () => {
  const { isMobile } = useDeviceType();
  const userFirstName = useUserPreferencesStore(
    (state) => state.preferences.userFirstName
  );
  const setUserFirstName = useUserPreferencesStore(
    (state) => state.setUserFirstName
  );
  const [localFirstName, setLocalFirstName] = React.useState(
    userFirstName || ''
  );
  const [error, setError] = React.useState<string | null>(null);

  const handleFirstNameChange = (value: string) => {
    setLocalFirstName(value);

    if (!isValidName(value)) {
      setError('I would like your name with only letters and spaces :)');
    } else {
      setError(null);
    }
  };
  const navigate = useNavigate();

  // Update store only when component unmounts or when moving to next step
  React.useEffect(() => {
    return () => {
      if (localFirstName) {
        setUserFirstName(localFirstName);
      }
    };
  }, [localFirstName, setUserFirstName]);

  React.useEffect(() => {
    console.log('OnboardingName MOUNT');
    return () => console.log('OnboardingName UNMOUNT');
  }, []);

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='100%'
    >
      <H1styles text="let's get started!" />
      <H3styles text="what's your first name?" />
      <H5styles text='(just so I know what to call you)' />
      <div
        className={isMobile ? 'w-100' : 'w-50'}
        style={{
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
        }}
      >
        <FluentInput
          label='First Name'
          id='first-name'
          name='first-name'
          placeholder='enter your first name'
          minLength={1}
          maxLength={20}
          required
          value={localFirstName}
          tabIndex={0}
          onChange={handleFirstNameChange}
          errorMessage={error || undefined}
          error={!!error}
        />
      </div>
      <ButtonArray
        showBackButton={false}
        showNextButton={true}
        showSkipButton={true}
        nextButtonText='Layout'
        nextDisabled={!!error || localFirstName.length < 2}
        currentView='name'
        onNext={() => {
          setUserFirstName(localFirstName);
          navigate(
            ROUTES.find((route) => route.name === 'onboarding-layout')?.path ||
              '/onboarding/layout'
          );
        }}
      />
    </Container>
  );
};

export default OnboardingName;
