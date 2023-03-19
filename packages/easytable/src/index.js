import "vue-easytable/libs/theme-default/index.css";
// import VueEasytable from "vue-easytable";

const VueEasytable = () => import(/* webpackChunkName: "async" */ /* webpackPrefetch:true */ "vue-easytable");

const install = function (Vue) {
  if (install.isinstalled) return;
  install.isinstalled = true;
  Vue.use(VueEasytable());
};

if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default { install };
