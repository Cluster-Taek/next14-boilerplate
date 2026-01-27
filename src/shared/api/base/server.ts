import axios, { type AxiosError } from 'axios';
import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { authOptions } from '@app/api/auth/[...nextauth]/auth-options';
import { type Body, type FetchApi } from './types';

// 서버용 Axios instance
const serverApiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 서버 컴포넌트용: React.cache()로 요청당 1회만 호출
const getSessionCached = cache(() => getServerSession(authOptions));

const fetchServerApi = async <T = object>(method: string, url: string, body?: Body): Promise<T> => {
  const session = await getSessionCached();

  try {
    const response = await serverApiClient({
      method,
      url,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
      headers: {
        ...(session?.user?.accessToken && {
          Authorization: `Bearer ${session.user.accessToken}`,
        }),
      },
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // 서버에서는 에러를 그대로 throw (RSC에서 error boundary로 처리)
    console.error('Server API error:', {
      status: axiosError.response?.status,
      url,
      method,
    });

    throw axiosError;
  }
};

export const fetchApi: FetchApi = {
  post: (url, body) => fetchServerApi('POST', url, body),
  get: (url, params) => fetchServerApi('GET', url, params),
  patch: (url, body) => fetchServerApi('PATCH', url, body),
  put: (url, body) => fetchServerApi('PUT', url, body),
  delete: (url) => fetchServerApi('DELETE', url),
};
