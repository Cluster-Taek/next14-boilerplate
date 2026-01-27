'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { type PropsWithChildren, createContext, useEffect } from 'react';
import { setupClientAuth } from '@/shared/api';
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
  const accessToken = session?.user?.accessToken;
  const isAuthenticated = !!session;

  // API 클라이언트에 인증 토큰 설정: accessToken이 변경될 때만 업데이트
  useEffect(() => {
    setupClientAuth(accessToken ?? null);
  }, [accessToken]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (isAuthenticated && isPublicPage(pathname)) {
      router.push('/');
    } else if (!isAuthenticated && !isPublicPage(pathname)) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, pathname, router]);

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
