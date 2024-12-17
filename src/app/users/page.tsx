'use client';

import UserCreateFormModal from './user-create-form-modal';
import Button from '@/components/common/button';
import { MODAL } from '@/constants/modal-key-constants';
import useModals from '@/hooks/use-modals';
import { useUsers } from '@/lib/user';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

const Page = () => {
  const pageStyle = PageSva();
  const { openModal } = useModals();

  const { data: users } = useUsers({
    _page: 1,
    _per_page: 10,
  });

  const handleClickCreateButton = () => {
    openModal({
      id: MODAL.USER_CREATE,
      component: <UserCreateFormModal />,
    });
  };

  return (
    <Box className={pageStyle.wrapper}>
      <Box className={pageStyle.list}>{users?.data.map((user) => <Box key={user.id}>{user.name}</Box>)}</Box>
      <Button onClick={handleClickCreateButton}>Create</Button>
    </Box>
  );
};

export default Page;

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
