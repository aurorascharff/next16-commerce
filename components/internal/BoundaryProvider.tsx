'use client';

import React, { createContext, useContext, useState } from 'react';

export type BoundaryMode = 'off' | 'rendering' | 'hydration';

type BoundaryContextType = {
  mode: BoundaryMode;
  toggleMode: () => void;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<BoundaryMode>('off');

  const toggleMode = () => {
    setMode(prev => {
      if (prev === 'off') return 'rendering';
      if (prev === 'rendering') return 'hydration';
      return 'off';
    });
  };

  return <BoundaryContext.Provider value={{ mode, toggleMode }}>{children}</BoundaryContext.Provider>;
}

export function useBoundaryMode() {
  const context = useContext(BoundaryContext);
  if (!context) {
    throw new Error('useBoundaryMode must be used within a BoundaryProvider');
  }
  return context;
}
