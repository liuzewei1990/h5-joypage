import Vue from "vue";
import App from "./App.vue";

import work from "@work/work";
Vue.use(work);

// import easytable from "@work/easytable";
// Vue.use(easytable);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
