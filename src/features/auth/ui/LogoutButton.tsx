'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/shared/ui/button';

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
