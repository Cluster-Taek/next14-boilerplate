import { fetchApi } from './base';
import { IPageable } from '@/types/pageable';
import { IUser } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IUsersParams {
  // paging params of json-server
  _page: number;
  _per_page: number;
}

export interface IUserCreateFormValue extends Record<string, unknown> {
  name: string;
}

export const useUsers = (params: IUsersParams) => {
  return useQuery<IPageable<IUser>>({
    queryKey: [`/api/users`, params],
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IUserCreateFormValue) => await fetchApi.post(`/api/users`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/users'],
        refetchType: 'all',
      });
    },
  });
};
