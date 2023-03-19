export { default as userInfo } from "./userInfo.js";

import userInfo from "./userInfo.js";

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  Vue.prototype["$userInfo"] = userInfo;
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
