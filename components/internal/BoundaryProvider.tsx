'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type BoundaryMode = 'off' | 'hydration' | 'rendering';

type BoundaryContextType = {
  mode: BoundaryMode;
  toggleMode: () => void;
  setMode: (mode: BoundaryMode) => void;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

const BOUNDARY_MODE_KEY = 'boundaryMode';

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<BoundaryMode>('off');

  useEffect(() => {
    const savedMode = localStorage.getItem(BOUNDARY_MODE_KEY) as BoundaryMode;
    if (savedMode && ['off', 'rendering', 'hydration'].includes(savedMode)) {
      setMode(savedMode);
    }
  }, []);

  const toggleMode = () => {
    setMode(prev => {
      const newMode = prev === 'off' ? 'hydration' : 'off';
      localStorage.setItem(BOUNDARY_MODE_KEY, newMode);
      return newMode;
    });
  };

  const updateMode = (newMode: BoundaryMode) => {
    setMode(newMode);
    localStorage.setItem(BOUNDARY_MODE_KEY, newMode);
  };

  return (
    <BoundaryContext.Provider value={{ mode, setMode: updateMode, toggleMode }}>{children}</BoundaryContext.Provider>
  );
}

export function useBoundaryMode() {
  const context = useContext(BoundaryContext);
  if (!context) {
    throw new Error('useBoundaryMode must be used within a BoundaryProvider');
  }
  return context;
}
