import { fetchApi } from '../base';
import type { LoginFormValues } from '@/schemas';

export interface INewPasswordFormValue extends Record<string, unknown> {
  login: string;
  newPassword: string;
  code: string;
}

export interface IAccountSettingFormValue {
  login: string;
  phone?: string;
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login: (value: LoginFormValues) => Promise<ILoginResponse> = async (value) => {
  return fetchApi.post(`/api/account/login`, value);
};

export const tokenRefresh: (refreshToken: string) => Promise<ILoginResponse> = async (refreshToken) => {
  return fetchApi.post(`/api/account/refresh-token`, { refreshToken });
};
