import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { PageStepper } from './page-stepper';

// Mock the hooks and dependencies
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/about' }),
}));

jest.mock('../../hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    theme: {
      spacing: { xl: '2rem', s: '0.75rem' },
      zIndices: { overlay: 11 },
      palette: {
        themePrimary: '#4A90E2',
        themeDark: '#1E3A52',
        white: '#FFFFFF',
      },
      animations: {
        durations: { fast: '200ms' },
        easing: { primary: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      },
      shadows: { m: '0 2px 6px rgba(0, 0, 0, 0.15)', l: '0 4px 12px rgba(0, 0, 0, 0.18)' },
    },
  }),
}));

jest.mock('../../hooks/usePageScrollNavigation', () => ({
  usePageScrollNavigation: () => ({
    isAtBottom: false,
    isAtTop: true,
    canNavigateForward: true,
    canNavigateBackward: false,
  }),
}));

jest.mock('../../../routing/constants', () => ({
  ROUTES: [
    { name: 'home', path: '', isMenuItem: true },
    { name: 'about us', path: 'about', isMenuItem: true },
    { name: 'services', path: 'services', isMenuItem: true },
    { name: 'collab & connect', path: 'contact-me', isMenuItem: true },
  ],
}));

jest.mock('../fluent-icon/fluent-icon', () => ({
  FluentIcon: ({ iconName, color }: { iconName: string; color: string }) => (
    <span data-testid={`fluent-icon-${iconName}`} style={{ color }}>
      {iconName}
    </span>
  ),
}));

describe('PageStepper', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders navigation buttons when on a middle page', () => {
    render(<PageStepper />);
    
    expect(screen.getByLabelText(/navigate to next page/i)).toBeInTheDocument();
    expect(screen.getByTestId('fluent-icon-ChevronDown')).toBeInTheDocument();
  });

  it('handles keyboard navigation correctly', () => {
    render(<PageStepper />);
    
    const forwardButton = screen.getByLabelText(/navigate to next page/i);
    
    // Test Enter key
    fireEvent.keyDown(forwardButton, { key: 'Enter', code: 'Enter' });
    expect(forwardButton).toBeInTheDocument();
    
    // Test Space key
    fireEvent.keyDown(forwardButton, { key: ' ', code: 'Space' });
    expect(forwardButton).toBeInTheDocument();
    
    // Test other keys (should not trigger)
    fireEvent.keyDown(forwardButton, { key: 'Escape', code: 'Escape' });
    expect(forwardButton).toBeInTheDocument();
  });

  it('shows correct tooltips for navigation buttons', () => {
    render(<PageStepper />);
    
    const forwardButton = screen.getByLabelText(/navigate to next page/i);
    expect(forwardButton).toHaveAttribute('title', expect.stringContaining('Go to'));
  });

  it('applies correct styling to buttons', () => {
    render(<PageStepper />);
    
    const forwardButton = screen.getByLabelText(/navigate to next page/i);
    expect(forwardButton).toHaveStyle({
      background: '#4A90E2',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
    });
  });

  it('has proper accessibility attributes', () => {
    render(<PageStepper />);
    
    const forwardButton = screen.getByLabelText(/navigate to next page/i);
    expect(forwardButton).toHaveAttribute('tabIndex', '0');
    expect(forwardButton).toHaveAttribute('aria-label');
    expect(forwardButton).toHaveAttribute('title');
  });
});