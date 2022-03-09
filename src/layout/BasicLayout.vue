<template>
  <div class="container">
    <n-button class="state-btn" type="info">
      <template #icon>
        <n-icon><Water /></n-icon>
      </template>
      厕所
    </n-button>
    <n-button class="state-btn" type="error">
      <template #icon>
        <n-icon><Bug /></n-icon>
      </template>
      工作
    </n-button>
    <n-button class="state-btn" type="warning">
      <template #icon>
        <n-icon><PhonePortraitOutline /></n-icon>
      </template>
      发呆
    </n-button>
    <n-button class="state-btn" type="primary">
      <template #icon>
        <n-icon><Fish /></n-icon>
      </template>
      摸鱼</n-button
    >
    <n-button circle class="setting-btn" color="#8a2be2">
      <template #icon>
        <n-icon><Settings /></n-icon>
      </template>
    </n-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Water, Bug, PhonePortraitOutline, Fish, Settings } from '@vicons/ionicons5'
export default defineComponent({
  components: {
    Water,
    Bug,
    PhonePortraitOutline,
    Fish,
    Settings
  }
})
</script>
<style lang="less" scoped>
.container {
  padding: 5px;
  font-size: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: 100px 100px;
  grid-template-rows: 100px 100px;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
}
.state-btn {
  width: 100px;
  height: 100px;
}
.setting-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
}
</style>
