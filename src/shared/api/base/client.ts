import axios, { type AxiosError } from 'axios';
import { type IApiError } from '@/shared/model';
import { handleApiError } from './error-handler';
import { type Body, type FetchApi } from './types';

// Axios instance for Client
export const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * 클라이언트 환경에서 인증 토큰 설정
 * AuthProvider에서 세션 변경 시 호출됨
 */
export const setupClientAuth = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

const fetchClientApi = async <T = object>(method: string, url: string, body?: Body): Promise<T> => {
  try {
    const response = await apiClient({
      method,
      url,
      data: method !== 'GET' ? body : undefined,
      params: method === 'GET' ? body : undefined,
    });

    return response.data;
  } catch (error) {
    return handleApiError(error as AxiosError<IApiError>);
  }
};

export const fetchApi: FetchApi = {
  post: (url, body) => fetchClientApi('POST', url, body),
  get: (url, params) => fetchClientApi('GET', url, params),
  patch: (url, body) => fetchClientApi('PATCH', url, body),
  put: (url, body) => fetchClientApi('PUT', url, body),
  delete: (url) => fetchClientApi('DELETE', url),
};
