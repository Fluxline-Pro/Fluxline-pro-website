import React from 'react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { LayoutGrid } from '../../../layouts/LayoutGrid';
import { Container } from '../../../layouts/Container';
import { CalendarDayCard } from './calendar-day-card/calendar-day-card';
import { DatePickerCard } from './date-picker-card/date-picker-card';
import { useIsLargeDesktop, useIsDesktop } from '../../../hooks/useMediaQuery';
import { useContentFilterStore } from '../../../../store/store-specs/contentFilterStore';
import { BackButton } from '../../back-button/back-button';

export interface CalendarCardProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (month: number, year: number) => void;
  events?: { [key: string]: number }; // date string -> event count
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysOfWeek = ['su', 'm', 'tu', 'w', 'th', 'f', 'sa'];

export const CalendarCard: React.FC<CalendarCardProps> = ({
  selectedDate,
  onDateSelect,
  onMonthChange,
  events = {},
  minDate,
  maxDate,
  className = '',
}) => {
  const { theme } = useAppTheme();

  const [currentDate, setCurrentDate] = React.useState(selectedDate || new Date());
  const [view, setView] = React.useState<'calendar' | 'months' | 'years'>('calendar');
  const { setCalendarOpen } = useContentFilterStore();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  const isLargeDesktop = useIsLargeDesktop();
  const isDesktop = useIsDesktop();

  const handleMonthClick = () => {
    setView('months');
  };

  const handleYearClick = () => {
    setView('years');
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    setCurrentDate(newDate);
    setView('calendar');
    onMonthChange?.(monthIndex, currentYear);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentMonth, 1);
    setCurrentDate(newDate);
    setView('calendar');
    onMonthChange?.(currentMonth, year);
  };

  const handleDaySelect = (day: number) => {
    const selectedDay = new Date(currentYear, currentMonth, day);
    setCurrentDate(selectedDay);
    onDateSelect?.(selectedDay);
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDaysInMonth = lastDayOfMonth.getDate();

    const days: Array<{ day: number | null; isCurrentMonth: boolean }> = [];

    // Add empty cells for days from previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false });
    }

    // Add days of current month
    for (let day = 1; day <= totalDaysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }

    // Add empty cells for next month to complete the grid
    const totalCells = Math.ceil(days.length / 7) * 7;
    while (days.length < totalCells) {
      days.push({ day: null, isCurrentMonth: false });
    }

    return days;
  };

  const getYearRange = () => {
    const startYear = Math.floor(currentYear / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  };

  // Calendar view
  if (view === 'calendar') {
    const calendarDays = getCalendarDays();

    return (
      <Container
        display='flex'
        flexDirection='column'
        alignItems='stretch'
        fullWidth
        gap={theme.spacing.m}
        className={className}
      >
        <LayoutGrid
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent={isDesktop || isLargeDesktop ? 'flex-start' : 'center'}
          gap={theme.spacing.s2}
        >
          <BackButton navigate={() => setCalendarOpen(false)} />
          <DatePickerCard
            value={months[currentMonth].toLowerCase()}
            type='month'
            onClick={handleMonthClick}
          />
          <DatePickerCard
            value={currentYear}
            type='year'
            onClick={handleYearClick}
          />
        </LayoutGrid>

        <LayoutGrid
          columns={7}
          gap={theme.spacing.s1}
          style={{ width: '100%' }}
        >
          {/* Header row with days of week */}
          {daysOfWeek.map((day) => (
            <CalendarDayCard
              key={day}
              day={day}
              type='header'
              isLargeDesktop={isLargeDesktop}
              isDesktop={isDesktop}
            />
          ))}

          {/* Calendar days */}
          {calendarDays.map((dayData, index) => {
            if (!dayData.day) {
              return (
                <CalendarDayCard
                  key={`empty-${index}`}
                  type='inactive'
                  isLargeDesktop={isLargeDesktop}
                  isDesktop={isDesktop}
                />
              );
            }

            const dayDate = new Date(currentYear, currentMonth, dayData.day);
            const dayKey = dayDate.toISOString().split('T')[0];
            const isToday =
              dayDate.getDate() === today.getDate() &&
              dayDate.getMonth() === today.getMonth() &&
              dayDate.getFullYear() === today.getFullYear();
            const isSelected =
              selectedDate &&
              dayDate.getDate() === selectedDate.getDate() &&
              dayDate.getMonth() === selectedDate.getMonth() &&
              dayDate.getFullYear() === selectedDate.getFullYear();
            const isDisabled = isDateDisabled(dayDate);
            const eventCount = events[dayKey] || 0;

            return (
              <CalendarDayCard
                key={`day-${dayData.day}`}
                day={dayData.day}
                type={isSelected ? 'selected' : isToday ? 'today' : 'active'}
                onClick={() => handleDaySelect(dayData.day!)}
                hasEvents={eventCount > 0}
                eventCount={eventCount}
                isDisabled={isDisabled}
                isLargeDesktop={isLargeDesktop}
                isDesktop={isDesktop}
              />
            );
          })}
        </LayoutGrid>
      </Container>
    );
  }

  // Months view
  if (view === 'months') {
    return (
      <Container
        display='flex'
        flexDirection='column'
        alignItems='stretch'
        fullWidth
        gap={theme.spacing.m}
        className={className}
      >
        <LayoutGrid
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          gap={theme.spacing.s2}
        >
          <DatePickerCard
            value={currentYear}
            type='year'
            onClick={handleYearClick}
          />
        </LayoutGrid>

        <LayoutGrid
          columns={3}
          gap={theme.spacing.s1}
          style={{ width: '100%' }}
        >
          {months.map((month, index) => (
            <DatePickerCard
              key={month}
              value={month.toLowerCase()}
              type='month'
              onClick={() => handleMonthSelect(index)}
              isSelected={index === currentMonth}
            />
          ))}
        </LayoutGrid>
      </Container>
    );
  }

  // Years view
  if (view === 'years') {
    const yearRange = getYearRange();

    return (
      <Container
        display='flex'
        flexDirection='column'
        alignItems='stretch'
        fullWidth
        gap={theme.spacing.m}
        className={className}
      >
        <LayoutGrid
          columns={3}
          gap={theme.spacing.s1}
          style={{ width: '100%' }}
        >
          {yearRange.map((year) => (
            <DatePickerCard
              key={year}
              value={year}
              type='year'
              onClick={() => handleYearSelect(year)}
              isSelected={year === currentYear}
            />
          ))}
        </LayoutGrid>
      </Container>
    );
  }

  return null;
};

export default CalendarCard;
