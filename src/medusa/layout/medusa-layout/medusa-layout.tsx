import { SidebarProvider } from '../../contexts/sidebar-provider';
import { MainLayout } from '../main-layout';

interface IMedusaLayoutProps {
  children?: React.ReactNode;
}

export const MedusaLayout = ({ children }: IMedusaLayoutProps) => {
  return (
    <SidebarProvider>
      <MainLayout>{children}</MainLayout>
    </SidebarProvider>
  );
};
