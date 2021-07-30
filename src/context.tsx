import React from 'react';

import type { Fallback } from './types/Fallback';

export const SuspenseContext = React.createContext<Fallback | undefined>(
  undefined
);

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
