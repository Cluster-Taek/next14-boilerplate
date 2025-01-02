'use client';

import { Table } from '@/components/common/table';
import { useDeleteInfluencerMutation, useInfluencers } from '@/lib/influencer';
import { Gender, IInfluencer } from '@/types/influencer';
import { numberToKorean } from '@/utils/utils';
import { Check, CloudArrowDown, CloudArrowUp } from '@medusajs/icons';
import { Badge, Button, Container, Text, usePrompt } from '@medusajs/ui';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PAGE_SIZE = 10;

export const InfluencerListTable = () => {
  const router = useRouter();
  const dialog = usePrompt();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isError, error } = useInfluencers({
    _page: 1,
    _per_page: PAGE_SIZE,
  });

  const { mutate: deleteInfluencer } = useDeleteInfluencerMutation();

  if (isError) {
    throw error;
  }

  const getAgeGeneration = (birthDate: string) => {
    const age = dayjs().diff(dayjs(birthDate), 'y');
    const generation = Math.floor(age / 10) * 10;
    return `${generation}대`;
  };

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
      deleteInfluencer(id as string);
    }
  };

  return (
    <Container className="divide-y p-0 w-full">
      <div className="flex items-center justify-between px-6 py-4">
        <Text className="text-ui-fg-subtle" size="small">
          총 {data?.items}명의 인플루언서를 찾았습니다.
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
          <Button size="small" variant="secondary">
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
            render: (value: any) => {
              return (
                <Badge size="2xsmall" color="purple">
                  {value}
                </Badge>
              );
            },
          },
          {
            key: 'gender',
            label: '성별',
            render: (value: any) => {
              return getGender(value);
            },
          },
          {
            key: 'birthDate',
            label: '연령대',
            render: (value: any) => {
              return getAgeGeneration(value);
            },
          },
          {
            key: 'followers',
            label: '팔로워 수',
            render: (value: any) => {
              return numberToKorean(value);
            },
          },
          {
            key: 'project',
            label: '프로젝트',
            render: (value: any) => {
              return value;
            },
          },
          {
            key: 'amount',
            label: '원고료',
            render: (value: any) => {
              return `${numberToKorean(value)}원`;
            },
          },
          {
            key: 'id',
            render: (_value: any, item: IInfluencer) => {
              return (
                <div className="flex flex-row justify-end gap-3 w-full">
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
        data={data?.data ?? []}
        pageSize={10}
        count={data?.items ?? 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onClickRow={(item) => {
          router.push(`/influencers/${item.id}`);
        }}
      />
    </Container>
  );
};
