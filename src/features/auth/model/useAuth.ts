import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error('Auth context must be used within a AuthProvider!');
  }
  return result;
}
