import Vue from "vue";
import App from "./App.vue";

import * as work from "@work/work";

Vue.use(work.default);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$bootstrap("#app");
