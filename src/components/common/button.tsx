import { Button as MedusaButton } from '@medusajs/ui';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const Button = ({
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <MedusaButton className="w-full p-2 my-2 rounded-md bg-primary-01 text-white hover:bg-primary-02" {...props}>
      {children}
    </MedusaButton>
  );
};

export default Button;
