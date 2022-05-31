import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";
// import md5 from "js-md5";

import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "ws://16q20w2155.qicp.vip:40032/jeecg-boot/websocket/1", // process.env.VUE_APP_BASE_WS,
  })
);

Vue.use(ElementUI);

import api from "./api";
Vue.use(api);
// 注册EventBus
Vue.prototype.$Bus = new Vue();

Vue.config.productionTip = false;
// Vue.prototype.$md5 = md5;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
