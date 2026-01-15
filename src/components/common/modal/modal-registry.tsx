import { MODAL } from '@/constants/modal-key-constants';
import UserCreateFormModal from '@/components/modals/user-create/user-create-form-modal';
import { type ModalComponent } from './types';

/**
 * 모달 레지스트리
 *
 * 모달 ID와 실제 컴포넌트를 매핑합니다.
 * 새로운 모달 추가 시:
 * 1. constants/modal-key-constants.ts에 ID 추가
 * 2. components/modals/에 모달 컴포넌트 생성
 * 3. 이 레지스트리에 매핑 추가
 */
export const MODAL_COMPONENTS: Record<string, ModalComponent> = {
  [MODAL.USER_CREATE]: UserCreateFormModal,
} as const;

export type ModalId = keyof typeof MODAL_COMPONENTS;
