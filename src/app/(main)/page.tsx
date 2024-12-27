'use client';

import { SingleColumnPage } from '@/components/layout/pages';
import { useAuth } from '@/contexts/auth-provider';
import { Button } from '@medusajs/ui';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const { session } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <SingleColumnPage showJSON showMetadata data={session}>
      <div className="flex w-full flex-col items-center justify-center h-full p-1">
        <div className="ml-auto text-xl">Hello {session.user?.name}!</div>
        <Link className="text-primary-01 hover:text-primary-02" href="/users">
          Go to Users
        </Link>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </SingleColumnPage>
  );
};

export default Home;
