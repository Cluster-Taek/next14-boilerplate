export interface IUser {
  id: number;
  login: string;
  name: string;
  authorities: { name: string }[];
}
