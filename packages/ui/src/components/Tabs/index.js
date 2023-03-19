const _Tabs = () => import(/* webpackChunkName: "work.ui" */ /* webpackPrefetch:true */ "./component.vue");

const Tabs = Object.assign(_Tabs, {
  install: (app) => {
    app.component("Tabs", _Tabs);
  }
});

export default Tabs;
