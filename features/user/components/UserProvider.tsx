'use client';

import { createContext, use, useContext } from 'react';
import type { ReactNode } from 'react';

type UserContextType = {
  loggedIn: Promise<boolean>;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children, loggedIn }: { children: ReactNode; loggedIn: Promise<boolean> }) {
  return <UserContext.Provider value={{ loggedIn }}>{children}</UserContext.Provider>;
}

export const useLoggedIn = () => {
  const { loggedIn } = useUser();
  return use(loggedIn);
};
