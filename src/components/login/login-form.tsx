'use client';

import Button from '@/components/common/button';
import { ILoginFormValue } from '@/lib/common/account';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
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
    <div className="flex flex-col items-center rounded-md shadow-md p-4 w-64 mx-auto">
      <div className="text-2xl font-bold">Login</div>
      <form className="w-full mt-4" onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="login"
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <input type="text" {...field} className="w-full my-2 p-2 rounded-md border" placeholder="email" />
          )}
        />
        {formState.errors.login && <div className="text-red-500">{formState.errors.login.message}</div>}
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <input type="password" {...field} className="w-full my-2 p-2 rounded-md border" placeholder="password" />
          )}
        />
        {formState.errors.password && <div className="text-red-500">{formState.errors.password.message}</div>}
        <Button type="submit">Submit</Button>
      </form>
      {searchParams.get('error') === 'CredentialsSignin' && (
        <div>
          <div className="text-red-500">Invalid email or password</div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
