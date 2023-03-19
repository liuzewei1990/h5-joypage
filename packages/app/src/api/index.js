import * as service from "@work/service";
import { config } from "@work/config";
/**
 * API统一管理规范x
 * @param {Obj} params  请求体参数
 * @param {Obj} head    请求头参数
 * @returns Promise
 */

// 获取项目配置
export const getProjectById = (params = {}, head = {}) => service.work.post(config.baseURL, "/projectConf/pageList", params, head, false, false);
