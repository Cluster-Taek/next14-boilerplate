import { MainLayout } from '@/components/layout/main-layout';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex flex-row">
      <MainLayout />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
