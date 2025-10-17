import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import { usePageScrollNavigation } from './usePageScrollNavigation';

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  setTimeout(cb, 0);
  return 1;
});

// Mock window scroll properties
Object.defineProperty(window, 'pageYOffset', {
  writable: true,
  value: 0,
});

Object.defineProperty(document.documentElement, 'scrollTop', {
  writable: true,
  value: 0,
});

Object.defineProperty(document.documentElement, 'scrollHeight', {
  writable: true,
  value: 1000,
});

Object.defineProperty(document.documentElement, 'clientHeight', {
  writable: true,
  value: 800,
});

describe('usePageScrollNavigation', () => {
  beforeEach(() => {
    // Reset scroll values
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, writable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, writable: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePageScrollNavigation());

    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isAtBottom).toBe(false);
    expect(result.current.canNavigateForward).toBe(false);
    expect(result.current.canNavigateBackward).toBe(false);
  });

  it('should detect when scrolled to bottom', async () => {
    const { result } = renderHook(() => usePageScrollNavigation());

    // Simulate scroll to bottom (scrollTop + clientHeight >= scrollHeight - threshold)
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 950, writable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 950, writable: true });
      
      // Trigger scroll event
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    // Wait for the async update
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current.isAtBottom).toBe(true);
    expect(result.current.canNavigateForward).toBe(true);
    expect(result.current.isAtTop).toBe(false);
  });

  it('should detect when at top', async () => {
    const { result } = renderHook(() => usePageScrollNavigation());

    // Start with some scroll position
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 100, writable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, writable: true });
    });

    // Then scroll back to top
    act(() => {
      Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true });
      
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isAtBottom).toBe(false);
  });

  it('should handle resize events', async () => {
    const { result } = renderHook(() => usePageScrollNavigation());

    act(() => {
      // Change the page dimensions
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1200, writable: true });
      Object.defineProperty(document.documentElement, 'clientHeight', { value: 600, writable: true });
      
      const resizeEvent = new Event('resize');
      window.dispatchEvent(resizeEvent);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    // Should recalculate positions
    expect(result.current.isAtTop).toBe(true);
    expect(result.current.isAtBottom).toBe(false);
  });

  it('should handle middle scroll positions correctly', async () => {
    const { result } = renderHook(() => usePageScrollNavigation());

    act(() => {
      // Scroll to middle position
      Object.defineProperty(window, 'pageYOffset', { value: 400, writable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 400, writable: true });
      
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 20));
    });

    expect(result.current.isAtTop).toBe(false);
    expect(result.current.isAtBottom).toBe(false);
    expect(result.current.canNavigateForward).toBe(false);
    expect(result.current.canNavigateBackward).toBe(false);
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => usePageScrollNavigation());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should throttle scroll events with requestAnimationFrame', () => {
    renderHook(() => usePageScrollNavigation());
    
    const scrollEvent = new Event('scroll');
    
    // Fire multiple scroll events rapidly
    act(() => {
      window.dispatchEvent(scrollEvent);
      window.dispatchEvent(scrollEvent);
      window.dispatchEvent(scrollEvent);
    });

    // Should use requestAnimationFrame for throttling
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });
});