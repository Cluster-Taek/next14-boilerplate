'use client';

import { Table } from '@/components/common/table';
import { UploadButton } from '@/components/common/upload-button';
import { INFLUENCER_HEADER_MAP } from '@/constants/influencer-constants';
import useExcel from '@/hooks/use-excel';
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
    const data = await sheetToJSON(file, {
      headerMap: INFLUENCER_HEADER_MAP,
      headerIndex: 2,
      rowStart: 4,
      columnStart: 2,
    });
    bulkCreateInfluencer(data as IInfluencerFormValue[]);
  };

  const handleClickDownload = async () => {
    const influencers = data?.data ?? [];

    await getSheet({
      data: [
        {
          'No.': '-',
          지역: '서울, 인천, 경기, 충청, 전라, 경상, 제주, 해외',
          연령대: '10대, 20대, 30대, 40대, 50대',
          프로젝트: '시딩, 기프팅, 이벤트, 정보성',
          카테고리: '인플루언서, 유튜버, 파워블로거, 셀러브리티, 스타일리스트, SNS 채널',
          타겟: '패션, 뷰티, 리빙, 공간, 업계, 스포츠, 반려동물, 키즈, F&B, 정보성, 아이돌, 배우',
          성별: '여성, 남성',
          직업: '-',
          '이름 / 채널명': '-',
          'SNS URL': '-',
          '팔로워 수': '0-1,000 / 1,000-10,000 / 10,000-50,000 / 50,000 - 100,000 +',
          'Blog URL': '-',
          '일일 방문자 수': '0-1,000 / 1,000-5,000 / 5,000-10,000 / 10,000 +',
          '포스팅 비용':
            '무가 / 10-30만원 / 30-90만원 / 100-200만원 / 200-300만원 / 300-500만원 / 500-1,000만원 / 1,000~',
          연락처: '-',
        },
        ...influencers.map((influencer, index) => {
          return {
            'No.': index + 1,
            지역: influencer.region,
            연령대: influencer.ageGroup,
            프로젝트: influencer.projectType,
            카테고리: influencer.category,
            타겟: influencer.target,
            성별: influencer.gender,
            직업: influencer.profession,
            '이름 / 채널명': influencer.channelName,
            'SNS URL': influencer.snsUrl,
            '팔로워 수': influencer.followerCount,
            'Blog URL': influencer.blogUrl,
            '일일 방문자 수': influencer.dailyVisitorCount,
            '포스팅 비용': influencer.postingCost,
            연락처: influencer.contact,
          };
        }),
      ],
      fileName: `${title} 목록.xlsx`,
      sheetName: `${title} 목록`,
      rowWidth: [20, 20, 20, 20, 20, 20, 20, 20],
      headerIndex: 2,
    });
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
