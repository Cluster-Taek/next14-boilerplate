'use client';

import { Table } from '@/components/common/table';
import { UploadButton } from '@/components/common/upload-button';
import useInfluencersExcel from '@/hooks/use-influencers-excel';
import { useEvent } from '@/lib/event';
import { IInfluencerFormValue, useBulkCreateInfluencerMutation } from '@/lib/influencer';
import { Gender, IInfluencer } from '@/types/influencer';
import { numberToKorean } from '@/utils/utils';
import { CloudArrowDown, CloudArrowUp, Envelope } from '@medusajs/icons';
import { Badge, Button, usePrompt } from '@medusajs/ui';
import { useState } from 'react';

interface IEventInfluencersListTabProps {
  eventId: string;
}

export const EventInfluencersListTab = ({ eventId }: IEventInfluencersListTabProps) => {
  const dialog = usePrompt();
  const [selected, setSelected] = useState<IInfluencer[]>([]);
  const { data: event } = useEvent(eventId);
  const { convertExcelToInfluencers, convertInfluencersToExcel } = useInfluencersExcel();

  const { mutate: bulkCreateInfluencer } = useBulkCreateInfluencerMutation();

  const getGender = (gender: Gender) => {
    return gender === 'F' ? '여' : '남';
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

  const onChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await convertExcelToInfluencers(file);
    bulkCreateInfluencer(data as IInfluencerFormValue[]);
  };

  const handleClickDownload = async () => {
    await convertInfluencersToExcel(event?.influencers ?? [], '인플루언서 목록');
  };

  const handleClickMessage = async () => {
    console.log('handleClickMessage', selected);
  };

  return (
    <Table<IInfluencer>
      title={`총 ${event?.influencers?.length ?? 0}명의 인플루언서를 찾았습니다.`}
      actions={
        <>
          <UploadButton size="small" variant="secondary" onChange={onChangeUpload} accept=".xlsx">
            <CloudArrowUp />
            리스트 업로드
          </UploadButton>
          <Button size="small" variant="secondary" onClick={handleClickDownload}>
            <CloudArrowDown />
            리스트 다운로드
          </Button>
          <Button size="small" variant="secondary" onClick={handleClickMessage}>
            <Envelope />
            메시지 보내기
          </Button>
        </>
      }
      columns={[
        {
          key: 'channelName',
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
          key: 'followerCount',
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
      columnsVisibility
      onSelectChange={(selected) => setSelected(selected)}
      pagination={false}
    />
  );
};
