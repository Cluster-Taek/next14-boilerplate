'use client';

import { Table } from '@/components/common/table';
import useExcel from '@/hooks/use-excel';
import { useEvent } from '@/lib/event';
import { Gender, IInfluencer } from '@/types/influencer';
import { numberToKorean } from '@/utils/utils';
import { Check, CloudArrowDown, CloudArrowUp } from '@medusajs/icons';
import { Badge, Button, Text, usePrompt } from '@medusajs/ui';
import { useRouter } from 'next/navigation';

interface IEventInfluencersListTabProps {
  eventId: string;
}

export const EventInfluencersListTab = ({ eventId }: IEventInfluencersListTabProps) => {
  const router = useRouter();
  const dialog = usePrompt();
  const { data: event } = useEvent(eventId);
  const { getSheet } = useExcel();

  const getGender = (gender: Gender) => {
    return gender === 'F' ? '여' : '남';
  };

  const handleClickEdit = (e: React.MouseEvent, id: React.Key) => {
    e.stopPropagation();
    router.push(`/influencers/${id}/edit`);
  };

  const handleClickDelete = async (e: React.MouseEvent, id: React.Key) => {
    e.stopPropagation();
    const confirmedDelete = await dialog({
      title: '인플루언서 삭제',
      description: '해당 인플루언서를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (confirmedDelete) {
      console.log('deleteInfluencer', id);
    }
  };

  const handleClickDownload = async () => {
    const influencers = event?.influencers ?? [];

    await getSheet({
      data: influencers,
      fileName: '인플루언서 목록.xlsx',
      sheetName: '인플루언서 목록',
      rowWidth: [20, 20, 20, 20, 20, 20, 20, 20],
    });
  };
  return (
    <div className="w-full p-0 divide-y">
      <div className="flex items-center justify-between px-6 py-4">
        <Text className="text-ui-fg-subtle" size="small">
          총 {event?.influencers.length ?? 0}명의 인플루언서를 찾았습니다.
        </Text>
        <div className="flex flex-row justify-end gap-2">
          <Button size="small" variant="secondary">
            <Check />
            선택한 인원보기
          </Button>
          <Button size="small" variant="secondary">
            <CloudArrowUp />
            리스트 업로드
          </Button>
          <Button size="small" variant="secondary" onClick={handleClickDownload}>
            <CloudArrowDown />
            리스트 다운로드
          </Button>
        </div>
      </div>
      <Table<IInfluencer>
        columns={[
          {
            key: 'snsId',
            label: '계정',
          },
          {
            key: 'category',
            label: '카테고리',
            render: (value: string) => {
              return (
                <Badge size="2xsmall" color="purple">
                  {value}
                </Badge>
              );
            },
          },
          {
            key: 'followers',
            label: '팔로워 수',
            render: (value: number) => {
              return numberToKorean(value);
            },
          },
          {
            key: 'gender',
            label: '성별',
            render: (value: Gender) => {
              return getGender(value);
            },
          },
          {
            key: 'id',
            render: (_value: React.Key, item: IInfluencer) => {
              return (
                <div className="flex flex-row justify-end w-full gap-3">
                  <Button size="small" variant="secondary" onClick={(e) => handleClickEdit(e, item.id)}>
                    수정
                  </Button>
                  <Button size="small" variant="secondary" onClick={(e) => handleClickDelete(e, item.id)}>
                    삭제
                  </Button>
                </div>
              );
            },
          },
        ]}
        data={event?.influencers ?? []}
        selectable
        pagination={false}
      />
    </div>
  );
};
