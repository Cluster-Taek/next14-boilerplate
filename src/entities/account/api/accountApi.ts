import { type LoginFormValues } from '@/schemas';
import { fetchApi } from '@/shared/api';
import { type ILoginResponse } from '../model/types';

export const login: (value: LoginFormValues) => Promise<ILoginResponse> = async (value) => {
  return fetchApi.post(`/api/account/login`, value);
};

export const tokenRefresh: (refreshToken: string) => Promise<ILoginResponse> = async (refreshToken) => {
  return fetchApi.post(`/api/account/refresh-token`, { refreshToken });
};
