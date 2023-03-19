/**
 * Observer类，支持websocket断线自动重连、心跳检测、vuex
 */

export default class {
  constructor(connectionUrl, opts = {}, setwsInstanceFn = (wsInstance) => {}) {
    const {
      protocol = "",
      format = "",
      reconnection = false,
      reconnectionAttempts = Infinity,
      reconnectionDelay = 1000,
      passToStoreHandler = false,
      isHeartCheck = false,
      heartMessage = {},
      heartCheckTime = 1000 * 30,
      heartCheckServerOverTime = 1000 * 10,
      onmessage = null,
      onopen = null,
      onclose = null,
      onerror = null
    } = opts;

    if (connectionUrl.startsWith("//")) {
      const scheme = window.location.protocol === "https:" ? "wss" : "ws";
      connectionUrl = `${scheme}:${connectionUrl}`;
    }

    this.WebSocket = null;
    this.connectionUrl = connectionUrl;
    this.protocol = protocol;
    this.format = format && format.toLowerCase();
    // 重连配置
    this.reconnection = reconnection;
    this.reconnectionAttempts = reconnectionAttempts;
    this.reconnectionDelay = reconnectionDelay;
    this.reconnectTimeoutId = 0;
    this.reconnectionCount = 0;
    this.passToStoreHandler = passToStoreHandler;
    // 心跳配置
    this.isHeartCheck = isHeartCheck;
    this.heartMessage = heartMessage;
    this.heartCheckTime = heartCheckTime;
    this.heartCheckServerOverTime = heartCheckServerOverTime; // 服务器超时时间
    this.heartCheckTimeoutId = null;
    this.heartCheckServerOverTimeoutId = null;
    // 更新wsInstance实例函数
    this.setwsInstanceFn = setwsInstanceFn;
    this.onmessage = onmessage;
    this.onopen = onopen;
    this.onclose = onclose;
    this.onerror = onerror;

    // this._cacheSendMessageList = new Set();

    this.connect();
    this.onEvent();

    if (opts.store) {
      this.store = opts.store;
    }
    if (opts.mutations) {
      this.mutations = opts.mutations;
    }
  }

  connect() {
    this.WebSocket = this.protocol === "" ? new WebSocket(this.connectionUrl) : new WebSocket(this.connectionUrl, this.protocol);

    // const orginSend = this.WebSocket.send;
    // this.WebSocket.send = (...args) => {
    //   console.log("readyState:", this.WebSocket.readyState);
    //   if (this.WebSocket.readyState === 1) {
    //     orginSend.call(this.WebSocket, ...args);
    //   } else {
    //     // this.WebSocket.close();
    //     console.log("%c info :【websocket】 参数:" + { ...args } + "send fail", "color:red");
    //     // this._cacheSendMessageList.add(...args);
    //   }
    // };
    if (this.format === "json") {
      if (!("sendObj" in this.WebSocket)) {
        this.WebSocket.sendObj = (obj) => this.WebSocket.send(JSON.stringify(obj));
      }
    }

    return this.WebSocket;
  }

  reconnect() {
    if (this.reconnectionCount <= this.reconnectionAttempts) {
      this.reconnectionCount++;
      clearTimeout(this.reconnectTimeoutId);

      this.reconnectTimeoutId = setTimeout(() => {
        if (this.store) {
          this.passToStore("SOCKET_RECONNECT", this.reconnectionCount);
        }

        this.connect();
        this.onEvent();
      }, this.reconnectionDelay);
    } else {
      if (this.store) {
        this.passToStore("SOCKET_RECONNECT_ERROR", true);
      }
    }
  }

  onEvent() {
    ["onmessage", "onclose", "onerror", "onopen"].forEach((eventType) => {
      this.WebSocket[eventType] = (event) => {
        if (this.store) {
          this.passToStore("SOCKET_" + eventType, event);
        }

        if (eventType === "onmessage" && this.isHeartCheck) {
          this.startHeartCheck();
        }
        if (eventType === "onopen" && this.isHeartCheck) {
          this.startHeartCheck();
        }

        if (eventType === "onopen" && this.reconnection) {
          typeof this.setwsInstanceFn === "function" && this.setwsInstanceFn(event.currentTarget);
          this.reconnectionCount = 0;
        }

        // 自动重连后，重新发送先前失败的消息
        // if (eventType === "onopen" && this._cacheSendMessageList.size > 0) {
        // this.reSendMessage(); 外部处理，因为有一种情况部分组件已经销毁了，所有不再需要重新发送
        // }

        if (eventType === "onclose" && this.reconnection) {
          this.reconnect();
        }

        this[eventType] && this[eventType](event);
      };
    });
  }

  startHeartCheck() {
    clearTimeout(this.heartCheckTimeoutId);
    clearTimeout(this.heartCheckServerOverTimeoutId);
    this.heartCheckTimeoutId = setTimeout(() => {
      this.WebSocket.sendObj(this.heartMessage);
      // console.log("%c info :【websocket】 心跳包💗已发送！", "color:#00b800");
      this.heartCheckServerOverTimeoutId = setTimeout(() => {
        this.WebSocket.close(3002);
        // console.log("%c info :【websocket】 心跳包💗服务器响应超时！", "color:red");
      }, this.heartCheckServerOverTime);
    }, this.heartCheckTime);
  }

  passToStore(eventName, event) {
    if (this.passToStoreHandler) {
      this.passToStoreHandler(eventName, event, this.defaultPassToStore.bind(this));
    } else {
      this.defaultPassToStore(eventName, event);
    }
  }

  defaultPassToStore(eventName, event) {
    if (!eventName.startsWith("SOCKET_")) {
      return;
    }
    let method = "commit";
    let target = eventName.toUpperCase();
    let msg = event;
    if (this.format === "json" && event.data) {
      msg = JSON.parse(event.data);
      if (msg.mutation) {
        target = [msg.namespace || "", msg.mutation].filter((e) => !!e).join("/");
      } else if (msg.action) {
        method = "dispatch";
        target = [msg.namespace || "", msg.action].filter((e) => !!e).join("/");
      }
    }
    if (this.mutations) {
      target = this.mutations[target] || target;
    }
    this.store[method](target, msg);
  }

  // reSendMessage() {
  //   this._cacheSendMessageList.forEach((message) => {
  //     this.WebSocket.send(message);
  //     this._cacheSendMessageList.delete(message);
  //   });
  // }
}
