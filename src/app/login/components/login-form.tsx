'use client';

import { useSearchParams } from '@/hooks/use-search-params';
import { ILoginFormValue } from '@/lib/auth';
import AvatarBox from '@/medusa/components/logo-box/avatar-box';
import { Alert, Button, Heading, Hint, Input, Text } from '@medusajs/ui';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
  const { searchParams } = useSearchParams();
  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
  } = useForm<ILoginFormValue>({
    defaultValues: {
      login: 'admin',
      password: 'admin1234',
    },
  });

  const serverError = formState.errors?.root?.serverError?.message;
  const validationError = formState.errors.email?.message || formState.errors.password?.message;

  const handleSubmit = formHandleSubmit(async (data) => {
    await signIn('login-credentials', { ...data, callbackUrl: searchParams['callbackUrl'] ?? '/' });
  });

  return (
    <div className="flex items-center justify-center bg-ui-bg-subtle min-h-dvh w-dvw">
      <div className="m-4 flex w-full max-w-[280px] flex-col items-center">
        <AvatarBox />
        <div className="flex flex-col items-center mb-4">
          <Heading>Welcome to {process.env.NEXT_PUBLIC_STORE_NAME}</Heading>
          <Text size="small" className="text-center text-ui-fg-subtle">
            Sign in to access the account area
          </Text>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-y-6">
          <div className="flex flex-col w-full gap-y-3">
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
            <Alert className="items-center p-2 bg-ui-bg-base" dismissible variant="error">
              {serverError}
            </Alert>
          )}
          <Button className="w-full" type="submit">
            Continue with Email
          </Button>
        </form>
        <span className="my-6 text-ui-fg-muted txt-small">
          Forgot password? -{' '}
          <Link
            key="reset-password-link"
            href="/reset-password"
            className="font-medium outline-none text-ui-fg-interactive transition-fg hover:text-ui-fg-interactive-hover focus-visible:text-ui-fg-interactive-hover"
          >
            Reset
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
