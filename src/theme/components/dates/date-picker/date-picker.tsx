import React from 'react';
import { DefaultButton, mergeStyles } from '@fluentui/react';
import { format } from 'date-fns';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { FluentIcon } from '../../fluent-icon/fluent-icon';
import { useContentFilterStore } from '../../../../store/store-specs/contentFilterStore';

interface DatePickerProps {
  dateType: 'start' | 'end';
}

export const DatePicker: React.FC<DatePickerProps> = ({ dateType }) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const { startDate, endDate, toggleCalendar } = useContentFilterStore();

  const currentDate = dateType === 'start' ? startDate : endDate;
  const formattedDate = format(currentDate, 'dd MMM, yyyy');

  const handleOpenCalendar = () => {
    toggleCalendar(dateType);
  };

  const buttonStyles = mergeStyles({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.s,
    padding: `${theme.spacing.s} ${theme.spacing.m}`,
    border: 'none',
    borderRadius: 0,
    boxShadow: theme.shadows.button,
    backgroundColor: theme.semanticColors.bodyBackground,
    color: theme.palette.themePrimary,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamilies.base,
    minWidth: isMobile ? '120px' : '150px',
    height: '40px',
    fontSize: theme.typography.fonts.small.fontSize,
    textTransform: 'lowercase',
    ':hover': {
      backgroundColor: theme.palette.neutralQuaternary,
      borderColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.themePrimary,
    },
    ':focus': {
      outline: `2px solid ${theme.palette.themePrimary}`,
      outlineOffset: '2px',
    },
  });

  return (
    <DefaultButton
      className={buttonStyles}
      onClick={handleOpenCalendar}
      ariaLabel={`${dateType === 'start' ? 'Start' : 'End'} date: ${formattedDate}`}
    >
      {!isMobile && (
        <FluentIcon
          iconName='Calendar'
          size='xSmall'
          color={theme.palette.themePrimary}
        />
      )}
      <span
        style={{
          flex: 1,
          textAlign: 'left',
          margin: `${0} ${theme.spacing.xxs} ${0} 0.1rem`,
        }}
      >
        {formattedDate}
      </span>
      <FluentIcon
        iconName='ChevronDown'
        size='xSmall'
        color={theme.palette.themePrimary}
        style={{ marginRight: isMobile ? '0' : theme.spacing.xxs }}
      />
    </DefaultButton>
  );
};

export default DatePicker;
