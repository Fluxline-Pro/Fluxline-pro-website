import React from 'react';

// Types & Components
import { Container } from '../../../theme/layouts/Container';
import ButtonArray from '../component/button-array';
import { H1styles, H3styles, H5styles } from '../component/typography';
import { ColorblindSettings } from '../../../theme/components/header/settings/colorblind-settings';

const OnboardingAccessibility: React.FC = () => {
  const HAPPY_EMOJI = '🙂';

  React.useEffect(() => {
    console.log('OnboardingAccessibility MOUNT');
    return () => console.log('OnboardingAccessibility UNMOUNT');
  }, []);

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text={`looking good! ${HAPPY_EMOJI}`} />
      <H3styles text='finally, set a color scheme if you need colorblindness accommodations.' marginBottom='1rem' />
      <H5styles text='(this will change the color scheme of screen elements)' marginBottom='2rem' />
      <ColorblindSettings isOnboarding />
      <ButtonArray
        backButtonText='Theme'
        nextButtonText='Complete!'
        currentView='accessibility'
      />
    </Container>
  );
};

export default OnboardingAccessibility;