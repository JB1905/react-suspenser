import React from 'react';

import { SuspenseContext } from './context';

import type { Fallback } from './types/Fallback';

export const withSuspense = (fallback?: Fallback) => {
  return <T,>(WrappedComponent: React.ComponentType<T>) => (props: T) => (
    <SuspenseContext.Consumer>
      {(globalFallback) => (
        <React.Suspense fallback={fallback ?? globalFallback}>
          <WrappedComponent {...props} />
        </React.Suspense>
      )}
    </SuspenseContext.Consumer>
  );
};
