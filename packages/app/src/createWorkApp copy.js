import AppLayout from "./Layout.vue";
import AppState from "./class/app.class.js";
import { func, number, oneOfType, string } from "vue-types";
import Vue from "vue";

/**
 * 创建work 全局store
 * @returns Work Component
 */
export default function createWorkApp() {
  const components = { AppLayout };
  const app = new AppState();
  const provide = { app };
  const props = {
    projectId: oneOfType[(string(), number())]
  };
  const state = Vue.observable({ loaded: false });
  const render = function (h) {
    return (
      state.loaded && (
        <app-layout>
          {/* <keep-alive> */}
          {this.$router && <router-view />}
          {/* </keep-alive> */}
        </app-layout>
      )
    );
  };
  const created = async function () {
    if (!this.projectId) {
      throw new Error("缺少projectId！");
    }
    try {
      const projectConfig = await app.getProjectConfig(this.projectId);
      state.loaded = true;

      /**
       * 当访问/10000/work 根路径时，重定到项目配置中的默认首页
       */
      if (!this.$router) return;
      let redirectPath = `/${this.$route.params.projectId}/work/${app.defaultHome}`;
      // 找到 /:projectId/work 根路由配置，设置defaultHome重定向地址
      this.$route.matched[0].redirect = redirectPath;
      // 如果恰好访问的是work根路由，将其重定向到defaultHome地址
      if (this.$route.name === "work") {
        this.$router.replace(redirectPath);
      }
    } catch (error) {
      this.$message.error("App配置加载失败！");
    }
  };
  return { components, provide, props, render, created };
}
