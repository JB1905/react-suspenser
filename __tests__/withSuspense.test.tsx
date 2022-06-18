import React, { lazy } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SuspenseProvider, withSuspense } from '../src';

describe('withSuspense', () => {
  describe('without context', () => {
    it('should render HOC with fallback value', async () => {
      const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

      const contentText = 'I am the lazy component';
      const fallbackText = 'Loading...';
      const Fallback = () => <p>{fallbackText}</p>;

      const WrappedComponent = withSuspense(<Fallback />)(LazyComponent);

      const { getByText, findByText } = render(
        <WrappedComponent text={contentText} />
      );

      expect(getByText(fallbackText)).toBeInTheDocument();
      expect(await findByText(contentText)).toBeInTheDocument();
    });

    it('should render HOC without fallback value', async () => {
      const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

      const contentText = 'I am the lazy component';

      const WrappedComponent = withSuspense()(LazyComponent);

      const { container, findByText } = render(
        <WrappedComponent text={contentText} />
      );

      expect(container.innerHTML).toBe('');
      expect(await findByText(contentText)).toBeInTheDocument();
    });
  });

  describe('with context', () => {
    it('should render HOC without fallback value', async () => {
      const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

      const contentText = 'I am the lazy component';

      const WrappedComponent = withSuspense()(LazyComponent);

      const { container, findByText } = render(
        <SuspenseProvider fallback={null}>
          <WrappedComponent text={contentText} />
        </SuspenseProvider>
      );

      expect(container.innerHTML).toBe('');
      expect(await findByText(contentText)).toBeInTheDocument();
    });

    it('should render HOC with fallback value from context', async () => {
      const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

      const contentText = 'I am the lazy component';
      const contextFallbackText = 'Loading...';
      const ContextFallback = () => <p>{contextFallbackText}</p>;

      const WrappedComponent = withSuspense()(LazyComponent);

      const { getByText, findByText } = render(
        <SuspenseProvider fallback={<ContextFallback />}>
          <WrappedComponent text={contentText} />
        </SuspenseProvider>
      );

      expect(getByText(contextFallbackText)).toBeInTheDocument();
      expect(await findByText(contentText)).toBeInTheDocument();
    });

    it('should render HOC with fallback value from HOC', async () => {
      const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

      const contentText = 'I am the lazy component';
      const fallbackText = 'hello';
      const Fallback = () => <p>{fallbackText}</p>;

      const WrappedComponent = withSuspense(<Fallback />)(LazyComponent);

      const { getByText, findByText } = render(
        <SuspenseProvider fallback={null}>
          <WrappedComponent text={contentText} />
        </SuspenseProvider>
      );

      expect(getByText(fallbackText)).toBeInTheDocument();
      expect(await findByText(contentText)).toBeInTheDocument();
    });

    it('global fallback component, fallback component', async () => {
      const LazyComponent = lazy(() => import('../__mocks__/LazyComponent'));

      const text = 'I am the last lazy component';
      const fallbackText = 'hello';
      const Fallback = () => <p>{fallbackText}</p>;
      const contextFallbackText = 'Loading next...';
      const ContextFallback = () => <p>{contextFallbackText}</p>;
      const WrappedComponent = withSuspense(<Fallback />)(LazyComponent);

      const { getByText, queryByText, findByText } = render(
        <SuspenseProvider fallback={<ContextFallback />}>
          <WrappedComponent text={text} />
        </SuspenseProvider>
      );

      expect(getByText(fallbackText)).toBeInTheDocument();
      expect(queryByText(contextFallbackText)).not.toBeInTheDocument();
      expect(await findByText(text)).toBeInTheDocument();
    });
  });
});
