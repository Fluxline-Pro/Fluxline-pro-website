import React from 'react';
import { useNavigate } from 'react-router-dom';

import { H1styles, H3styles } from '../component/typography';
import { Container } from '../../../theme/layouts/Container';
import ButtonArray from '../component/button-array';

const SkipContent: React.FC = () => {
  return (
    <Container>
      <H1styles text='No problem!' />
      <H3styles text='You can always change these settings later in the Settings gear.' />
    </Container>
  );
};

const OnboardingSkip: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <SkipContent />
      <ButtonArray
        showBackButton={true}
        showNextButton={false}
        showSkipButton={false}
        backButtonText='to onboarding'
        showGoToHomeButton={true}
        onBack={() => navigate('/onboarding/name')}
        currentView='skip'
      />
    </Container>
  );
};

export default OnboardingSkip;
