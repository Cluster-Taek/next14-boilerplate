'use client';

import Button from '@/components/common/button';
import { type ILoginFormValue } from '@/lib/common/account';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
  const loginFormStyle = LoginFormSva();
  const searchParams = useSearchParams();
  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
  } = useForm<ILoginFormValue>({
    defaultValues: {
      login: 'test@gmail.com',
      password: '1234',
    },
  });

  const handleSubmit = formHandleSubmit(async (data) => {
    await signIn('login-credentials', { ...data, callbackUrl: searchParams.get('callbackUrl') ?? '/' });
  });

  return (
    <Box className={loginFormStyle.wrapper}>
      <Box className={loginFormStyle.title}>Login</Box>
      <form className={loginFormStyle.form} onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="login"
          rules={{ required: 'Email is required' }}
          render={({ field }) => <input type="text" {...field} className={loginFormStyle.input} placeholder="email" />}
        />
        {formState.errors.login && <Box className={loginFormStyle.error}>{formState.errors.login.message}</Box>}
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <input type="password" {...field} className={loginFormStyle.input} placeholder="password" />
          )}
        />
        {formState.errors.password && <Box className={loginFormStyle.error}>{formState.errors.password.message}</Box>}
        <Button type="submit">Submit</Button>
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
  slots: ['wrapper', 'title', 'form', 'input', 'error'],
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
    error: {
      color: 'red.500',
    },
  },
});
