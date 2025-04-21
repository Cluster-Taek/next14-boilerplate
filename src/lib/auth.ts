import { fetchApi } from './base';

export interface ILoginFormValue extends Record<string, unknown> {
  login: string;
  password: string;
}

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

export const login: (value: ILoginFormValue) => Promise<ILoginResponse> = async (value) => {
  return fetchApi.post(`/admin-api/account/login`, value);
};

export const tokenRefresh: (refreshToken: string) => Promise<ILoginResponse> = async (refreshToken) => {
  return fetchApi.post(`/admin-api/account/refresh-token`, { refreshToken });
};
