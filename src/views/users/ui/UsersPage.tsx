'use client';

import { Button } from '@/shared/ui/button';
import { MODAL, useModalStore } from '@/features/modal';
import { useUsers } from '@/entities/user';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

export const UsersPage = () => {
  const pageStyle = PageSva();
  const { openModal } = useModalStore();

  const { data: users } = useUsers({
    _page: 1,
    _per_page: 10,
  });

  const handleClickCreateButton = () => {
    openModal(MODAL.USER_CREATE);
  };

  return (
    <Box className={pageStyle.wrapper}>
      <Box className={pageStyle.list}>{users?.data.map((user) => <Box key={user.id}>{user.name}</Box>)}</Box>
      <Button onClick={handleClickCreateButton}>Create</Button>
    </Box>
  );
};

const PageSva = sva({
  slots: ['wrapper', 'list', 'form', 'input', 'error'],
  base: {
    wrapper: {
      display: 'flex',
      width: 'full',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'full',
    },
    list: {
      width: 'full',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4',
    },
    form: {
      width: 'full',
      marginTop: '4',
    },
    input: {
      width: 'full',
      padding: '2',
      marginTop: '2',
    },
    error: {
      color: 'red',
      marginTop: '2',
    },
  },
});
