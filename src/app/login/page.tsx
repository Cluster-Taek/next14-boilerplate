import { sva } from '@/styled-system/css/sva.mjs';

export default function Login() {
  const loginStyle = loginSva();

  return <div className={loginStyle.wrapper}></div>;
}

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
