import React from 'react';
import { Text, mergeStyles } from '@fluentui/react';
import { useAppTheme } from '../../../../hooks/useAppTheme';

// import { useChangeTheme } from '../../../../utils/hooks/useChangeTheme';

interface CalendarButtonProps {
  month?: string;
  handleCalendarView?: () => void;
  handleSetMonth?: (month: string) => void;
  handleSetYear?: (year: number) => void;
  isSelectRow?: boolean;
  type: 'year' | 'month';
  year?: number;
}

// used for months and years selection
export const CalendarButton: React.FC<CalendarButtonProps> = ({
  isSelectRow = false,
  handleCalendarView = () => {},
  handleSetMonth = () => {},
  handleSetYear = () => {},
  month = '',
  type,
  year = 2024,
}) => {
  const { theme } = useAppTheme();

  const buttonClass = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.l2,
    margin: `0 ${theme.spacing.s1}`,
    cursor: 'pointer',
    backgroundColor: theme.palette.neutralLighter,
    borderRadius: theme.effects.roundedCorner2,
    transition: 'background-color 0.2s ease',
    selectors: {
      '&:hover': {
        backgroundColor: theme.palette.neutralLight,
      },
    },
  });

  const textClass = mergeStyles({
    fontSize: theme.fonts.xLarge.fontSize,
    fontWeight: theme.fonts.xLarge.fontWeight,
    color: theme.palette.neutralPrimary,
    textTransform: 'lowercase',
    margin: 0,
  });

  return (
    <div>
      {type === 'month' ? (
        <div
          className={buttonClass}
          onClick={
            isSelectRow ? handleCalendarView : () => handleSetMonth(month)
          }
        >
          <Text className={textClass}>{month}</Text>
        </div>
      ) : (
        <div
          className={buttonClass}
          onClick={isSelectRow ? handleCalendarView : () => handleSetYear(year)}
        >
          <Text className={textClass}>{year}</Text>
        </div>
      )}
    </div>
  );
};

export default CalendarButton;
