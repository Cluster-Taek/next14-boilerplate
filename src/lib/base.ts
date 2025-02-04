import axios from 'axios';
import { redirect } from 'next/navigation';

type CustomHeaders = Record<string, string>;
type Body = Record<string, unknown> | Record<string, unknown>[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _fetchApi = async <T = object>(
  method: string,
  url: string,
  body?: Body,
  customHeaders?: CustomHeaders
): Promise<T> => {
  const response = await axios({
    method,
    url: url,
    data: method !== 'GET' ? body : undefined,
    params: method === 'GET' ? body : undefined,
    headers: {
      'Content-Type': 'application/json',
      // TODO: Set token
      Authorization: `Bearer ${'token'}`,
      ...customHeaders,
    },
    withCredentials: true,
  }).catch(async (error) => {
    // Case. SSR
    if (typeof window === 'undefined') throw error;

    // Case CSR
    if (error?.status === 401 && !window.location.pathname.startsWith('/login')) {
      redirect('/login');
    }
    throw error;
  });

  return response?.data;
};
type FetchApi = {
  post: <T = object>(url: string, body?: Body, customHeaders?: CustomHeaders) => Promise<T>;
  get: <T = object>(url: string, params?: Record<string, unknown>, customHeaders?: CustomHeaders) => Promise<T>;
  patch: <T = object>(url: string, body?: Body, customHeaders?: CustomHeaders) => Promise<T>;
  put: <T = object>(url: string, body?: Body, customHeaders?: CustomHeaders) => Promise<T>;
  delete: <T = object>(url: string, customHeaders?: CustomHeaders) => Promise<T>;
};

export const fetchApi: FetchApi = {
  post: (url, body, customHeaders) => _fetchApi('POST', url, body, customHeaders),
  get: (url, params, customHeaders) => _fetchApi('GET', url, params, customHeaders),
  patch: (url, body, customHeaders) => _fetchApi('PATCH', url, body, customHeaders),
  put: (url, body, customHeaders) => _fetchApi('PUT', url, body, customHeaders),
  delete: (url, customHeaders) => _fetchApi('DELETE', url, customHeaders),
};
