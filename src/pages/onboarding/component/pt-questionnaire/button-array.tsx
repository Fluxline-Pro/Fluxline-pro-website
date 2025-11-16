/**
 * PT Questionnaire Button Array
 * Navigation buttons for personal training questionnaire
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../../theme/layouts/Container';
import FluentButton from '../../../../theme/components/button/button';
import { ROUTES } from '../../../../routing/constants';

interface PTQuestionnaireButtonArrayProps {
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextDisabled?: boolean;
  currentStep: string;
  onNext?: () => void;
  onBack?: () => void;
}

const stepOrder = [
  'fitness-journey',
  'goals',
  'lifestyle',
  'support',
  'investment',
  'contact',
  'results',
];

const getStepPath = (step: string) => `/onboarding/pt-questionnaire/${step}`;

const previousStep = (current: string) => {
  const currentIndex = stepOrder.indexOf(current);
  return currentIndex > 0 ? getStepPath(stepOrder[currentIndex - 1]) : null;
};

const nextStep = (current: string) => {
  const currentIndex = stepOrder.indexOf(current);
  return currentIndex < stepOrder.length - 1
    ? getStepPath(stepOrder[currentIndex + 1])
    : null;
};

export const PTQuestionnaireButtonArray: React.FC<PTQuestionnaireButtonArrayProps> = ({
  showBackButton = true,
  showNextButton = true,
  nextDisabled = false,
  currentStep,
  onNext,
  onBack,
}) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 600;

  const visibleButtons = [showBackButton, showNextButton].filter(Boolean).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      const prev = previousStep(currentStep);
      if (prev) navigate(prev);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      const next = nextStep(currentStep);
      if (next) navigate(next);
    }
  };

  return (
    <Container
      display='grid'
      gridTemplateRows='auto'
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
            icon='ChevronLeft'
            style={
              visibleButtons === 1 ? { gridColumn: '1 / span 2' } : undefined
            }
            onClick={handleBack}
          >
            back
          </FluentButton>
        )}
        {showNextButton && (
          <FluentButton
            variant='primary'
            size='large'
            disabled={nextDisabled}
            icon='ChevronRight'
            iconPosition='end'
            style={
              visibleButtons === 1 ? { gridColumn: '1 / span 2' } : undefined
            }
            onClick={handleNext}
          >
            continue
          </FluentButton>
        )}
      </div>
    </Container>
  );
};
