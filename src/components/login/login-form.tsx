'use client';

import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const loginFormStyle = LoginFormSva();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    await signIn('login-credentials', { email, password, callbackUrl: searchParams.get('callbackUrl') ?? '/' });
  };

  return (
    <Box className={loginFormStyle.wrapper}>
      <Box className={loginFormStyle.title}>Login</Box>
      <form className={loginFormStyle.form} onSubmit={handleSubmit}>
        <input type="text" className={loginFormStyle.input} name="email" defaultValue={'test@gmail.com'} />
        <input type="password" className={loginFormStyle.input} name="password" defaultValue={'1234'} />
        <button type="submit" className={loginFormStyle.button}>
          Submit
        </button>
      </form>
      {searchParams.get('error') === 'CredentialsSignin' && (
        <Box>
          <Box className={loginFormStyle.error}>Invalid email or password</Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;

const LoginFormSva = sva({
  slots: ['wrapper', 'title', 'form', 'input', 'button', 'error'],
  base: {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 'md',
      shadow: 'md',
      padding: '4',
      width: 'sm',
      margin: '0 auto',
    },
    title: {
      fontSize: '2xl',
      fontWeight: 'bold',
    },
    form: {
      width: 'full',
      marginTop: '4',
    },
    input: {
      width: 'full',
      marginY: '2',
      padding: '2',
      borderRadius: 'md',
      border: '1',
    },
    button: {
      width: 'full',
      padding: '2',
      marginY: '2',
      borderRadius: 'md',
      backgroundColor: 'blue.500',
      color: 'white',
    },
    error: {
      color: 'red.500',
    },
  },
});
