'use client';

import { MODAL, useModalStore } from '@/features/modal';
import { Button } from '@/shared/ui/button';

export const CreateUserButton = () => {
  const { openModal } = useModalStore();

  const handleClickCreateButton = () => {
    openModal(MODAL.USER_CREATE);
  };

  return <Button onClick={handleClickCreateButton}>Create</Button>;
};
