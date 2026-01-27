'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { type LoginFormValues, loginFormSchema } from '@/entities/account';
import { Button } from '@/shared/ui/button';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: 'test@gmail.com',
      password: '1234',
    },
  });

  const handleSubmit = formHandleSubmit(async (data) => {
    await signIn('login-credentials', { ...data, callbackUrl: searchParams.get('callbackUrl') ?? '/' });
  });

  return (
    <div className="flex flex-col items-center rounded-md shadow-md p-4 w-sm mx-auto">
      <div className="text-2xl font-bold">Login</div>
      <form className="w-full mt-4" onSubmit={handleSubmit}>
        <Controller
          control={control}
          name="login"
          render={({ field }) => (
            <input type="text" {...field} className="w-full my-2 p-2 rounded-md border" placeholder="email" />
          )}
        />
        {formState.errors.login && <div className="text-red-500">{formState.errors.login.message}</div>}
        <Controller
          control={control}
          name="password"
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
