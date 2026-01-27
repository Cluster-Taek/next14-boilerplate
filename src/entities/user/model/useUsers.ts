import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type UserCreateFormValues } from '@/schemas';
import { fetchApi } from '@/shared/api';
import { type IPageable } from '@/shared/model';
import { type IUser, type IUsersParams } from './types';

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
