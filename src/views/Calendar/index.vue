<template>
  <n-calendar
    v-model:value="value"
    #="{ year, month, date }"
    :is-date-disabled="isDateDisabled"
    @update:value="handleUpdateValue"
  >
    {{ year }}-{{ month }}-{{ date }}
    <TaskList :list="getTaskList(`${year}-${month}-${date}`)"></TaskList>
  </n-calendar>
  <BasicModal @register="register" ref="modalRef">
    <WorkList :list="getTaskList(dateTime)" :dateTime="dateTime"></WorkList>
  </BasicModal>
</template>
<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'
import { isYesterday, addDays } from 'date-fns'
import { BasicModal, useModal } from '@/components/Modal'
import { useStore } from 'vuex'
import WorkList from './components/WorkList.vue'
import TaskList from './components/TaskList.vue'
export default defineComponent({
  components: { BasicModal, WorkList, TaskList },
  setup () {
    const modalRef = ref(null)
    const dateTime = ref('')
    // const taskList: any = useStorage('task-list', JSON.parse(localStorage.getItem('task-list') as string) || {})
    const store = useStore()
    const [register, { openModal }] = useModal({
      title: '任务清单'
    })
    const showModal = () => {
      openModal()
    }
    const getTaskList = computed(() => {
      return (date: string) => store.state.taskList[date] || []
    })
    return {
      modalRef,
      dateTime,
      register,
      showModal,
      getTaskList,
      value: ref(addDays(Date.now(), 1).valueOf()),
      handleUpdateValue (
        _: number,
        { year, month, date }: { year: number; month: number; date: number }
      ) {
        dateTime.value = `${year}-${month}-${date}`
        showModal()
        // message.success(`${year}-${month}-${date}`)
      },
      isDateDisabled (timestamp: number) {
        if (isYesterday(timestamp)) {
          return true
        }
        return false
      }
    }
  }
})
</script>
<style>
</style>
