import { fetchApi } from './base';
import { IPageable } from '@/types/pageable';
import { IUser } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IUsersParams extends Record<string, unknown> {
  // paging params of json-server
  _page: number;
  _per_page: number;
  region?: string;
  name?: string;
}

export interface IUserFormValue extends Omit<IUser, 'id'>, Record<string, unknown> {}

export const useUsers = (params: IUsersParams) => {
  return useQuery<IPageable<IUser>>({
    queryKey: [`/api/users`, params],
  });
};

export const useUser = (id?: string) => {
  return useQuery<IUser>({
    queryKey: [`/api/users/${id}`],
    enabled: !!id,
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IUserFormValue) => await fetchApi.post(`/api/users`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/users'],
        refetchType: 'all',
      });
    },
  });
};

export const useUpdateUserMutation = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IUserFormValue) => await fetchApi.put(`/api/users/${id}`, data),
    onSuccess: async () => {
      await Promise.all([
        await queryClient.invalidateQueries({
          queryKey: ['/api/users'],
          refetchType: 'all',
        }),
        await queryClient.invalidateQueries({
          queryKey: [`/api/users/${id}`],
          refetchType: 'all',
        }),
      ]);
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => await fetchApi.delete(`/api/users/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/users'],
        refetchType: 'all',
      });
    },
  });
};
