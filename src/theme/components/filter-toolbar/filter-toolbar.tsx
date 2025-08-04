import React from 'react';
import { mergeStyles } from '@fluentui/react';

import { useAppTheme } from '../../hooks/useAppTheme';
import { useIsTablet, useIsMobile } from '../../hooks/useMediaQuery';
import { ContentPicker } from '../content-picker/content-picker';
import { DatePicker } from '../dates/date-picker/date-picker';
import { LayoutGrid } from '../../layouts/LayoutGrid';

export const FilterToolbar: React.FC = () => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const toolbarStyles = mergeStyles({
    padding: `${theme.spacing.m} 0`,
    width: isMobile ? '100%' : 'auto',
    maxWidth: isMobile ? '100%' : '450px',
    marginLeft: isMobile ? '0' : 'auto',
  });

  return (
    <LayoutGrid
      className={toolbarStyles}
      columns={3}
      gap={isMobile || isTablet ? theme.spacing.xxs : '0.75rem'}
    >
      <DatePicker dateType='start' />
      <DatePicker dateType='end' />
      <ContentPicker />
    </LayoutGrid>
  );
};

export default FilterToolbar;
