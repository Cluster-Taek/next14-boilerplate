'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button';

export const HomePage = () => {
  const { session } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex w-full flex-col items-center justify-center h-full p-4">
      <div className="ml-auto text-xl">Hello {session.user?.name}!</div>
      <Link className="text-primary-01 hover:text-primary-02" href="/users">
        Go to Users
      </Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
