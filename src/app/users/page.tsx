'use client';

import UserCreateForm from './user-create-form';
import { useUsers } from '@/lib/user';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { useState } from 'react';

const Page = () => {
  const pageStyle = PageSva();
  const [openForm, setOpenForm] = useState(false);

  const { data: users } = useUsers({
    _page: 1,
    _per_page: 10,
  });

  return (
    <Box className={pageStyle.wrapper}>
      <Box className={pageStyle.title}>Users</Box>
      <Box>{users?.data.map((user) => <Box key={user.id}>{user.name}</Box>)}</Box>
      <button className={pageStyle.button} onClick={() => setOpenForm(!openForm)}>
        {openForm ? 'Close' : 'Create'}
      </button>
      {openForm && <UserCreateForm />}
    </Box>
  );
};

export default Page;

const PageSva = sva({
  slots: ['wrapper', 'title', 'form', 'input', 'button', 'error'],
  base: {
    wrapper: {
      display: 'block',
    },
    title: {
      fontSize: '2xl',
      fontWeight: 'bold',
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
    button: {
      padding: '2',
      marginTop: '4',
      backgroundColor: '#111111',
      color: 'white',
      borderRadius: 'md',
    },
    error: {
      color: 'red',
      marginTop: '2',
    },
  },
});
