// src/theme/components/navigation/SettingsSection.tsx
import React from 'react';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { createTypographyStyles } from './fontsize-settings';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const { theme } = useAppTheme();
  const typographyStyles = createTypographyStyles(theme);

  const styles = {
    section: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    title: {
      ...typographyStyles.sectionTitle,
      color: theme.palette.themePrimary,
      marginBottom: '0.5rem',
    },
    divider: {
      color: theme.palette.themeSecondary,
      marginTop: '1rem',
      marginBottom: '0',
    },
  };

  return (
    <div style={styles.section}>
      <hr style={styles.divider} />
      <h3 style={styles.title}>{title}</h3>
      {children}
    </div>
  );
};
