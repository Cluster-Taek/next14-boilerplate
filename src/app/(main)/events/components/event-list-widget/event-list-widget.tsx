'use client';

import { Table } from '@/components/common/table';
import { useEvents } from '@/lib/\bevent';
import { ISODateString } from '@/types/common';
import { IEvent } from '@/types/event';
import { Plus } from '@medusajs/icons';
import { Button, Container, Heading, Input, Tabs, Text } from '@medusajs/ui';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const EventListWidget = () => {
  const [tab, setTab] = useState('all');
  const router = useRouter();

  const { data } = useEvents({ _page: 1, _per_page: 10, processing: tab === 'processing' });
  return (
    <Container className="p-0 divide-y">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>이벤트 목록</Heading>
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <Tabs defaultValue={tab} onValueChange={(value) => setTab(value)}>
          <Tabs.List>
            <Tabs.Trigger value="all">전체</Tabs.Trigger>
            <Tabs.Trigger value="processing">진행중</Tabs.Trigger>
            <Tabs.Trigger value="completed">종료됨</Tabs.Trigger>
          </Tabs.List>
        </Tabs>
      </div>
      <div className="flex items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center flex-shrink-0 gap-3">
          <Button size="small" variant="primary">
            <Plus />
            <Text>새 이벤트 추가</Text>
          </Button>
          <Button size="small" variant="secondary">
            <Text>편집</Text>
          </Button>
        </div>
        <Input size="small" placeholder="Search" id="search-input" type="search" />
      </div>
      <div className="flex flex-col">
        <Table<IEvent>
          columns={[
            {
              key: 'title',
              label: '이벤트명',
            },
            {
              key: 'startDate',
              label: '시작일',
              render: (value: ISODateString) => {
                return dayjs(value).format('YYYY.MM.DD HH:mm');
              },
            },
          ]}
          data={data?.data ?? []}
          onClickRow={(item) => router.push(`/events/${item.id}`)}
        />
      </div>
    </Container>
  );
};
