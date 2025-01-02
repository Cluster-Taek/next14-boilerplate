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

export interface IInfluencerCreateFormValue extends Record<string, unknown> {
  name: string;
}

export const useInfluencers = (params: IInfluencersParams) => {
  return useQuery<IPageable<IInfluencer>>({
    queryKey: [`/api/influencers`, params],
  });
};

export const useInfluencer = (id: string) => {
  return useQuery<IInfluencer>({
    queryKey: [`/api/influencers/${id}`],
  });
};

export const useCreateInfluencerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IInfluencerCreateFormValue) => await fetchApi.post(`/api/influencers`, data),
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

export const useUpdateInfluencerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IInfluencerCreateFormValue) => await fetchApi.put(`/api/influencers/${data.id}`, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/influencers'],
        refetchType: 'all',
      });
    },
  });
};
