import React from 'react';

export function withSuspense<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => (
    <React.Suspense fallback={null}>
      <WrappedComponent {...props} />
    </React.Suspense>
  );
}
