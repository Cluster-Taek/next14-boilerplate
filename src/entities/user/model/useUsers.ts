import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { type User, type UsersParams, type UserCreateFormValues } from './schemas';
import { createUser, fetchUsers } from '../api/userApi';

export const usersQueryOptions = (params: UsersParams) =>
  queryOptions<User[]>({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  });

export const useSuspenseUsers = (params: UsersParams) => {
  return useSuspenseQuery(usersQueryOptions(params));
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreateFormValues) => createUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users'],
        refetchType: 'all',
      });
    },
  });
};
