import { message } from "ant-design-vue";
import Vue from "vue";

/**
 * websocket 链接倒计时message
 */
export default class MessageTip {
  constructor(opts = {}) {
    const { reconnectionDelay = 2000 } = opts;
    this.timeId = null;
    this.messageKey = "socket";
    this.reconnectionDelay = reconnectionDelay;
  }

  onmessage() {}
  onopen(event) {
    clearInterval(this.timeId);
    message.success({ content: "websocket链接成功！", key: this.messageKey });
  }
  onclose(event) {
    console.log(event);
    if (event.code === 3001) return; // 除了客户端自定义code码：3001手动断开以外，其他都断开原因全部开启倒计时重连提示
    this.startTip();
    // // 如果是非正常关闭 或 心跳超时关闭 则开启链接倒计时message
    // if (event.code === 1006 || event.code === 3002) {
    //   this.startTip();
    // }
  }
  onerror(event) {}
  startTip() {
    let time = this.reconnectionDelay / 1000;
    clearInterval(this.timeId);
    this.timeId = setInterval(() => {
      message.error({ content: "websocket链接失败," + `${time}秒后自动重新链接！`, key: this.messageKey, duration: 0 });
      if (!Vue.prototype.$socket) {
        message.info({ content: "链接关闭！", key: this.messageKey });
        clearInterval(this.timeId);
      }
      if (time === 0) {
        message.info({ content: "websocket断线重连中...", key: this.messageKey, duration: 0 });
        clearInterval(this.timeId);
      }
      time--;
    }, 1000);
  }
}
