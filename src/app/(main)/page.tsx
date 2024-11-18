'use client';

import { useAuth } from '@/contexts/auth-provider';
import { css } from '@/styled-system/css';
import { signOut } from 'next-auth/react';

export default function Home() {
  const { session } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div>
      <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Hello {session.user?.name}!</div>
      <button onClick={handleLogout} className={css({ width: 'full' })}>
        Logout
      </button>
    </div>
  );
}
