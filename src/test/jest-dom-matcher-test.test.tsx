import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Jest DOM Matchers Test', () => {
  test('toBeInTheDocument works', () => {
    render(<div data-testid="test-element">Test Element</div>);
    expect(screen.getByTestId('test-element')).toBeInTheDocument();
  });

  test('toHaveAttribute works', () => {
    render(<div data-testid="test-element" data-foo="bar">Test Element</div>);
    expect(screen.getByTestId('test-element')).toHaveAttribute('data-foo', 'bar');
    expect(screen.getByTestId('test-element')).not.toHaveAttribute('data-baz');
  });
});
