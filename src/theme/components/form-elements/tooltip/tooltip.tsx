import React from 'react';
import { ITooltipStyles, TooltipHost, DirectionalHint } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const FluentTooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const { theme } = useAppTheme();

  const tooltipStyles: Partial<ITooltipStyles> = {
    root: {
      display: 'inline-block',
      width: '100%',
    },
    content: {
      background: theme.palette.neutralPrimary,
      color: theme.palette.white,
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: theme.typography.fonts.small.fontSize,
      whiteSpace: 'pre-line',
    },
    subText: {
      margin: 0,
    },
  };

  return (
    <TooltipHost
      content={content}
      styles={tooltipStyles}
      directionalHint={DirectionalHint.topCenter}
      calloutProps={{
        gapSpace: 8,
        styles: {
          root: {
            opacity: 1,
          },
          calloutMain: {
            background: 'transparent',
            boxShadow: 'none',
          },
          beakCurtain: {
            background: 'transparent',
          },
        },
      }}
    >
      {children}
    </TooltipHost>
  );
};

export default FluentTooltip;
