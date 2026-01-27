import { type AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { type IApiError } from '@/shared/model';

/**
 * API 에러 처리 (클라이언트 전용)
 * 서버에서는 에러를 그대로 throw하여 상위에서 처리
 */
export const handleApiError = async (error: AxiosError<IApiError>): Promise<never> => {
  const status = error.response?.status;

  // 401 Unauthorized - 로그인 페이지로 리다이렉트
  if (status === 401 && typeof window !== 'undefined' && window.location.pathname !== '/login') {
    await signOut({ redirect: false });
    window.location.href = '/login';
  }

  // 403 Forbidden
  if (status === 403) {
    console.error('Access denied:', error.response?.data);
  }

  // 500+ Server errors
  if (status && status >= 500) {
    console.error('Server error:', error.response?.data);
  }

  throw error;
};
