import * as service from "@work/service";
import { config } from "@work/config";
const baseURL = config?.baseURL;
/**
 * API统一管理规范
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

// 获取资源文件
export const getPackageCdnUrls = (params = {}, head = {}) => service.work.post(baseURL, "/pubDependentResources/pageList", params, head, false, false);
