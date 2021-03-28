import React, { lazy } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SuspenseProvider, withSuspense } from '../src';

describe('withSuspense', () => {
  it('should render HOC with context', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am lazy component';
    const Fallback = () => <p>Loading...</p>;

    const WrappedComponent = withSuspense()(LazyComponent);

    const { getByText, findByText } = render(
      <SuspenseProvider fallback={<Fallback />}>
        <WrappedComponent text={text} />
      </SuspenseProvider>
    );

    expect(getByText('Loading...')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('should render HOC without context', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the next lazy component';
    const Fallback = () => <p>Loading next...</p>;

    const WrappedComponent = withSuspense(<Fallback />)(LazyComponent);

    const { getByText, findByText } = render(<WrappedComponent text={text} />);

    expect(getByText('Loading next...')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('should render HOC without context and fallback value', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am another lazy component';

    const WrappedComponent = withSuspense()(LazyComponent);

    const { container, findByText } = render(<WrappedComponent text={text} />);

    expect(container.innerHTML).toBe('');
    expect(await findByText(text)).toBeInTheDocument();
  });
});
