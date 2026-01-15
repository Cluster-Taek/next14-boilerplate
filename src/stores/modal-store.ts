import { create } from 'zustand';

interface ModalState {
  // 열려있는 모달 ID 목록
  openedModalIds: string[];

  // 모달별 props 저장 (모달 ID를 키로 사용)
  modalPropsMap: Record<string, unknown>;

  // 모달 열기
  openModal: (id: string, props?: unknown) => void;

  // 모달 닫기
  closeModal: (id: string) => void;

  // 모든 모달 닫기
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  openedModalIds: [],
  modalPropsMap: {},

  openModal: (id, props) =>
    set((state) => ({
      openedModalIds: [...state.openedModalIds, id],
      modalPropsMap: props ? { ...state.modalPropsMap, [id]: props } : state.modalPropsMap,
    })),

  closeModal: (id) =>
    set((state) => ({
      openedModalIds: state.openedModalIds.filter((modalId) => modalId !== id),
      modalPropsMap: Object.fromEntries(
        Object.entries(state.modalPropsMap).filter(([key]) => key !== id)
      ),
    })),

  closeAllModals: () =>
    set({
      openedModalIds: [],
      modalPropsMap: {},
    }),
}));

// body overflow 관리를 위한 effect hook (클라이언트 컴포넌트에서 사용)
if (typeof window !== 'undefined') {
  useModalStore.subscribe((state) => {
    document.body.style.overflow = state.openedModalIds.length > 0 ? 'hidden' : 'auto';
  });

  // 라우트 변경 시 모든 모달 닫기
  window.addEventListener('popstate', () => {
    useModalStore.getState().closeAllModals();
  });
}
