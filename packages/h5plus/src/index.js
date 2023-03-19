export { config } from "@work/config";
export * as service from "@work/service";
export * as store from "@work/store";
export * as utils from "@work/utils";
export * as websocket from "@work/websocket";
export * as editor from "@work/editor";
export * as work from "@work/work";

import pkg from "../package.json";
import chalk from "@alita/chalk";
import buildTime from "../build-time.js";
window.alitadebug = true;
chalk.hello("@work/work", pkg.version);
if (process.env.NODE_ENV !== "development2222") {
  chalk.info("@work/work build time: " + buildTime);
}

import conf, { config } from "@work/config";
import service from "@work/service";
import store from "@work/store";
import utils from "@work/utils";
import dataCache from "@work/data-cache";
import websocket from "@work/websocket";
import editor from "@work/editor";

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  Vue.use(conf);
  Vue.use(service);
  Vue.use(store);
  Vue.use(utils);
  Vue.use(dataCache);
  Vue.use(websocket, config.websocketUrl, config.websocketConfig);
  Vue.use(editor);
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default { install };

// 兼容老版本 后期移除掉
import * as services from "@work/service";
window.workBase = { service: services };
