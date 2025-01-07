'use client';

import { FileFinder } from './file-finder';
import { useEventStories } from '@/lib/stories';

interface IEventStoriesTabProps {
  eventId: string;
}

export const EventStoriesTab = ({ eventId }: IEventStoriesTabProps) => {
  const { data: stories } = useEventStories(eventId);

  return (
    <div className="w-full p-0 divide-y">
      <FileFinder
        files={
          stories?.map((story) => ({
            id: story.id,
            title: story.title,
            url: story.url,
            thumbnail: story.thumbnail,
            createdAt: story.createdAt,
            createdBy: story.createdBy,
          })) ?? []
        }
      />
    </div>
  );
};
