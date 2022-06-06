import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";

// import VueSocketIO from "vue-socket.io";
// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: "ws://127.0.0.1:1024",
//   })
// );

Vue.use(ElementUI);

import api from "./api";
Vue.use(api);
// 注册EventBus
Vue.prototype.$Bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
