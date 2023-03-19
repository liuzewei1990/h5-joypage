import * as service from "@work/service";
import { config } from "@work/config";
const baseURL = config?.baseURL;
/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

// 获取项目配置
export const getProjectById = (params = {}, head = {}) => service.work.post(baseURL, "/projectConf/pageList", params, head, false, false);

// 获取资源文件
export const getPackageCdnUrls = (params = {}, head = {}) => service.work.post(baseURL, "/pubDependentResources/pageList", params, head, false, false);

// 获取所有页面
export const getWorks = (params = {}, head = {}) => service.work.post(baseURL, "/webpageinfo/pageList", params, head, false, false);

// 获取work json schema
export const getWork = (params = {}, head = {}) => service.work.get(baseURL, `/webpageinfo/selectById/${params.code}`, params, head, false, false);

// 新增work
export const postWork = (params = {}, head = {}) => service.work.post(baseURL, "/webpageinfo/save", params, head, false, false);

// 修改work
export const putWork = (params = {}, head = {}) => service.work.put(baseURL, "/webpageinfo/edit", params, head, false, false);

// 删除work
export const delWork = (params = {}, head = {}) => service.work.post(baseURL, "/webpageinfo/delbyids", params, head, false, false);
