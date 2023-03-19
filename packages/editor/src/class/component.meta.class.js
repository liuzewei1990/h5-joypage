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
              title: "示例容器",
              items: [
                {
                  icon: "http://api.hedpy.cn:8080/comps/assets/images/tabs.png",
                  text: "导航",
                  coName: "WorkTabs"
                },
                {
                  icon: "",
                  text: "矩形",
                  coName: "WorkRectComponent"
                },
                {
                  icon: "",
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
