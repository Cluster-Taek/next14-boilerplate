import AuthProvider from './auth-provider';
import ModalProvider from './modal-provider';
import { QueryProvider } from './query-provider';
import SessionProvider from '@/contexts/session-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <QueryProvider>
          <ModalProvider>{children}</ModalProvider>
        </QueryProvider>
      </AuthProvider>
    </SessionProvider>
  );
};

export default CoreProvider;
