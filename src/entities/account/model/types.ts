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
