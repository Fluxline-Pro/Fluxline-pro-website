import React from 'react';
import { DateHeaderCard } from '../dates/calendar-card/date-header-card/date-header-card';

interface ContentDateHeaderProps {
  date: number | string;
  format?: 'year' | 'month' | 'day' | 'full';
  onClick?: () => void;
  interactive?: boolean;
}
  
export const ContentDateHeader: React.FC<ContentDateHeaderProps> = ({
  date,
  format = 'year',
  onClick,
  interactive = false,
}) => {
  return (
    <DateHeaderCard
      date={date}
      format={format}
      onClick={onClick}
      interactive={interactive}
    />
  );
};

export default ContentDateHeader;
