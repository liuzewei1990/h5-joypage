export { default as Work } from "./components/Work/index.vue";
export { default as WorkRender } from "./class/work.render.class";
export { default as WorkEditor } from "./class/work.editor.class";
export { default as createWork } from "./components/index.js";
export { renderWork, createWorkPage } from "./components/render.js";

import "flex.css";
import "./assets/iconfont/iconfont.css";
import eventbus from "./event-bus/index.js";

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  // 混入work里组件之间通信插件
  Vue.mixin(eventbus);
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
