// 全局通用请求器
import { workAxios } from "../base/http.js";
// omp拦截器
import ompInterceptor from "./omp.interceptor.js";
// omp方法
const work = {};
export default work;

/**
 * POST请求 使用拦截器：ompInterceptor
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
      // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      ...headers
    }
  }).then(ompInterceptor);
};

/**
 * GET请求 使用拦截器：ompInterceptor
 * @param {*} baseURL 基础url
 * @param {*} url path路径
 * @param {*} params 请求体数据
 * @param {*} headers 请求头
 * @param {*} isLoading 是否需要loading
 * @param {*} isGetCode 是否需要code
 */

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
  }).then(ompInterceptor);
};
