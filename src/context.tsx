import React from 'react';

import type { Fallback } from './types/Fallback';

export const SuspenseContext = React.createContext<Fallback>({});

interface Props {
  readonly fallback: Fallback;
}

export const SuspenseProvider: React.FC<Props> = ({ children, fallback }) => {
  return (
    <SuspenseContext.Provider value={fallback}>
      {children}
    </SuspenseContext.Provider>
  );
};
