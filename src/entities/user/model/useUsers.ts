import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type Pageable } from '@/shared/model';
import { type User, type UsersParams, type UserCreateFormValues } from './schemas';
import { createUser, fetchUsers } from '../api/userApi';

export const useUsers = (params: UsersParams) => {
  return useQuery<Pageable<User>>({
    queryKey: [`/api/users`, params],
    queryFn: () => fetchUsers(params),
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserCreateFormValues) => createUser(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/users'],
        refetchType: 'all',
      });
    },
  });
};
