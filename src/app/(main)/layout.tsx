import { MainLayout } from '@/components/layout/main-layout';
import { SidebarProvider } from '@/contexts/sidebar-provider';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <SidebarProvider>
      <MainLayout>{children}</MainLayout>
    </SidebarProvider>
  );
};

export default Layout;
