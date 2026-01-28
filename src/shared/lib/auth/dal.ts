import 'server-only';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { authOptions } from '@app/api/auth/[...nextauth]/auth-options';

/**
 * 세션 검증 (캐시됨)
 * - React cache()로 중복 호출 최적화
 * - 비인증 시 자동 리다이렉트
 */
export const verifySession = cache(async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return session;
});

/**
 * 세션 조회 (캐시됨, 리다이렉트 없음)
 * - 공개/보호 페이지 모두에서 사용 가능
 */
export const getSession = cache(async () => {
  return getServerSession(authOptions);
});

/**
 * 공개 페이지 체크 (인증 시 리다이렉트)
 */
export const verifyGuest = cache(async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }
});
