'use client';

import { useUsers } from '@/entities/user';
import { MODAL, useModalStore } from '@/features/modal';
import { Button } from '@/shared/ui/button';

export const UsersPage = () => {
  const { openModal } = useModalStore();

  const { data: users } = useUsers({
    _page: 1,
    _per_page: 10,
  });

  const handleClickCreateButton = () => {
    openModal(MODAL.USER_CREATE);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center h-full">
      <div className="w-full flex flex-wrap gap-4">
        {users?.data.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <Button onClick={handleClickCreateButton}>Create</Button>
    </div>
  );
};
