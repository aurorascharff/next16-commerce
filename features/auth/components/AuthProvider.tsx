'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: Promise<boolean>;
}) {
  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
}
