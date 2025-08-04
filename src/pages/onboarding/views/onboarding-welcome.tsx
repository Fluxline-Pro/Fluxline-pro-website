import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useUserPreferencesStore,
  UserPreferencesState,
} from '../../../store/store-specs/userPreferencesStore';
import { ROUTES } from '../../../routing/constants';

// Components
import { Container } from '../../../theme/layouts/Container';
import { H1styles, H3styles, H5styles } from '../component/typography';
import ButtonArray from '../component/button-array';

const OnboardingWelcome: React.FC = () => {
  const [view, setView] = React.useState<'welcome' | 'start' | 'welcome-done'>(
    'welcome'
  );
  const [isFading, setIsFading] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const navigate = useNavigate();
  const { onboardingDoneOrSkipped } = useUserPreferencesStore(
    (state: UserPreferencesState) => state.preferences
  );
  const homePath = ROUTES.find((child) => child.name === 'home')?.path ?? '';
  const normalizedHomePath = homePath === '' ? '/' : `/${homePath}`;

  // Handle initial mount
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (onboardingDoneOrSkipped) {
    navigate(normalizedHomePath, { replace: true });
  }

  React.useEffect(() => {
    // Only start animations after component is mounted
    if (!isMounted) return;

    const handleFadeInOut = () => {
      if (view === 'welcome') {
        // Show welcome view for 3 seconds before fading
        const showTimeout = setTimeout(() => {
          setIsFading(true);
          // Wait for fade out (0.7s) before changing view
          const changeTimeout = setTimeout(() => {
            setIsFading(false);
            setView('start');
          }, 700);
          return () => clearTimeout(changeTimeout);
        }, 3000);
        return () => clearTimeout(showTimeout);
      }
      if (view === 'start') {
        // Show start view for 3 seconds before fading
        const showTimeout = setTimeout(() => {
          setIsFading(true);
          // Wait for fade out (0.7s) before changing view
          const changeTimeout = setTimeout(() => {
            setIsFading(false);
            setView('welcome-done');
          }, 700);
          return () => clearTimeout(changeTimeout);
        }, 3000);
        return () => clearTimeout(showTimeout);
      }
    };

    handleFadeInOut();
  }, [view, navigate, normalizedHomePath, isMounted]);

  const fadeStyle = {
    opacity: isFading ? 0 : 1,
    transition: 'opacity 0.7s ease-in-out',
    visibility: isMounted ? ('visible' as const) : ('hidden' as const),
  };

  let content;
  if (view === 'welcome') {
    content = (
      <div>
        <H1styles text='welcome in!' />
        <H3styles text="I'm glad you're here :)" />
      </div>
    );
  } else if (view === 'start') {
    content = (
      <div>
        <H1styles text="let's get started!" />
        <H3styles text="I'll be asking you a few questions to personalize your experience while you're browsing my site." />
      </div>
    );
  } else {
    content = (
      <div>
        <H1styles text="Don't worry!" />
        <H3styles text="We'll only do this once, and it'll only take a few minutes." />
        <H3styles
          text='go ahead and click on the Start button below!'
          marginBottom='clamp(1.5rem, 2cqi, 2rem)'
        />
        <H5styles
          text='(Or if you want, you can skip this at any time by clicking on the Skip button.)'
          marginTop='clamp(1rem, 1cqi, 2rem)'
          marginBottom='clamp(1rem, 1cqi, 2rem)'
        />
        <ButtonArray
          showSkipButton={true}
          showBackButton={false}
          showNextButton={true}
          nextButtonText="let's start!"
          currentView='start'
        />
      </div>
    );
  }

  return (
    <Container
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      style={fadeStyle}
    >
      {content}
    </Container>
  );
};

export default OnboardingWelcome;
