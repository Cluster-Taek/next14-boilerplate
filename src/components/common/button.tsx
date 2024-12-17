import { sva } from '@/styled-system/css';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const Button = ({
  children,
  ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const buttonStyle = ButtonSva();
  return (
    <button className={buttonStyle.wrapper} {...props}>
      {children}
    </button>
  );
};

export default Button;

const ButtonSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      width: 'full',
      padding: '2',
      marginY: '2',
      borderRadius: 'md',
      backgroundColor: 'primary.01',
      color: 'white',
      '&:hover': {
        backgroundColor: 'primary.02',
      },
    },
  },
});
