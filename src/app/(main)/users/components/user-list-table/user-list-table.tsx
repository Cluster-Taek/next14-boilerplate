'use client';

import { Table } from '@/components/common/table';
import { useSearchParams } from '@/hooks/use-search-params';
import { useDeleteUserMutation, useUsers } from '@/lib/user';
import { IUser } from '@/types/user';
import { Plus } from '@medusajs/icons';
import { Button, Container, usePrompt } from '@medusajs/ui';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const PAGE_SIZE = 10;
export const UserListTable = () => {
  const pathname = usePathname();
  const { searchParams } = useSearchParams();
  const router = useRouter();
  const dialog = usePrompt();
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState<string>('');

  const { data, isError, error } = useUsers({
    ...searchParams,
    _page: currentPage + 1,
    _per_page: PAGE_SIZE,
  });

  const { mutate: deleteUser } = useDeleteUserMutation();

  if (isError) {
    throw error;
  }

  const handleClickEdit = (e: React.MouseEvent, id: React.Key) => {
    e.stopPropagation();
    router.push(`/users/${id}/edit`);
  };

  const handleClickDelete = async (e: React.MouseEvent, id: React.Key) => {
    e.stopPropagation();
    const confirmedDelete = await dialog({
      title: `사용자 삭제`,
      description: `해당 사용자를 삭제하시겠습니까?`,
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (confirmedDelete) {
      deleteUser(id as string);
    }
  };

  return (
    <Container className="w-full p-0 divide-y">
      <Table<IUser>
        title={`총 ${data?.total ?? 0}명의 사용자를 찾았습니다.`}
        actions={
          <Button size="small" variant="secondary" onClick={() => router.push(`${pathname}/create`)}>
            <Plus />
            사용자 추가
          </Button>
        }
        columns={[
          {
            key: 'name',
            label: '이름',
          },
          {
            key: 'region',
            label: '지역',
          },
          {
            key: 'id',
            render: (_value: React.Key, item: IUser) => {
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
        count={data?.total ?? 0}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sort={sort}
        setSort={setSort}
        sortable
        onClickRow={(item) => router.push(`${pathname}/${item.id}/edit`)}
      />
    </Container>
  );
};
