import React from 'react';

// Theme & Components
import { Container } from '../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../component/typography';

// Types
import ButtonArray from '../component/button-array';

const OnboardingComplete: React.FC = () => {
  const CELEBRATE = '🎉';

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <H1styles text={`excellent! ${CELEBRATE}`} />
      <H3styles
        text='now the site will be tailored specifically for you and your needs!'
        marginBottom='1.5rem'
      />
      <H5styles
        text='(you can always make changes by clicking on the "settings" gear in the top banner)'
        marginBottom='1rem'
      />
      <ButtonArray
        showBackButton={false}
        showNextButton={false}
        showSkipButton={false}
        showGoToHomeButton={true}
        currentView='complete'
      />
    </Container>
  );
};

export default OnboardingComplete;
