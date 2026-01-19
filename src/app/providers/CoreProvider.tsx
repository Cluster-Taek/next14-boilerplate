import { AuthProvider } from '@/features/auth';
import { QueryProvider } from './QueryProvider';
import { SessionProvider } from './SessionProvider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

export const CoreProvider = ({ children }: ICoreProviderProps) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </SessionProvider>
  );
};
