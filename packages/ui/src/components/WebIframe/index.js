const _WebIframe = () => import(/* webpackChunkName: "work.ui" */ /* webpackPrefetch:true */ "./component.vue");

const WebIframe = Object.assign(_WebIframe, {
  install: (app) => {
    app.component("WebIframe", _WebIframe);
  }
});

export default WebIframe;
