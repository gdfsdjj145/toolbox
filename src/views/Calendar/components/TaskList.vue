<template>
  <ul class="task-container" v-if="list.length">
    <li v-for="(item) in taskList" :key="item">
      <span :class="[item.finish?'finish-text':'unfinish-text']"><span>🔥</span>{{ item.title }}</span>
    </li>
    <li v-show="list.length > 3">......</li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const taskList = computed(() => {
      return props.list.length > 4 ? props.list.slice(3) : props.list
    })
    return { taskList }
  }
})
</script>
<style lang="less" scoped>
.task-container {
  max-height: 100px;
  overflow: hidden;
}
</style>
