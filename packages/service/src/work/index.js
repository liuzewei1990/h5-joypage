// import qs from "qs";
// 全局通用请求器
import { workAxios } from "../base/http.js";
// work拦截器
import workInterceptor from "./work.interceptor.js";
// 交互实体
import PageVo from "./PageVo.js";

// work方法
const work = {};
Object.defineProperty(work, "PageVo", { value: PageVo, writable: false, enumerable: false });
export default work;

/**
 * POST请求 使用拦截器：ompInterceptors
 * @param {*} baseURL 基础url
 * @param {*} url path路径
 * @param {*} data 请求体数据
 * @param {*} headers 请求头
 * @param {*} isLoading 是否需要loading
 * @param {*} isGetCode 是否需要code
 */

work.post = function (baseURL, url, data, headers, isLoading, isGetCode) {
  return workAxios({
    method: "post",
    url: url,
    baseURL: baseURL,
    data: data,
    isLoading,
    isGetCode,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...headers
    }
  }).then(workInterceptor);
};

work.get = function (baseURL, url, params, headers, isLoading, isGetCode) {
  return workAxios({
    method: "GET",
    url: url,
    baseURL: baseURL,
    params: params,
    isLoading,
    isGetCode,
    timeout: 10000,
    headers: {
      // "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...headers
    }
  }).then(workInterceptor);
};

work.put = function (baseURL, url, data, headers, isLoading, isGetCode) {
  return workAxios({
    method: "PUT",
    url: url,
    baseURL: baseURL,
    data: data,
    isLoading,
    isGetCode,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...headers
    }
  }).then(workInterceptor);
};
