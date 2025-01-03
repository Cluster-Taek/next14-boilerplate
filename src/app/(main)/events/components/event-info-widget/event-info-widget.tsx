'use client';

import { NoRecords } from '@/components/common/empty-table-content';
import { useEvent } from '@/lib/event';
import { Container, Heading, Table, Text } from '@medusajs/ui';
import dayjs from 'dayjs';

interface IEventInfoWidgetProps {
  id?: string;
}
export const EventInfoWidget = ({ id }: IEventInfoWidgetProps) => {
  const { data } = useEvent(id);
  return (
    <Container className="p-0 divide-y">
      {data ? (
        <>
          <div className="flex flex-col justify-between px-6 py-4">
            <Text size="small" className="text-ui-fg-subtle">
              {data.description}
            </Text>
            <Heading level="h1" className="text-ui-fg-base">
              {data.title}
            </Heading>
          </div>
          <Table>
            <Table.Row className="[&_td:nth-child(1)]:w-[20%] [&_td:nth-child(2)]:w-[30%] [&_td:nth-child(3)]:w-[20%] [&_td:nth-child(4)]:w-[30%]">
              <Table.Cell>이벤트 유형</Table.Cell>
              <Table.Cell>{data.eventType.join(', ')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>이벤트 기간</Table.Cell>
              <Table.Cell>
                {dayjs(data.startDate).format('YYYY.MM.DD HH:mm')} ~ {dayjs(data.endDate).format('YYYY.MM.DD HH:mm')}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>모집 인원</Table.Cell>
              <Table.Cell>{data.recruitment_count}명</Table.Cell>
              <Table.Cell>Label</Table.Cell>
              <Table.Cell>{data.label}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>카테고리</Table.Cell>
              <Table.Cell>{data.category}</Table.Cell>
              <Table.Cell>브랜드명</Table.Cell>
              <Table.Cell>{data.brand}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>생성 일시</Table.Cell>
              <Table.Cell>{dayjs(data.createdAt).format('YYYY.MM.DD HH:mm')}</Table.Cell>
              <Table.Cell>생성자</Table.Cell>
              <Table.Cell>{data.createdBy}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>태그/메모</Table.Cell>
              <Table.Cell>{data.memo}</Table.Cell>
            </Table.Row>
          </Table>
        </>
      ) : (
        <NoRecords title="이벤트 정보가 없습니다." message="이벤트 정보를 선택 혹은 생성해주세요." />
      )}
    </Container>
  );
};
