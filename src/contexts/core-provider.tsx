import AuthProvider from './auth-provider';
import SessionProvider from '@/contexts/session-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
