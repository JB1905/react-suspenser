import React from 'react';

import type { Fallback } from './types/Fallback';

// TODO check can be undefined
export const SuspenseContext = React.createContext<Fallback>({});

SuspenseContext.displayName = 'SuspenseContext';

interface Props {
  readonly children: React.ReactNode;
  readonly fallback: Fallback;
}

export const SuspenseProvider = ({ children, fallback }: Props) => (
  <SuspenseContext.Provider value={fallback}>
    {children}
  </SuspenseContext.Provider>
);
