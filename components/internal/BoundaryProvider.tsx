'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';

export type BoundaryMode = 'off' | 'hydration' | 'rendering';

type BoundaryContextType = {
  mode: BoundaryMode;
  toggleMode: () => void;
  setMode: (mode: BoundaryMode) => void;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

const BOUNDARY_MODE_KEY = 'boundaryMode';
const boundaryModeListeners = new Set<() => void>();

function getBoundaryMode(): BoundaryMode {
  const savedMode = localStorage.getItem(BOUNDARY_MODE_KEY);
  return savedMode && ['off', 'rendering', 'hydration'].includes(savedMode) ? (savedMode as BoundaryMode) : 'off';
}

function subscribeToBoundaryMode(listener: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === BOUNDARY_MODE_KEY) {
      listener();
    }
  };

  boundaryModeListeners.add(listener);
  window.addEventListener('storage', handleStorage);

  return () => {
    boundaryModeListeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
  };
}

function setBoundaryMode(mode: BoundaryMode) {
  localStorage.setItem(BOUNDARY_MODE_KEY, mode);
  boundaryModeListeners.forEach(listener => listener());
}

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribeToBoundaryMode, getBoundaryMode, () => 'off' as const);

  const toggleMode = () => {
    setBoundaryMode(mode === 'off' ? 'hydration' : 'off');
  };

  return (
    <BoundaryContext.Provider value={{ mode, setMode: setBoundaryMode, toggleMode }}>
      {children}
    </BoundaryContext.Provider>
  );
}

export function useBoundaryMode() {
  const context = useContext(BoundaryContext);
  if (!context) {
    throw new Error('useBoundaryMode must be used within a BoundaryProvider');
  }
  return context;
}
