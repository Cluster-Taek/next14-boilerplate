import { type ComponentType } from 'react';

/**
 * 모달 컴포넌트 타입
 * 모든 모달은 onClose 콜백을 받아야 함
 */
export type ModalComponent = ComponentType<{
  onClose: () => void;
  [key: string]: unknown; // 추가 props 허용
}>;

/**
 * 모달 props 타입
 */
export interface ModalProps {
  onClose: () => void;
}
