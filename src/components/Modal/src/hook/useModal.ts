/* eslint-disable no-unused-expressions */
import { ref, unref, onUnmounted, getCurrentInstance, watch } from 'vue'
import { ModalMethods, UseModalReturnType } from '../types/index'
export function useModal (modalProps: any): UseModalReturnType {
  const modalRef = ref<ModalMethods | null>(null)
  // const loadRef = ref<boolean>(false)
  // const uuiRef = ref<string>('')
  const currentInstance = getCurrentInstance()

  const getInstance = () => {
    const instance = unref(modalRef.value)
    if (!instance) {
      throw new Error('没有获得实例')
    }
    return instance
  }

  const register = (modalInstance: ModalMethods) => {
    onUnmounted(() => {
      modalRef.value = null
      // loadRef.value = false
    })
    modalRef.value = modalInstance
    currentInstance?.emit('register', modalInstance)
    watch(
      () => modalProps,
      () => {
        modalProps && modalInstance.setProps(modalProps)
      },
      {
        immediate: true,
        deep: true
      }
    )
  }

  const methods: ModalMethods = {
    setProps: (modalProps): void => {
      getInstance()?.setProps(modalProps)
    },
    openModal: () => {
      getInstance()?.openModal()
    },
    closeModal: () => {
      getInstance()?.closeModal()
    }
  }
  return [register, methods]
}
