<template>
  <div class="container">
    <n-layout has-sider style="height: 100%">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuList"
          @update:value="handleMenuClick"
        ></n-menu>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered>
          <n-grid x-gap="12" :cols="4">
            <n-grid-item>
              <n-card
                title="摸鱼时长"
                :segmented="{ content: 'hard', footer: 'hard' }"
                size="small"
              >
                <template #header-extra>
                  <n-tag type="success">摸</n-tag>
                </template>
              </n-card>
            </n-grid-item>
            <n-gi>
              <n-card title="摸鱼次数"> 卡片内容 </n-card>
            </n-gi>
            <n-gi>
              <n-card title="工作时长"> 卡片内容 </n-card>
            </n-gi>
            <n-gi>
              <n-card title="今天任务"> 卡片内容 </n-card>
            </n-gi>
          </n-grid>
        </n-layout-header>
        <n-layout-content content-style="padding: 24px;">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, h, Component } from 'vue'
import { useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { Desktop, CalendarClear, Briefcase } from '@vicons/ionicons5'
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuList: MenuOption[] = [
  {
    label: '工作台',
    key: '/',
    icon: renderIcon(Desktop)
  },
  {
    label: '日历表',
    key: 'calendar',
    icon: renderIcon(CalendarClear)
  },
  {
    label: '工具箱',
    key: 'toolbox',
    icon: renderIcon(Briefcase)
  }
]
export default defineComponent({
  setup () {
    const router = useRouter()
    const handleMenuClick = (key: string, item: MenuOption) => {
      // 根据key进行路由导航
      // console.log(key, item, router)
      router.push(key)
    }
    return {
      activeKey: ref<string | null>('calendar'),
      collapsed: ref(false),
      menuList,
      handleMenuClick
    }
  }
})
</script>
<style lang="less">
.container {
  position: relative;
  height: 100%;
}
.n-layout-header,
.n-layout-footer {
  // background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}
.n-layout-content {
  // background: rgba(128, 128, 128, 0.4);
}
.light-green {
  height: 50px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 50px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
