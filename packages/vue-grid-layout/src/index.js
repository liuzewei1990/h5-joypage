export { default as GridItem } from "./components/GridItem.vue";
export { default as GridLayout } from "./components/GridLayout.vue";

import GridItem from "./components/GridItem.vue";
import GridLayout from "./components/GridLayout.vue";

let installed = false;
const install = function (Vue) {
  if (installed) return;
  installed = true;
  Vue.component("GridItem", GridItem);
  Vue.component("GridLayout", GridLayout);
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };
