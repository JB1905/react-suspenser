import React from 'react';

import { SuspenseContext } from './context';

import type { Fallback } from './types/Fallback';

export const withSuspense = (fallback?: Fallback) => {
  return <T,>(WrappedComponent: React.ComponentType<T>) => (props: T) => (
    <SuspenseContext.Consumer>
      {(globalFallback) => (
        <>
          {/* TODO */}
          {/* Object.keys(obj).length === 0 */}
          {console.log(globalFallback)}
          <React.Suspense
            fallback={
              fallback ?? `${globalFallback}` === '{}' ? null : globalFallback
            }
          >
            <WrappedComponent {...props} />
          </React.Suspense>
        </>
      )}
    </SuspenseContext.Consumer>
  );
};
