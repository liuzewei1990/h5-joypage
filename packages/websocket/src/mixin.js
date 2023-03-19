import emitter from "./emitter";
import vmMap from "./vmMap";
import * as utils from "./utils";

/**
 * 收集websocket组件，统一处理
 */

export default {
  beforeCreate() {
    const vm = this;
    if (!this.$options.sockets) return;

    vm._isWebSocketComponent = !!this.$options.sockets;
    vm._webscoketUID = utils.guid("work-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    vm._websocketCurrentSendParams = null;

    // 收集到map中
    vmMap.set(vm._webscoketUID, vm);

    vm.$socketSend = function (params = {}) {
      if (Object.prototype.toString.call(params) !== "[object Object]") throw new Error("[websocket] $socketSend 参数必须是json对象");
      params["uid"] = vm._webscoketUID;
      params["work"] = true;
      vm._websocketCurrentSendParams = params;
      try {
        vm.$socket.sendObj(params);
      } catch (error) {
        console.error("请检查websocket是否已链接！", error);
      }
    };

    const orginScketsOption = vm.$options.sockets;
    vm.$options.sockets = new Proxy(
      {},
      {
        set(target, key, value) {
          emitter.addListener(key, value, vm);
          target[key] = value;
          return true;
        },
        deleteProperty(target, key) {
          emitter.removeListener(key, vm.$options.sockets[key], vm);
          delete target.key;
          return true;
        }
      }
    );

    Object.keys(orginScketsOption).forEach((key) => {
      vm.$options.sockets[key] = orginScketsOption[key];
    });
  },
  beforeDestroy() {
    const vm = this;
    if (!this.$options.sockets) return;

    const sockets = vm.$options.sockets;
    Object.keys(sockets).forEach((key) => {
      delete vm.$options.sockets[key];
    });
    vmMap.delete(vm._webscoketUID);

    if (vm._websocketCurrentSendParams !== null) {
      vm.$socketSend({ type: "close" });
    }
  }
};
