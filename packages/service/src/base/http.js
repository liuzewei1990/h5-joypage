import axios from "axios";

const workAxios = axios.create({
  // baseURL: "process.env.VUE_APP_API_BASE_URL",
  timeout: 6000 // 请求超时时间
});

//默认axios不发送cookie，是否允许跨域发送cookie。
workAxios.defaults.withCredentials = true;

workAxios.interceptors.request.use(
  function (config) {
    if (config.isLoading) {
      // 显示loading...
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

workAxios.interceptors.response.use(
  function (response) {
    // 配置信息
    let config = response.config;

    // 关闭loading...

    //如果HTTP状态码不正常直接return reject错误
    if (!(response.status === 200 || response.status === 201)) {
      return Promise.reject(new Error("HTTP状态码：" + response.status + "异常"));
    }

    // 校验数据格式 是否为json
    if (Object.prototype.toString.call(response.data) !== "[object Object]") {
      return Promise.reject(new Error("response data not object"));
    }

    // 处理公共逻辑...待完善

    return response;
  },
  function (error) {
    // 关闭loading...
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;

        case 401:
          error.message = "未授权，请登录";
          break;

        case 403:
          error.message = "拒绝访问";
          break;

        case 404:
          error.message = "请求错误，未找到该资源";
          break;

        case 408:
          error.message = "请求超时";
          break;

        case 500:
          error.message = "服务器内部错误";
          break;

        case 501:
          error.message = "服务未实现";
          break;

        case 502:
          error.message = "服务器维护中,请稍等片刻";
          break;

        case 503:
          error.message = "服务不可用";
          break;

        case 504:
          error.message = "网关超时";
          break;

        case 505:
          error.message = "HTTP版本不受支持";
          break;

        default:
      }
      error.code = error.response.status;
    } else if (error.code == "ECONNABORTED") {
      error.code = 601;
      error.message = "请求超时,请重试";
    } else if (error.code == undefined) {
      error.code = 602;
      error.message = "服务不可用";
    } else {
      error.code = 603;
      error.message = "未知错误";
    }
    // message.error(error.message); 防止出现多个提示信息，只由组件去捕获即可
    return Promise.reject(error);
  }
);

export { workAxios };
