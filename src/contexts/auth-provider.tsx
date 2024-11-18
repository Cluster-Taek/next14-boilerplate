'use client';

import Spinner from '@/components/common/spinner';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren, createContext, useContext, useEffect } from 'react';

interface IAuthContext {
  initialized: boolean;
  session: Session;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error('Auth context must be used within a AuthProvider!');
  }
  return result;
}

const publicPageList = ['/login'];

const isPublicPage = (pathname: string) => {
  return publicPageList.includes(pathname);
};

const AuthProvider = ({ children }: PropsWithChildren) => {
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

export default React.memo(AuthProvider);
