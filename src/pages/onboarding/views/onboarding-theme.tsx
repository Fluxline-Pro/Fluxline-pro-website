import React from 'react';

// Theme
import { Container } from '../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../component/typography';

// Component
import ButtonArray from '../component/button-array';
import { useUserPreferencesStore } from '../../../store/store-specs/userPreferencesStore';
import { ThemeSettings } from '../../../theme/components/header/settings/theme-settings';

const OnboardingTheme: React.FC = () => {
  const {
    preferences: { userFirstName },
  } = useUserPreferencesStore();

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text={`very nice!`} />
      <H3styles text={`${userFirstName}, choose your preferred theme.`} marginBottom='1rem' />
      <H5styles text='(this sets the color scheme of the app)' marginBottom='2rem' />
      <ThemeSettings isOnboarding />
      <ButtonArray
        backButtonText='Font Size'
        nextButtonText='Accessibility'
        currentView='theme'
      />
    </Container>
  );
};

export default OnboardingTheme;
