import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { BaseCard } from '../../../card/base-card/base-card';
import { Typography } from '../../../typography/typography';

export interface DatePickerCardProps {
  value: string | number;
  type: 'month' | 'year';
  onClick?: () => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export const DatePickerCard: React.FC<DatePickerCardProps> = ({
  value,
  type,
  onClick,
  isSelected = false,
  isDisabled = false,
}) => {
  const { theme } = useAppTheme();

  const contentClass = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.s,
    minHeight: '48px',
    minWidth: type === 'month' ? '120px' : '80px',
  });

  const textClass = mergeStyles({
    fontSize: theme.fonts.large.fontSize,
    fontWeight: isSelected
      ? theme.fonts.large.fontWeight
      : theme.fonts.medium.fontWeight,
    color: isSelected
      ? theme.palette.white
      : isDisabled
        ? theme.palette.neutralTertiary
        : theme.palette.themePrimary,
    margin: 0,
    textAlign: 'center',
    textTransform: 'lowercase',
  });

  const cardStyle: React.CSSProperties = {
    backgroundColor: isSelected
      ? theme.palette.themeDarker
      : theme.semanticColors.bodyBackground,
    border: isSelected ? `2px solid ${theme.palette.themePrimary}` : undefined,
  };

  return (
    <BaseCard
      onClick={onClick && !isDisabled ? onClick : undefined}
      interactive={!isDisabled}
      elevation={isSelected ? 'medium' : 'low'}
      style={cardStyle}
      selected={isSelected}
    >
      <div className={contentClass}>
        <Typography
          variant='h4'
          className={textClass}
        >
          {value}
        </Typography>
      </div>
    </BaseCard>
  );
};

export default DatePickerCard;
