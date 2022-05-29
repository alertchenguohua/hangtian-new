<!--
 * @Author: @@@
 * @Date: 2022-05-25 09:43:18
 * @Description: 页面整体布局
-->
<template>
  <div class="console-layout">
    <!-- 左侧菜单 -->
    <AppMenu class="menu" />
    <div class="main-layout">
      <!-- 顶部信息 -->
      <AppHeader />
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from "../components/appMenu.vue"; // 左侧菜单
import AppHeader from "../components/appHeader.vue"; // 顶部信息
export default {
  name: "Layout",
  components: {
    AppMenu,
    AppHeader,
  },
};
</script>
<style lang="less" scoped>
.console-layout {
  min-width: 1366px;
  display: flex;
  background-color: #f0f2f5;
  height: 100%;
  .menu {
    flex-shrink: 0;
  }
  .main-layout {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .router-view {
      flex: 1;
      box-sizing: border-box;
      padding: 18px;
      overflow: auto;
    }
  }
}
</style>
