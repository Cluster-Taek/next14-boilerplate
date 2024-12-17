'use client';

import { MOTION } from '@/constants/motion-constants';
import { ModalContext } from '@/contexts/modal-provider';
import useModals from '@/hooks/use-modals';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';

const Modal = () => {
  const modalStyle = ModalSva();
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
          <Box className={modalStyle.wrapper} key={index}>
            <Box className={modalStyle.dimmed} onClick={() => closeModal(id)} />
            <motion.div className={modalStyle.modal} {...MOTION.POP}>
              {component}
            </motion.div>
          </Box>
        );
      })}
    </>
  );
};

export default Modal;

const ModalSva = sva({
  slots: ['wrapper', 'dimmed', 'modal'],
  base: {
    wrapper: {
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 10,
      display: 'flex',
      height: '100dvh',
      width: '100vw',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    dimmed: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100dvw',
      height: '100dvh',
      overflow: 'hidden',
      backgroundColor: 'black',
      opacity: 0.48,
    },
    modal: {
      position: 'relative',
    },
  },
});
