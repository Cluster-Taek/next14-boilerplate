import { ModalContext } from '@/contexts/modal-provider';
import { useContext } from 'react';

const useModals = () => {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
};

export default useModals;
