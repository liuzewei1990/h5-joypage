const _RectComponent = () => import(/* webpackChunkName: "work.ui" */ /* webpackPrefetch:true */ "./component.vue");

const RectComponent = Object.assign(_RectComponent, {
  install: (app) => {
    app.component("RectComponent", _RectComponent);
  }
});

export default RectComponent;
