'use client';

import { MOTION } from '@/constants/motion-constants';
import { ModalContext } from '@/contexts/modal-provider';
import useModals from '@/hooks/use-modals';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';

export const Modal = () => {
  const { openedModals } = useContext(ModalContext);
  const { closeModal } = useModals();

  useEffect(() => {
    document.body.style.overflow = openedModals.length > 0 ? 'hidden' : 'auto';
  }, [openedModals]);

  return (
    <>
      {openedModals.map((modal, index) => {
        const { id, component } = modal;

        return (
          <div
            key={index}
            className="fixed left-0 top-0 z-10 flex items-center justify-center h-dvh w-screen overflow-hidden"
          >
            <div
              className="fixed left-0 top-0 h-dvh w-screen overflow-hidden bg-black opacity-45"
              onClick={() => closeModal(id)}
            />
            <motion.div className="relative" {...MOTION.POP}>
              {component}
            </motion.div>
          </div>
        );
      })}
    </>
  );
};
