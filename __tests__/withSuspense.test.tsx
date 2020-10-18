import React, { lazy } from 'react';
import { render } from '@testing-library/react';

import { SuspenseProvider, withSuspense } from '../src';

describe('withSuspense', () => {
  it('should test HOC with context', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const Component = withSuspense()(() => {
      return <LazyComponent />;
    });

    const { getByText, findByText } = render(
      <SuspenseProvider fallback={<p>Loading...</p>}>
        <Component />
      </SuspenseProvider>
    );

    expect(getByText('Loading...')).toBeInTheDocument();

    expect(await findByText('I am lazy component')).toBeInTheDocument();
  });

  it('should test HOC without context', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const Component = withSuspense(<p>Loading...</p>)(() => {
      return <LazyComponent />;
    });

    const { getByText, findByText } = render(<Component />);

    expect(getByText('Loading...')).toBeInTheDocument();

    expect(await findByText('I am lazy component')).toBeInTheDocument();
  });
});
