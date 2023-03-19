import Vue from "vue";
import App from "./index.js";

class ComponentMeta extends App {
  constructor() {
    super();

    this._initData({
      componentMetaList: [
        {
          name: "基础",
          componentGroupList: [
            {
              title: "导航类",
              items: [
                {
                  icon: require("./meta-images/tabs.png"),
                  text: "导航",
                  coName: "WorkTabs"
                }
              ]
            },
            {
              title: "媒体类",
              items: [
                {
                  icon: require("./meta-images/img.png"),
                  text: "矩形",
                  coName: "WorkRectComponent"
                },
                {
                  icon: require("./meta-images/shape1.png"),
                  text: "图片",
                  coName: "WorkImage"
                }
              ]
            }
          ]
        }
      ],
      componentMetaListLocal: {}
    });
  }
  setComponentGroupList(name, componentGroupList = []) {
    this.assert(name, "需要指定一个组件包的名字");
    this.assert(componentGroupList.length > 0, "组件meta信息列表不可为空");
    name = name.slice(0, 4);
    const compoMeta = { name, componentGroupList };
    this.componentMetaList.push(compoMeta);
  }

  setComponentMetaListLocal(componentGroupList = []) {
    this.componentMetaListLocal = componentGroupList;
  }
}

const workComponentMeta = new ComponentMeta();
window.workComponentMeta = workComponentMeta;
export default workComponentMeta;
