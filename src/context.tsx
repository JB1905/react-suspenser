import React from 'react';

export const SuspenseContext = React.createContext<any>({});

interface Props {
  readonly fallback: any;
}

export const SuspenseProvider: React.FC<Props> = ({ children, fallback }) => {
  return (
    <SuspenseContext.Provider value={fallback}>
      {children}
    </SuspenseContext.Provider>
  );
};
