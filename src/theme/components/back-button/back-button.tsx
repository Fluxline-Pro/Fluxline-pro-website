import React from 'react';
import { mergeStyles } from '@fluentui/react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { FluentIcon } from '../fluent-icon/fluent-icon';

interface BackButtonProps {
  navigate: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ navigate }) => {
  const { theme } = useAppTheme();
  // Define styles using Fluent UI's `mergeStyles`
  const backButtonClass = mergeStyles({
    cursor: 'pointer',
    transform: 'translateX(-4px)',
    display: 'block',
    maxWidth: '100px',
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.m,
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
      transform: 'translateX(-8px)',
    },
  });

  return (
    <div onClick={() => navigate()} className={backButtonClass}>
      <FluentIcon iconName='ChevronLeft' color={theme.palette.themePrimary} />
    </div>
  );
};
