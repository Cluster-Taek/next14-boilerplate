import { QueryProvider } from './query-provider';

interface ICoreProviderProps {
  children?: React.ReactNode;
}

const CoreProvider = ({ children }: ICoreProviderProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default CoreProvider;
