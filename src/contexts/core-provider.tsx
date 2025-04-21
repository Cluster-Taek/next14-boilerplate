import AlertProvider from './alert-provider';
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
        <AlertProvider>
          <QueryProvider>{children}</QueryProvider>
        </AlertProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
