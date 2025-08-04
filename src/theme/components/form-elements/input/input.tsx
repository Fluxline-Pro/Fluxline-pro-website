import React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react';

import { useAppTheme } from '../../../hooks/useAppTheme';

interface FluentInputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  step?: number;
  tabIndex?: number;
  error?: boolean;
  onChange: (value: string) => void;
  pattern?: string;
  errorMessage?: string;
  description?: string;
  autoComplete?: string;
  ariaLabel?: string;
  'aria-describedby'?: string;
  style?: React.CSSProperties;
}

export const FluentInput: React.FC<FluentInputProps> = ({
  label,
  id,
  name,
  placeholder,
  value,
  disabled,
  required,
  type = 'text',
  maxLength,
  minLength,
  max,
  min,
  step,
  pattern,
  onChange,
  errorMessage,
  description,
  autoComplete,
  ariaLabel,
  error,
  'aria-describedby': ariaDescribedBy,
  style,
}) => {
  const { theme } = useAppTheme();

  const inputStyles: Partial<ITextFieldStyles> = {
    root: {
      width: '100%',
      maxWidth: '600px',
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontVariationSettings: theme.typography.fonts.body.fontVariationSettings,
      marginBottom: theme.spacing.m,
    },
    field: {
      backgroundColor: theme.semanticColors.bodyBackground,
      color: theme.palette.neutralPrimary,
      fontFamily: theme.typography.fonts.body.fontFamily,
      fontSize: theme.typography.fonts.medium.fontSize,

      // Lines 66-67: stupid hacks to make the input actually appear in the box
      marginTop: '-1rem',
      marginLeft: '-1.25rem',
      cursor: 'text',
      padding: theme.spacing.m,
      '::placeholder': {
        color: theme.palette.neutralTertiary,
        fontSize: theme.typography.fonts.medium.fontSize,
      },
      selectors: {
        ':hover': {
          borderColor: error ? theme.palette.red : theme.palette.themePrimary,
        },
        ':focus': {
          borderColor: error ? theme.palette.red : theme.palette.themePrimary,
          outline: 'none',
        },
      },
    },
    fieldGroup: {
      borderColor: error ? theme.palette.red : theme.palette.neutralTertiary,
      borderRadius: theme.borderRadius.container.button,
      backgroundColor: theme.semanticColors.bodyBackground,
      padding: theme.spacing.l1,
      transition: 'all 0.2s ease-in-out',
      selectors: {
        ':hover': {
          borderColor: error ? theme.palette.red : theme.palette.themePrimary,
        },
        ':focus-within': {
          borderColor: error ? theme.palette.red : theme.palette.themePrimary,
          boxShadow: `0 0 0 1px ${error ? theme.palette.red : theme.palette.themePrimary}`,
        },
        '&.ms-TextField-fieldGroup.is-disabled': {
          backgroundColor: theme.palette.neutralLighter,
          borderColor: theme.palette.neutralTertiary,
        },
      },
    },
    errorMessage: {
      color: theme.palette.red,
      fontSize: theme.typography.fonts.small.fontSize,
      marginTop: theme.spacing.s1,
    },
    subComponentStyles: {
      label: {
        root: {
          color:
            error ? theme.palette.red :
            theme.themeMode === 'high-contrast'
              ? theme.palette.white
              : theme.palette.themePrimary,
          fontFamily: theme.typography.fonts.body.fontFamily,
          fontVariationSettings:
            theme.typography.fonts.body.fontVariationSettings,
          fontSize: theme.typography.fonts.h4.fontSize,
          fontWeight: theme.typography.fonts.medium.fontWeight,
          letterSpacing: theme.typography.letterSpacing.normal,
          lineHeight: theme.typography.lineHeights.tight,
          textTransform: 'lowercase' as const,
          marginTop: theme.spacing.s,
          marginBottom: theme.spacing.s,
        },
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: theme.spacing.s1,
        width: '100%',
      }}
    >
      <TextField
        styles={inputStyles}
        name={name}
        label={label}
        type={type === 'textarea' ? undefined : type}
        multiline={type === 'textarea'}
        rows={type === 'textarea' ? 4 : undefined}
        id={id}
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        max={max}
        min={min}
        step={step}
        pattern={pattern}
        errorMessage={
          errorMessage ? (error ? errorMessage : errorMessage) : null
        }
        description={description}
        autoComplete={autoComplete}
        ariaLabel={ariaLabel}
        aria-describedby={ariaDescribedBy}
        onChange={(_, newValue) => onChange(newValue || '')}
        style={style}
      />
    </div>
  );
};

export default FluentInput;
