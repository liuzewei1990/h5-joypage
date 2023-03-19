export { default as config } from "./server.config.js";

import config from "./server.config.js";
let installed = false;
const install = function (Vue) {
  if (installed) return;
  installed = true;
  Vue.prototype["@config"] = config;
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
