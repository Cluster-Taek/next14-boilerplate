import { fetchApi } from './base';
import { IInfluencer } from '@/types/influencer';
import { IPageable } from '@/types/pageable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface IInfluencersParams {
  // paging params of json-server
  _page: number;
  _per_page: number;
  category?: string;
  gender?: string;
}

export interface IInfluencerFormValue extends Omit<IInfluencer, 'id'>, Record<string, unknown> {}

export const useInfluencers = (params: IInfluencersParams) => {
  return useQuery<IPageable<IInfluencer>>({
    queryKey: [`/api/influencers`, params],
  });
};

export const useInfluencer = (id?: string) => {
  return useQuery<IInfluencer>({
    queryKey: [`/api/influencers/${id}`],
    enabled: !!id,
  });
};

export const useCreateInfluencerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IInfluencerFormValue) => await fetchApi.post(`/api/influencers`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/influencers'],
        refetchType: 'all',
      });
    },
  });
};

export const useBulkCreateInfluencerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IInfluencerFormValue[]) =>
      await Promise.all(data.map(async (d) => await fetchApi.post(`/api/influencers`, d))),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/influencers'],
        refetchType: 'all',
      });
    },
  });
};

export const useDeleteInfluencerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: React.Key) => await fetchApi.delete(`/api/influencers/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/influencers'],
        refetchType: 'all',
      });
    },
  });
};

export const useUpdateInfluencerMutation = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IInfluencerFormValue) =>
      await fetchApi.put(`/api/influencers/${data.id}`, { id, ...data }),
    onSuccess: async () => {
      await Promise.all([
        await queryClient.invalidateQueries({
          queryKey: ['/api/influencers'],
          refetchType: 'all',
        }),
        await queryClient.invalidateQueries({
          queryKey: [`/api/influencers/${id}`],
          refetchType: 'all',
        }),
      ]);
    },
  });
};
