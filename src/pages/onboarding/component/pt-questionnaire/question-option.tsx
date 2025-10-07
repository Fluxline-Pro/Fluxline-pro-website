/**
 * Question Option Component for PT Questionnaire
 * Reusable single-select and multi-select option cards
 */

import React from 'react';
import { useAppTheme } from '../../../../theme/hooks/useAppTheme';
import { Container } from '../../../../theme/layouts/Container';

interface QuestionOptionProps {
  icon?: string;
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  multiSelect?: boolean;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  icon,
  label,
  isSelected,
  onClick,
  disabled = false,
  multiSelect = false,
}) => {
  const { theme } = useAppTheme();

  return (
    <Container
      display='flex'
      alignItems='center'
      gap='0.75rem'
      padding='1rem 1.25rem'
      style={{
        border: `2px solid ${isSelected ? theme.palette.themePrimary : theme.palette.neutralLight}`,
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: isSelected
          ? `${theme.palette.themePrimary}15`
          : theme.palette.white,
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        userSelect: 'none',
      }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = theme.palette.themePrimary;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isSelected) {
          e.currentTarget.style.borderColor = theme.palette.neutralLight;
        }
      }}
    >
      {/* Checkbox/Radio indicator */}
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: multiSelect ? '4px' : '50%',
          border: `2px solid ${isSelected ? theme.palette.themePrimary : theme.palette.neutralTertiary}`,
          backgroundColor: isSelected ? theme.palette.themePrimary : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isSelected && (
          <span style={{ color: theme.palette.white, fontSize: '14px' }}>✓</span>
        )}
      </div>

      {/* Icon (emoji) */}
      {icon && (
        <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
      )}

      {/* Label */}
      <span
        style={{
          color: isSelected ? theme.palette.themePrimary : theme.palette.neutralPrimary,
          fontSize: '1rem',
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {label}
      </span>
    </Container>
  );
};
