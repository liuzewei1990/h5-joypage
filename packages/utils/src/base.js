export const getParams = (urls = "") => {
  let url = urls || window.location.href.split("#/")[1];
  if (!url) return;
  url = url.split("?")[0];
  let result = url.split("/");
  return result;
};

/**
 * 获取url字符串参数
 * 注意：此方法为vue hash模式特定方法，不适用其他渠道，是解决兼容微信分享链接中取参错误的问题?from=singlemessage&isappinstalled=0
 */
export const getQueryStr = (urls = "") => {
  let url = urls || window.location.href.split("#")[1] || window.location.href;
  url = decodeURIComponent(url);
  let result = {};
  let arr = url.split("?");
  let params = arr[1] && arr[1].split("&");
  if (!params) return result;
  for (let i = 0; i < params.length; i++) {
    let item = params[i].split("=");
    item[0] = decodeURIComponent(item[0]);
    item[1] = decodeURIComponent(item[1]);
    result[item[0]] = item[1];
  }
  return result;
};

/**
 * 将json转换为url参数
 * @param {Object} queryObj 参数对象
 * @param {String} symbol 起始符号
 */
export const createQueryStr = (queryObj = {}, symbol = "") => {
  let queryStr = "";
  if (!this.isObject(queryObj)) return queryStr;

  queryStr += symbol;
  for (const key in queryObj) {
    let item = queryObj[key];
    item && (queryStr += `${key}=${item}&`);
  }
  queryStr = queryStr.substring(0, queryStr.length - 1);
  return queryStr;
};

/**
 * 扁平化promise
 * @returns promise,resolve,reject
 */
export const defer = function () {
  let resolve = null;
  let reject = null;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise,
    resolve,
    reject
  };
};

export const genUUID = () => {
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return (Math.random().toString(36).substring(2, 15) + "-" + Math.random().toString(36).substring(2, 15)).toUpperCase();
};

export const guid = function guid(templateStr = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx") {
  return templateStr.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
