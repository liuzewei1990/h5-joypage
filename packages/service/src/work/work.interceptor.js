/**
 * work通用拦截器
 * @param {*} response
 */

export default function (response) {
  let config = response.config;
  let responseData = response.data;
  // 登陆过期-11111 派发过期通知事件 回传responseData需要的话就用
  if (responseData.code == "-11111") {
    return Promise.reject(responseData);
  }

  // 页面需要responseData全部数据
  if (config.isGetCode) {
    return responseData;
  }

  // 页面只需要responseData.data数据
  if (responseData.code == 200) {
    return responseData.data || {};
  }

  return Promise.reject(new Error(responseData.msg || responseData.description || "服务器未知异常"));
}
