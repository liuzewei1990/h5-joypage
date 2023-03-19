import work from "@work/work";
import workUi from "@work/ui";
import Editor from "./Editor.vue";
import $mount from "./$mount.js";

import "flex.css";

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  // 依赖work包
  Vue.use(work);
  // 依赖内置组件
  Vue.use(workUi);
  // 注册全局编辑器组件
  Vue.component(Editor.name, Editor);
  // $bootstrap 挂载实例
  Vue.prototype.$bootstrap = $mount;
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
