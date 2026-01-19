'use client';

import { MOTION } from '@/shared/config';
import { useModalStore } from '../model/useModalStore';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { motion } from 'motion/react';
import type { ModalComponent } from '../model/types';

interface ModalProps {
  components: Record<string, ModalComponent>;
}

export const Modal = ({ components }: ModalProps) => {
  const modalStyle = ModalSva();
  const { openedModalIds, modalPropsMap, closeModal } = useModalStore();

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
