import { fetchApi } from '@/shared/api';
import { type LoginFormValues, type LoginResponse, loginResponseSchema } from '../model/schemas';

export const login: (value: LoginFormValues) => Promise<LoginResponse> = async (value) => {
  const response = await fetchApi.post(`/api/account/login`, value);
  return loginResponseSchema.parse(response);
};

export const tokenRefresh: (refreshToken: string) => Promise<LoginResponse> = async (refreshToken) => {
  const response = await fetchApi.post(`/api/account/refresh-token`, { refreshToken });
  return loginResponseSchema.parse(response);
};
