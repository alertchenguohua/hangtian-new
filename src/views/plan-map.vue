<!--
 * @Description: 地图
-->
<template>
  <div :class="['plan-map', { 'full-screen': isFullScreen }]">
    <el-button
      class="full-btn"
      icon="el-icon-full-screen"
      type="primary"
      @click="fullScreen"
      >{{ isFullScreen ? "正常" : "全屏" }}</el-button
    >
    <iframe
      name="mapFrame"
      src="http://101.42.228.120:8092/nl/"
      style="width: 100%; height: 100%"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullScreen: false,
    };
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.isFullScreen = false;
      }
    });
  },
  sockets: {
    connect(data) {
      console.log("socket-连接成功---地图组件", data);
    },
    toMap(data) {
      console.log(data + "我是地图");
    },
  },
  methods: {
    fullScreen() {
      // this.$socket.emit(
      //   "fromMap",
      //   "Hi,服务端,这里是地图组件发来的数据!我全屏了哦～"
      // );
      this.isFullScreen = !this.isFullScreen;
    },
  },
};
</script>

<style lang="less" scoped>
.plan-map {
  width: 100%;
  height: 100%;
}
.full-screen {
  position: absolute;
  left: 0;
  top: 0;
}
.full-btn {
  position: absolute;
}
</style>
