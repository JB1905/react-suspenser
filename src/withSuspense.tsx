import React from 'react';

import { SuspenseContext } from './context';

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => (
    <SuspenseContext.Consumer>
      {(fallback) => (
        <React.Suspense fallback={fallback}>
          <WrappedComponent {...props} />
        </React.Suspense>
      )}
    </SuspenseContext.Consumer>
  );
}
