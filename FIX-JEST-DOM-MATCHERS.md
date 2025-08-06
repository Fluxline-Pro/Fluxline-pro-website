# Fix for Jest DOM Matchers in Tests

This document explains how to fix the missing Jest DOM matchers like `toBeInTheDocument` and `toHaveAttribute` in your tests.

## The Issue

The error messages indicate that certain Jest DOM matchers are not available in the test files:

```typescript
Property 'toBeInTheDocument' does not exist on type 'JestMatchers<HTMLElement>'.
Property 'toHaveAttribute' does not exist on type 'Matchers<void, HTMLElement>'.
```

## The Solution

These matchers are provided by the `@testing-library/jest-dom` package, which you already have installed. The issue is that you need to import this package in your test files.

### Method 1: Import in Each Test File

Add the following import to any test file that uses these matchers:

```typescript
import '@testing-library/jest-dom';
```

### Method 2: Setup Global Import

Create or update a `setupTests.ts` file in the src directory (which is automatically used by Create React App):

```typescript
// jest-dom adds custom jest matchers for asserting on DOM nodes
import '@testing-library/jest-dom';
```

## Additional Notes

1. For tests using ResizeObserver, you need to mock it in the setup file since it's not available in the Jest environment:

```typescript
// Mock for ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
```

1. For tests depending on react-router-dom, ensure it's properly mocked:

```typescript
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/about' }),
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>
}));
```

## Example Test

See `jest-dom-example.test.tsx` for a minimal example demonstrating the use of these matchers.
