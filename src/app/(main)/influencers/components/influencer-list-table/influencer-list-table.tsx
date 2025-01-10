'use client';

import { Table } from '@/components/common/table';
import { UploadButton } from '@/components/common/upload-button';
import useExcel from '@/hooks/use-excel';
import {
  IInfluencerFormValue,
  useBulkCreateInfluencerMutation,
  useDeleteInfluencerMutation,
  useInfluencers,
} from '@/lib/influencer';
import { ISODateString } from '@/types/common';
import { Gender, IInfluencer } from '@/types/influencer';
import { numberToKorean } from '@/utils/utils';
import { Check, CloudArrowDown, CloudArrowUp } from '@medusajs/icons';
import { Badge, Button, Container, Text, usePrompt } from '@medusajs/ui';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 10;

export const InfluencerListTable = () => {
  const pathname = usePathname();
  const title = useMemo(() => (pathname === '/influencers' ? '인플루언서' : '셀러브리티'), [pathname]);
  const router = useRouter();
  const dialog = usePrompt();
  const { getSheet, sheetToJSON } = useExcel();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isError, error } = useInfluencers({
    _page: 1,
    _per_page: PAGE_SIZE,
  });

  const { mutate: bulkCreateInfluencer } = useBulkCreateInfluencerMutation();
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
      title: `${title} 삭제`,
      description: `해당 ${title}를 삭제하시겠습니까?`,
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (confirmedDelete) {
      deleteInfluencer(id as string);
    }
  };

  const onChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await sheetToJSON(file);
    bulkCreateInfluencer(data as IInfluencerFormValue[]);
  };

  const handleClickDownload = async () => {
    const influencers = data?.data ?? [];

    await getSheet({
      data: influencers,
      fileName: `${title} 목록.xlsx`,
      sheetName: `${title} 목록`,
      rowWidth: [20, 20, 20, 20, 20, 20, 20, 20],
    });
  };

  return (
    <Container className="w-full p-0 divide-y">
      <div className="flex items-center justify-between px-6 py-4">
        <Text className="text-ui-fg-subtle" size="small">
          총 {data?.items}명의 {title}를 찾았습니다.
        </Text>
        <div className="flex flex-row justify-end gap-2">
          <Button size="small" variant="secondary">
            <Check />
            선택한 인원보기
          </Button>
          <UploadButton size="small" variant="secondary" onChange={onChangeUpload} accept=".xlsx">
            <CloudArrowUp />
            리스트 업로드
          </UploadButton>
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
            key: 'gender',
            label: '성별',
            render: (value: Gender) => {
              return getGender(value);
            },
          },
          {
            key: 'birthDate',
            label: '연령대',
            render: (value: ISODateString) => {
              return getAgeGeneration(value);
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
            key: 'project',
            label: '프로젝트',
          },
          {
            key: 'amount',
            label: '원고료',
            render: (value: number) => {
              return `${numberToKorean(value)}원`;
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
        data={data?.data ?? []}
        pageSize={10}
        count={data?.items ?? 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onClickRow={(item) => router.push(`${pathname}/${item.id}/edit`)}
      />
    </Container>
  );
};
