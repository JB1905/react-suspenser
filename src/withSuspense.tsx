import React from 'react';

import { SuspenseContext } from './context';

import type { Fallback } from './types/Fallback';

export function withSuspense<T>(
  WrappedComponent: React.ComponentType<T>,
  fallback?: Fallback
) {
  return (props: T) => (
    <SuspenseContext.Consumer>
      {(globalFallback) => (
        <React.Suspense fallback={fallback ?? globalFallback}>
          <WrappedComponent {...props} />
        </React.Suspense>
      )}
    </SuspenseContext.Consumer>
  );
}
