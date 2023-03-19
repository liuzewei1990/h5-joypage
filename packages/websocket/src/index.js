import Observer from "./observer.class";
import mixin from "./mixin";
import emitter from "./emitter";
import vmMap from "./vmMap";
import UseWebsocket from "./UseWebsocket.vue";
import SocketStateMessageTip from "./socketStateMessageTip";
window.emitter = emitter;
window.vmMap = vmMap;

let isInstall = false;
const install = function (Vue, connection, opts = {}) {
  if (isInstall) return;
  Vue.component("use-websocket", UseWebsocket);
  // 用于收集使用websocket的组件
  Vue.mixin(mixin);
  let observer = null;

  Vue.prototype.$connectWebsocket = (connectionUrl = connection, connectionOpts = opts) => {
    if (!connectionUrl) {
      throw new Error("[websocket] cannot locate connectionUrl");
    }
    connectionOpts.onmessage = (event) => {
      let resData = null;
      try {
        resData = JSON.parse(event.data);
        const vm = resData.uid && vmMap.get(resData.uid);
        const onmessage = vm && vm.$options.sockets.onmessage;
        onmessage && onmessage.call(vm, resData);
      } catch (error) {
        console.error("❌ websocket返回结果解析错误！");
        throw error;
      }
    };
    connectionOpts.onopen = (event) => {
      const listeners = emitter.listeners.get("onopen") || [];
      listeners.forEach((listener) => {
        const vm = listener.vm;
        vm._websocketCurrentSendParams && vm.$socketSend && vm.$socketSend(vm._websocketCurrentSendParams);
        listener.callback.call(listener.vm, event);
      });
    };
    connectionOpts.onclose = (event) => {
      const listeners = emitter.listeners.get("onclose") || [];
      listeners.forEach((listener) => {
        listener.callback.call(listener.vm, event);
      });
    };
    connectionOpts.onerror = (event) => {
      const listeners = emitter.listeners.get("onerror") || [];
      listeners.forEach((listener) => {
        listener.callback.call(listener.vm, event);
      });
    };

    connectionOpts.reconnectionDelay = connectionOpts.reconnectionDelay + 2000;

    observer = new Observer(connectionUrl, connectionOpts, (wsInstance) => {
      // 每次断线重连后都会有新的wsInstance返回
      Vue.prototype.$socket = wsInstance;
    });

    Vue.prototype.$socket = observer.WebSocket;

    window.socketObserver = observer;
  };

  Vue.prototype.$disconnectWebsocket = () => {
    if (observer && observer.reconnection) {
      observer.reconnection = false;
      clearTimeout(observer.reconnectTimeoutId);
    }

    if (observer && observer.isHeartCheck) {
      clearTimeout(observer.heartCheckTimeoutId);
      clearTimeout(observer.heartCheckServerOverTimeoutId);
    }

    if (Vue.prototype.$socket) {
      Vue.prototype.$socket.close(3001);
      delete Vue.prototype.$socket;
    }

    observer = null;
  };

  // 自动链接
  Vue.prototype.$connectWebsocket();

  setTimeout(() => {
    // 延迟手动收集
    if (process.env.NODE_ENV === "developm1ent") {
      const messageTip = new SocketStateMessageTip({ reconnectionDelay: opts.reconnectionDelay });
      emitter.addListener("onopen", messageTip.onopen, messageTip);
      emitter.addListener("onclose", messageTip.onclose, messageTip);
      emitter.addListener("onerror", messageTip.onerror, messageTip);
    }
  }, opts.heartCheckTime);

  isInstall = true;
};

// if (process.env.NODE_ENV !== "development" && typeof window !== "undefined" && window.Vue) {
//   install(window.Vue);
// }

export default { install };
