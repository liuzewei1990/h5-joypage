import Vue from "vue";
import { object } from "vue-types";

export default class BaseAttr {
  constructor() {
    // this.__observerData = object().def({});
  }

  getFormData() {
    let formData = {};
    for (const key in this) {
      if (this[key].default !== undefined) {
        let defaultVal = this[key].default;
        formData[key] = typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    }
    return formData;
  }

  /**
   * 导出指定的computed，为响应式
   * @param {String} prop props名称
   * @returns computed
   */
  mapComputed(prop) {
    return {
      get() {
        return this.__observerData[prop];
      },
      set(val) {
        Vue.set(this.__observerData, prop, val);
      }
    };
  }

  /**
   * 导出指定的多个computed
   * @param {Array} props props名称
   * @returns computeds
   */
  mapComputeds(props = []) {
    const computed = {};
    props.forEach((prop) => {
      computed[prop] = this.mapComputed(prop);
    });
    return computed;
  }

  /**
   * 将props属性映射到computed计算属性
   * @param {Object} map 要映射的key:value
   * @returns stateMap
   */
  mapProps(map = {}) {
    let state = {};
    for (const key in map) {
      if (key === map[key]) throw new Error("props属性映射到computed不能重名！");
      state[key] = this.mapComputed(map[key]);
    }
    return state;
  }
}
