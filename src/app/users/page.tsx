'use client';

import Button from '@/components/common/button';
import UserCreateFormModal from '@/components/user/user-create-form-modal';
import { MODAL } from '@/constants/modal-key-constants';
import useModals from '@/hooks/use-modals';
import { useUsers } from '@/lib/user';

const Page = () => {
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
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="w-full flex flex-wrap gap-4">
        {users?.data.map((user) => <div key={user.id}>{user.name}</div>)}
      </div>
      <Button onClick={handleClickCreateButton}>Create</Button>
    </div>
  );
};

export default Page;
