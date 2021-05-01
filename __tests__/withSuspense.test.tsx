import React, { lazy } from 'react';
import { render, waitForElementToBeRemoved, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SuspenseProvider, withSuspense } from '../src';

describe('withSuspense', () => {
  const expector = async ({ findByText, text, fallbackText }: any) => {
    const componentElement = findByText(text);
    const fallbackElement = findByText(fallbackText);

    expect(componentElement).not.toBeInTheDocument();
    expect(fallbackElement).toBeInTheDocument();

    await waitForElementToBeRemoved(() => fallbackElement);

    expect(fallbackElement).not.toBeInTheDocument();
    expect(componentElement).toBeInTheDocument();
  };

  it('should render HOC with context', () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am lazy component';
    const fallbackText = 'Loading...';

    const Fallback = () => <p>{fallbackText}</p>;

    const WrappedComponent = withSuspense()(LazyComponent);

    const { findByText } = render(
      <SuspenseProvider fallback={<Fallback />}>
        <WrappedComponent text={text} />
      </SuspenseProvider>
    );

    act(async () => await expector({ findByText, text, fallbackText }));
  });

  it('should render HOC without context', () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am the next lazy component';
    const fallbackText = 'Loading next...';

    const Fallback = () => <p>{fallbackText}</p>;

    const WrappedComponent = withSuspense(<Fallback />)(LazyComponent);

    const { findByText } = render(<WrappedComponent text={text} />);

    act(async () => await expector({ findByText, text, fallbackText }));
  });

  it('should render HOC without context and fallback value', async () => {
    const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

    const text = 'I am another lazy component';

    const WrappedComponent = withSuspense()(LazyComponent);

    const { container, findByText } = render(<WrappedComponent text={text} />);

    const componentElement = findByText(text);

    expect(container.innerHTML).toBe('');
    expect(await componentElement).toBeInTheDocument();
  });
});
