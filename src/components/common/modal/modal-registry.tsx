'use client';

import dynamic from 'next/dynamic';
import { MODAL } from '@/constants/modal-key-constants';
import type { ModalComponent } from './types';

/**
 * 모달 레지스트리 (동적 import)
 *
 * 모달 ID와 실제 컴포넌트를 매핑합니다.
 * 동적 import를 사용하여 모달이 열릴 때만 로드됩니다.
 *
 * 새로운 모달 추가 시:
 * 1. constants/modal-key-constants.ts에 ID 추가
 * 2. components/modals/에 모달 컴포넌트 생성
 * 3. 이 레지스트리에 dynamic import 추가
 */
export const MODAL_COMPONENTS: Record<string, ModalComponent> = {
  [MODAL.USER_CREATE]: dynamic(
    () => import('@/components/modals/user-create/user-create-form-modal'),
    { ssr: false }
  ),
} as const;

export type ModalId = keyof typeof MODAL_COMPONENTS;
