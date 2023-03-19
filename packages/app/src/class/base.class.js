import Vue from "vue";
// import { EventEmitter } from "events";

export default class Base extends Vue {
  constructor(options = {}) {
    super();
    this.name = "workbase";
  }

  _initData(data = {}) {
    const state = Vue.observable(data);
    for (const key in state) {
      Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        set(value) {
          state[key] = value;
        },
        get() {
          return state[key];
        }
      });
    }
  }

  assert(condition, msg) {
    if (!condition) throw new Error(`[work] ${msg}`);
  }
}
