import { ReactNode } from 'react';

// TODO support undefined
export type Fallback = NonNullable<ReactNode> | null;
