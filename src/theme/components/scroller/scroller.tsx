import React from 'react';
import { Stack, Text, mergeStyles, Icon } from '@fluentui/react';

import { useAppTheme } from '../../hooks/useAppTheme';

export interface ScrollerProps {
  text: string;
  isHomePage?: boolean;
}

export const Scroller: React.FC<ScrollerProps> = ({
  text,
  isHomePage = false,
}) => {
  const { theme } = useAppTheme();

  const containerClass = mergeStyles({
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.m,
  });

  const textClass = mergeStyles({
    fontFamily: theme.fonts.medium.fontFamily,
    fontSize: '1.25rem',
    fontWeight: isHomePage
      ? theme.fonts.medium.fontWeight
      : theme.fonts.large.fontWeight,
    letterSpacing: '0.2rem',
    marginRight: theme.spacing.s1,
    textTransform: 'lowercase',
    color: isHomePage
      ? theme.palette.white
      : theme.palette.neutralPrimary,
  });

  const arrowClass = mergeStyles({
    transform: 'rotate(90deg)',
    fontSize: '1rem',
    color: isHomePage
      ? theme.palette.white
      : theme.palette.neutralPrimary,
  });

  return (
    <Stack
      horizontal
      horizontalAlign='center'
      verticalAlign='center'
      tokens={{ childrenGap: 8 }}
      className={containerClass}
    >
      <Text className={textClass}>{text}</Text>
      <Icon iconName='ChevronDown' className={arrowClass} />
    </Stack>
  );
};

export default Scroller;
