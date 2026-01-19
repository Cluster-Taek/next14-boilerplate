import axios, { type AxiosError } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import type { IApiError } from '@/types/error';

type Body = Record<string, unknown> | Record<string, unknown>[];

const _fetchApi = async <T = object>(method: string, url: string, body?: Body): Promise<T> => {
  const session = await getSession();

  try {
    const response = await axios({
      method,
      url,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IApiError>;
    const status = axiosError.response?.status;

    // 401 Unauthorized - 로그인 페이지로 리다이렉트
    if (status === 401 && typeof window !== 'undefined' && window.location.pathname !== '/login') {
      await signOut({ redirect: false });
      redirect('/login');
    }

    // 403 Forbidden
    if (status === 403) {
      console.error('Access denied:', axiosError.response?.data);
    }

    // 500+ Server errors
    if (status && status >= 500) {
      console.error('Server error:', axiosError.response?.data);
    }

    // 에러 재발생 (상위에서 처리)
    throw axiosError;
  }
};
type FetchApi = {
  post: <T = object>(url: string, body?: Body) => Promise<T>;
  get: <T = object>(url: string, params?: Record<string, unknown>) => Promise<T>;
  patch: <T = object>(url: string, body?: Body) => Promise<T>;
  put: <T = object>(url: string, body?: Body) => Promise<T>;
  delete: <T = object>(url: string) => Promise<T>;
};

export const fetchApi: FetchApi = {
  post: (url, body) => _fetchApi('POST', url, body),
  get: (url, params) => _fetchApi('GET', url, params),
  patch: (url, body) => _fetchApi('PATCH', url, body),
  put: (url, body) => _fetchApi('PUT', url, body),
  delete: (url) => _fetchApi('DELETE', url),
};
