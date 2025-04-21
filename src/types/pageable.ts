// Definition of the json-server's pageable response
export interface IPageable<T> {
  total: number;
  page: number;
  content: T[];
}

export interface IPageableParams {
  page?: number;
  size?: number;
  sort?: string;
}
