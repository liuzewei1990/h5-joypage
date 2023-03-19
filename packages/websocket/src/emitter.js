// import vmMap from "./vmMap";

class Emitter {
  constructor() {
    this.listeners = new Map();
  }

  addListener(label, callback, vm) {
    if (typeof callback === "function") {
      this.listeners.has(label) || this.listeners.set(label, []);
      this.listeners.get(label).push({ callback, vm });
      return true;
    }
    return false;
  }

  removeListener(label, callback, vm) {
    const listeners = this.listeners.get(label);
    let index;

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        if (typeof listener.callback === "function" && listener.callback === callback && listener.vm === vm) {
          i = index;
        }
        return i;
      }, -1);

      if (index > -1) {
        listeners.splice(index, 1);
        this.listeners.set(label, listeners);
        return true;
      }
    }
    return false;
  }

  // emit(label, event) {
  //   // onclose onerror onopen 广播所有
  //   const listeners = this.listeners.get(label) || [];

  //   // onmessage 只广播服务端当前返回uid对应的组件
  //   if (label === "onmessage") {
  //     let resData = null;
  //     try {
  //       resData = JSON.parse(event.data);
  //       const vm = resData.uid && vmMap.get(resData.uid);
  //       const onmessage = vm && vm.$options.sockets.onmessage;
  //       onmessage && onmessage.call(vm, resData);
  //     } catch (error) {
  //       resData = event.data;
  //       listeners.forEach((listener) => {
  //         listener.callback.call(listener.vm, resData);
  //       });
  //     }
  //     return;
  //   }

  //   if (label === "onopen") {
  //     listeners.forEach((listener) => {
  //       const vm = listener.vm;
  //       vm._websocketCurrentSendParams && vm.$socketSend && vm.$socketSend(vm._websocketCurrentSendParams);
  //       listener.callback.call(listener.vm, event);
  //     });
  //   } else {
  //     listeners.forEach((listener) => {
  //       listener.callback.call(listener.vm, event);
  //     });
  //   }
  // }
}

export default new Emitter();
