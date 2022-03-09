<template>
  <ul class="work-container">
    <transition-group name="flip-list" tag="ul">
      <li v-for="(item, index) in taskList" :key="item" class="work-list-item">
        <n-space justify="space-between">
          <span :class="[item.finish?'finish-text':'unfinish-text']"><span class="icon-btn" @click="finish(index)">🔥</span>{{ item.title }}</span>
          <CloseOutline class="icon-btn" @click="closeTask(index)"/>
        </n-space>
      </li>
    </transition-group>
  </ul>
  <div>
    <n-input style="width: 70%" v-model:value="task" @keydown.enter="addTask">
    </n-input>
    <n-button type="primary" @click="addTask"> 添加任务 </n-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { CloseOutline } from '@vicons/ionicons5'
import { useStore } from 'vuex'
interface taskItem {
  title: string | null;
  finish: boolean;
}
export default defineComponent({
  components: {
    CloseOutline
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    dateTime: {
      type: String,
      default: ''
    }
  },
  emits: ['change-list'],
  setup (props) {
    const task = ref<string | null>('')
    const taskList = ref<taskItem[]>([])
    const checkedValueRef = ref<string | null>(null)
    const store = useStore()
    const addTask = () => {
      if (!task.value) return
      taskList.value.push({
        title: task.value,
        finish: false
      })
      task.value = ''
      store.dispatch('useTaskList', { key: props.dateTime, val: taskList.value })
    }
    const closeTask = (index: number) => {
      taskList.value.splice(index, 1)
      store.dispatch('useTaskList', { key: props.dateTime, val: taskList.value })
    }
    const finish = (index: number) => {
      taskList.value[index].finish = true
      console.log(taskList.value)
      store.dispatch('useTaskList', { key: props.dateTime, val: taskList.value })
    }
    onMounted(() => {
      taskList.value = props.list as []
    })
    return {
      task,
      taskList,
      checkedValueRef,
      addTask,
      closeTask,
      finish,
      handleChange (e: Event) {
        checkedValueRef.value = (e.target as HTMLInputElement).value
      }
    }
  }
})
</script>
<style lang="less" scoped>
.work-container {
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
  margin-bottom: 10px;
}
.icon-btn {
  width: 14px;
  height: 14px;
  cursor: pointer;
}
.work-list-item {
  padding: 10px;
  border-bottom: 1px solid rgb(231, 245, 238);
}
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
