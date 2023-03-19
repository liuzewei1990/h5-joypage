import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

import work from "./index";
Vue.use(work);

import workUi from "@work/ui";
Vue.use(workUi);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
