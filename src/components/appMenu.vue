<template>
  <div class="app-menu">
    <div class="menu-box">
      <div class="meun-title">控制系统</div>
      <el-menu
        active-text-color="#1E90FF"
        hover-bg-color="rgba(30, 144, 255, .1)"
        :default-active="sidebarDefaultActive"
        :unique-opened="true"
        ref="conMenu"
      >
        <template v-for="value in treeData">
          <el-menu-item
            v-if="!value.hidden"
            :index="value.path"
            :key="value.title"
            @click="handleClick(value.path)"
          >
            <i :class="value.icon" />
            <span slot="title">{{ value.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarDefaultActive: "live-broadcast-manager",
      treeData: [
        // {
        //   path: "",
        //   title: "态势展示",
        //   icon: "",
        // },
        // {
        //   path: "content-square-manager",
        //   title: "状态监测",
        //   icon: "iconfont nrnrgc",
        // },
        {
          path: "planControl",
          title: "规划控制",
          icon: "el-icon-setting",
        },
        // {
        //   path: "planControl",
        //   title: "运行记录",
        //   icon: "",
        // },
        // {
        //   path: "planControl",
        //   title: "系统管理",
        //   icon: "iconfont nrzbgl",
        // },
      ],
    };
  },
  watch: {
    $route: {
      handler: function (val) {
        const sidebarDefaultActive = val.path.replace("/", "");
        this.treeData.some((item) => {
          if (
            item.path === sidebarDefaultActive ||
            (item.children && item.children.includes(sidebarDefaultActive))
          ) {
            this.sidebarDefaultActive = item.path;
            return;
          }
        });
      },
      immediate: true,
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    // 左侧菜单点击
    handleClick(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.app-menu {
  width: 200px;
  background: #fff;
  .meun-title {
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    background: #409eff;
  }
  /deep/ .el-menu-item {
    height: 50px;
    padding: 0 24px !important;
    border-radius: 0;
    box-sizing: border-box;
    font-weight: 400;
    position: relative;
    i {
      margin-right: 5px;
    }
    &.is-active {
      background: rgba(30, 144, 255, 0.1);
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: #1e90ff;
      }
    }
  }
}
</style>
