/**
 * 用于work组件之间通信
 * 依赖：work实例
 * 选项中使用：
 * inject:['work']
 * on:{
 *  ["eCharts:getData"]() {
      this.updataChartApiData();
    }
 * }
  
   触发：调用 this.work.emit("eCharts:getData")
 */

function ons(on = {}) {
  // 防止重复注册开关
  if (this.__isBus__) return;
  for (const key in on) {
    this["__" + key + "__"] = on[key].bind(this);
    this.__work__.on(key, this["__" + key + "__"]);
  }
  this.__isBus__ = true;
}

function offs(on = {}) {
  // 防止重复解绑开关
  if (!this.__isBus__) return;
  for (const key in on) {
    this.__work__.off(key, this["__" + key + "__"]);
  }
  this.__isBus__ = false;
}

function isObj(target) {
  return Object.prototype.toString.call(target) === "[object Object]";
}

export default {
  inject: {
    __work__: { from: "work", default: {} }
  },
  beforeCreate() {
    const on = this.$options.on;
    isObj(on) && (this.__isBus__ = false);
  },
  mounted() {
    const on = this.$options.on;
    isObj(on) && ons.call(this, on);
  },
  destroyed() {
    const on = this.$options.on;
    isObj(on) && offs.call(this, on);
  },

  // keep-alive
  activated() {
    const on = this.$options.on;
    isObj(on) && ons.call(this, on);
  },
  deactivated() {
    const on = this.$options.on;
    isObj(on) && offs.call(this, on);
  }
};
