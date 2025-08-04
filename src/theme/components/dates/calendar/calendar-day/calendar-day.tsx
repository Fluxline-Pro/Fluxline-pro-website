import { Text, mergeStyles } from '@fluentui/react';

import { useAppTheme } from '../../../../hooks/useAppTheme';

interface CalendarDayProps {
  day?: number | string;
  handleSetDay?: () => void;
  type: 'inactive' | 'active' | 'day';
}

// individual day buttons, inactive, and numbers for the calendar
export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  handleSetDay,
  type,
}) => {
  const { theme } = useAppTheme();

  const dayCardClass = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.l2,
    margin: `0 ${theme.spacing.s1}`,
    cursor: type === 'active' ? 'pointer' : 'default',
    backgroundColor:
      type === 'inactive'
        ? theme.palette.neutralLighterAlt
        : theme.palette.neutralLighter,
    borderRadius: theme.effects.roundedCorner2,
    transition: 'background-color 0.2s ease',
    selectors: {
      '&:hover':
        type === 'active'
          ? {
              backgroundColor: theme.palette.neutralLight,
            }
          : {},
    },
  });

  const textClass = mergeStyles({
    fontSize: theme.fonts.xLarge.fontSize,
    fontWeight: theme.fonts.xLarge.fontWeight,
    color:
      type === 'day'
        ? theme.palette.white
        : type === 'active'
          ? theme.palette.themePrimary
          : theme.palette.neutralPrimary,
    margin: 0,
  });

  let content;

  switch (type) {
    case 'inactive':
      content = <div className={dayCardClass} />;
      break;
    case 'active':
      content = (
        <div className={dayCardClass} onClick={handleSetDay}>
          <Text className={textClass}>{day}</Text>
        </div>
      );
      break;
    default:
      content = (
        <div className={dayCardClass}>
          <Text className={textClass}>{day}</Text>
        </div>
      );
  }

  return content;
};

export default CalendarDay;
