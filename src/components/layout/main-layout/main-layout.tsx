import { MainSidebar } from '../main-sidebar';
import { Shell } from '../shell';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return <Shell sidebar={<MainSidebar />}>{children}</Shell>;
};
