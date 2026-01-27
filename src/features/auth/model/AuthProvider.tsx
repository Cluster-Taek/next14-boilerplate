'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { type PropsWithChildren, createContext, useEffect } from 'react';
import { Spinner } from '@/shared/ui/spinner';

interface IAuthContext {
  initialized: boolean;
  session: Session;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const publicPageList = ['/login'];

const isPublicPage = (pathname: string) => {
  return publicPageList.includes(pathname);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (loading) {
      return;
    }

    if (session && isPublicPage(pathname)) {
      router.push('/');
    } else if (!session && !isPublicPage(pathname)) {
      router.push('/login');
    }
  }, [loading, router, session, pathname]);

  if (loading || (session && isPublicPage(pathname))) {
    return <Spinner />;
  }

  if (isPublicPage(pathname)) {
    return <>{children}</>;
  }

  if (!session?.user) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={{ initialized: true, session }}>{children}</AuthContext.Provider>;
};
