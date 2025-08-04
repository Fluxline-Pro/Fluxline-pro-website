import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { BaseCard } from '../../../card/base-card/base-card';
import { Typography } from '../../../typography/typography';

export interface CalendarDayCardProps {
  day?: number | string;
  onClick?: () => void;
  type: 'inactive' | 'active' | 'header' | 'selected' | 'today';
  hasEvents?: boolean;
  eventCount?: number;
  isDisabled?: boolean;
  isLargeDesktop?: boolean;
  isDesktop?: boolean;
}

export const CalendarDayCard: React.FC<CalendarDayCardProps> = ({
  day,
  onClick,
  type,
  hasEvents = false,
  eventCount = 0,
  isDisabled = false,
  isLargeDesktop = false,
  isDesktop = false,
}) => {
  const { theme } = useAppTheme();
  const isLargeScreen = isDesktop || isLargeDesktop;
  const minHeight = isLargeScreen ? '64px' : '40px';

  const getCardProps = () => {
    const baseProps = {
      elevation: 'low' as const,
      style: { minHeight },
    };

    const typeConfig = {
      inactive: {
        interactive: false,
        style: {
          backgroundColor: theme.palette.neutralTertiary,
          opacity: 0.5,
        },
      },
      header: {
        interactive: false,
        style: {
          backgroundColor: theme.palette.themeDark,
          height: '48px',
          minHeight: '48px',
        },
      },
      selected: {
        interactive: true,
        elevation: 'medium' as const,
        selected: true,
        style: {
          backgroundColor: theme.palette.themeLight,
        },
      },
      today: {
        interactive: true,
        elevation: 'medium' as const,
        style: {
          backgroundColor: theme.palette.themeDarker,
          border: `2px solid ${theme.palette.themePrimary}`,
        },
      },
      active: {
        interactive: !isDisabled,
        style: {
          backgroundColor: theme.semanticColors.bodyBackground,
        },
      },
    };

    const config =
      typeConfig[type as keyof typeof typeConfig] || typeConfig.active;

    return {
      ...baseProps,
      ...config,
      style: {
        ...baseProps.style,
        ...config.style,
      },
    };
  };

  const contentClass = mergeStyles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.s1,
    minHeight:
      type === 'header'
        ? '48px'
        : isLargeDesktop || isDesktop
          ? '64px'
          : '40px',
    position: 'relative',
  });

  const eventIndicatorClass = mergeStyles({
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: theme.palette.themePrimary,
    color: theme.semanticColors.bodyBackground,
  });

  const getTextColor = () => {
    if (type === 'header') return theme.palette.white;
    if (type === 'inactive') return theme.palette.neutralTertiary;
    if (type === 'today') return theme.palette.themeTertiary;
    if (type === 'selected') return theme.semanticColors.bodyBackground;
    return theme.palette.neutralPrimary;
  };

  const getTextVariant = () => {
    return type === 'header'
      ? isLargeScreen
        ? 'h3'
        : 'h4'
      : isLargeScreen
        ? 'h4'
        : 'h5';
  };

  const cardProps = getCardProps();

  if (type === 'inactive' && !day) {
    return (
      <BaseCard {...cardProps}>
        <div className={contentClass} />
      </BaseCard>
    );
  }

  return (
    <BaseCard
      {...cardProps}
      onClick={onClick && !isDisabled ? onClick : undefined}
    >
      <div className={contentClass}>
        <Typography
          variant={getTextVariant()}
          color={getTextColor()}
          textAlign='center'
          textTransform={type === 'header' ? 'lowercase' : 'none'}
          margin='0'
        >
          {day}
        </Typography>
        {hasEvents && type !== 'header' && type !== 'inactive' && (
          <>
            <div className={eventIndicatorClass} />
            {eventCount > 0 && (
              <Typography
                variant='caption'
                color={theme.palette.neutralSecondary}
                margin='0'
                marginTop='2px'
              >
                {eventCount}
              </Typography>
            )}
          </>
        )}
      </div>
    </BaseCard>
  );
};

export default CalendarDayCard;
