const _Menu = () => import(/* webpackChunkName: "work.ui" */ /* webpackPrefetch:true */ "./component.vue");

const Menu = Object.assign(_Menu, {
  install: (app) => {
    app.component("Menu", _Menu);
  }
});

export default Menu;
