import React from 'react';

import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
// Types

import ButtonArray from '../component/button-array';
import { H1styles, H3styles, H5styles } from '../component/typography';
import { LayoutSettings } from '../../../theme/components/header/settings/layout-settings';

// Store
import { useUserPreferencesStore } from '../../../store/store-specs/userPreferencesStore';

const OnboardingLayout: React.FC = () => {
  const {
    preferences: { userFirstName },
  } = useUserPreferencesStore();
  const HAPPY_EMOJI = '🙂';
  const [isFading, setIsFading] = React.useState(false);
  const { toggleLayoutPreference, toggleReadingDirection } = useAppTheme();

  const handleLayoutChange = (changeType: 'layout' | 'readingDirection') => {
    if (changeType === 'layout') {
      toggleLayoutPreference();
      return;
    };
    
    setIsFading(true);
    setTimeout(() => {
      // Update the layout/reading direction here
      toggleReadingDirection();
      setIsFading(false);
    }, 400); // match your CSS transition duration
  };

  return (
    <Container display='flex' flexDirection='column' alignItems='center'>
      <div
        style={{
          opacity: isFading ? 0 : 1,
          transition: 'opacity 0.4s',
        }}
      >
        <H1styles text={`thanks, ${userFirstName}! ${HAPPY_EMOJI}`} />
        <H3styles
          text={`next, please specify your preferred layout and reading direction`}
          marginBottom='clamp(1.5rem, 2vh, 2rem)'
        />
        <H5styles
          text='(this sets how content looks on the page for you)'
          marginBottom='clamp(1.5rem, 2vh, 2rem)'
        />
        <LayoutSettings isOnboarding handleLayoutChange={handleLayoutChange} />
        <ButtonArray
          backButtonText='Name'
          nextButtonText='Font Size'
          currentView='layout'
        />
      </div>
    </Container>
  );
};

export default OnboardingLayout;
