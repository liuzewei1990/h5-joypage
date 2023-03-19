import Vue from "vue";
import App from "./App.vue";

import appa from "./index";
Vue.use(appa);

import work from "@work/work";
Vue.use(work);

import loadAppConfig from "./loadAppConfig.js";

Vue.config.productionTip = false;

async function bootstrap() {
  const app = new Vue({
    render: (h) => h(App)
  });

  const appId = location.href.split("#/")[1].split("/")[0];
  await loadAppConfig("10001");
  app.$bootstrap("#app");
}

bootstrap();
