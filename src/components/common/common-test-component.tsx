interface ICommonTestComponentProps {
  children?: React.ReactNode;
}

const CommonTestComponent = ({ children }: ICommonTestComponentProps) => {
  return (
    <div className="block">
      <div>{children}</div>
    </div>
  );
};

export default CommonTestComponent;
