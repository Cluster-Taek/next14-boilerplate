'use client';

import Button from '@/components/common/button';
import { useAuth } from '@/contexts/auth-provider';
import { sva } from '@/styled-system/css';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const homeStyle = HomeSva();
  const { session } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className={homeStyle.wrapper}>
      <div className={homeStyle.profile}>Hello {session.user?.name}!</div>
      <Link className={homeStyle.link} href="/users">
        Go to Users
      </Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Home;

const HomeSva = sva({
  slots: ['wrapper', 'profile', 'link'],
  base: {
    wrapper: {
      display: 'flex',
      width: 'full',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'full',
      padding: 4,
    },
    profile: {
      marginLeft: 'auto',
      fontSize: 'xl',
    },
    link: {
      color: 'primary.01',
      '&:hover': {
        color: 'primary.02',
      },
    },
  },
});
