import VueRouter from "vue-router";
import Vue from "vue";
import Edit from "../views/Edit.vue";
import Render from "../views/Render.vue";
Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Edit
    },
    {
      path: "/render",
      component: Render
    }
  ]
});
