<template>
 <n-config-provider :locale="zhCN" :date-locale="dateZhCN" style="height: 100%">
    <BaseLayout></BaseLayout>
  </n-config-provider>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BaseLayout from './layout/BasicLayout.vue'
import { zhCN, dateZhCN } from 'naive-ui'
export default defineComponent({
  components: {
    BaseLayout
  },
  setup () {
    return {
      zhCN,
      dateZhCN
    }
  }
})
</script>
<style lang="less">
html,body {
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
}
ul,li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
