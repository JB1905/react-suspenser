import { renderHook } from '@testing-library/react-hooks';

import { useMyHook } from '../src';

describe('useMyHooks', () => {
  it('should', () => {
    const { result } = renderHook(() => useMyHook());

    expect(result.sum(2, 3)).toBe(5);
  });
});
