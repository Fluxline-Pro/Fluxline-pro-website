import React from 'react';
import { ProgressIndicator, IProgressIndicatorStyles } from '@fluentui/react';

import { useAppTheme } from '../../hooks/useAppTheme';
interface ProgressBarProps {
  autoCenter?: boolean;
  label?: string;
  description?: string;
  manualCompleteRate?: number;
  intervalDelay?: number;
  intervalIncrement?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  autoCenter = true,
  label = 'Loading...',
  description = '',
  manualCompleteRate,
  intervalDelay = 1000,
  className = '',
  intervalIncrement = 1,
}) => {
  const [completeRate, setCompleteRate] = React.useState(0);
  const { theme } = useAppTheme();

  const customStyles: Partial<IProgressIndicatorStyles> = {
    root: {
      width: 'auto',
      fontFamily: theme.typography.fonts.h5.fontFamily,
      fontSize: theme.typography.fonts.h4.fontSize,
      padding: `${theme.spacing.m} ${theme.spacing.xl}`,
      backgroundColor: 'transparent',
      color: theme.palette.neutralPrimary,
    },
    progressBar: {
      background: theme.palette.themePrimary,
      height: 6,
      borderRadius: 3,
    },
    itemProgress: {
      borderRadius: 3,
    },
    itemName: {
      fontSize: theme.typography.fonts.h4.fontSize,
      fontFamily: theme.typography.fonts.h5.fontFamily,
      fontWeight: theme.typography.fonts.h5.fontWeight,
      color: theme.palette.themePrimary,
      padding: theme.spacing.s1,
    },
  };

  const divStyles = {
    root: {
      ...(autoCenter && {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }),
    },
  };

  React.useEffect(() => {
    if (manualCompleteRate) {
      setCompleteRate(intervalIncrement * manualCompleteRate);
    } else {
      const interval = setInterval(() => {
        setCompleteRate(completeRate + 1);
      }, intervalDelay);
      return () => clearInterval(interval);
    }
  }, [completeRate, manualCompleteRate, intervalDelay, intervalIncrement]);

  return (
    <div style={divStyles.root}>
      <ProgressIndicator
        className={className}
        label={label}
        description={description}
        percentComplete={completeRate}
        styles={customStyles}
      />
    </div>
  );
};

export default ProgressBar;
