interface ITestLayoutProps {
  children?: React.ReactNode;
}

const TestLayout = ({ children }: ITestLayoutProps) => {
  return (
    <div className="block">
      <div>{children}</div>
    </div>
  );
};

export default TestLayout;
