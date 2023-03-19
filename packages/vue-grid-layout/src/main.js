import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

import dataCache from "@work/data-cache";
Vue.use(dataCache, { autoClear: false });

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
