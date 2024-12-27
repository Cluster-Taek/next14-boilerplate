import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const Button = ({
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button className="w-full p-2 my-2 rounded-md bg-primary-01 text-white hover:bg-primary-02" {...props}>
      {children}
    </button>
  );
};

export default Button;
