import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../../theme/layouts/Container';
import FluentButton from '../../../theme/components/button/button';
import SkipButton from './skip-button';
import { ROUTES } from '../../../routing/constants';
import { useUserPreferencesStore } from '../../../store/store-specs/userPreferencesStore';

interface ButtonArrayProps {
  showBackButton?: boolean;
  showNextButton?: boolean;
  showSkipButton?: boolean;
  showGoToHomeButton?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
  nextDisabled?: boolean;
  backButtonIcon?: string;
  nextButtonIcon?: string;
  currentView?: string;
  onNext?: () => void;
  onBack?: () => void;
  style?: React.CSSProperties;
}

const onboardingRoutes = ROUTES.filter((route) => route.name === 'onboarding');
console.log('onboarding', onboardingRoutes);

const stepOrder = [
  'name',
  'layout',
  'font-size',
  'theme',
  'accessibility',
  'complete',
];

const getStepPath = (step: string) => `/onboarding/${step}`;

const previousStep = (current: string) => {
  const currentStep = stepOrder.findIndex((step) => current.includes(step));
  return currentStep > 0 ? getStepPath(stepOrder[currentStep - 1]) : null;
};

const nextStep = (current: string) => {
  const currentStep = stepOrder.findIndex((step) => current.includes(step));
  return currentStep < stepOrder.length - 1
    ? getStepPath(stepOrder[currentStep + 1])
    : null;
};

const ButtonArray: React.FC<ButtonArrayProps> = ({
  showBackButton = true,
  showNextButton = true,
  showSkipButton = true,
  showGoToHomeButton = false,
  backButtonText = 'Back',
  nextButtonText = 'Next',
  nextDisabled = false,
  backButtonIcon = 'ChevronLeft',
  nextButtonIcon = 'ChevronRight',
  currentView = 'name',
  onNext,
  onBack,
}) => {
  const navigate = useNavigate();
  const { setOnboardingDoneOrSkipped } = useUserPreferencesStore();
  const handleHomePage = () => {
    setOnboardingDoneOrSkipped(true);

    // give it some time to save the state so they aren't auto directed back to onboarding
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // Count how many buttons are visible
  const visibleButtons = [showBackButton, showNextButton].filter(
    Boolean
  ).length;

  const isMobile = window.innerWidth < 600; // or use a hook

  return (
    <Container
      display='grid'
      gridTemplateRows='auto auto'
      gap='1rem'
      margin='0 auto'
      marginTop='2rem'
      fullWidth
      style={{
        maxWidth: 'clamp(40rem, 40dvw, 60rem)',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Needed a manual div grid to make the buttons full width */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : visibleButtons === 2
              ? '1fr 1fr'
              : '1fr',
          gap: '1rem',
          width: '100%',
          padding: '0',
        }}
      >
        {showBackButton && (
          <FluentButton
            variant='primary'
            isOutlined
            size='large'
            icon={backButtonIcon}
            style={
              visibleButtons === 1 ? { gridColumn: '1 / span 2' } : undefined
            }
            onClick={
              onBack
                ? onBack
                : () => {
                    const prev = previousStep(currentView);
                    if (prev) navigate(prev);
                  }
            }
          >
            back{`: ${backButtonText}`}
          </FluentButton>
        )}
        {showNextButton && (
          <FluentButton
            variant='primary'
            size='large'
            disabled={nextDisabled}
            icon={nextButtonIcon}
            iconPosition='end'
            style={
              visibleButtons === 1 ? { gridColumn: '1 / span 2' } : undefined
            }
            onClick={
              onNext
                ? onNext
                : () => {
                    const next = nextStep(currentView);
                    if (next) navigate(next);
                  }
            }
          >
            next{`: ${nextButtonText}`}
          </FluentButton>
        )}
      </div>
      {showSkipButton && (
        <SkipButton
          skipOnboarding={() =>
            navigate(
              `${ROUTES.find((route) => route.name === 'onboarding-skip')?.path}`
            )
          }
        />
      )}
      {showGoToHomeButton && (
        <FluentButton
          variant='primary'
          fullWidth
          size='large'
          onClick={handleHomePage}
        >
          Go to Homepage
        </FluentButton>
      )}
    </Container>
  );
};

export default ButtonArray;
