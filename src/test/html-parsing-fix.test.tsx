import React from 'react';
import { render, screen } from '@testing-library/react';
// This import is essential for toBeInTheDocument and toHaveAttribute matchers
import '@testing-library/jest-dom';
import { ProfessionalSummary } from '../pages/services/services';

// Mock dependencies
// Note: If you're having issues with react-router-dom not being found,
// ensure it's properly installed and consider using a __mocks__ directory
// for module mocking according to Jest's documentation.
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/about' }),
  useNavigate: () => jest.fn(),
}));

jest.mock('../theme/hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    theme: {
      palette: {
        neutralPrimary: '#000',
      },
      spacing: {
        s: '0.5rem',
        m: '1rem',
      },
    },
  }),
}));

jest.mock('../theme/hooks/useMediaQuery', () => ({
  useDeviceOrientation: () => 'landscape',
}));

describe('ProfessionalSummary HTML Parsing Fix', () => {
  test('renders about summary without dangerouslySetInnerHTML', () => {
    render(<ProfessionalSummary currentView="about" />);
    
    // Check that the content is rendered safely
    expect(screen.getByText(/architect of transformative systems/i)).toBeInTheDocument();
    expect(screen.getByText(/founder of fluxline/i)).toBeInTheDocument();
    
    // Verify no dangerouslySetInnerHTML in the DOM
    const summaryElements = screen.getAllByText(/architect of transformative systems/i);
    summaryElements.forEach(element => {
      expect(element).not.toHaveAttribute('dangerouslySetInnerHTML');
      expect(element.innerHTML).not.toContain('<br />');
    });
  });

  test('renders services summary as simple string', () => {
    render(<ProfessionalSummary currentView="services" />);
    
    expect(screen.getByText(/strategic, design-forward/i)).toBeInTheDocument();
  });
});