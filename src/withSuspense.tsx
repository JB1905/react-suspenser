import React from 'react';

import { SuspenseContext } from './context';

import type { Fallback } from './types/Fallback';

export const withSuspense = (fallback?: Fallback) => {
  return <T,>(WrappedComponent: React.ComponentType<T>) => (props: T) => (
    <SuspenseContext.Consumer>
      {(globalFallback) => {
        const isGlobalFallbackEmpty = React.isValidElement(globalFallback);

        return (
          <React.Suspense
            fallback={
              fallback ?? (isGlobalFallbackEmpty ? null : globalFallback)
            }
          >
            <WrappedComponent {...props} />
          </React.Suspense>
        );
      }}
    </SuspenseContext.Consumer>
  );
};
