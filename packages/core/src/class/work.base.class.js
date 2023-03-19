import * as api from "../api/index.js";
import App from "./index.js";
import { WorkClass, WorkViewClass, WorkComponentClass } from "./class.js";

/**
 * Work类
 */
// export class WorkClass extends Vue {
export default class WorkBase extends App {
  constructor(options = {}) {
    super();
    const { mode = "dev", loading = false } = options;

    this._initData({ _apiData: { pageTitle: "新建页面" } });
    this._initData({ mode, loading, state: {} });
  }

  // 获取work数据
  async getWorkData(workId) {
    try {
      if (!workId) {
        throw "缺少workId,需要在props中传入workId";
      }
      this.loading = true;
      const params = { code: workId };
      let data = await api.getWork(params);
      this._apiData = data;
      this.initWork(JSON.parse(data.pageInfo || "{}"));
      this.loading = false;
    } catch (error) {
      throw error;
    }
  }

  // 设置mode
  setMode(mode) {
    this.mode = mode; //这里做个枚举
  }

  initWork(pageInfo = {}) {
    this.state = new WorkClass(pageInfo);
    if (this.mode !== "render") this.initWorkView();
  }

  // 初始化一个work视图
  initWorkView() {
    if (this.state.views.length === 0) this.addWorkView();
  }

  // 添加一个work视图
  addWorkView() {
    const workView = new WorkViewClass();
    this.state.views.push(workView);
    this.state.activeViewId = workView.viewId;
    return workView;
  }

  // 删除一个work视图
  delWorkView(viewId) {
    let index = this.state.views.findIndex((item) => item.viewId === viewId);
    const del = this.state.views.splice(index, 1);
    if (viewId === this.state.activeViewId) {
      this.state.activeViewId = this.state.views[index === 0 ? 0 : --index].viewId;
    }
    return del;
  }

  // set一个work视图
  setWorkView(viewId) {
    this.state.activeViewId = viewId;
  }

  // 获取当前work视图
  getCurrWorkView() {
    const currView = this.state.views.find((item) => item.viewId === this.state.activeViewId);
    return currView;
  }

  // 获取当前workComponent
  getCurrWorkComponent(i) {
    const currView = this.getCurrWorkView();
    const workComponent = currView.elements.find((item) => item.i === i);
    return workComponent;
  }

  // 设置workComponent高度
  setWorkComponentHeight(i, h) {
    const workComponent = this.getCurrWorkComponent(i);
    workComponent.h = parseInt(h);
    window.gridLayout.dragEvent("dragend");
  }

  // 设置屏幕剩余空间高度
  setFullHeight(i) {
    const rect = document.querySelector("#" + i).getBoundingClientRect();
    this.setWorkComponentHeight(i, window.innerHeight - rect.top - 2);
  }

  isHasMode(list = []) {
    return !!list.find((item) => item === this.mode);
  }
}
