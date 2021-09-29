
import React, { lazy } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SuspenseProvider, withSuspense } from '../src';

describe('withSuspense', () => {
  it('should render HOC without context', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the lazy component';
    const Fallback = () => <p>Loading without context...</p>;

    const WrappedComponent = withSuspense(<Fallback />)(LazyComponent);

    const { getByText, findByText } = render(<WrappedComponent text={text} />);

    expect(getByText('Loading without context...')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('should render HOC without context and fallback value', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the lazy component';

    const WrappedComponent = withSuspense()(LazyComponent);

    const { container, findByText } = render(<WrappedComponent text={text} />);

    expect(container.innerHTML).toBe(''); // TODO
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('global fallback undefined, fallback undefined', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the lazy component';

    const WrappedComponent = withSuspense()(LazyComponent);

    const { debug, getByText, findByText } = render(
      <SuspenseProvider fallback={null}>
        <WrappedComponent text={text} />
      </SuspenseProvider>
    );

    // debug();
    // expect(getByText('hello')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('global fallback component, fallback undefined', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the lazy component';
    const Fallback = () => <p>Loading next...</p>;

    const WrappedComponent = withSuspense()(LazyComponent);

    const { debug, getByText, findByText } = render(
      <SuspenseProvider fallback={<Fallback />}>
        <WrappedComponent text={text} />
      </SuspenseProvider>
    );

    debug();
    // expect(getByText('hello')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('global fallback undefined, fallback component', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the last lazy component';

    const WrappedComponent = withSuspense(<p>hello</p>)(LazyComponent);

    const { debug, getByText, findByText } = render(
      <SuspenseProvider fallback={null}>
        {/* <SuspenseProvider fallback={undefined}> */}
        <WrappedComponent text={text} />
      </SuspenseProvider>
    );

    debug();
    // expect(getByText('hello')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });

  it('global fallback component, fallback component', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the last lazy component';
    const Fallback = () => <p>Loading next...</p>;

    const WrappedComponent = withSuspense(<p>hello</p>)(LazyComponent);

    const { debug, getByText, findByText } = render(
      <SuspenseProvider fallback={<Fallback />}>
        <WrappedComponent text={text} />
      </SuspenseProvider>
    );

    debug();
    // expect(getByText('hello')).toBeInTheDocument();
    expect(await findByText(text)).toBeInTheDocument();
  });
});
