interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="block p-4">
      <div className="flex flex-row items-center justify-center mb-4 relative w-full">
        <div className="text-2xl font-bold">Users</div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
