import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css/normalize.css";
import "./assets/tab.css";
import md5 from "js-md5";
Vue.use(ElementUI);

import api from "./api";
Vue.use(api);
// 注册EventBus
Vue.prototype.$Bus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
