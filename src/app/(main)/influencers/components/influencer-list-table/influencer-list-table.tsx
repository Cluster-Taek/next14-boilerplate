'use client';

import { Table } from '@/components/common/table';
import { UploadButton } from '@/components/common/upload-button';
import useInfluencersExcel from '@/hooks/use-influencers-excel';
import {
  IInfluencerFormValue,
  useBulkCreateInfluencerMutation,
  useDeleteInfluencerMutation,
  useInfluencers,
} from '@/lib/influencer';
import { Gender, IInfluencer } from '@/types/influencer';
import { numberToKorean } from '@/utils/utils';
import { CloudArrowDown, CloudArrowUp } from '@medusajs/icons';
import { Badge, Button, Container, usePrompt } from '@medusajs/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 50;

export const InfluencerListTable = () => {
  const pathname = usePathname();
  const title = useMemo(() => (pathname === '/influencers' ? '인플루언서' : '셀러브리티'), [pathname]);
  const router = useRouter();
  const dialog = usePrompt();
  const { convertExcelToInfluencers, convertInfluencersToExcel } = useInfluencersExcel();
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
    const data = await convertExcelToInfluencers(file);
    bulkCreateInfluencer(data as IInfluencerFormValue[]);
  };

  const handleClickDownload = async () => {
    await convertInfluencersToExcel(data?.data ?? [], '인플루언서 목록');
  };

  return (
    <Container className="w-full p-0 divide-y">
      <Table<IInfluencer>
        title={`총 ${data?.items}명의 ${title}를 찾았습니다.`}
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
          </>
        }
        columns={[
          {
            key: 'region',
            label: '지역',
          },
          {
            key: 'ageGroup',
            label: '연령대',
          },
          {
            key: 'projectType',
            label: '프로젝트 유형',
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
            key: 'target',
            label: '대상 산업/분야',
          },
          {
            key: 'gender',
            label: '성별',
            render: (value: Gender) => {
              return getGender(value);
            },
          },
          {
            key: 'profession',
            label: '직업',
          },
          {
            key: 'channelName',
            label: '이름/채널명',
          },
          {
            key: 'snsUrl',
            label: 'SNS URL',
            render: (value: string) => {
              return value ? (
                <a href={value} target="_blank" rel="noreferrer" className="text-blue-500">
                  {value}
                </a>
              ) : (
                '-'
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
            key: 'blogUrl',
            label: '블로그 URL',
            render: (value: string) => {
              return value ? (
                <a href={value} target="_blank" rel="noreferrer" className="text-blue-500">
                  {value}
                </a>
              ) : (
                '-'
              );
            },
          },
          {
            key: 'dailyVisitorCount',
            label: '일일 방문자 수',
            render: (value: number) => {
              return value ? `${numberToKorean(value)}명` : '-';
            },
          },
          {
            key: 'postingCost',
            label: '포스팅 비용',
            render: (value: number) => {
              return value ? (value > 0 ? `${numberToKorean(value)}원` : '무가') : '-';
            },
          },
          {
            key: 'contact',
            label: '연락처',
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
        pageSize={PAGE_SIZE}
        count={data?.items ?? 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onClickRow={(item) => router.push(`${pathname}/${item.id}/edit`)}
        columnsVisibility
      />
    </Container>
  );
};
