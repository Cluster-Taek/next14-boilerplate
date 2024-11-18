import { fetchApi } from '../base';

export interface ILoginFormValue {
  login: string;
  password: string;
  remember: boolean;
}

export interface INewPasswordFormValue {
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
  return fetchApi.post(`/api/account/login`, value);
};

export const tokenRefresh: (refreshToken: string) => Promise<ILoginResponse> = async (refreshToken) => {
  return fetchApi.post(`/api/account/refresh-token`, { refreshToken });
};
