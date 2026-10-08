import { getIsAuthenticated } from '../user-queries';
import { UserProvider } from './UserProvider';
import type { ReactNode } from 'react';

export default function UserSession({ children }: { children: ReactNode }) {
  const loggedIn = getIsAuthenticated();

  return <UserProvider loggedIn={loggedIn}>{children}</UserProvider>;
}
