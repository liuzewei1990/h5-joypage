const config = {
  baseURL: "/energy-admin/",
  websocketUrl: "//192.168.7.19:9010/ws",
  websocketConfig: {
    // 启用json格式传递，页面可调用this.$socket.sendObj({a:1})
    format: "json",
    // 设置websocket子协议,默认为空字符串
    protocol: "",
    // 自动重连
    reconnection: true,
    // 重连次数 不传代表无限次
    // reconnectionAttempts: 5,
    // 重连间隔
    reconnectionDelay: 5 * 1000,
    // 开启心跳模式
    isHeartCheck: true,
    // 心跳消息
    heartMessage: { type: "ping" },
    // 心跳检查间隔
    heartCheckTime: 30 * 1000,
    // 发送心跳包后,服务器响应超时时间,如果超出这个时间就认为断线了，则需要重新链接
    heartCheckServerOverTime: 10 * 1000
  }
};

export default config;
