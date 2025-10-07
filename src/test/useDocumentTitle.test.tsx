import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Test component that uses the hook
const TestComponent: React.FC<{ pathname: string }> = ({ pathname }) => {
  // Mock useLocation to return our test pathname
  React.useEffect(() => {
    Object.defineProperty(window, 'location', {
      value: { pathname },
      writable: true,
    });
  }, [pathname]);

  useDocumentTitle();
  return <div>Test Component</div>;
};

describe('useDocumentTitle', () => {
  beforeEach(() => {
    // Reset document title before each test
    document.title = '';
  });

  test('sets correct title for home page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Home');
  });

  test('sets correct title for about page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/about' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - About Me');
  });

  test('sets correct title for blog page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/blog' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Blog');
  });

  test('sets correct title for blog post page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/blog/my-blog-post' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Blog');
  });

  test('sets correct title for contact page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/contact-me' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Contact Me');
  });

  test('sets correct title for portfolio page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/portfolio' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Portfolio');
  });

  test('sets correct title for portfolio item page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/portfolio/my-project' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Portfolio');
  });

  test('sets correct title for 404 page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/non-existent-page' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - 404 - Not Found');
  });

  test('sets correct title for services page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/services' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Services');
  });

  test('sets correct title for specific service page', () => {
    render(
      <BrowserRouter>
        <TestComponent pathname='/services/consulting' />
      </BrowserRouter>
    );

    expect(document.title).toBe('Fluxline.pro - Consulting');
  });
});
