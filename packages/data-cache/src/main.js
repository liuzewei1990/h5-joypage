import Vue from "vue";
import App from "./App.vue";

import dataCache from "./index";
Vue.use(dataCache);

Vue.config.productionTip = false;

const app = new Vue({
  render: (h) => h(App)
});

app.$mount();
