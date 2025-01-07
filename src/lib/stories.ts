import { fetchApi } from './base';
import { IEvent } from '@/types/event';
import { IStory } from '@/types/stories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useEventStories = (id?: string) => {
  return useQuery<IStory[]>({
    queryKey: [`/api/events/${id}/stories`],
    queryFn: async () => {
      const response = await fetchApi.get<IEvent>(`/api/events/${id}`);
      return response.stories;
    },
    enabled: !!id,
  });
};

export const useDeleteEventStoryMutation = (eventId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ storyId }: { storyId: React.Key }) =>
      await fetchApi.delete(`/api/events/${eventId}/stories/${storyId}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/api/events/${eventId}/stories`],
        refetchType: 'all',
      });
    },
  });
};
