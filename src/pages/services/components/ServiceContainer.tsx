import React from 'react';
import { Container } from '../../../theme/layouts/Container';
import { useAppTheme } from '../../../theme/hooks/useAppTheme';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface ServiceContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  marginBottom?: string;
  showHR?: boolean;
  style?: React.CSSProperties;
}

/**
 * Standardized container for service sections with consistent padding and styling
 */
export const ServiceContainer: React.FC<ServiceContainerProps> = ({
  children,
  maxWidth = '1000px',
  marginBottom = '1rem',
  showHR = false,
  style = {},
}) => {
  const { theme } = useAppTheme();
  const { isMobileOrLandscape } = useMobileDetection();

  const hrStyles = {
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  };

  return (
    <>
      {showHR && <hr style={hrStyles} />}
      <Container
        marginLeft='auto'
        marginRight='auto'
        marginBottom={marginBottom}
        padding={
          isMobileOrLandscape
            ? `${theme.spacing.l} ${theme.spacing.m}`
            : '1rem 2.5rem 0 2.5rem'
        }
        maxWidth={maxWidth}
        style={style}
      >
        {children}
      </Container>
      {showHR && <hr style={hrStyles} />}
    </>
  );
};
