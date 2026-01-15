import AuthProvider from './auth-provider';
import { QueryProvider } from './query-provider';
import SessionProvider from '@/contexts/session-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryProvider>{children}</QueryProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
