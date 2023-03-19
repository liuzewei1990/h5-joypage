// work专用
export { default as work } from "./work/index.js";
// omp专用
export { default as omp } from "./omp/index.js";
// 全局通用请求器
export { workAxios } from "./base/http.js";

import { workAxios } from "./base/http.js";
let isInstall = false;
const install = function (Vue) {
  if (isInstall) return;
  Vue.prototype["$workAxios"] = workAxios;
  isInstall = true;
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
