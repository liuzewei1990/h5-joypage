import Vue from "vue";
import App from "./App.vue";

import h5plus from "@work/h5plus";
Vue.use(h5plus);

// import easytable from "@work/easytable";
// Vue.use(easytable);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");
