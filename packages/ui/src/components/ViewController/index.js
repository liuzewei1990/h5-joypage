const _ViewController = () => import(/* webpackChunkName: "work.ui" */ /* webpackPrefetch:true */ "./component.vue");

const ViewController = Object.assign(_ViewController, {
  install: (app) => {
    app.component("ViewController", _ViewController);
  }
});

export default ViewController;
