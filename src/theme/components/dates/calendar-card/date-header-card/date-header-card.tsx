import React from 'react';
import { Text, mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../../../hooks/useAppTheme';
import { BaseCard } from '../../../card/base-card/base-card';

export interface DateHeaderCardProps {
  date: string | number | Date;
  format?: 'year' | 'month' | 'day' | 'full';
  onClick?: () => void;
  interactive?: boolean;
  style?: React.CSSProperties;
}

export const DateHeaderCard: React.FC<DateHeaderCardProps> = ({
  date,
  format = 'year',
  onClick,
  interactive = false,
  style,
}) => {
  const { theme } = useAppTheme();

  const formatDate = (
    dateValue: string | number | Date,
    formatType: string
  ): string => {
    let dateObj: Date;

    if (typeof dateValue === 'string') {
      dateObj = new Date(dateValue);
    } else if (typeof dateValue === 'number') {
      // Assume it's a year if it's a 4-digit number
      if (dateValue >= 1000 && dateValue <= 9999) {
        return dateValue.toString();
      }
      dateObj = new Date(dateValue);
    } else {
      dateObj = dateValue;
    }

    switch (formatType) {
      case 'year':
        return dateObj.getFullYear().toString();
      case 'month':
        return dateObj
          .toLocaleDateString('en-US', { month: 'long' })
          .toLowerCase();
      case 'day':
        return dateObj.getDate().toString();
      case 'full':
        return dateObj
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          .toLowerCase();
      default:
        return dateObj.getFullYear().toString();
    }
  };

  const contentClass = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.m,
    minHeight: '60px',
    width: '100%',
  });

  const textClass = mergeStyles({
    fontSize: theme.fonts.xLarge.fontSize,
    fontWeight: theme.fonts.xLarge.fontWeight,
    color: theme.palette.themePrimary,
    margin: 0,
    textAlign: 'left',
    textTransform: 'lowercase',
  });

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.semanticColors.bodyBackground,
    width: '100%',
    marginBottom: theme.spacing.m,
    ...style,
  };

  return (
    <BaseCard
      onClick={onClick}
      interactive={interactive}
      elevation='low'
      style={cardStyle}
    >
      <div className={contentClass}>
        <Text className={textClass}>{formatDate(date, format)}</Text>
      </div>
    </BaseCard>
  );
};

export default DateHeaderCard;
