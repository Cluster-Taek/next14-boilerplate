'use client';

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { MOTION } from '@/shared/config';
import { type ModalComponent } from '../model/types';
import { useModalStore } from '../model/useModalStore';

interface ModalProps {
  components: Record<string, ModalComponent>;
}

export const Modal = ({ components }: ModalProps) => {
  const { openedModalIds, modalPropsMap, closeModal } = useModalStore();

  // body overflow 관리 및 popstate 이벤트 리스너
  useEffect(() => {
    const unsubscribe = useModalStore.subscribe((state) => {
      document.body.style.overflow = state.openedModalIds.length > 0 ? 'hidden' : 'auto';
    });

    const handlePopState = () => {
      useModalStore.getState().closeAllModals();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {openedModalIds.map((modalId, index) => {
        const ModalComponent = components[modalId];
        const modalProps = modalPropsMap[modalId];

        if (!ModalComponent) {
          console.error(`Modal component not found for ID: ${modalId}`);
          return null;
        }

        return (
          <div
            className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden"
            key={`${modalId}-${index}`}
          >
            <div
              className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-black opacity-48"
              onClick={() => closeModal(modalId)}
            />
            <motion.div className="relative" {...MOTION.POP}>
              <ModalComponent onClose={() => closeModal(modalId)} {...(modalProps || {})} />
            </motion.div>
          </div>
        );
      })}
    </>
  );
};
