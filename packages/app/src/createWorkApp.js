import AppLayout from "./Layout.vue";
import AppState from "./class/app.class.js";
import { func, number, oneOfType, string } from "vue-types";
import Vue from "vue";
import * as utils from "@work/utils";

/**
 * 创建work 全局store
 * @returns Work Component
 */
export default function createWorkApp() {
  const components = { AppLayout };
  const app = new AppState();
  const provide = { app };

  const render = function (h) {
    return (
      app.loaded && (
        <app-layout>
          {/* <keep-alive> */}
          {this.$router && <router-view />}
          {/* </keep-alive> */}
        </app-layout>
      )
    );
  };

  const created = async function () {
    const appConfig = utils.sessionStorage.get("app_config");
    if (appConfig) {
      app.init(appConfig);
      app.loaded = true;
    } else {
      console.error("未找到app_config");
    }
  };
  return { components, provide, render, created };
}
