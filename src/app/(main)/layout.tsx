import { MedusaLayout } from '@/medusa/layout/medusa-layout';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return <MedusaLayout>{children}</MedusaLayout>;
};

export default Layout;
