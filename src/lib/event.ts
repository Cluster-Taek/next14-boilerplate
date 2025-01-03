import { fetchApi } from './base';
import { IEvent } from '@/types/event';
import { IPageable } from '@/types/pageable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IEventsParams {
  // paging params of json-server
  _page: number;
  _per_page: number;
  processing?: boolean;
}

export interface IEventCreateFormValue extends Record<string, unknown> {
  name: string;
}

export const useEvents = (params: IEventsParams) => {
  return useQuery<IPageable<IEvent>>({
    queryKey: [`/api/events`, params],
  });
};

export const useEvent = (id?: string) => {
  return useQuery<IEvent>({
    queryKey: [`/api/events/${id}`],
    enabled: !!id,
  });
};

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IEventCreateFormValue) => await fetchApi.post(`/api/events`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/events'],
        refetchType: 'all',
      });
    },
  });
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: React.Key) => await fetchApi.delete(`/api/events/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/events'],
        refetchType: 'all',
      });
    },
  });
};

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IEventCreateFormValue) => await fetchApi.put(`/api/events/${data.id}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/events'],
        refetchType: 'all',
      });
    },
  });
};
