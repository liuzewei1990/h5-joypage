export { default as createWorkApp } from "./createWorkApp.js";
export { default as loadAppConfig } from "./loadAppConfig.js";
export { default as Base } from "./class/base.class";

import createWorkApp from "./createWorkApp.js";
import loadAppConfig from "./loadAppConfig.js";
import "flex.css";

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  Vue.prototype["$loadAppConfig"] = loadAppConfig;
  Vue.component("WorkApp", createWorkApp());
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
