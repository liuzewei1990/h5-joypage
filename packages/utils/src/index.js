export * as base from "./base.js";

// json相关
export * as json from "./json.js";
// 加载相关
export * as load from "./load.js";
// 队列相关
export * as queue from "./queue.js";
// 本地储存
export { default as localStorage } from "./localStorage.js";
export { default as sessionStorage } from "./sessionStorage.js";

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
