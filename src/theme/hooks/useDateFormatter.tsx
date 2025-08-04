import { isDayjs } from 'dayjs';

// converts the date to this format:
// 01 Jan, 2023
// or if it's a dayjs object, uses its format method
export const useDateFormatter = (date: string | Date): string => {
  if (isDayjs(date)) {
    return date.format('DD MMM, YYYY');
  } else {
    return new Date(date)
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toLowerCase();
  }
};
