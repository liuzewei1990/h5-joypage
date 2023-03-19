import * as api from "../api/index.js";
import WorkBase from "./work.base.class.js";
import { WorkClass, WorkViewClass, WorkComponentClass } from "./work.class.js";

export default class WorkEditor extends WorkBase {
  constructor(options = {}) {
    super(options);
    const { componentGroupList } = options;
    this._initData({
      saveLoading: false,
      componentMetaList: [
        {
          name: "基础",
          componentGroupList: [
            {
              title: "示例容器",
              items: [
                {
                  icon: "http://api.hedpy.cn:8080/comps/assets/images/tabs.png",
                  text: "视图导航",
                  coName: "WorkTabs"
                }
              ]
            }
          ]
        }
      ],
      componentGroupList: componentGroupList
    });
  }

  // 保存work json
  async saveJson() {
    try {
      this.saveLoading = true;
      const copyState = JSON.parse(JSON.stringify(this.state));
      copyState.views = this.handleWorkComponentJson(copyState.views);
      this._apiData.pageInfo = JSON.stringify(copyState);
      const params = { ...this._apiData };
      const { Datas } = await api.putWork(params);
      this.saveLoading = false;
    } catch (error) {
      this.saveLoading = false;
      throw error;
    }
  }

  handleWorkComponentJson(views = []) {
    return views.map((item) => {
      item.elements.map((item) => {
        if (item.fixedHeight === true) {
          item.h = 0;
        }
        // 将编辑状态置为初始值:false
        item.isResizable = false;
        return item;
      });

      return item;
    });
  }

  // 在当前work视图中添加一个work组件
  addWorkComponent(options = {}) {
    const currView = this.getCurrWorkView();
    const workCo = new WorkComponentClass({
      // x: (currView.elements.length * 2) % 144,
      // y: currView.elements.length,
      x: 0,
      y: currView.elements.reduce((total, item) => (total += item.h), 0),
      coName: options.coName
    });
    workCo["_new_"] = true;
    currView.elements.push(workCo);
    // const el = document.querySelector("." + workCo.i);
    //自动适应高度  vue和grid-item都是异步渲染，所以这里必须创建一个异步循环
    // setTimeout(() => {
    //   this.setElementHeight(workCo.i);
    // }, 50);
    return workCo;
  }

  // 在当前work视图中删除一个work组件
  delWorkComponent(i) {
    const currView = this.getCurrWorkView();
    const index = currView.elements.findIndex((item) => item.i === i);
    return currView.elements.splice(index, 1);
  }

  // 将一个workComponent 改为编辑状态
  resizableOpen(i) {
    const currView = this.getCurrWorkView();
    this.resizableCloseAll();
    let workComponent = currView.elements.find((item) => item.i === i);
    workComponent.isResizable = true;
  }

  // 将所有worlComponent 复位编辑状态
  resizableCloseAll() {
    const currView = this.getCurrWorkView();
    for (const workComponent of currView.elements) {
      workComponent.isResizable = false;
    }
  }

  // 锁定/解锁一个workComponent
  lockCompo(i) {
    const currView = this.getCurrWorkView();
    let workComponent = currView.elements.find((item) => item.i === i);
    workComponent.static = !workComponent.static;
  }

  fullscreen(i) {
    const workComponent = this.getCurrWorkComponent(i);
    workComponent.fixedHeight = !workComponent.fixedHeight;
    if (workComponent.fixedHeight) {
      this.setFullHeight(i);
    } else {
      this.setElementHeight(i);
    }
  }

  // 设置view tab的标题
  setWorkViewTitle(viewId, title) {
    let view = this.state.views.find((item) => item.viewId === viewId);
    view.title = String(title);
  }

  // 当组件添加到舞台中时，自适应组件元素的高度
  setElementHeight(i) {
    const el = document.querySelector("." + i);
    const elRect = el.getBoundingClientRect();
    const h = elRect.height ? elRect.height : 200; // 没有高度默认 300
    this.setWorkComponentHeight(i, h);
  }

  // 添加云组件包模块
  setComponentGroupList(name, componentGroupList = []) {
    this.assert(name, "需要指定一个组件包的名字");
    this.assert(componentGroupList.length > 0, "组件meta信息列表不可为空");
    name = name.slice(0, 4);
    const compoMeta = { name, componentGroupList };
    this.componentMetaList.push(compoMeta);
  }

  // 添加本地组件
  setComponentMetaListLocal(componentGroupList = []) {
    this.componentMetaListLocal = componentGroupList;
  }

  changezIndex(i, fo) {
    const currView = this.getCurrWorkView();
    const elements = currView.elements;
    const workComponent = this.getCurrWorkComponent(i);
    let index = currView.elements.indexOf(workComponent);
    if (fo === "++") {
      if (index == elements.length - 1) return;
      elements.splice(index + 1, 1, ...elements.splice(index, 1, elements[index + 1]));

      // this.$set(this.layout, index, this.layout[(index += 1)]);
      // this.$set(this.layout, index, item);
    } else {
      if (index == 0) return;
      elements.splice(index - 1, 1, ...elements.splice(index, 1, elements[index - 1]));

      // this.$set(this.layout, index, this.layout[(index -= 1)]);
      // this.$set(this.layout, index, item);
    }

    console.log(elements);
  }
}
