import { fetchApi } from '@/shared/api';
import { type LoginFormValues, type LoginResponse } from '../model/schemas';

export const login: (value: LoginFormValues) => Promise<LoginResponse> = async (value) => {
  return fetchApi.post(`/api/account/login`, value);
};

export const tokenRefresh: (refreshToken: string) => Promise<LoginResponse> = async (refreshToken) => {
  return fetchApi.post(`/api/account/refresh-token`, { refreshToken });
};
