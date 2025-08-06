import React from 'react';

import { Container } from '../../../theme/layouts/Container';
import { H1styles, H3styles } from '../component/typography';
import { FontSizeSettings } from '../../../theme/components/header/settings/fontsize-settings';

// Types
import ButtonArray from '../component/button-array';
import { useUserPreferencesStore } from '../../../store/store-specs/userPreferencesStore';

const OnboardingFontSize: React.FC = () => {
  const {
    preferences: { userFirstName },
  } = useUserPreferencesStore();

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text={`Great, ${userFirstName}!`} />
      <H3styles
        text="We've set a font size that's optimized for your device."
        marginBottom='1rem'
      />
      <H3styles
        text='You can adjust the slider below to resize it if you wish.'
        marginBottom='2rem'
      />
      <FontSizeSettings isOnboarding />
      <ButtonArray
        backButtonText='Layout'
        nextButtonText='Theme'
        currentView='font-size'
      />
    </Container>
  );
};

export default OnboardingFontSize;
