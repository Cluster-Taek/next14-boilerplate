export interface IUser {
  id: number;
  name: string;
}

export interface IUsersParams {
  // paging params of json-server
  _page: number;
  _per_page: number;
}
