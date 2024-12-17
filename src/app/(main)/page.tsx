'use client';

import { useAuth } from '@/contexts/auth-provider';
import { useUsers } from '@/lib/user';
import { css } from '@/styled-system/css';
import { signOut } from 'next-auth/react';

export default function Home() {
  const { session } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const { data: users } = useUsers({
    _page: 1,
    _per_page: 10,
  });

  return (
    <div>
      <div className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Hello {session.user?.name}!</div>
      <div className={css({ fontSize: 'xl', fontWeight: 'bold' })}>Users:</div>
      <div>{users?.data.map((user) => <div key={user.id}>{user.name}</div>)}</div>
      <button onClick={handleLogout} className={css({ width: 'full' })}>
        Logout
      </button>
    </div>
  );
}
