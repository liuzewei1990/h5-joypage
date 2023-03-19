import { EventEmitter } from "events";
import { string, oneOfType, number, object } from "vue-types";
import Work from "./work/Work/index.vue";
import WorkRender from "./class/work.render.class.js";

/**
 * 全局事件
 */
export const workbus = new EventEmitter();

/**
 * 渲染work
 */
export const renderWork = function () {
  const work = new WorkRender({ mode: "render" });
  const components = { Work };
  const provide = { work: work };
  const props = { workId: oneOfType[(string(), number())] };
  const render = function (h) {
    return work.loading === false && <Work></Work>;
  };
  const created = function () {
    // console.log("Work :>> created", this.workId);
    work.getWorkData(this.workId);
  };
  const activated = function () {
    // console.log("Work :>> activated");
  };

  /**
   * 在离开页面后，移除所有组件中通过workbus.page注册的事件监听
   * 通过workbus.page.removeAllListeners来实现
   */
  const deactivated = function () {
    work.removeAllListeners();
  };
  const destroyed = function () {
    work.removeAllListeners();
  };

  return { components, props, provide, render, created, activated, deactivated, destroyed };
};

/**
 * 创建一个Work页面 用于管理event bus
 * @returns Work Component
 */
let i = 0;
export const createWorkPage = function () {
  const name = "work-page-" + i++;
  const bus = new EventEmitter();
  bus.name = name;
  bus.setMaxListeners(20);

  // 组件选项
  const components = {};
  const provide = {
    inject: {
      workbus: {
        form: "workbus",
        default: workbus
      }
    },
    provide() {
      const workbus = this.workbus;
      workbus["page"] = bus;
      return { workbus };
    }
  };
  const created = function () {
    // console.log("CreateWorkPage :>> ", "created");
  };
  const activated = function () {
    // console.log("CreateWorkPage :>> ", "activated");
  };
  /**
   * 在离开页面后，移除所有组件中通过workbus.page注册的事件监听
   * 通过workbus.page.removeAllListeners来实现
   */
  const deactivated = function () {
    this.workbus.page.removeAllListeners();
  };
  const destroyed = function () {
    this.workbus.page.removeAllListeners();
  };

  const render = function (h) {
    return h("div", {}, this.$slots.default);
  };

  return { name, components, ...provide, created, activated, deactivated, destroyed, render };
};
