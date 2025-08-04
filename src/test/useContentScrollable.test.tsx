import React from 'react';
import { renderHook } from '@testing-library/react';
import { useContentScrollable } from '../theme/hooks/useContentScrollable';

describe('useContentScrollable', () => {
  it('should return false when ref is null', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useContentScrollable(ref));
    expect(result.current).toBe(false);
  });

  it('should return false for non-scrollable content', () => {
    const mockElement = {
      scrollHeight: 100,
      clientHeight: 100,
    } as HTMLDivElement;

    const ref = { current: mockElement };
    const { result } = renderHook(() => useContentScrollable(ref));
    expect(result.current).toBe(false);
  });

  it('should return true for scrollable content', () => {
    const mockElement = {
      scrollHeight: 200,
      clientHeight: 100,
    } as HTMLDivElement;

    const ref = { current: mockElement };
    const { result } = renderHook(() => useContentScrollable(ref));
    expect(result.current).toBe(true);
  });
});