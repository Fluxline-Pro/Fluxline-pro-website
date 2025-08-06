import React from 'react';
import { mergeStyles } from '@fluentui/react';
import { CalendarCard } from '../calendar-card/calendar-card';
import { useContentFilterStore } from '../../../../store/store-specs/contentFilterStore';

export interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (month: number, year: number) => void;
  events?: { [key: string]: number };
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  onMonthChange,
  events = {},
  minDate,
  maxDate,
  className = '',
}) => {
  const { selectDate, startDate, endDate, activeCalendar } =
    useContentFilterStore();

  const containerClass = mergeStyles({
    width: '100%',
  });

  // Determine which date to use as selectedDate based on activeCalendar
  const getSelectedDate = () => {
    if (selectedDate) return selectedDate;
    if (activeCalendar === 'start') return startDate;
    if (activeCalendar === 'end') return endDate;
    return new Date();
  };

  // Handle date selection - use store's selectDate if no custom onDateSelect provided
  const handleDateSelect = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date);
    } else {
      selectDate(date);
    }
  };

  return (
    <div className={`${containerClass} ${className}`}>
      <CalendarCard
        selectedDate={getSelectedDate()}
        onDateSelect={handleDateSelect}
        onMonthChange={onMonthChange}
        events={events}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default Calendar;
