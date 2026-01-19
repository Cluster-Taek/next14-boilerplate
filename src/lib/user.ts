import { fetchApi } from './base';
import type { IPageable } from '@/types/pageable';
import type { IUser } from '@/types/user';
import type { UserCreateFormValues } from '@/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IUsersParams {
  // paging params of json-server
  _page: number;
  _per_page: number;
}

export const useUsers = (params: IUsersParams) => {
  return useQuery<IPageable<IUser>>({
    queryKey: [`/api/users`, params],
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserCreateFormValues) => await fetchApi.post(`/api/users`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/users'],
        refetchType: 'all',
      });
    },
  });
};
