interface ICommonTestComponentProps {
  children?: React.ReactNode;
}

export const CommonTestComponent = ({ children }: ICommonTestComponentProps) => {
  return (
    <div className="block">
      <div>{children}</div>
    </div>
  );
};
