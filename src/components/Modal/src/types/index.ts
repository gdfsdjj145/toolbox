export interface ModalMethods {
  setProps: (props: any) => void;
  openModal: () => void;
  closeModal: () => void;
}
export type RegisterFn = (ModalInstance: ModalMethods) => void
export type UseModalReturnType = [RegisterFn, ModalMethods]
