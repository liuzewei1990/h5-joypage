const _WebComponent = () => import(/* webpackChunkName: "work.ui" */ /* webpackPrefetch:true */ "./component.vue");

const WebComponent = Object.assign(_WebComponent, {
  install: (app) => {
    app.component("WebComponent", _WebComponent);
  }
});

export default WebComponent;
