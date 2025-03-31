import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

type Body = Record<string, unknown> | Record<string, unknown>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _fetchApi = async <T = object>(method: string, url: string, body?: Body): Promise<T> => {
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
