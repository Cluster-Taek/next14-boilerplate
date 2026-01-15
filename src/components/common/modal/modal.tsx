'use client';

import { MOTION } from '@/constants/motion-constants';
import { MODAL_COMPONENTS } from './modal-registry';
import { useModalStore } from '@/stores/modal-store';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { motion } from 'motion/react';

const Modal = () => {
  const modalStyle = ModalSva();
  const { openedModalIds, modalPropsMap, closeModal } = useModalStore();

  return (
    <>
      {openedModalIds.map((modalId, index) => {
        const ModalComponent = MODAL_COMPONENTS[modalId];
        const modalProps = modalPropsMap[modalId];

        if (!ModalComponent) {
          console.error(`Modal component not found for ID: ${modalId}`);
          return null;
        }

        return (
          <Box className={modalStyle.wrapper} key={`${modalId}-${index}`}>
            <Box className={modalStyle.dimmed} onClick={() => closeModal(modalId)} />
            <motion.div className={modalStyle.modal} {...MOTION.POP}>
              <ModalComponent onClose={() => closeModal(modalId)} {...(modalProps || {})} />
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
