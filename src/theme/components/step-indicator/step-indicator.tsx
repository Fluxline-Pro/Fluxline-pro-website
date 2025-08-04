import React from 'react';
import {
  Breadcrumb,
  IBreadcrumbItem,
  IBreadcrumbStyleProps,
  IBreadcrumbStyles,
} from '@fluentui/react/lib/Breadcrumb';
import { mergeStyles } from '@fluentui/react/lib/Styling';

import { useAppTheme } from '../../hooks/useAppTheme';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  const { theme } = useAppTheme();

  const breadcrumbItems: IBreadcrumbItem[] = steps.map((step, index) => ({
    text: step,
    key: `step-${index}`,
    onClick: onStepClick ? () => onStepClick(index) : undefined,
    isCurrentItem: index === currentStep,
  }));

  const getBreadcrumbStyles = (
    props: IBreadcrumbStyleProps
  ): Partial<IBreadcrumbStyles> => ({
    root: {
      marginBottom: '1rem',
    },
    itemLink: {
      color: theme.palette.neutralPrimary,
      selectors: {
        '&:hover': {
          color: theme.palette.themePrimary,
        },
      },
    },
    item: {
      selectors: {
        '&:last-child': {
          color: theme.palette.themePrimary,
          fontWeight: 'bold',
        },
      },
    },
  });

  const stepIndicatorClass = mergeStyles(
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: theme.palette.neutralLighter,
      borderRadius: theme.effects.roundedCorner2,
    },
    className
  );

  return (
    <div className={stepIndicatorClass}>
      <Breadcrumb
        items={breadcrumbItems}
        styles={getBreadcrumbStyles}
        ariaLabel='Step indicator'
      />
    </div>
  );
};
