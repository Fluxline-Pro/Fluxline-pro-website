/**
 * Progress Indicator for PT Questionnaire
 * Shows current step and overall progress
 */

import React from 'react';
import { useAppTheme } from '../../../../theme/hooks/useAppTheme';
import { Container } from '../../../../theme/layouts/Container';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels = [],
}) => {
  const { theme } = useAppTheme();
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <Container
      display='flex'
      flexDirection='column'
      gap='0.5rem'
      width='100%'
      marginBottom='1.5rem'
    >
      {/* Progress bar */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: theme.palette.neutralLight,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: theme.palette.themePrimary,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Step indicator */}
      <Container
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <span
          style={{
            fontSize: '0.875rem',
            color: theme.palette.neutralSecondary,
          }}
        >
          Step {currentStep} of {totalSteps}
        </span>
        {stepLabels[currentStep - 1] && (
          <span
            style={{
              fontSize: '0.875rem',
              color: theme.palette.themePrimary,
              fontWeight: 600,
            }}
          >
            {stepLabels[currentStep - 1]}
          </span>
        )}
      </Container>
    </Container>
  );
};
