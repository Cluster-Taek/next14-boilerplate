'use client';

import { EventInfluencersListTab } from './event-influencers-list-tab';
import { EventStoriesTab } from './event-stories-tab';
import { NoRecords } from '@/components/common/empty-table-content';
import { Container, Input, Tabs } from '@medusajs/ui';

interface IEventInfluencersWidgetProps {
  id?: string;
}
export const EventInfluencersWidget = ({ id }: IEventInfluencersWidgetProps) => {
  return (
    <Container className="p-0 divide-y">
      <Tabs className="w-full" defaultValue="story">
        <div className="flex flex-row justify-between px-6 py-4 border-b">
          <Tabs.List>
            <Tabs.Trigger value="search">인원 검색</Tabs.Trigger>
            <Tabs.Trigger value="influencers">인원 관리</Tabs.Trigger>
            <Tabs.Trigger value="story">스토리</Tabs.Trigger>
            <Tabs.Trigger value="settlements">정산</Tabs.Trigger>
          </Tabs.List>
          {/* <div>BUTTON AREA</div> */}
        </div>
        <Tabs.Content value="search">
          {id ? (
            <EventInfluencersListTab eventId={id} />
          ) : (
            <NoRecords title="이벤트 정보가 없습니다." message="이벤트 정보를 선택 혹은 생성해주세요." />
          )}
          <div className="flex justify-between px-6 py-4">
            <Input type="search" placeholder="계정검색" />
          </div>
        </Tabs.Content>
        <Tabs.Content value="influencers">
          {id ? (
            <EventInfluencersListTab eventId={id} />
          ) : (
            <NoRecords title="이벤트 정보가 없습니다." message="이벤트 정보를 선택 혹은 생성해주세요." />
          )}
          <div className="flex justify-between px-6 py-4">
            <Input type="search" placeholder="계정검색" />
          </div>
        </Tabs.Content>
        <Tabs.Content value="story">
          {id ? (
            <EventStoriesTab eventId={id} />
          ) : (
            <NoRecords title="이벤트 정보가 없습니다." message="이벤트 정보를 선택 혹은 생성해주세요." />
          )}
          <div className="flex justify-between px-6 h-[60px] border-t" />
        </Tabs.Content>
        <Tabs.Content value="settlements">
          {id ? (
            <div className="w-full px-6 py-4 border-b">{JSON.stringify(id)}</div>
          ) : (
            <NoRecords title="이벤트 정보가 없습니다." message="이벤트 정보를 선택 혹은 생성해주세요." />
          )}
          <div className="flex justify-between px-6 py-4">
            <Input type="search" placeholder="계정검색" />
          </div>
        </Tabs.Content>
      </Tabs>
    </Container>
  );
};
