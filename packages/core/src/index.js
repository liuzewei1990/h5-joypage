export * from "./Render.js";
export * as api from "./api/index.js";

import workUi from "@work/ui";
import workBus from "./mixins/workbus.js";
import Editor from "./Editor.vue";
import $mount from "./$mount.js";

import "flex.css";
import "./assets/iconfont/iconfont.css";

let isInstall = false;
const install = function (Vue) {
  if (isInstall) return;
  Vue.use(workUi);
  Vue.mixin(workBus);
  Vue.component(Editor.name, Editor);
  // $bootstrap 挂载实例
  Vue.prototype.$bootstrap = $mount;
  isInstall = true;
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
