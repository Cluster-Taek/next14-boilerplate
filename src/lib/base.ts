import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _fetchApi = async <T = any>(method: string, url: string, body?: Record<string, any>): Promise<T> => {
  const session = await getSession();
  const response = await axios({
    method,
    url: url,
    data: method !== 'GET' ? body : undefined,
    params: method === 'GET' ? body : undefined,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
    withCredentials: true,
  }).catch(async (error) => {
    if (response.status === 401 && window.location.pathname !== '/login') {
      await signOut();
      redirect('/login');
    }
    throw error;
  });

  return response?.data;
};
type FetchApi = {
  post: <T = any>(url: string, body?: Record<string, any>) => Promise<T>;
  get: <T = any>(url: string, params?: Record<string, any>) => Promise<T>;
  patch: <T = any>(url: string, body?: Record<string, any>) => Promise<T>;
  put: <T = any>(url: string, body?: Record<string, any>) => Promise<T>;
  delete: <T = any>(url: string) => Promise<T>;
};

export const fetchApi: FetchApi = {
  post: (url, body) => _fetchApi('POST', url, body),
  get: (url, params) => _fetchApi('GET', url, params),
  patch: (url, body) => _fetchApi('PATCH', url, body),
  put: (url, body) => _fetchApi('PUT', url, body),
  delete: (url) => _fetchApi('DELETE', url),
};
