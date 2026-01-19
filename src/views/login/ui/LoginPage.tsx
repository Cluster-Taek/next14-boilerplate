import { LoginForm } from '@/features/auth';
import { sva } from '@/styled-system/css/sva.mjs';

export const LoginPage = () => {
  const loginStyle = loginSva();

  return (
    <div className={loginStyle.wrapper}>
      <LoginForm />
    </div>
  );
};

const loginSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'flex',
      width: 'full',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
