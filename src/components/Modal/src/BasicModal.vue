<template>
  <n-modal v-bind="getBindValue" v-model:show="visible" @close="close">
    <template #default>
      <slot name="default"></slot>
    </template>
  </n-modal>
</template>
<script lang='ts'>
import { defineComponent, ref, unref, computed, getCurrentInstance, useAttrs } from 'vue'
import { basicProps } from './props'
import { ModalMethods } from '@/components/Modal/src/types'
import type { DialogOptions } from 'naive-ui/lib/dialog'
import { deepMerge } from '@/utils'
export default defineComponent({
  props: { ...basicProps },
  setup (props, { emit }) {
    const visible = ref<boolean>(false)
    const attrs = useAttrs()
    const open = () => {
      visible.value = true
    }
    const close = () => {
      visible.value = false
      emit('on-close')
    }
    const propsRef = ref<Partial<DialogOptions> | null>(null)
    const getProps = computed(() => {
      return { ...props, ...(unref(propsRef) as any) }
    })
    const setProps = async (modalProps: Partial<DialogOptions>): Promise<void> => {
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), modalProps)
    }
    const getBindValue = computed(() => {
      return {
        ...attrs,
        ...unref(getProps),
        ...unref(propsRef)
      }
    })
    const modalMethods: ModalMethods = {
      openModal: open,
      closeModal: close,
      setProps
    }
    const instace = getCurrentInstance()
    if (instace) {
      emit('register', modalMethods)
    }
    return { visible, open, close, getProps, setProps, getBindValue, modalMethods, instace }
  }
})
</script>
<style>
</style>
