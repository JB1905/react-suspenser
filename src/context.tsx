import React from 'react';

import type { Fallback } from './types/Fallback';

export const SuspenseContext = React.createContext<Fallback>({});

SuspenseContext.displayName = 'SuspenseContext';

interface Props {
  readonly fallback: Fallback;
}

export const SuspenseProvider: React.FC<Props> = ({ children, fallback }) => (
  <SuspenseContext.Provider value={fallback}>
    {children}
  </SuspenseContext.Provider>
);
