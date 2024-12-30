'use client';

import AvatarBox from '../common/logo-box/avatar-box';
import { ILoginFormValue } from '@/lib/common/account';
import { Alert, Button, Heading, Hint, Input, Text } from '@medusajs/ui';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
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

  const serverError = formState.errors?.root?.serverError?.message;
  const validationError = formState.errors.email?.message || formState.errors.password?.message;

  const handleSubmit = formHandleSubmit(async (data) => {
    await signIn('login-credentials', { ...data, callbackUrl: searchParams.get('callbackUrl') ?? '/' });
  });

  return (
    <div className="bg-ui-bg-subtle flex min-h-dvh w-dvw items-center justify-center">
      <div className="m-4 flex w-full max-w-[280px] flex-col items-center">
        <AvatarBox />
        <div className="mb-4 flex flex-col items-center">
          <Heading>Welcome to Medusa</Heading>
          <Text size="small" className="text-ui-fg-subtle text-center">
            Sign in to access the account area
          </Text>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-6">
          <div className="flex w-full flex-col gap-y-3">
            <Controller
              control={control}
              name="login"
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <Input autoComplete="email" {...field} className="bg-ui-bg-field-component" placeholder="Email" />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <Input
                  type="password"
                  autoComplete="current-password"
                  {...field}
                  className="bg-ui-bg-field-component"
                  placeholder="Password"
                />
              )}
            />
          </div>
          {validationError && (
            <div className="text-center">
              <Hint className="inline-flex" variant={'error'}>
                {validationError}
              </Hint>
            </div>
          )}
          {serverError && (
            <Alert className="bg-ui-bg-base items-center p-2" dismissible variant="error">
              {serverError}
            </Alert>
          )}
          <Button className="w-full" type="submit">
            Continue with Email
          </Button>
        </form>
        <span className="text-ui-fg-muted txt-small my-6">
          Forgot password? -{' '}
          <Link
            key="reset-password-link"
            href="/reset-password"
            className="text-ui-fg-interactive transition-fg hover:text-ui-fg-interactive-hover focus-visible:text-ui-fg-interactive-hover font-medium outline-none"
          >
            Reset
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
