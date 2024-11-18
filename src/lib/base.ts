import { IError } from '@/types/error';
import { getSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = async <T>(url: string, params?: Record<any, any>): Promise<T> => {
  const session = await getSession();

  const fetchUrl = new URL(url, process.env.NEXT_PUBLIC_DOMAIN);
  fetchUrl.search = new URLSearchParams(params).toString();

  const response = await fetch(fetchUrl.toString(), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && window.location.pathname !== '/login') {
      await signOut();
      redirect('/login');
    }
    return response.json().then((error: IError) => {
      throw error;
    });
  }

  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _fetchApi = async (method: string, url: string, body?: Record<string, any>) => {
  const session = await getSession();

  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    if (response.status === 401 && window.location.pathname !== '/login') {
      await signOut();
      redirect('/login');
    }
    return response.json().then((error: IError) => {
      throw error;
    });
  }

  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};

export const fetchApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (url: string, body?: Record<string, any>) => _fetchApi('POST', url, body),
  get: (url: string) => _fetchApi('GET', url),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: (url: string, body?: Record<string, any>) => _fetchApi('PATCH', url, body),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: (url: string, body?: Record<string, any>) => _fetchApi('PUT', url, body),
  delete: (url: string) => _fetchApi('DELETE', url),
};

export const uploadApi = async (url: string, body: FormData) => {
  const session = await getSession();

  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.user?.accessToken}`,
    },
    body,
  });
  if (!response.ok) {
    if (response.status === 401 && window.location.pathname !== '/login') {
      await signOut();
      redirect('/login');
    }
    return response.json().then((error: IError) => {
      throw error;
    });
  }

  return response.text().then(function (text) {
    return text ? JSON.parse(text) : {};
  });
};
