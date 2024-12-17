import { IPageable } from '@/types/pageable';
import { IUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

interface IUsersParams {
  // paging params of json-server
  _page: number;
  _per_page: number;
}

export const useUsers = (params: IUsersParams) => {
  return useQuery<IPageable<IUser>>({
    queryKey: [`/api/users`, params],
  });
};
